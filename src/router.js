class Router{
    constructor(routes){
        /*
        quick easy solution for constructor dependency injection, use IWhatever and the default behavior will be to inject Whatever
        */
        this.ITemplate  = null;
        /*
        Ember - first parameter is the name of the template, but this could just be anything, the name of the route
            ---then you need the actual path
            --what defines what template and what view model gets loaded?, conventions
        */
        this.routes = routes;
        
        /*
        how does the actual URL not provide enough information to load proper resources
        if you go to #/index then you would download a template called IndexTemplate and a class called Index?? right??
        if you go to  #/index/customers then CustomersTemplate and Customers
        ** should this map to the server directory structure? so on the server you would have app/index/ and app/index/customers ????
        so then what about parameters:
        --- #/index/customer/44598
        DAMMIT THAT IS THE WHOLE POINT, YOU CAN'T TELL IF A ROUTE IS A URL OR A PARAMETER
        THE ONLY THING YOU COULD DO IS TRY TO DOWNLOAD THE RESOURCE AND THEN IF IT WAS MISSING YOU WOULD ASSUME THAT IT IS A PARAMETER, I DON'T THINK THIS IS VERY GOOD
        WELL THEN JUST REGISTER THE ROUTES WITH PARAMTERS, other wise its just the resource 
        #/index/customer/:customer_id
        */
        this.params = ['/index/customer/:customer_id'];
        //forget regex for now
        //split on colon
        //split on '/'
        this.routeInfo = initRoute(['/index/customer/:customer_id',
         '/index/customer/:customer_id/posts',
        '/index/customer/:customer_id/post/:post_id']);

    }
    get route(){
    
    }
    
    init() {
        var me = this;
         // Listen on hash change:
        window.addEventListener('hashchange', initRoute);
        // Listen on page load:
        window.addEventListener('load', initRoute);
        function route (path, templateId, controller) {
          routes[path] = {templateId: templateId, controller: controller};
        }
        function initRoute(){router (me.routes,me.ITemplate,me.routeInfo)};
        
    }

}

//use the logic to pull out the information into parts URLS vs paramters
//then when pulling the actual url from the browser use the same logic to pull out the parts and compare
//-- how is that going to work when the real url no longer has :whatever_id, it just has the number or whatever
//maintain an array of objects that represent the parsed path
//have a property isParameter or isPart?

//so just split it out by "/" and then add each part to array with isParam
function initRoute(params){
    var routeInfo = [];
    params.forEach(function(a,b,c){
        var parameterInfo = [];
        a = a.split('/');
        a.forEach(function(part,i,parts){
            if(part.length === 0)
                return;
            parameterInfo.push({
                part:part,
                isParam: part.substring(0,1) === ":"
            });
        });
        routeInfo.push(parameterInfo);
    });
    return routeInfo;
}


function router (routes, templateProcessor,routeInfo) {
    //i guess this needs to come from the routes 
    var template = document.getElementById('template').innerHTML; 
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    var tmpRouteInfo = initRoute([url])[0];
    var match = null;
    routeInfo.forEach(function(route,i,routes){
        if(match)
            return false;
        if(route.length !== tmpRouteInfo.length)
            return;
        let unmatch = false;

        tmpRouteInfo.forEach(function(currentPart,b,currentParts){
            if(route[b].part !== currentPart.part && !route[b].isParam){
                unmatch = true;
            }
            if(route[b].isParam){
                route[b].value = currentPart.part;
            }
        });
        if(!unmatch){
            match = route;
        }
    });
    //now do what with matched route??
    //so i put the value of the param on the actual route definition, is that good?
    //System.import(url).then(function(){

    //});
    //recreate the url from the route minus the paramters
    //so what happens when there is no route - just request that url from the server as being the controller?
    templateProcessor.init(match || tmpRouteInfo);         
}


export default Router;