'use strict'
/*
You have to have a way to define html but use markers to indicate where dynamic content should go, this is how every templating system ever, works, including 
server side systems like ASP 
You have a template that just exists somewhere
-Usually its going to be in another file and ajaxed into the dom, but lets just use the <script> technique for now

//first thing is to somehow get the html of the template
//this would normall be done by making an ajax call to some file whose content is just the html content you want
//we can retrieve an file type and read in the values with ajax
//for laziness we are just getting it from the script template which is another common technique
or we could use the template tag which is not supported in IE but who cares, IE is going away completely
*/



//something has to be responsible for taking the raw html and turning it into DOM

//lets just do one way databinding for now
//create a virtual dom with the documentFragment from the template
//you cannot set innerHTML of a fragment so use the div trick instead. Idealy you don't want an extra div randomly prepended but we don't care right now

 

class Template{
    constructor(template){
        /*
        I guess this would just be an object that contains either a templateUrl or the actual markup as string
        and depending on which one there is, do whatever
        */
        this.template = template;
        this.templates = {
            index:{template:'<h1>whats up </h1>',
                customer:{
                    template:'<h2>Bob</h2>'
                },
                vehicle:{
                    template:'<h4>vehicle</h4>'
                }
            }
        };
    }
    get route(){
    
    }
    
    init(route) {
        var markup = getMarkup(this.templates,route);
        var docfrag = document.createDocumentFragment();
        var fragProxy = document.createElement('div'); 
        fragProxy.innerHTML = markup;
        docfrag.appendChild(fragProxy);  

        //todo - build the url back up from the route excluding param parts
        //import this as being the default convention 
        //map the array back up excluding isParam, then concat
        //should we append controller or something?? i don't want things named controller. what does aurelia call the files
        //iterrate the route and download the file
        //wrap the object into something and put in a "scope" holder? to just represent the heirarchy of view models
        var path = '';
        route.forEach(function(r,i,rs){
            path += '/' + r.part;
            System.import('src' + path).then(function(){
                
            });
        });
        
        //fix this
        initDOM(fragProxy,docfrag); 
    }

}



function initDOM(fragProxy,docfrag){
    /*
    Change Observation
    what is the best technique for observing changes
    have an object hash where the key is the input that is bound to whatever property? will that work\
    No, if you use an object as the key then it is just toString().ed
    why can't you just use an expando property on the input and put the object and key name of what its bound to?
    first i need to know what about that thing that just change
    then i need to know all the other things that are also bound to it
    is that really that hard?
    */
    function addBoundInputObservation(obj,prop,inpt){ 
      var l = NUMBEROFBOUNDINPUTS;
      while(l--){
        if(inputsThatAreBound[l].obj === obj){
          inputsThatAreBound[l].boundTo.push({property:prop,node:inpt});
          return;
        } 
      }
      NUMBEROFBOUNDINPUTS ++;
      inputsThatAreBound.push({obj:obj,boundTo:[{property:prop,node:inpt}]});
    }
    function addBoundTextNodeObservation(obj,prop,inpt){
      var l = NUMBEROFBOUNDTEXTNODES;
      while(l--){
        if(textNodesThatAreBound[l].obj === obj){
          textNodesThatAreBound[l].boundTo.push({property:prop,node:inpt});
          return;
        }
      }
      NUMBEROFBOUNDTEXTNODES ++;
      textNodesThatAreBound.push({obj:obj,boundTo:[{property:prop,node:inpt}]});
    }


      // i mean this concept isn't crazy as there are only so many differen types of nodes that need to be accounted for
    /*
    when the input changes, find itself in that hash, call listener function
    have another hash of inputs that are listening for that change, based on a reference to the object instance and the name of the property its listeing to

    */



    /*
    this is where it gets hard
    for text values its kinda easy, you just traverse the nodes looking for text nodes that have {{something}}
    you keep a reference to that text node and replace it with the value and then register a listener with it
    */

    var n, a=[], walk=document.createTreeWalker(fragProxy,NodeFilter.SHOW_TEXT,null,false),prop,t;
    while(!!(n=walk.nextNode())) {
      for(prop in props){
        var key = prop;
        var reg = new RegExp('{{' + key + '}}', 'ig');
        if(reg.test(n.textContent)){
          t = (n.textContent).replace(reg,  props[key]);
          n.textContent = t;
          addBoundTextNodeObservation(props,key,n);
        }
      }
    }


    /*
    but how do you handle inputs?
    for example, if our templating syntax was like this <input type="text" value="{{propertyFromModel}}"/>
    do we like find all inputs and see if it has {{something}}, what if the actual text was suppose to be that value

    Angular re compiles the html, so after the browser puts in it the dom, angular then goes back over it doing stuff
    you can see this as when you have curly braces {{}} if angular errors out the curly braces will remain there


    Aurelia uses a syntax like value.bind="whatever"
    so you are creating a custom attribute that you can use to setup the binding for value
    might be better to namespace it like wahtever.value.bind="" 

    Ember also precompiles the html from a template by using custome things like {{input}} instead of just a normal <input>


    i would say i like how Aurelia does it, use a custom attribute so you can just use a normal html element
    weird, if you use queryselectorall with  'input[value.bind]', the period is not valid in the selector, how does aurelia do it?
    var inputs = document.querySelectorAll('input[value.bind]');
    */
    var inputs = fragProxy.getElementsByTagName('input'),l = inputs.length;
    while(l--){
      var needsBinding = inputs[l].getAttribute('value.bind');
      if(needsBinding){
        inputs[l].value = props[needsBinding]; 
        bindInput(inputs[l],props,needsBinding); 
      }
    } 

    /*  
    now we need to setup the process of handling when the value in the input changes and automatically put it back into the source property
    we also need to handle updating everything else that is bound to this specific property of the specific object
    */
    function bindInput(i,obj, key){
      inputsThatAreBound[i] = null;
      i.theThingImBoundTo = obj;
      i.thePropertyImBoundTo = key;  
      addBoundInputObservation(obj,key,i);
      i.addEventListener(WHATEVENTTRIGGERSDATABINDING, function(e){
        //how do the other frameworks handle this - in order to get the latest value immediately when the key is pressed, you have to do this, otherwise the value is not there yet
        window.setTimeout( function(){ 
          e.target.theThingImBoundTo[e.target.thePropertyImBoundTo] = e.target.value;
          notify(e.target.theThingImBoundTo,e.target.thePropertyImBoundTo);
        }, 1);
      });


    }
    function notify(obj,prop){
      notifyBoundInputs(obj,prop);
      notifyBoundTextNodes(obj,prop);
    }
    function notifyBoundTextNodes(obj,prop){
      var l = NUMBEROFBOUNDTEXTNODES;
       while(l--){
         if(textNodesThatAreBound[l].obj === obj){
           var ll = textNodesThatAreBound[l].boundTo.length;
           while(ll--){
             var v = textNodesThatAreBound[l].boundTo[ll];
             if(v.property === prop){
              v.node.textContent = obj[prop];
             }
           }
         }
        }
    }
    function notifyBoundInputs(obj,prop){
      var l = NUMBEROFBOUNDINPUTS;
       while(l--){
         if(inputsThatAreBound[l].obj === obj){
           var ll = inputsThatAreBound[l].boundTo.length;
           while(ll--){
              var v = inputsThatAreBound[l].boundTo[ll];
             if(v.property === prop){
              v.node.value = obj[prop];
             }
           }
         }
        }
    }
    /*
    i guess there needs to be a reference to the docfrag so that when the route/view changes, it gets removed?
    */
    document.body.appendChild(docfrag); 



    /*
    interface placeholder. you have to specify the location in the html document where the dynamically generated interface should appear.
    Usually this would just be betweem <body></body> but you can also implement child content like ember allows
    */

    /*
    DONE
    1) get updating one text box to change another text box - done
    2) get changing one text box to change another text node - done
    3) get changing text box to only update the specific text node it is bound to
    9)only update the things bound to the property that was changed
    TODO


    4) how does aurelia handle clicking things
    5) how to do a foreach Ember {{each}} vs Angular ng-repeat, what does aurelia do?
    6) html compiling in general
    7) how do you start this whole process - if the script is included just assume the entire thing is the app and put things in <body> by default
    8) handle a <select>
    10) how do you bind when an in memory object property is changed not through an input 
    11) refactor so there aren't node specific functions, just do different things dependent on node type?
    12) how do you maintain a scope for a grouping of html, would you have a collection that has every node and an associated object

    */
}



function getMarkup(templates,route){
    //use the in memory stored template for now, instead of making ajax call to server,do that later
    route.forEach(function(part,i,parts){
        if(templates[part.part]){
            templates = templates[part.part];
        }
    
    });
    return templates.template;

}
export default Template;