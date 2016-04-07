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
  },
  "bundles": {
    "build": [
      "src/app",
      "src/controller",
      "src/script",
      "npm:core-js@0.9.6/library/modules/$.fw",
      "npm:babel-runtime@5.2.7/helpers/class-call-check",
      "npm:whatwg-fetch@0.8.1/fetch",
      "npm:core-js@0.9.6/library/modules/$.uid",
      "npm:core-js@0.9.6/library/modules/$.string-at",
      "npm:core-js@0.9.6/library/modules/$.assert",
      "npm:core-js@0.9.6/library/modules/$.def",
      "npm:core-js@0.9.6/library/modules/$.unscope",
      "npm:core-js@0.9.6/library/modules/$.ctx",
      "npm:core-js@0.9.6/library/modules/$.iter-call",
      "npm:core-js@0.9.6/library/modules/$.set-proto",
      "npm:core-js@0.9.6/library/modules/$.species",
      "npm:core-js@0.9.6/library/modules/$.invoke",
      "npm:core-js@0.9.6/library/modules/$.dom-create",
      "npm:process@0.10.1/browser",
      "npm:core-js@0.9.6/library/modules/$.iter-detect",
      "npm:core-js@0.9.6/library/modules/es6.object.statics-accept-primitives",
      "npm:core-js@0.9.6/library/modules/$",
      "npm:whatwg-fetch@0.8.1",
      "npm:core-js@0.9.6/library/modules/$.wks",
      "npm:core-js@0.9.6/library/modules/$.iter",
      "npm:core-js@0.9.6/library/modules/$.iter-define",
      "npm:core-js@0.9.6/library/modules/es6.array.iterator",
      "npm:core-js@0.9.6/library/modules/$.for-of",
      "npm:process@0.10.1",
      "npm:core-js@0.9.6/library/fn/object/keys",
      "npm:core-js@0.9.6/library/fn/object/define-property",
      "npm:core-js@0.9.6/library/modules/$.cof",
      "npm:core-js@0.9.6/library/modules/es6.string.iterator",
      "npm:core-js@0.9.6/library/modules/web.dom.iterable",
      "github:jspm/nodelibs-process@0.1.1/index",
      "npm:babel-runtime@5.2.7/core-js/object/keys",
      "npm:babel-runtime@5.2.7/core-js/object/define-property",
      "npm:core-js@0.9.6/library/modules/es6.object.to-string",
      "github:jspm/nodelibs-process@0.1.1",
      "npm:babel-runtime@5.2.7/helpers/create-class",
      "npm:core-js@0.9.6/library/modules/$.task",
      "src/template",
      "npm:core-js@0.9.6/library/modules/es6.promise",
      "npm:core-js@0.9.6/library/fn/promise",
      "npm:babel-runtime@5.2.7/core-js/promise",
      "src/injector",
      "lib/main"
    ]
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

