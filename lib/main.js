
//get rid of these asap
import app from 'src/app'    
import controller from 'src/controller'
import script from 'src/script'
import template from 'src/template'
import 'whatwg-fetch'


    
import Injector from 'src/injector'

    

    
let state = "compiled and loaded";
console.log(`dynamically ${state}`);

//var router = new Router();
//router.init();
var injector = new Injector();
injector.get('IRouter').then(function(r){
    r.init();
});


export default {} 
//////