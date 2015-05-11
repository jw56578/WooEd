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
            index:{template:'<h1>whats up </h1>',children:
                {
                    customer:{template:'<h2>Bob</h2>'}
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

        System.import('src/index/customer').then(function(){

        });
        //fix this
        window.init(fragProxy,docfrag); 
    }

}
function getMarkup(templates,route){
    //use the in memory stored template for now, instead of making ajax call to server,do that later
    route.forEach(function(part,i,parts){
        if(templates[part.part]){
            templates = templates[part.part];
        }else if(templates.children){
            
            Object.keys(templates.children).forEach(function(temp,itemp,temps){
                if(temp === part.part){
                    templates = templates.children[temp];
                }
            
            });
        
        }
    
    });
    return templates.template;

}
export default Template;