
/*
lets just say that this js file is the "controller" and the model is this props object, and we will have an object representing the properties on the controller
in ember these are usually computed properties off of a Controller object or direct properties off the model
in angular these are properties off the scope
in aurelia its a class and its properties
*/


var props = {
  firstName:'jon',
  lastName:'smith',
  handleClick:function(){
    
  }
  
};


/*
-how do you handle calling functions from the DOM
-can't use normal inline call because that is just looking for a function on the window
-angular uses ng-click which is a directive which just registers the click event and then gets a reference to the current controller 
and calls the function on that
-ember uses actions which then looks for the action all over the place
-aurelia expects everything to be in a form with a submit button and it captures the submit event and does something
--<form role="form" submit.delegate="welcome()">
 
so you just specify the event and then dot and then delegate to indicate what should be caled when that event happens
man this is going to be hard when doing loops and when needing to send things in. that will require complicated parsing/ compiling
*/
function handleClick(){
  
  
}