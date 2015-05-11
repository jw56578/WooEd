System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.2.7",
    "babel-runtime": "npm:babel-runtime@5.2.7",
    "core-js": "npm:core-js@0.9.6",
    "di": "github:angular/di.js@master",
    "visionmedia/superagent": "github:visionmedia/superagent@1.2.0",
    "whatwg-fetch": "npm:whatwg-fetch@0.8.1",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.9.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

