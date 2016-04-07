"format register";
System.register("src/app", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {
    var NUMBEROFBOUNDINPUTS = this["NUMBEROFBOUNDINPUTS"];
    var NUMBEROFBOUNDTEXTNODES = this["NUMBEROFBOUNDTEXTNODES"];
    var WHATEVENTTRIGGERSDATABINDING = this["WHATEVENTTRIGGERSDATABINDING"];
    var inputsThatAreBound = this["inputsThatAreBound"];
    var textNodesThatAreBound = this["textNodesThatAreBound"];
    var views = this["views"];
    'use strict';
    var NUMBEROFBOUNDINPUTS = 0;
    var NUMBEROFBOUNDTEXTNODES = 0;
    var WHATEVENTTRIGGERSDATABINDING = 'keydown';
    var inputsThatAreBound = [];
    var textNodesThatAreBound = [];
    function getElementsByAttribute(context, attribute) {
      var matchingElements = [];
      var allElements = context.querySelectorAll('*');
      for (var i = 0,
          n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
          matchingElements.push(allElements[i]);
        }
      }
      return matchingElements;
    }
    var views = {
      view: {},
      scope: {},
      children: []
    };
    this["NUMBEROFBOUNDINPUTS"] = NUMBEROFBOUNDINPUTS;
    this["NUMBEROFBOUNDTEXTNODES"] = NUMBEROFBOUNDTEXTNODES;
    this["WHATEVENTTRIGGERSDATABINDING"] = WHATEVENTTRIGGERSDATABINDING;
    this["inputsThatAreBound"] = inputsThatAreBound;
    this["textNodesThatAreBound"] = textNodesThatAreBound;
    this["views"] = views;
  }).call(System.global);
  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("src/controller", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {
    var props = this["props"];
    var props = {
      firstName: 'jon',
      lastName: 'smith',
      handleClick: function() {}
    };
    function handleClick() {}
    this["props"] = props;
  }).call(System.global);
  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("src/script", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {
    'use strict';
    function init(fragProxy, docfrag) {
      function addBoundInputObservation(obj, prop, inpt) {
        var l = NUMBEROFBOUNDINPUTS;
        while (l--) {
          if (inputsThatAreBound[l].obj === obj) {
            inputsThatAreBound[l].boundTo.push({
              property: prop,
              node: inpt
            });
            return ;
          }
        }
        NUMBEROFBOUNDINPUTS++;
        inputsThatAreBound.push({
          obj: obj,
          boundTo: [{
            property: prop,
            node: inpt
          }]
        });
      }
      function addBoundTextNodeObservation(obj, prop, inpt) {
        var l = NUMBEROFBOUNDTEXTNODES;
        while (l--) {
          if (textNodesThatAreBound[l].obj === obj) {
            textNodesThatAreBound[l].boundTo.push({
              property: prop,
              node: inpt
            });
            return ;
          }
        }
        NUMBEROFBOUNDTEXTNODES++;
        textNodesThatAreBound.push({
          obj: obj,
          boundTo: [{
            property: prop,
            node: inpt
          }]
        });
      }
      var n,
          a = [],
          walk = document.createTreeWalker(fragProxy, NodeFilter.SHOW_TEXT, null, false),
          prop,
          t;
      while (!!(n = walk.nextNode())) {
        for (prop in props) {
          var key = prop;
          var reg = new RegExp('{{' + key + '}}', 'ig');
          if (reg.test(n.textContent)) {
            t = (n.textContent).replace(reg, props[key]);
            n.textContent = t;
            addBoundTextNodeObservation(props, key, n);
          }
        }
      }
      var inputs = fragProxy.getElementsByTagName('input'),
          l = inputs.length;
      while (l--) {
        var needsBinding = inputs[l].getAttribute('value.bind');
        if (needsBinding) {
          inputs[l].value = props[needsBinding];
          bindInput(inputs[l], props, needsBinding);
        }
      }
      function bindInput(i, obj, key) {
        inputsThatAreBound[i] = null;
        i.theThingImBoundTo = obj;
        i.thePropertyImBoundTo = key;
        addBoundInputObservation(obj, key, i);
        i.addEventListener(WHATEVENTTRIGGERSDATABINDING, function(e) {
          window.setTimeout(function() {
            e.target.theThingImBoundTo[e.target.thePropertyImBoundTo] = e.target.value;
            notify(e.target.theThingImBoundTo, e.target.thePropertyImBoundTo);
          }, 1);
        });
      }
      function notify(obj, prop) {
        notifyBoundInputs(obj, prop);
        notifyBoundTextNodes(obj, prop);
      }
      function notifyBoundTextNodes(obj, prop) {
        var l = NUMBEROFBOUNDTEXTNODES;
        while (l--) {
          if (textNodesThatAreBound[l].obj === obj) {
            var ll = textNodesThatAreBound[l].boundTo.length;
            while (ll--) {
              var v = textNodesThatAreBound[l].boundTo[ll];
              if (v.property === prop) {
                v.node.textContent = obj[prop];
              }
            }
          }
        }
      }
      function notifyBoundInputs(obj, prop) {
        var l = NUMBEROFBOUNDINPUTS;
        while (l--) {
          if (inputsThatAreBound[l].obj === obj) {
            var ll = inputsThatAreBound[l].boundTo.length;
            while (ll--) {
              var v = inputsThatAreBound[l].boundTo[ll];
              if (v.property === prop) {
                v.node.value = obj[prop];
              }
            }
          }
        }
      }
      document.body.appendChild(docfrag);
    }
  }).call(System.global);
  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("npm:core-js@0.9.6/library/modules/$.fw", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function($) {
    $.FW = false;
    $.path = $.core;
    return $;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.2.7/helpers/class-call-check", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:whatwg-fetch@0.8.1/fetch", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function() {
    'use strict';
    if (self.fetch) {
      return ;
    }
    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = name.toString();
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }
      return name.toLowerCase();
    }
    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = value.toString();
      }
      return value;
    }
    function Headers(headers) {
      this.map = {};
      var self = this;
      if (headers instanceof Headers) {
        headers.forEach(function(name, values) {
          values.forEach(function(value) {
            self.append(name, value);
          });
        });
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function(name) {
          self.append(name, headers[name]);
        });
      }
    }
    Headers.prototype.append = function(name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var list = this.map[name];
      if (!list) {
        list = [];
        this.map[name] = list;
      }
      list.push(value);
    };
    Headers.prototype['delete'] = function(name) {
      delete this.map[normalizeName(name)];
    };
    Headers.prototype.get = function(name) {
      var values = this.map[normalizeName(name)];
      return values ? values[0] : null;
    };
    Headers.prototype.getAll = function(name) {
      return this.map[normalizeName(name)] || [];
    };
    Headers.prototype.has = function(name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };
    Headers.prototype.set = function(name, value) {
      this.map[normalizeName(name)] = [normalizeValue(value)];
    };
    Headers.prototype.forEach = function(callback) {
      var self = this;
      Object.getOwnPropertyNames(this.map).forEach(function(name) {
        callback(name, self.map[name]);
      });
    };
    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }
      body.bodyUsed = true;
    }
    function fileReaderReady(reader) {
      return new Promise(function(resolve, reject) {
        reader.onload = function() {
          resolve(reader.result);
        };
        reader.onerror = function() {
          reject(reader.error);
        };
      });
    }
    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      return fileReaderReady(reader);
    }
    function readBlobAsText(blob) {
      var reader = new FileReader();
      reader.readAsText(blob);
      return fileReaderReady(reader);
    }
    var support = {
      blob: 'FileReader' in self && 'Blob' in self && (function() {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      })(),
      formData: 'FormData' in self
    };
    function Body() {
      this.bodyUsed = false;
      this._initBody = function(body) {
        this._bodyInit = body;
        if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (!body) {
          this._bodyText = '';
        } else {
          throw new Error('unsupported BodyInit type');
        }
      };
      if (support.blob) {
        this.blob = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }
          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };
        this.arrayBuffer = function() {
          return this.blob().then(readBlobAsArrayBuffer);
        };
        this.text = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }
          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text');
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
      } else {
        this.text = function() {
          var rejected = consumed(this);
          return rejected ? rejected : Promise.resolve(this._bodyText);
        };
      }
      if (support.formData) {
        this.formData = function() {
          return this.text().then(decode);
        };
      }
      this.json = function() {
        return this.text().then(JSON.parse);
      };
      return this;
    }
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return (methods.indexOf(upcased) > -1) ? upcased : method;
    }
    function Request(url, options) {
      options = options || {};
      this.url = url;
      this.credentials = options.credentials || 'omit';
      this.headers = new Headers(options.headers);
      this.method = normalizeMethod(options.method || 'GET');
      this.mode = options.mode || null;
      this.referrer = null;
      if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
      }
      this._initBody(options.body);
    }
    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }
    function headers(xhr) {
      var head = new Headers();
      var pairs = xhr.getAllResponseHeaders().trim().split('\n');
      pairs.forEach(function(header) {
        var split = header.trim().split(':');
        var key = split.shift().trim();
        var value = split.join(':').trim();
        head.append(key, value);
      });
      return head;
    }
    Body.call(Request.prototype);
    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }
      this._initBody(bodyInit);
      this.type = 'default';
      this.url = null;
      this.status = options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = options.statusText;
      this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
      this.url = options.url || '';
    }
    Body.call(Response.prototype);
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
    self.fetch = function(input, init) {
      var request;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        if (request.credentials === 'cors') {
          xhr.withCredentials = true;
        }
        function responseURL() {
          if ('responseURL' in xhr) {
            return xhr.responseURL;
          }
          if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
          }
          return ;
        }
        xhr.onload = function() {
          var status = (xhr.status === 1223) ? 204 : xhr.status;
          if (status < 100 || status > 599) {
            reject(new TypeError('Network request failed'));
            return ;
          }
          var options = {
            status: status,
            statusText: xhr.statusText,
            headers: headers(xhr),
            url: responseURL()
          };
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.open(request.method, request.url, true);
        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }
        request.headers.forEach(function(name, values) {
          values.forEach(function(value) {
            xhr.setRequestHeader(name, value);
          });
        });
        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };
    self.fetch.polyfill = true;
  })();
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.uid", ["npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var sid = 0;
  function uid(key) {
    return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
  }
  uid.safe = require("npm:core-js@0.9.6/library/modules/$").g.Symbol || uid;
  module.exports = uid;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.string-at", ["npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$");
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String($.assertDefined(that)),
          i = $.toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.assert", ["npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$");
  function assert(condition, msg1, msg2) {
    if (!condition)
      throw TypeError(msg2 ? msg1 + msg2 : msg1);
  }
  assert.def = $.assertDefined;
  assert.fn = function(it) {
    if (!$.isFunction(it))
      throw TypeError(it + ' is not a function!');
    return it;
  };
  assert.obj = function(it) {
    if (!$.isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  assert.inst = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  module.exports = assert;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.def", ["npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      global = $.g,
      core = $.core,
      isFunction = $.isFunction;
  function ctx(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }
  $def.F = 1;
  $def.G = 2;
  $def.S = 4;
  $def.P = 8;
  $def.B = 16;
  $def.W = 32;
  function $def(type, name, source) {
    var key,
        own,
        out,
        exp,
        isGlobal = type & $def.G,
        target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {}).prototype,
        exports = isGlobal ? core : core[name] || (core[name] = {});
    if (isGlobal)
      source = name;
    for (key in source) {
      own = !(type & $def.F) && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      if (isGlobal && !isFunction(target[key]))
        exp = source[key];
      else if (type & $def.B && own)
        exp = ctx(out, global);
      else if (type & $def.W && target[key] == out)
        !function(C) {
          exp = function(param) {
            return this instanceof C ? new C(param) : C(param);
          };
          exp.prototype = C.prototype;
        }(out);
      else
        exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
      $.hide(exports, key, exp);
    }
  }
  module.exports = $def;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.unscope", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      UNSCOPABLES = require("npm:core-js@0.9.6/library/modules/$.wks")('unscopables');
  if ($.FW && !(UNSCOPABLES in []))
    $.hide(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key) {
    if ($.FW)
      [][UNSCOPABLES][key] = true;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.ctx", ["npm:core-js@0.9.6/library/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertFunction = require("npm:core-js@0.9.6/library/modules/$.assert").fn;
  module.exports = function(fn, that, length) {
    assertFunction(fn);
    if (~length && that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.iter-call", ["npm:core-js@0.9.6/library/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertObject = require("npm:core-js@0.9.6/library/modules/$.assert").obj;
  function close(iterator) {
    var ret = iterator['return'];
    if (ret !== undefined)
      assertObject(ret.call(iterator));
  }
  function call(iterator, fn, value, entries) {
    try {
      return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      close(iterator);
      throw e;
    }
  }
  call.close = close;
  module.exports = call;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.set-proto", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.assert", "npm:core-js@0.9.6/library/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      assert = require("npm:core-js@0.9.6/library/modules/$.assert");
  function check(O, proto) {
    assert.obj(O);
    assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
  }
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(buggy, set) {
      try {
        set = require("npm:core-js@0.9.6/library/modules/$.ctx")(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
        set({}, []);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }() : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.species", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      SPECIES = require("npm:core-js@0.9.6/library/modules/$.wks")('species');
  module.exports = function(C) {
    if ($.DESC && !(SPECIES in C))
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: $.that
      });
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.invoke", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
      case 5:
        return un ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.dom-create", ["npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      document = $.g.document,
      isObject = $.isObject,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return ;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.iter-detect", ["npm:core-js@0.9.6/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var SYMBOL_ITERATOR = require("npm:core-js@0.9.6/library/modules/$.wks")('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec) {
    if (!SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[SYMBOL_ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[SYMBOL_ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/es6.object.statics-accept-primitives", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      $def = require("npm:core-js@0.9.6/library/modules/$.def"),
      isObject = $.isObject,
      toObject = $.toObject;
  function wrapObjectMethod(METHOD, MODE) {
    var fn = ($.core.Object || {})[METHOD] || Object[METHOD],
        f = 0,
        o = {};
    o[METHOD] = MODE == 1 ? function(it) {
      return isObject(it) ? fn(it) : it;
    } : MODE == 2 ? function(it) {
      return isObject(it) ? fn(it) : true;
    } : MODE == 3 ? function(it) {
      return isObject(it) ? fn(it) : false;
    } : MODE == 4 ? function getOwnPropertyDescriptor(it, key) {
      return fn(toObject(it), key);
    } : MODE == 5 ? function getPrototypeOf(it) {
      return fn(Object($.assertDefined(it)));
    } : function(it) {
      return fn(toObject(it));
    };
    try {
      fn('z');
    } catch (e) {
      f = 1;
    }
    $def($def.S + $def.F * f, 'Object', o);
  }
  wrapObjectMethod('freeze', 1);
  wrapObjectMethod('seal', 1);
  wrapObjectMethod('preventExtensions', 1);
  wrapObjectMethod('isFrozen', 2);
  wrapObjectMethod('isSealed', 2);
  wrapObjectMethod('isExtensible', 3);
  wrapObjectMethod('getOwnPropertyDescriptor', 4);
  wrapObjectMethod('getPrototypeOf', 5);
  wrapObjectMethod('keys');
  wrapObjectMethod('getOwnPropertyNames');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$", ["npm:core-js@0.9.6/library/modules/$.fw"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min;
  var DESC = !!function() {
    try {
      return defineProperty({}, 'a', {get: function() {
          return 2;
        }}).a == 2;
    } catch (e) {}
  }();
  var hide = createDefiner(1);
  function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  }
  function simpleSet(object, key, value) {
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap) {
    return DESC ? function(object, key, value) {
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  function isObject(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it) {
    return typeof it == 'function';
  }
  function assertDefined(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  }
  var $ = module.exports = require("npm:core-js@0.9.6/library/modules/$.fw")({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    isObject: isObject,
    isFunction: isFunction,
    it: function(it) {
      return it;
    },
    that: function() {
      return this;
    },
    toInteger: toInteger,
    toLength: function(it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    },
    toIndex: function(index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key) {
      return hasOwnProperty.call(it, key);
    },
    create: Object.create,
    getProto: Object.getPrototypeOf,
    DESC: DESC,
    desc: desc,
    getDesc: Object.getOwnPropertyDescriptor,
    setDesc: defineProperty,
    setDescs: Object.defineProperties,
    getKeys: Object.keys,
    getNames: Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    ES5Object: Object,
    toObject: function(it) {
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    mix: function(target, src) {
      for (var key in src)
        hide(target, key, src[key]);
      return target;
    },
    each: [].forEach
  });
  if (typeof __e != 'undefined')
    __e = core;
  if (typeof __g != 'undefined')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.register("npm:whatwg-fetch@0.8.1", ["npm:whatwg-fetch@0.8.1/fetch"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:whatwg-fetch@0.8.1/fetch");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.wks", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@0.9.6/library/modules/$").g,
      store = {};
  module.exports = function(name) {
    return store[name] || (store[name] = global.Symbol && global.Symbol[name] || require("npm:core-js@0.9.6/library/modules/$.uid").safe('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.iter", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.cof", "npm:core-js@0.9.6/library/modules/$.assert", "npm:core-js@0.9.6/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      cof = require("npm:core-js@0.9.6/library/modules/$.cof"),
      assertObject = require("npm:core-js@0.9.6/library/modules/$.assert").obj,
      SYMBOL_ITERATOR = require("npm:core-js@0.9.6/library/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      Iterators = {},
      IteratorPrototype = {};
  setIterator(IteratorPrototype, $.that);
  function setIterator(O, value) {
    $.hide(O, SYMBOL_ITERATOR, value);
    if (FF_ITERATOR in [])
      $.hide(O, FF_ITERATOR, value);
  }
  module.exports = {
    BUGGY: 'keys' in [] && !('next' in [].keys()),
    Iterators: Iterators,
    step: function(done, value) {
      return {
        value: value,
        done: !!done
      };
    },
    is: function(it) {
      var O = Object(it),
          Symbol = $.g.Symbol,
          SYM = Symbol && Symbol.iterator || FF_ITERATOR;
      return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
    },
    get: function(it) {
      var Symbol = $.g.Symbol,
          ext = it[Symbol && Symbol.iterator || FF_ITERATOR],
          getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
      return assertObject(getIter.call(it));
    },
    set: setIterator,
    create: function(Constructor, NAME, next, proto) {
      Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
      cof.set(Constructor, NAME + ' Iterator');
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.iter-define", ["npm:core-js@0.9.6/library/modules/$.def", "npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.cof", "npm:core-js@0.9.6/library/modules/$.iter", "npm:core-js@0.9.6/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.6/library/modules/$.def"),
      $ = require("npm:core-js@0.9.6/library/modules/$"),
      cof = require("npm:core-js@0.9.6/library/modules/$.cof"),
      $iter = require("npm:core-js@0.9.6/library/modules/$.iter"),
      SYMBOL_ITERATOR = require("npm:core-js@0.9.6/library/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values',
      Iterators = $iter.Iterators;
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
    $iter.create(Constructor, NAME, next);
    function createMethod(kind) {
      function $$(that) {
        return new Constructor(that, kind);
      }
      switch (kind) {
        case KEYS:
          return function keys() {
            return $$(this);
          };
        case VALUES:
          return function values() {
            return $$(this);
          };
      }
      return function entries() {
        return $$(this);
      };
    }
    var TAG = NAME + ' Iterator',
        proto = Base.prototype,
        _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        _default = _native || createMethod(DEFAULT),
        methods,
        key;
    if (_native) {
      var IteratorPrototype = $.getProto(_default.call(new Base));
      cof.set(IteratorPrototype, TAG, true);
      if ($.FW && $.has(proto, FF_ITERATOR))
        $iter.set(IteratorPrototype, $.that);
    }
    if ($.FW)
      $iter.set(proto, _default);
    Iterators[NAME] = _default;
    Iterators[TAG] = $.that;
    if (DEFAULT) {
      methods = {
        keys: IS_SET ? _default : createMethod(KEYS),
        values: DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if (FORCE)
        for (key in methods) {
          if (!(key in proto))
            $.hide(proto, key, methods[key]);
        }
      else
        $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/es6.array.iterator", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.unscope", "npm:core-js@0.9.6/library/modules/$.uid", "npm:core-js@0.9.6/library/modules/$.iter", "npm:core-js@0.9.6/library/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      setUnscope = require("npm:core-js@0.9.6/library/modules/$.unscope"),
      ITER = require("npm:core-js@0.9.6/library/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.6/library/modules/$.iter"),
      step = $iter.step,
      Iterators = $iter.Iterators;
  require("npm:core-js@0.9.6/library/modules/$.iter-define")(Array, 'Array', function(iterated, kind) {
    $.set(this, ITER, {
      o: $.toObject(iterated),
      i: 0,
      k: kind
    });
  }, function() {
    var iter = this[ITER],
        O = iter.o,
        kind = iter.k,
        index = iter.i++;
    if (!O || index >= O.length) {
      iter.o = undefined;
      return step(1);
    }
    if (kind == 'keys')
      return step(0, index);
    if (kind == 'values')
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.for-of", ["npm:core-js@0.9.6/library/modules/$.ctx", "npm:core-js@0.9.6/library/modules/$.iter", "npm:core-js@0.9.6/library/modules/$.iter-call"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ctx = require("npm:core-js@0.9.6/library/modules/$.ctx"),
      get = require("npm:core-js@0.9.6/library/modules/$.iter").get,
      call = require("npm:core-js@0.9.6/library/modules/$.iter-call");
  module.exports = function(iterable, entries, fn, that) {
    var iterator = get(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        step;
    while (!(step = iterator.next()).done) {
      if (call(iterator, f, step.value, entries) === false) {
        return call.close(iterator);
      }
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1", ["npm:process@0.10.1/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.10.1/browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/fn/object/keys", ["npm:core-js@0.9.6/library/modules/es6.object.statics-accept-primitives", "npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.6/library/modules/es6.object.statics-accept-primitives");
  module.exports = require("npm:core-js@0.9.6/library/modules/$").core.Object.keys;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/fn/object/define-property", ["npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$");
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.cof", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      TAG = require("npm:core-js@0.9.6/library/modules/$.wks")('toStringTag'),
      toString = {}.toString;
  function cof(it) {
    return toString.call(it).slice(8, -1);
  }
  cof.classof = function(it) {
    var O,
        T;
    return it == undefined ? it === undefined ? 'Undefined' : 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
  };
  cof.set = function(it, tag, stat) {
    if (it && !$.has(it = stat ? it : it.prototype, TAG))
      $.hide(it, TAG, tag);
  };
  module.exports = cof;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/es6.string.iterator", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.string-at", "npm:core-js@0.9.6/library/modules/$.uid", "npm:core-js@0.9.6/library/modules/$.iter", "npm:core-js@0.9.6/library/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var set = require("npm:core-js@0.9.6/library/modules/$").set,
      $at = require("npm:core-js@0.9.6/library/modules/$.string-at")(true),
      ITER = require("npm:core-js@0.9.6/library/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.6/library/modules/$.iter"),
      step = $iter.step;
  require("npm:core-js@0.9.6/library/modules/$.iter-define")(String, 'String', function(iterated) {
    set(this, ITER, {
      o: String(iterated),
      i: 0
    });
  }, function() {
    var iter = this[ITER],
        O = iter.o,
        index = iter.i,
        point;
    if (index >= O.length)
      return step(1);
    point = $at(O, index);
    iter.i += point.length;
    return step(0, point);
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/web.dom.iterable", ["npm:core-js@0.9.6/library/modules/es6.array.iterator", "npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.iter", "npm:core-js@0.9.6/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.6/library/modules/es6.array.iterator");
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      Iterators = require("npm:core-js@0.9.6/library/modules/$.iter").Iterators,
      ITERATOR = require("npm:core-js@0.9.6/library/modules/$.wks")('iterator'),
      ArrayValues = Iterators.Array,
      NodeList = $.g.NodeList;
  if ($.FW && NodeList && !(ITERATOR in NodeList.prototype)) {
    $.hide(NodeList.prototype, ITERATOR, ArrayValues);
  }
  Iterators.NodeList = ArrayValues;
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1/index", ["npm:process@0.10.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require("npm:process@0.10.1");
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.2.7/core-js/object/keys", ["npm:core-js@0.9.6/library/fn/object/keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.6/library/fn/object/keys"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.2.7/core-js/object/define-property", ["npm:core-js@0.9.6/library/fn/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.6/library/fn/object/define-property"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/es6.object.to-string", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.cof", "npm:core-js@0.9.6/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.6/library/modules/$"),
      cof = require("npm:core-js@0.9.6/library/modules/$.cof"),
      tmp = {};
  tmp[require("npm:core-js@0.9.6/library/modules/$.wks")('toStringTag')] = 'z';
  if ($.FW && cof(tmp) != 'z')
    $.hide(Object.prototype, 'toString', function toString() {
      return '[object ' + cof.classof(this) + ']';
    });
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.2.7/helpers/create-class", ["npm:babel-runtime@5.2.7/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.2.7/core-js/object/define-property")["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$.task", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.ctx", "npm:core-js@0.9.6/library/modules/$.cof", "npm:core-js@0.9.6/library/modules/$.invoke", "npm:core-js@0.9.6/library/modules/$.dom-create", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.6/library/modules/$"),
        ctx = require("npm:core-js@0.9.6/library/modules/$.ctx"),
        cof = require("npm:core-js@0.9.6/library/modules/$.cof"),
        invoke = require("npm:core-js@0.9.6/library/modules/$.invoke"),
        cel = require("npm:core-js@0.9.6/library/modules/$.dom-create"),
        global = $.g,
        isFunction = $.isFunction,
        html = $.html,
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        postMessage = global.postMessage,
        addEventListener = global.addEventListener,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    function run() {
      var id = +this;
      if ($.has(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    }
    function listner(event) {
      run.call(event.data);
    }
    if (!isFunction(setTask) || !isFunction(clearTask)) {
      setTask = function(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(isFunction(fn) ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function(id) {
        delete queue[id];
      };
      if (cof(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (addEventListener && isFunction(postMessage) && !global.importScripts) {
        defer = function(id) {
          postMessage(id, '*');
        };
        addEventListener('message', listner, false);
      } else if (isFunction(MessageChannel)) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/es6.promise", ["npm:core-js@0.9.6/library/modules/$", "npm:core-js@0.9.6/library/modules/$.ctx", "npm:core-js@0.9.6/library/modules/$.cof", "npm:core-js@0.9.6/library/modules/$.def", "npm:core-js@0.9.6/library/modules/$.assert", "npm:core-js@0.9.6/library/modules/$.for-of", "npm:core-js@0.9.6/library/modules/$.set-proto", "npm:core-js@0.9.6/library/modules/$.species", "npm:core-js@0.9.6/library/modules/$.wks", "npm:core-js@0.9.6/library/modules/$.uid", "npm:core-js@0.9.6/library/modules/$.task", "npm:core-js@0.9.6/library/modules/$.iter-detect", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.6/library/modules/$"),
        ctx = require("npm:core-js@0.9.6/library/modules/$.ctx"),
        cof = require("npm:core-js@0.9.6/library/modules/$.cof"),
        $def = require("npm:core-js@0.9.6/library/modules/$.def"),
        assert = require("npm:core-js@0.9.6/library/modules/$.assert"),
        forOf = require("npm:core-js@0.9.6/library/modules/$.for-of"),
        setProto = require("npm:core-js@0.9.6/library/modules/$.set-proto").set,
        species = require("npm:core-js@0.9.6/library/modules/$.species"),
        SPECIES = require("npm:core-js@0.9.6/library/modules/$.wks")('species'),
        RECORD = require("npm:core-js@0.9.6/library/modules/$.uid").safe('record'),
        PROMISE = 'Promise',
        global = $.g,
        process = global.process,
        asap = process && process.nextTick || require("npm:core-js@0.9.6/library/modules/$.task").set,
        P = global[PROMISE],
        isFunction = $.isFunction,
        isObject = $.isObject,
        assertFunction = assert.fn,
        assertObject = assert.obj;
    var useNative = function() {
      var test,
          works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = isFunction(P) && isFunction(P.resolve) && P.resolve(test = new P(function() {})) == test;
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    function getConstructor(C) {
      var S = assertObject(C)[SPECIES];
      return S != undefined ? S : C;
    }
    function isThenable(it) {
      var then;
      if (isObject(it))
        then = it.then;
      return isFunction(then) ? then : false;
    }
    function notify(record) {
      var chain = record.c;
      if (chain.length)
        asap(function() {
          var value = record.v,
              ok = record.s == 1,
              i = 0;
          function run(react) {
            var cb = ok ? react.ok : react.fail,
                ret,
                then;
            try {
              if (cb) {
                if (!ok)
                  record.h = true;
                ret = cb === true ? value : cb(value);
                if (ret === react.P) {
                  react.rej(TypeError('Promise-chain cycle'));
                } else if (then = isThenable(ret)) {
                  then.call(ret, react.res, react.rej);
                } else
                  react.res(ret);
              } else
                react.rej(value);
            } catch (err) {
              react.rej(err);
            }
          }
          while (chain.length > i)
            run(chain[i++]);
          chain.length = 0;
        });
    }
    function isUnhandled(promise) {
      var record = promise[RECORD],
          chain = record.a || record.c,
          i = 0,
          react;
      if (record.h)
        return false;
      while (chain.length > i) {
        react = chain[i++];
        if (react.fail || !isUnhandled(react.P))
          return false;
      }
      return true;
    }
    function $reject(value) {
      var record = this,
          promise;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      setTimeout(function() {
        asap(function() {
          if (isUnhandled(promise = record.p)) {
            if (cof(process) == 'process') {
              process.emit('unhandledRejection', value, promise);
            } else if (global.console && isFunction(console.error)) {
              console.error('Unhandled promise rejection', value);
            }
          }
          record.a = undefined;
        });
      }, 1);
      notify(record);
    }
    function $resolve(value) {
      var record = this,
          then,
          wrapper;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      try {
        if (then = isThenable(value)) {
          wrapper = {
            r: record,
            d: false
          };
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } else {
          record.v = value;
          record.s = 1;
          notify(record);
        }
      } catch (err) {
        $reject.call(wrapper || {
          r: record,
          d: false
        }, err);
      }
    }
    if (!useNative) {
      P = function Promise(executor) {
        assertFunction(executor);
        var record = {
          p: assert.inst(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false
        };
        $.hide(this, RECORD, record);
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      $.mix(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var S = assertObject(assertObject(this).constructor)[SPECIES];
          var react = {
            ok: isFunction(onFulfilled) ? onFulfilled : true,
            fail: isFunction(onRejected) ? onRejected : false
          };
          var promise = react.P = new (S != undefined ? S : P)(function(res, rej) {
            react.res = assertFunction(res);
            react.rej = assertFunction(rej);
          });
          var record = this[RECORD];
          record.c.push(react);
          if (record.a)
            record.a.push(react);
          record.s && notify(record);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
    cof.set(P, PROMISE);
    species(P);
    species($.core[PROMISE]);
    $def($def.S + $def.F * !useNative, PROMISE, {
      reject: function reject(r) {
        return new (getConstructor(this))(function(res, rej) {
          rej(r);
        });
      },
      resolve: function resolve(x) {
        return isObject(x) && RECORD in x && $.getProto(x) === this.prototype ? x : new (getConstructor(this))(function(res) {
          res(x);
        });
      }
    });
    $def($def.S + $def.F * !(useNative && require("npm:core-js@0.9.6/library/modules/$.iter-detect")(function(iter) {
      P.all(iter)['catch'](function() {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            values = [];
        return new C(function(res, rej) {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining)
            $.each.call(values, function(promise, index) {
              C.resolve(promise).then(function(value) {
                results[index] = value;
                --remaining || res(results);
              }, rej);
            });
          else
            res(results);
        });
      },
      race: function race(iterable) {
        var C = getConstructor(this);
        return new C(function(res, rej) {
          forOf(iterable, false, function(promise) {
            C.resolve(promise).then(res, rej);
          });
        });
      }
    });
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/fn/promise", ["npm:core-js@0.9.6/library/modules/es6.object.to-string", "npm:core-js@0.9.6/library/modules/es6.string.iterator", "npm:core-js@0.9.6/library/modules/web.dom.iterable", "npm:core-js@0.9.6/library/modules/es6.promise", "npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.6/library/modules/es6.object.to-string");
  require("npm:core-js@0.9.6/library/modules/es6.string.iterator");
  require("npm:core-js@0.9.6/library/modules/web.dom.iterable");
  require("npm:core-js@0.9.6/library/modules/es6.promise");
  module.exports = require("npm:core-js@0.9.6/library/modules/$").core.Promise;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.2.7/core-js/promise", ["npm:core-js@0.9.6/library/fn/promise"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.6/library/fn/promise"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register('src/template', ['npm:babel-runtime@5.2.7/helpers/create-class', 'npm:babel-runtime@5.2.7/helpers/class-call-check'], function (_export) {
    var _createClass, _classCallCheck, Template;

    function getMarkup(templates, route) {
        //use the in memory stored template for now, instead of making ajax call to server,do that later
        route.forEach(function (part, i, parts) {
            if (templates[part.part]) {
                templates = templates[part.part];
            }
        });
        return templates.template;
    }
    return {
        setters: [function (_npmBabelRuntime527HelpersCreateClass) {
            _createClass = _npmBabelRuntime527HelpersCreateClass['default'];
        }, function (_npmBabelRuntime527HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime527HelpersClassCallCheck['default'];
        }],
        execute: function () {
            'use strict';
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

            Template = (function () {
                function Template(template) {
                    _classCallCheck(this, Template);

                    /*
                    I guess this would just be an object that contains either a templateUrl or the actual markup as string
                    and depending on which one there is, do whatever
                    */
                    this.template = template;
                    this.templates = {
                        index: { template: '<h1>whats up </h1>',
                            customer: {
                                template: '<h2>Bob</h2>'
                            },
                            vehicle: {
                                template: '<h4>vehicle</h4>'
                            }
                        }
                    };
                }

                _createClass(Template, [{
                    key: 'route',
                    get: function () {}
                }, {
                    key: 'init',
                    value: function init(route) {
                        var markup = getMarkup(this.templates, route);
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
                        route.forEach(function (r, i, rs) {
                            path += '/' + r.part;
                            System['import']('src' + path).then(function () {});
                        });

                        //fix this
                        window.init(fragProxy, docfrag);
                    }
                }]);

                return Template;
            })();

            _export('default', Template);
        }
    };
});
System.register('src/injector', ['npm:babel-runtime@5.2.7/helpers/create-class', 'npm:babel-runtime@5.2.7/helpers/class-call-check', 'npm:babel-runtime@5.2.7/core-js/promise', 'npm:babel-runtime@5.2.7/core-js/object/keys'], function (_export) {
    var _createClass, _classCallCheck, _Promise, _Object$keys, Injector;

    return {
        setters: [function (_npmBabelRuntime527HelpersCreateClass) {
            _createClass = _npmBabelRuntime527HelpersCreateClass['default'];
        }, function (_npmBabelRuntime527HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime527HelpersClassCallCheck['default'];
        }, function (_npmBabelRuntime527CoreJsPromise) {
            _Promise = _npmBabelRuntime527CoreJsPromise['default'];
        }, function (_npmBabelRuntime527CoreJsObjectKeys) {
            _Object$keys = _npmBabelRuntime527CoreJsObjectKeys['default'];
        }],
        execute: function () {
            'use strict';

            Injector = (function () {
                function Injector(config) {
                    _classCallCheck(this, Injector);

                    this.config = config; //this would be the mapping of concrete classes to interfaces that will not follow the default convention IWhatever to Whatever
                    this.stack = 0;
                }

                _createClass(Injector, [{
                    key: 'get',
                    value: function get(name) {
                        this.stack++;
                        var me = this,
                            root = 'src/'; //how should this know the path to things
                        return new _Promise(function (resolve, reject) {
                            name = name.substring(1, name.length);
                            var p = System['import'](root + name);
                            p.then(function (m) {
                                var name;
                                m = m['default'];
                                name = m.name;
                                m = new m();
                                var deps = [];
                                _Object$keys(m).forEach(function (key) {
                                    if (key.substring(0, 1) === 'I' && m[key] === null) {
                                        deps.push(me.get(key));
                                    }
                                });
                                if (deps.length > 0) {
                                    _Promise.all(deps).then(function (resolvedDeps) {
                                        resolvedDeps.forEach(function (a, b, c) {
                                            var I = a.name;
                                            m['I' + I] = a.obj;
                                        });
                                        if (!! --me.stack) {
                                            resolve({ name: name, obj: m });
                                        } else {
                                            resolve(m);
                                        }
                                    });
                                } else {
                                    if (!! --me.stack) {
                                        resolve({ name: name, obj: m });
                                    } else {
                                        resolve(m);
                                    }
                                }
                            });
                        });
                    }
                }]);

                return Injector;
            })();

            _export('default', Injector);
        }
    };
});
System.register('lib/main', ['src/app', 'src/controller', 'src/script', 'src/template', 'npm:whatwg-fetch@0.8.1', 'src/injector'], function (_export) {
    var app, controller, script, template, Injector, state, injector;
    return {
        setters: [function (_srcApp) {
            app = _srcApp['default'];
        }, function (_srcController) {
            controller = _srcController['default'];
        }, function (_srcScript) {
            script = _srcScript['default'];
        }, function (_srcTemplate) {
            template = _srcTemplate['default'];
        }, function (_npmWhatwgFetch081) {}, function (_srcInjector) {
            Injector = _srcInjector['default'];
        }],
        execute: function () {
            //get rid of these asap
            'use strict';

            state = 'compiled and loaded';

            console.log('dynamically ' + state);

            //var router = new Router();
            //router.init();
            injector = new Injector();

            injector.get('IRouter').then(function (r) {
                r.init();
            });

            _export('default', {}
            //////
            );
        }
    };
});
//# sourceMappingURL=build.js.map