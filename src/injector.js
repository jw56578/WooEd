class Injector{
    constructor(config){
        this.config = config;//this would be the mapping of concrete classes to interfaces that will not follow the default convention IWhatever to Whatever
        this.stack = 0;
        
       
    }
    get(name){
        this.stack++;
        var me = this, root = 'src/';//how should this know the path to things
        return new Promise(function(resolve, reject) { 
            name = name.substring(1,name.length);
            var p =  System.import(root + name);
            p.then(function(m){
                var name;
                m = m.default;
                name = m.name;
                m = new m();
                var deps = [];
                Object.keys(m).forEach(function (key) {
                  if(key.substring(0,1) === "I" && m[key] === null){
                    deps.push(me.get(key));
                  }
                });
                if(deps.length > 0){
                    Promise.all(deps).then(function(resolvedDeps){
                        resolvedDeps.forEach(function(a,b,c){
                            var I= a.name;
                            m['I' + I] = a.obj;
                        });
                        if(!!--me.stack){
                            resolve({name:name,obj:m});
                        }else{
                            resolve(m);
                        }
                         
                    });
                }else{
                    if(!!--me.stack){
                        resolve({name:name,obj:m});
                    }else{
                        resolve(m);
                    }
                }
            });
        });
    }
}
export default Injector;