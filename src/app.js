'use strict'

/*what kinda globals we need to maintain*/
var NUMBEROFBOUNDINPUTS = 0;
var NUMBEROFBOUNDTEXTNODES = 0;
var WHATEVENTTRIGGERSDATABINDING = 'keydown';



var inputsThatAreBound = [
  //{obj:null,prop:null,boundTo:[]}
  //can this be an array of objects
  //where there is a property called obj indicating what the object is, which the inputs have an expando property for
  //then there is a bound property, which is an array of all the inputs that are bound to the object and this property
  //could not only be inputs but also selects and textareas?
  //this thing would have to only exist per route/interface/controller/view whatever, else things would get real messy 
];
//well this stupid thing would need a sister array called textNodesThatAreBound
var textNodesThatAreBound= [
  
  ];
  
  
function getElementsByAttribute(context, attribute)
{
  var matchingElements = [];
  var allElements = context.querySelectorAll('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      matchingElements.push(allElements[i]);
    }
  } 
  return matchingElements;
}   


/*
just have a namespace off the global and then store a "scope" there (whats a better name)
the scope would be the representation of a specific view, but then how would you handle nested views
there would just be a tree of the current views that are active 

*/
//create a thing to hold a graph of the current active views which could be nested?
//traverse the graph looking for the specific instance of the view to get its scope and whatever else you might need
var views = {
  view:{},
  scope:{},
  children:[]
};