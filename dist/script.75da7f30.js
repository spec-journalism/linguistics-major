// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/enter-view/enter-view.min.js":[function(require,module,exports) {
var define;
"use strict";!function(e){"function"==typeof define&&define.amd?define(e):"undefined"!=typeof module&&module.exports?module.exports=e():window.enterView=e.call(this)}(function(){var e=function(e){function n(){E=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)}}function t(){if(y&&"number"==typeof y){var e=Math.min(Math.max(0,y),1);return F-e*F}return F}function o(){var e=document.documentElement.clientHeight,n=window.innerHeight||0;F=Math.max(e,n)}function r(){L=!1;var e=t();M=M.filter(function(n){var t=n.getBoundingClientRect(),o=t.top,r=t.bottom,i=t.height,s=o<e,u=r<e;if(s&&!n.__ev_entered){if(m(n),n.__ev_progress=0,h(n,n.__ev_progress),q)return!1}else!s&&n.__ev_entered&&(n.__ev_progress=0,h(n,n.__ev_progress),g(n));if(s&&!u){var d=(e-o)/i;n.__ev_progress=Math.min(1,Math.max(0,d)),h(n,n.__ev_progress)}return s&&u&&1!==n.__ev_progress&&(n.__ev_progress=1,h(n,n.__ev_progress)),n.__ev_entered=s,!0}),M.length||window.removeEventListener("scroll",i,!0)}function i(){L||(L=!0,E(r))}function s(){o(),r()}function u(){o(),r()}function d(e){for(var n=e.length,t=[],o=0;o<n;o+=1)t.push(e[o]);return t}function f(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return"string"==typeof e?d(n.querySelectorAll(e)):e instanceof NodeList?d(e):e instanceof Array?e:void 0}function c(){M=f(v)}function a(){window.addEventListener("resize",s,!0),window.addEventListener("scroll",i,!0),window.addEventListener("load",u,!0),s()}function _(){return v?(c(),M&&M.length?(n(),a(),void r()):(console.error("no selector elements found"),!1)):(console.error("must pass a selector"),!1)}var v=e.selector,l=e.enter,m=void 0===l?function(){}:l,w=e.exit,g=void 0===w?function(){}:w,p=e.progress,h=void 0===p?function(){}:p,x=e.offset,y=void 0===x?0:x,A=e.once,q=void 0!==A&&A,E=null,L=!1,M=[],F=0;_()};return e});
},{}],"../node_modules/text-balancer/text-balancer.js":[function(require,module,exports) {
var candidates = [];

// pass in a string of selectors to be balanced.
// if you didnt specify any, thats ok! We'll just
// balance anything with the balance-text class
var textBalancer = function (selectors) {

    if (!selectors) {
        candidates = document.querySelectorAll('.balance-text');
    } else {
        createSelectors(selectors);
    }

    balanceText();

    var rebalanceText = debounce(function() {
        balanceText();
    }, 100);

    window.addEventListener('resize', rebalanceText);
}

// this populates our candidates array with dom objects
// that need to be balanced
var createSelectors = function(selectors) {
    selectorArray = selectors.split(',');
    for (var i = 0; i < selectorArray.length; i += 1) {
        var currentSelectorElements = document.querySelectorAll(selectorArray[i].trim());

        for (var j = 0; j < currentSelectorElements.length; j += 1) {
            var currentSelectorElement = currentSelectorElements[j];
            candidates.push(currentSelectorElement);
        }
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function (func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


// HELPER FUNCTION -- initializes recursive binary search
var balanceText = function () {
    var element;
    var i;

    for (i = 0; i < candidates.length; i += 1) {
        element = candidates[i];

        if (textElementIsMultipleLines(element)) {
            element.style.maxWidth = '';
            squeezeContainer(element, element.clientHeight, 0, element.clientWidth);
        }

    }

}

// Make the element as narrow as possible while maintaining its current height (number of lines). Binary search.
var squeezeContainer = function (element, originalHeight, bottomRange, topRange) {
    var mid;
    if (bottomRange >= topRange) {
        element.style.maxWidth = topRange + 'px';
        return;
    }
    mid = (bottomRange + topRange) / 2;
    element.style.maxWidth = mid + 'px';

    if (element.clientHeight > originalHeight) {
        // we've squoze too far and element has spilled onto an additional line; recurse on wider range
        squeezeContainer(element, originalHeight, mid+1, topRange);
    } else {
        // element has not wrapped to another line; keep squeezing!
        squeezeContainer(element, originalHeight, bottomRange+1, mid);
    }
}

// function to see if a headline is multiple lines
// we only want to break if the headline is multiple lines
//
// We achieve this by turning the first word into a span
// and then we compare the height of that span to the height
// of the entire headline. If the headline is bigger than the
// span by 10px we balance the headline.
var textElementIsMultipleLines = function (element) {
    var firstWordHeight;
    var elementHeight;
    var HEIGHT_OFFSET;
    var elementWords;
    var firstWord;
    var ORIGINAL_ELEMENT_TEXT;

    ORIGINAL_ELEMENT_TEXT = element.innerHTML;

    // usually there is around a 5px discrepency between
    // the first word and the height of the whole headline
    // so subtract the height of the headline by 10 px and
    // we should be good
    HEIGHT_OFFSET = 10;

    // get all the words in the headline as
    // an array -- will include punctuation
    //
    // this is used to put the headline back together
    elementWords = element.innerHTML.split(' ');

    // make span for first word and give it an id
    // so we can access it in le dom
    firstWord = document.createElement('span');
    firstWord.id = 'element-first-word';
    firstWord.innerHTML = elementWords[0];

    // this is the entire headline
    // as an array except for first word
    //
    // we will append it to the headline after the span
    elementWords = elementWords.slice(1);

    // empty the headline and append the span to it
    element.innerHTML = '';
    element.appendChild(firstWord);

    // add the rest of the element back to it
    element.innerHTML += ' ' + elementWords.join(' ');

    // update the first word variable in the dom
    firstWord = document.getElementById('element-first-word');

    firstWordHeight = firstWord.offsetHeight;
    elementHeight = element.offsetHeight;
    // restore the original element text
    element.innerHTML = ORIGINAL_ELEMENT_TEXT;

    // compare the height of the element and the height of the first word
    return elementHeight - HEIGHT_OFFSET > firstWordHeight;

} // end headlineIsMultipleLines

exports.balanceText = textBalancer;
},{}],"../config.yml":[function(require,module,exports) {
module.exports = {
  USE_COVER_HED: false,
  DOC_URL: "https://docs.google.com/document/d/1AgLdhV4XQWQvIuQnSsYyeSLCod_tuzHzb23Bbo0lZfM/edit"
};
},{}],"script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hamburgerTrigger = hamburgerTrigger;

var _enterView = _interopRequireDefault(require("enter-view"));

var _textBalancer = _interopRequireDefault(require("text-balancer"));

var _config = require("../config.yml");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fade in navbar at scroll trigger
var navbar = document.getElementById('navbar'); // Mobile navbar hamburger trigger

function hamburgerTrigger() {
  navbar.classList.toggle('show-nav-links');
} // Text balance headline and deck


_textBalancer.default.balanceText('.headline, .deck, .image-overlay .image-caption');
/* SVG icon stuff

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.29 12.3"><defs><style>.cls-1{fill:none;stroke:#999;stroke-miterlimit:10;}</style></defs><title>icon-close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line class="cls-1" x1="0.39" y1="0.32" x2="9.9" y2="11.99"/><line class="cls-1" x1="0.39" y1="11.99" x2="9.9" y2="0.32"/></g></g></svg>`;
const svg64 = window.btoa(svg);
console.log(`url('data:image/svg+xml;base64,${svg64}')`);

*/
},{"enter-view":"../node_modules/enter-view/enter-view.min.js","text-balancer":"../node_modules/text-balancer/text-balancer.js","../config.yml":"../config.yml"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60276" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], "script")
//# sourceMappingURL=/script.75da7f30.js.map