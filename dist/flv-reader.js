/*!
 * flv-reader.js v1.0.0
 * Github: https://github.com/zhw2590582/flv-reader#readme
 * (c) 2017-2018 Harvey Zack
 * Released under the MIT License.
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self)["flv-reader"]={})}(this,function(e){"use strict";var u=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function t(e,t){return e(t={exports:{}},t.exports),t.exports}var n=t(function(t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=r=function(e){return n(e)}:t.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":n(e)},r(e)}t.exports=r});var o=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e};var a=function(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?o(e):t},c=t(function(t){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(e)}t.exports=n}),s=t(function(n){function r(e,t){return n.exports=r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},r(e,t)}n.exports=r});var f=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)};function l(){}l.prototype={on:function(e,t,n){var r=this.e||(this.e={});return(r[e]||(r[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var r=this;function o(){r.off(e,o),t.apply(n,arguments)}return o._=t,this.on(e,o,n)},emit:function(e){for(var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),r=0,o=n.length;r<o;r++)n[r].fn.apply(n[r].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),r=n[e],o=[];if(r&&t)for(var i=0,a=r.length;i<a;i++)r[i].fn!==t&&r[i].fn._!==t&&o.push(r[i]);return o.length?n[e]=o:delete n[e],this}};var p=l;var d=function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}};var h=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)};var v=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")};var y=function(e){return d(e)||h(e)||v()};var m=function(e){return-1!==Function.toString.call(e).indexOf("[native code]")},b=t(function(r){function o(e,t,n){return!function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?r.exports=o=function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&s(o,n.prototype),o}:r.exports=o=Reflect.construct,o.apply(null,arguments)}r.exports=o}),g=function(e){function r(e,t){var n;return u(this,r),n=a(this,c(r).call(this,e)),"function"==typeof Error.captureStackTrace&&Error.captureStackTrace(o(o(n)),t||n.constructor),n.name="FlvError",n}return f(r,e),r}(t(function(t){function r(e){var n="function"==typeof Map?new Map:void 0;return t.exports=r=function(e){if(null===e||!m(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(e))return n.get(e);n.set(e,t)}function t(){return b(e,arguments,c(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),s(t,e)},r(e)}t.exports=r})(Error));function w(e,t){if(!e)throw new g(t)}function S(e,t){var n=new e.constructor(e.length+t.length);return n.set(e),n.set(t,e.length),n}function k(r){return r.reduce(function(e,t,n){return e+t*Math.pow(256,r.length-n-1)},0)}function x(e){var t;return(t=String.fromCharCode).call.apply(t,[String].concat(y(e)))}function O(e){var n=new DataView(new ArrayBuffer(e.length));return e.forEach(function(e,t){n.setUint8(t,e)}),n.getFloat64(0)}function E(e){return 1===e}function T(o){var i=0;return function e(t){for(var n=new Uint8Array(t),r=0;r<t;r+=1)n[r]=o[i],i+=1;return e.index=i,n}}var j=Object.freeze({errorHandle:w,mergeTypedArrays:S,sleep:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;return new Promise(function(e){return setTimeout(e,t)})},getUint8Sum:k,string2Bin:function(e){for(var t=[],n=0;n<e.length;n+=1)t.push(Number(e.charCodeAt(n).toString(10)));return t},bin2String:x,bin2Float:O,bin2Boolean:E,log:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";console.log("[".concat(e,"] ").concat(t))},readUint8:T});var A=function(){function e(){u(this,e),this.destroyEvents=[],this.proxy=this.proxy.bind(this)}return i(e,[{key:"proxy",value:function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{};e.addEventListener(t,n,r),this.destroyEvents.push(function(){e.removeEventListener(t,n,r)})}},{key:"destroy",value:function(){this.destroyEvents.forEach(function(e){return e()})}}]),e}(),U=function(){function o(){u(this,o),this.workers=new Map}return i(o,[{key:"add",value:function(e,t){this.workers.has(e)||this.workers.set(e,o.create(t))}},{key:"run",value:function(e){for(var t=this.workers.get(e),n=arguments.length,r=new Array(1<n?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.post(r)}},{key:"kill",value:function(e){this.workers.get(e).kill()}},{key:"killAll",value:function(){this.workers.forEach(function(e){e.kill()})}}],[{key:"fnToStr",value:function(e){return"\n           self.onmessage = event => {\n               return self.postMessage((".concat(e,").apply(null, event.data));\n           }\n         ")}},{key:"create",value:function(e){var t=new Blob([o.fnToStr(e)],{type:"application/javascript"}),n=window.URL.createObjectURL(t),r=new Worker(n);return r.kill=function(){URL.revokeObjectURL(n),r.terminate()},r.post=function(e){return new Promise(function(t,n){r.onmessage=function(e){t(e.data)},r.onerror=function(e){n(e)},r.postMessage(e)})},r}}]),o}(),F={mse:{mediaSource:{propertys:["activeSourceBuffers","duration","readyState","sourceBuffers"],methods:["addSourceBuffer","endOfStream","removeSourceBuffer","clearLiveSeekableRange","setLiveSeekableRange"],events:["sourceclose","sourceended","sourceopen"]},sourceBuffer:{propertys:["mode","updating","buffered","timestampOffset","audioTracks","videoTracks","textTracks","appendWindowStart","appendWindowEnd","trackDefaults"],methods:["appendBuffer","appendStream","abort","remove"],events:["abort","error","update","updateend","updatestart"]},sourceBufferList:{propertys:["length"],events:["addsourcebuffer","removesourcebuffer"]}}},R=function(){function t(e){u(this,t),this.flv=e,this.creatUrl(),this.eventBind()}return i(t,[{key:"creatUrl",value:function(){var e=this.flv,t=e.options.mediaElement,n=e.events.destroyEvents;this.mediaSource=new MediaSource;var r=URL.createObjectURL(this.mediaSource);n.push(function(){URL.revokeObjectURL(r)}),t.src=r}},{key:"eventBind",value:function(){var t=this,n=this.flv.events.proxy;F.mse.mediaSource.events.forEach(function(e){n(t.mediaSource,e,function(e){t.flv.emit("mediaSource:".concat(e.type),e)})}),F.mse.sourceBufferList.events.forEach(function(e){n(t.mediaSource.sourceBuffers,e,function(e){t.flv.emit("sourceBuffers:".concat(e.type),e)}),n(t.mediaSource.activeSourceBuffers,e,function(e){t.flv.emit("activeSourceBuffers:".concat(e.type),e)})})}}]),t}();var B=function(e){if(Array.isArray(e))return e};var M=function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n};var L=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")};var P=function(e,t){return B(e)||M(e,t)||L()};function D(v){var y=T(v),e=Object.create(null),t=Object.create(null),n=Object.create(null),r=y(1),o=P(r,1);t.type=o[0],w(2===t.type,"AMF: [amf1] type expect 2, but got ".concat(t.type)),t.size=k(y(2)),t.string=x(y(t.size));var i=y(1),a=P(i,1);function m(e){var t=null;if(void 0!==e)switch(e){case 0:t=O(y(8));break;case 1:t=E(y(1)[0]);break;case 2:var n=k(y(2));t=x(y(n));break;case 3:t=Object.create(null);for(var r=-1;9!==r;){var o=k(y(2)),i=x(y(o)),a=y(1)[0];i&&(t[i]=m(a)),r=a}break;case 8:t=Object.create(null);for(var c=-1;9!==c;){var u=k(y(2)),s=x(y(u)),f=y(1)[0];s&&(t[s]=m(f)),c=f}break;case 10:var l=k(y(4));t=[];for(var p=0;p<l;p+=1){var d=y(1)[0];t.push(m(d))}break;case 12:var h=k(y(4));t=x(y(h));break;default:console.log(y(v.length-y.index-1)),w(!1,"AMF: Unknown metaData type: ".concat(e))}return t}for(n.type=a[0],w(8===n.type,"AMF: [amf2] type expect 8, but got ".concat(n.type)),n.size=k(y(4)),n.metaData=Object.create(null);y.index<v.length;){var c=k(y(2)),u=x(y(c)),s=y(1)[0];u&&(n.metaData[u]=m(s))}return w(y.index===v.length,"AMF: Seems to be incompletely parsed"),w(n.size===Object.keys(n.metaData).length,"AMF: [amf2] length does not match"),e.amf1=t,e.amf2=n,e}var _=function(){function c(t){var n=this;u(this,c);var i,e,r=(this.flv=t).options,o=r.url,a=r.debug;this.uint8=new Uint8Array(0),this.index=0,this.header=null,this.scripTag=null,this.tags=[],this.done=!1,t.on("flvFetchStart",function(){a&&console.log("[flv-fetch-start]",o)}),t.on("flvFetchCancel",function(){a&&console.log("[flv-fetch-cancel]")}),t.on("flvFetching",function(e){n.uint8=S(n.uint8,e),n.parse()}),t.on("flvFetchEnd",function(e){a&&console.log("[flv-fetch-end]"),n.done=!0,e&&(n.uint8=e,n.index=0,n.header=null,n.scripTag=null,n.tags=[],n.parse()),t.emit("flvParseDone"),a&&console.log("[flv-parse-done]")}),"string"==typeof o?(e=o,(i=t).emit("flvFetchStart"),fetch(e).then(function(t){return w(t.ok&&200<=t.status&&t.status<=299,"".concat(t.status," ").concat(t.statusText)),w(t.headers.get("content-type").includes("x-flv"),"The resource does not seem to be a flv file"),new Response(new ReadableStream({start:function(o){var e=t.body.getReader();i.on("destroy",function(){e.cancel()}),i.on("readerCancel",function(){e.cancel()}),function r(){e.read().then(function(e){var t=e.done,n=e.value;if(t)return i.emit("flvFetchEnd"),void o.close();i.emit("flvFetching",new Uint8Array(n)),o.enqueue(n),r()}).catch(function(e){throw e})}()},cancel:function(){i.emit("flvFetchCancel")}}))})):function(r,e){r.emit("flvFetchStart");var t=r.events.proxy,n=new FileReader;t(n,"load",function(e){var t=e.target.result,n=new Uint8Array(t);r.emit("flvFetchEnd",n)}),n.readAsArrayBuffer(e)}(t,o)}return i(c,[{key:"parse",value:function(){var e=this.flv.options.debug;if(13<=this.uint8.length&&!this.header){var t=Object.create(null);t.signature=x(this.read(3));var n=this.read(1),r=P(n,1);t.version=r[0];var o=this.read(1),i=P(o,1);t.flags=i[0],t.headersize=k(this.read(4)),this.header=t,this.read(4),this.flv.emit("flvParseHeader",this.header),e&&console.log("[flv-parse-header]",this.header)}for(;this.index<this.uint8.length;){var a=Object.create(null),c=this.read(1),u=P(c,1);switch(a.tagType=u[0],a.dataSize=k(this.read(3)),a.timestamp=this.read(4),a.streamID=this.read(3),a.body=this.read(a.dataSize),this.tags.push(a),this.read(4),a.tagType){case 18:this.scripTag=D(a.body),this.flv.emit("flvParseScripTag",this.scripTag),e&&console.log("[flv-parse-scrip-tag]",this.scripTag)}this.flv.emit("flvParseTag",a)}}},{key:"read",value:function(e){for(var t=new Uint8Array(e),n=0;n<e;n+=1)t[n]=this.uint8[this.index],this.index+=1;return t}}]),c}(),z=0,C=function(e){function n(e){var t;return u(this,n),(t=a(this,c(n).call(this))).options=Object.assign({},n.DEFAULTS,e),function(e){var t=e.mediaElement,n=e.url;w(t instanceof HTMLVideoElement,"The first parameter is not a video tag element"),w("string"==typeof n||n instanceof File&&"video/x-flv"===n.type,"The second parameter is not a string type or flv file");var r='video/mp4; codecs="avc1.42001E, mp4a.40.2"',o=t.canPlayType(r);w(window.MediaSource&&window.MediaSource.isTypeSupported(r)&&("probably"===o||"maybe"===o),"Unsupported MIME type or codec: ".concat(r)),w("function"==typeof window.Promise,"Unsupported 'Promise' method"),w("function"==typeof window.fetch,"Unsupported 'fetch' method"),w("function"==typeof window.Worker,"Unsupported 'Worker' method"),w("function"==typeof window.ReadableStream,"Unsupported 'ReadableStream' method")}(t.options),t.events=new A(o(o(t))),t.workers=new U(o(o(t))),t.mediaSource=new R(o(o(t))),t.flvData=new _(o(o(t))),z+=1,t.id=z,n.instances.push(o(o(t))),t}return f(n,p),i(n,[{key:"destroy",value:function(){this.events.destroy(),this.workers.killAll(),n.instances.splice(n.instances.indexOf(this),1),this.emit("destroy")}}],[{key:"DEFAULTS",get:function(){return{mediaElement:"",url:"",debug:!1}}},{key:"version",get:function(){return"1.0.0"}},{key:"config",get:function(){return F}},{key:"utils",get:function(){return j}}]),n}();Object.defineProperty(C,"instances",{value:[]}),window.Flv=C,e.default=C,Object.defineProperty(e,"__esModule",{value:!0})});