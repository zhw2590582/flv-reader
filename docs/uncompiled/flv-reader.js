(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['flv-reader'] = {}));
}(this, function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  function E () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
  }

  E.prototype = {
    on: function (name, callback, ctx) {
      var e = this.e || (this.e = {});

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
      });

      return this;
    },

    once: function (name, callback, ctx) {
      var self = this;
      function listener () {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },

    emit: function (name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;

      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }

      return this;
    },

    off: function (name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }

      // Remove event from queue to prevent memory leak
      // Suggested by https://github.com/lazd
      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

      (liveEvents.length)
        ? e[name] = liveEvents
        : delete e[name];

      return this;
    }
  };

  var tinyEmitter = E;

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  var isNativeFunction = _isNativeFunction;

  var construct = createCommonjsModule(function (module) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
  });

  var wrapNativeSuper = createCommonjsModule(function (module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
  });

  var FlvError =
  /*#__PURE__*/
  function (_Error) {
    inherits(FlvError, _Error);

    function FlvError(message, context) {
      var _this;

      classCallCheck(this, FlvError);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvError).call(this, message));

      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(assertThisInitialized(assertThisInitialized(_this)), context || _this.constructor);
      }

      _this.name = 'FlvError';
      return _this;
    }

    return FlvError;
  }(wrapNativeSuper(Error));

  function errorHandle(condition, msg) {
    if (!condition) {
      throw new FlvError(msg);
    }
  }
  function createAbortError() {
    try {
      return new DOMException('Aborted', 'AbortError');
    } catch (err) {
      var abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      return abortError;
    }
  }
  function sleep() {
    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  }

  var utils = /*#__PURE__*/Object.freeze({
    errorHandle: errorHandle,
    createAbortError: createAbortError,
    sleep: sleep
  });

  function checkSupport(options) {
    var MP4H264MimeCodec = 'video/mp4; codecs="avc1.42001E, mp4a.40.2"';
    var canPlay = options.mediaElement.canPlayType(MP4H264MimeCodec);
    errorHandle(window.MediaSource && window.MediaSource.isTypeSupported(MP4H264MimeCodec) && (canPlay === 'probably' || canPlay === 'maybe'), "Unsupported MIME type or codec: ".concat(MP4H264MimeCodec));
    errorHandle(typeof window.Promise === 'function', "Unsupported 'Promise' method");
    errorHandle(typeof window.fetch === 'function', "Unsupported 'fetch' method");
  }

  function validateOptions(options) {
    var mediaElement = options.mediaElement,
        url = options.url;
    errorHandle(mediaElement instanceof HTMLVideoElement, 'The first parameter is not a video tag element');
    errorHandle(typeof url === 'string' || url instanceof File && url.type === 'video/x-flv', 'The second parameter is not a string type or flv file');
  }

  var Debug = function Debug(flv) {
    classCallCheck(this, Debug);

    var debug = flv.options.debug;

    this.log = function (name) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      flv.emit.apply(flv, ['log', name].concat(args));

      if (debug) {
        var _console;

        (_console = console).log.apply(_console, ["[".concat(name, "]")].concat(args));
      }
    };

    this.warn = function (name) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      flv.emit.apply(flv, ['warn', name].concat(args));

      if (debug) {
        var _console2;

        (_console2 = console).warn.apply(_console2, ["[".concat(name, "]")].concat(args));
      }
    };
  };

  var Events =
  /*#__PURE__*/
  function () {
    function Events() {
      classCallCheck(this, Events);

      this.destroyEvents = [];
      this.proxy = this.proxy.bind(this);
    }

    createClass(Events, [{
      key: "proxy",
      value: function proxy(target, name, callback) {
        var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        target.addEventListener(name, callback, option);
        this.destroyEvents.push(function () {
          target.removeEventListener(name, callback, option);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.destroyEvents.forEach(function (event) {
          return event();
        });
      }
    }]);

    return Events;
  }();

  var Workers =
  /*#__PURE__*/
  function () {
    function Workers() {
      classCallCheck(this, Workers);

      this.workers = new Map();
    }

    createClass(Workers, [{
      key: "add",
      value: function add(name, fn) {
        if (!this.workers.has(name)) {
          this.workers.set(name, Workers.create(fn));
        }
      }
    }, {
      key: "run",
      value: function run(name) {
        var worker = this.workers.get(name);

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return worker.post(args);
      }
    }, {
      key: "kill",
      value: function kill(name) {
        var worker = this.workers.get(name);
        worker.kill();
      }
    }, {
      key: "killAll",
      value: function killAll() {
        this.workers.forEach(function (worker) {
          worker.kill();
        });
      }
    }], [{
      key: "fnToStr",
      value: function fnToStr(fn) {
        return "\n           self.onmessage = event => {\n               return self.postMessage((".concat(fn, ").apply(null, event.data));\n           }\n         ");
      }
    }, {
      key: "create",
      value: function create(fn) {
        var blob = new Blob([Workers.fnToStr(fn)], {
          type: 'application/javascript'
        });
        var objectURL = window.URL.createObjectURL(blob);
        var worker = new Worker(objectURL);

        worker.kill = function () {
          URL.revokeObjectURL(objectURL);
          worker.terminate();
        };

        worker.post = function (args) {
          return new Promise(function (resolve, reject) {
            worker.onmessage = function (event) {
              resolve(event.data);
            };

            worker.onerror = function (error) {
              reject(error);
            };

            worker.postMessage(args);
          });
        };

        return worker;
      }
    }]);

    return Workers;
  }();

  function fetchRequest(flv, url) {
    flv.emit('flvFetchStart');
    fetch(url, {
      headers: flv.options.headers
    }).then(function (response) {
      var reader = response.body.getReader();
      flv.on('destroy', function () {
        reader.cancel();
      });
      flv.on('streamCancel', function () {
        reader.cancel();
      });

      (function read() {
        reader.read().then(function (_ref) {
          var done = _ref.done,
              value = _ref.value;

          if (done) {
            flv.emit('flvFetchEnd');
            return;
          }

          flv.emit('flvFetching', new Uint8Array(value));
          read();
        }).catch(function (error) {
          throw error;
        });
      })();
    });
  }

  function mozXhrRequest(flv, url) {
    flv.emit('flvFetchStart');
    var proxy = flv.events.proxy,
        headers = flv.options.headers;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'moz-chunked-arraybuffer';
    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
    proxy(xhr, 'readystatechange', function () {
      flv.emit('readystatechange', xhr);
    });
    proxy(xhr, 'progress', function () {
      flv.emit('flvFetching', new Uint8Array(xhr.response));
    });
    proxy(xhr, 'loadend', function () {
      flv.emit('flvFetchEnd');
    });
    proxy(xhr, 'error', function (error) {
      throw error;
    });
    flv.on('destroy', function () {
      xhr.abort();
      throw createAbortError();
    });
    flv.on('streamCancel', function () {
      xhr.abort();
      createAbortError();
    });
    xhr.send();
  }

  function xhrRequest(flv, url) {
    flv.emit('flvFetchStart');
    var proxy = flv.events.proxy,
        headers = flv.options.headers;
    var textEncoder = new TextEncoder();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
    var index = 0;
    proxy(xhr, 'readystatechange', function () {
      flv.emit('readystatechange', xhr);
    });
    proxy(xhr, 'progress', function () {
      var rawText = xhr.responseText.substr(index);
      index = xhr.responseText.length;
      flv.emit('flvFetching', textEncoder.encode(rawText, {
        stream: true
      }));
    });
    proxy(xhr, 'loadend', function () {
      flv.emit('flvFetching', textEncoder.encode('', {
        stream: false
      }));
      flv.emit('flvFetchEnd');
    });
    proxy(xhr, 'error', function (error) {
      throw error;
    });
    flv.on('destroy', function () {
      xhr.abort();
      throw createAbortError();
    });
    flv.on('streamCancel', function () {
      xhr.abort();
      createAbortError();
    });
    xhr.send();
  }

  function readFile(flv, file) {
    flv.emit('flvFetchStart');
    var proxy = flv.events.proxy;
    var reader = new FileReader();
    proxy(reader, 'load', function (e) {
      var buffer = e.target.result;
      flv.emit('flvFetchEnd', new Uint8Array(buffer));
    });
    reader.readAsArrayBuffer(file);
  }

  function supportsXhrResponseType(type) {
    try {
      var tmpXhr = new XMLHttpRequest();
      tmpXhr.responseType = type;
      return tmpXhr.responseType === type;
    } catch (e) {
      return false;
    }
  }

  var Stream =
  /*#__PURE__*/
  function () {
    function Stream(flv) {
      classCallCheck(this, Stream);

      var url = flv.options.url;
      var transportFactory = Stream.getStreamFactory(url);
      transportFactory(flv, url);
    }

    createClass(Stream, null, [{
      key: "getStreamFactory",
      value: function getStreamFactory(url) {
        if (url instanceof File) {
          return readFile;
        }

        if (typeof Response !== 'undefined' && Object.prototype.hasOwnProperty.call(Response.prototype, 'body') && typeof Headers === 'function') {
          return fetchRequest;
        }

        var mozChunked = 'moz-chunked-arraybuffer';

        if (supportsXhrResponseType(mozChunked)) {
          return mozXhrRequest;
        }

        return xhrRequest;
      }
    }]);

    return Stream;
  }();

  var mse = {
    mediaSource: {
      propertys: ['activeSourceBuffers', 'duration', 'readyState', 'sourceBuffers'],
      methods: ['addSourceBuffer', 'endOfStream', 'removeSourceBuffer', 'clearLiveSeekableRange', 'setLiveSeekableRange'],
      events: ['sourceclose', 'sourceended', 'sourceopen']
    },
    sourceBuffer: {
      propertys: ['mode', 'updating', 'buffered', 'timestampOffset', 'audioTracks', 'videoTracks', 'textTracks', 'appendWindowStart', 'appendWindowEnd', 'trackDefaults'],
      methods: ['appendBuffer', 'appendStream', 'abort', 'remove'],
      events: ['abort', 'error', 'update', 'updateend', 'updatestart']
    },
    sourceBufferList: {
      propertys: ['length'],
      events: ['addsourcebuffer', 'removesourcebuffer']
    }
  };

  var flv = {
    header: {
      signature: {
        value: [0x46, 0x4c, 0x56]
      },
      version: {
        value: [0x01]
      },
      flags: {
        0x00: 'No audio and video tag',
        0x01: 'Video tag only',
        0x04: 'Audio tag only',
        0x05: 'Audio and video tag'
      },
      dataOffset: {
        value: [0x09]
      }
    },
    tags: {
      header: {
        tagType: {
          0x08: 'Video tag',
          0x09: 'Audio tag',
          0x12: 'Scrip tag'
        },
        dataSize: {
          lenght: 3
        },
        timestamp: {
          lenght: 4
        },
        streamID: {
          lenght: 3
        }
      },
      body: {
        scripTag: {
          amf1: {
            type: {
              value: [0x02]
            },
            size: {
              lenght: 2
            },
            string: {
              value: 'onMetaData'
            }
          },
          amf2: {
            type: {
              value: [0x08]
            },
            size: {
              lenght: 4
            },
            metaData: {
              type: {
                0x00: 'Number',
                0x01: 'Boolean',
                0x02: 'String',
                0x03: 'Object',
                0x04: 'MovieClip (reserved, not supported)',
                0x05: 'Null',
                0x06: 'Undefined',
                0x07: 'Reference',
                0x08: 'ECMA array',
                0x09: 'Object end marker',
                0x0a: 'Strict array',
                0x0b: 'Date',
                0x0c: 'Long string'
              },
              name: {
                audiocodecid: 'Audio codec ID used in the file (see E.4.2.1 for available SoundFormat values)',
                audiodatarate: 'Audio bit rate in kilobits per second',
                audiodelay: 'Delay introduced by the audio codec in seconds',
                audiosamplerate: 'Frequency at which the audio stream is replayed',
                audiosamplesize: 'Resolution of a single audio sample',
                canSeekToEnd: 'Indicating the last video frame is a key frame',
                creationdate: 'Creation date and time',
                duration: 'Total duration of the file in seconds',
                filesize: 'Total size of the file in bytes',
                framerate: 'Number of frames per second',
                height: 'Height of the video in pixels',
                stereo: 'Indicating stereo audio',
                videocodecid: 'Video codec ID used in the file (see E.4.3.1 for available CodecID values)',
                videodatarate: 'Video bit rate in kilobits per second',
                width: 'Width of the video in pixels'
              }
            }
          }
        },
        audioTag: {
          soundFormat: {
            0: 'Linear PCM, platform endian',
            1: 'ADPCM',
            2: 'MP3',
            3: 'Linear PCM, little endian',
            4: 'Nellymoser 16-kHz mono',
            5: 'Nellymoser 8-kHz mono',
            6: 'Nellymoser',
            7: 'G.711 A-law logarithmic PCM',
            8: 'G.711 mu-law logarithmic PCM',
            9: 'reserved',
            10: 'AAC',
            11: 'Speex',
            14: 'MP3 8-Khz',
            15: 'Device-specific sound'
          },
          soundRate: {
            0: '5.5-kHz',
            1: '11-kHz',
            2: '22-kHz',
            3: '44-kHz'
          },
          soundSize: {
            0: 'snd8Bit',
            1: 'snd16Bit'
          },
          soundType: {
            0: 'sndMono',
            1: 'sndStereo'
          }
        },
        videoTag: {
          frameType: {
            1: 'keyframe (for AVC, a seekable frame)',
            2: 'inter frame (for AVC, a non-seekable frame)',
            3: 'disposable inter frame (H.263 only)',
            4: 'generated keyframe (reserved for server use only)',
            5: 'video info/command frame'
          },
          codecID: {
            1: 'JPEG (currently unused)',
            2: 'Sorenson H.263',
            3: 'Screen video',
            4: 'On2 VP6',
            5: 'On2 VP6 with alpha channel',
            6: 'Screen video version 2',
            7: 'AVC'
          }
        }
      }
    }
  };

  var mp4 = {};

  var video = {
    propertys: ['audioTracks', 'autoplay', 'buffered', 'controller', 'controls', 'crossOrigin', 'currentSrc', 'currentTime', 'defaultMuted', 'defaultPlaybackRate', 'duration', 'ended', 'error', 'loop', 'mediaGroup', 'muted', 'networkState', 'paused', 'playbackRate', 'played', 'preload', 'readyState', 'seekable', 'seeking', 'src', 'startDate', 'textTracks', 'videoTracks', 'volume'],
    methods: ['addTextTrack', 'canPlayType', 'load', 'play', 'pause'],
    events: ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting']
  };

  var aac = {};

  var h264 = {};

  var config = {
    mse: mse,
    flv: flv,
    mp4: mp4,
    video: video,
    aac: aac,
    h264: h264
  };

  var MSE =
  /*#__PURE__*/
  function () {
    function MSE(flv) {
      classCallCheck(this, MSE);

      this.flv = flv;
      this.creatUrl();
      this.eventBind();
    }

    createClass(MSE, [{
      key: "creatUrl",
      value: function creatUrl() {
        var _this$flv = this.flv,
            mediaElement = _this$flv.options.mediaElement,
            destroyEvents = _this$flv.events.destroyEvents;
        this.mediaSource = new MediaSource();
        var url = URL.createObjectURL(this.mediaSource);
        destroyEvents.push(function () {
          URL.revokeObjectURL(url);
        });
        mediaElement.src = url;
      }
    }, {
      key: "eventBind",
      value: function eventBind() {
        var _this = this;

        var proxy = this.flv.events.proxy;
        config.mse.mediaSource.events.forEach(function (eventName) {
          proxy(_this.mediaSource, eventName, function (event) {
            _this.flv.emit("mediaSource:".concat(event.type), event);
          });
        });
        config.mse.sourceBufferList.events.forEach(function (eventName) {
          proxy(_this.mediaSource.sourceBuffers, eventName, function (event) {
            _this.flv.emit("sourceBuffers:".concat(event.type), event);
          });
          proxy(_this.mediaSource.activeSourceBuffers, eventName, function (event) {
            _this.flv.emit("activeSourceBuffers:".concat(event.type), event);
          });
        });
      }
    }]);

    return MSE;
  }();

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function readBuffer(buffer) {
    var index = 0;
    return function read(length) {
      var tempUint8 = new Uint8Array(length);

      for (var i = 0; i < length; i += 1) {
        tempUint8[i] = buffer[index];
        index += 1;
      }

      read.index = index;
      return tempUint8;
    };
  }
  function mergeBuffer(a, b) {
    var c = new a.constructor(a.length + b.length);
    c.set(a);
    c.set(b, a.length);
    return c;
  }
  function readDouble(array) {
    var view = new DataView(new ArrayBuffer(array.length));
    array.forEach(function (b, i) {
      view.setUint8(i, b);
    });
    return view.getFloat64(0);
  }
  function readBoolean(array) {
    return array[0] !== 0;
  }
  function readString(array) {
    var _String$fromCharCode;

    return (_String$fromCharCode = String.fromCharCode).call.apply(_String$fromCharCode, [String].concat(toConsumableArray(array)));
  }
  function readBufferSum(array) {
    return array.reduce(function (totle, num, index) {
      return totle + num * Math.pow(256, array.length - index - 1);
    }, 0);
  }

  function scripTag(scripTagBody) {
    var readScripTag = readBuffer(scripTagBody);
    var metadata = Object.create(null);
    var amf1 = Object.create(null);
    var amf2 = Object.create(null);

    var _readScripTag = readScripTag(1);

    var _readScripTag2 = slicedToArray(_readScripTag, 1);

    amf1.type = _readScripTag2[0];
    errorHandle(amf1.type === 2, "AMF: [amf1] type expect 2, but got ".concat(amf1.type));
    amf1.size = readBufferSum(readScripTag(2));
    amf1.string = readString(readScripTag(amf1.size));

    var _readScripTag3 = readScripTag(1);

    var _readScripTag4 = slicedToArray(_readScripTag3, 1);

    amf2.type = _readScripTag4[0];
    errorHandle(amf2.type === 8, "AMF: [amf2] type expect 8, but got ".concat(amf2.type));
    amf2.size = readBufferSum(readScripTag(4));
    amf2.metaData = Object.create(null);

    function getValue(type) {
      var value = null;

      if (type !== undefined) {
        switch (type) {
          case 0:
            value = readDouble(readScripTag(8));
            break;

          case 1:
            value = readBoolean(readScripTag(1));
            break;

          case 2:
            {
              var valueLength = readBufferSum(readScripTag(2));
              value = readString(readScripTag(valueLength));
              break;
            }

          case 3:
            {
              value = Object.create(null);
              var lastType = -1;

              while (lastType !== 9) {
                var nameLength = readBufferSum(readScripTag(2));
                var name = readString(readScripTag(nameLength));
                var itemType = readScripTag(1)[0];

                if (name) {
                  value[name] = getValue(itemType);
                }

                lastType = itemType;
              }

              break;
            }

          case 5:
            value = null;
            break;

          case 6:
            value = undefined;
            break;

          case 7:
            value = "Reference #".concat(readScripTag.index);
            readScripTag(2);
            break;

          case 8:
            {
              value = Object.create(null);

              var _lastType = -1;

              while (_lastType !== 9) {
                var _nameLength = readBufferSum(readScripTag(2));

                var _name = readString(readScripTag(_nameLength));

                var _itemType = readScripTag(1)[0];

                if (_name) {
                  value[_name] = getValue(_itemType);
                }

                _lastType = _itemType;
              }

              break;
            }

          case 10:
            {
              var _valueLength = readBufferSum(readScripTag(4));

              value = [];

              for (var index = 0; index < _valueLength; index += 1) {
                var _itemType2 = readScripTag(1)[0];
                value.push(getValue(_itemType2));
              }

              break;
            }

          case 11:
            value = readDouble(readScripTag(2));
            break;

          case 12:
            {
              var _valueLength2 = readBufferSum(readScripTag(4));

              value = readString(readScripTag(_valueLength2));
              break;
            }

          default:
            errorHandle(false, "AMF: Unknown metaData type: ".concat(type));
            break;
        }
      }

      return value;
    }

    while (readScripTag.index < scripTagBody.length) {
      var nameLength = readBufferSum(readScripTag(2));
      var name = readString(readScripTag(nameLength));
      var type = readScripTag(1)[0];

      if (name) {
        amf2.metaData[name] = getValue(type);
      }
    }

    errorHandle(readScripTag.index === scripTagBody.length, 'AMF: Seems to be incompletely parsed');
    errorHandle(amf2.size === Object.keys(amf2.metaData).length, 'AMF: [amf2] length does not match');
    metadata.amf1 = amf1;
    metadata.amf2 = amf2;
    return metadata;
  }

  function videoTag(videoTagBody) {
    var meta = videoTagBody[0];
    var frameType = (meta & 0xf0) >> 4;
    var codecID = meta & 0x0f;
    return {
      frameType: frameType,
      codecID: codecID
    };
  }

  function audioTag(audioTagBody) {
    var meta = audioTagBody[0];
    var soundFormat = (meta & 0xf0) >> 4;
    var soundRate = (meta & 0x0c) >> 2;
    var soundSize = (meta & 0x02) >> 1;
    var soundType = (meta & 0x01) >> 0;
    return {
      soundFormat: soundFormat,
      soundRate: soundRate,
      soundSize: soundSize,
      soundType: soundType
    };
  }

  var Parse =
  /*#__PURE__*/
  function () {
    function Parse(flv) {
      var _this = this;

      classCallCheck(this, Parse);

      this.flv = flv;
      var url = flv.options.url,
          debug = flv.debug;
      this.uint8 = new Uint8Array(0);
      this.index = 0;
      this.header = null;
      this.tags = [];
      this.done = false;
      flv.on('flvFetchStart', function () {
        debug.log('flv-fetch-start', url);
      });
      flv.on('flvFetching', function (uint8) {
        _this.uint8 = mergeBuffer(_this.uint8, uint8);

        _this.parse();
      });
      flv.on('flvFetchEnd', function (uint8) {
        debug.log('flv-fetch-end');

        if (uint8) {
          _this.uint8 = uint8;
          _this.index = 0;
          _this.header = null;
          _this.scripTag = null;
          _this.tags = [];

          _this.parse();
        }

        _this.done = true;
        flv.emit('flvParseDone');
        debug.log('flv-parse-done');
      });
    }

    createClass(Parse, [{
      key: "parse",
      value: function parse() {
        var debug = this.flv.debug;

        if (!this.header) {
          var header = Object.create(null);
          header.signature = readString(this.read(3));

          var _this$read = this.read(1);

          var _this$read2 = slicedToArray(_this$read, 1);

          header.version = _this$read2[0];
          errorHandle(header.signature === 'FLV' && header.version === 1, 'FLV header not found');

          var _this$read3 = this.read(1);

          var _this$read4 = slicedToArray(_this$read3, 1);

          header.flags = _this$read4[0];
          header.headersize = readBufferSum(this.read(4));
          this.header = header;
          this.read(4);
          this.flv.emit('flvParseHeader', this.header);
          debug.log('flv-parse-header', this.header);
        }

        while (this.index < this.uint8.length) {
          var tag = Object.create(null);
          var startIndex = this.index;

          var _this$read5 = this.read(1);

          var _this$read6 = slicedToArray(_this$read5, 1);

          tag.tagType = _this$read6[0];
          tag.dataSize = readBufferSum(this.read(3));
          tag.timestamp = this.read(4);
          tag.streamID = this.read(3);
          tag.body = this.read(tag.dataSize);
          this.tags.push(tag);
          this.read(4);

          switch (tag.tagType) {
            case 18:
              tag.meta = scripTag(tag.body);
              this.flv.emit('scripTagMeta', tag.meta);
              break;

            case 9:
              tag.meta = videoTag(tag.body);
              this.flv.emit('videoTagMeta', tag.meta);
              break;

            case 8:
              tag.meta = audioTag(tag.body);
              this.flv.emit('audioTagMeta', tag.meta);
              break;

            default:
              break;
          }

          this.flv.emit('flvParseTag', tag, startIndex, this.index);
        }
      }
    }, {
      key: "read",
      value: function read(length) {
        var tempUint8 = new Uint8Array(length);

        for (var i = 0; i < length; i += 1) {
          tempUint8[i] = this.uint8[this.index];
          this.index += 1;
        }

        return tempUint8;
      }
    }]);

    return Parse;
  }();

  var AudioTrack =
  /*#__PURE__*/
  function () {
    function AudioTrack(flv) {
      classCallCheck(this, AudioTrack);
    }

    createClass(AudioTrack, [{
      key: "push",
      value: function push(tag) {}
    }]);

    return AudioTrack;
  }();

  var VideoTrack =
  /*#__PURE__*/
  function () {
    function VideoTrack(flv) {
      classCallCheck(this, VideoTrack);
    }

    createClass(VideoTrack, [{
      key: "push",
      value: function push(tag) {}
    }]);

    return VideoTrack;
  }();

  var Transmuxer = function Transmuxer(flv) {
    var _this = this;

    classCallCheck(this, Transmuxer);

    this.audioTrack = new AudioTrack(flv);
    this.videoTrack = new VideoTrack(flv);
    flv.on('flvParseTag', function (tag) {
      switch (tag.tagType) {
        case 9:
          _this.videoTrack.push(tag);

          break;

        case 8:
          _this.audioTrack.push(tag);

          break;

        default:
          break;
      }
    });
  };

  var id = 0;

  var Flv =
  /*#__PURE__*/
  function (_Emitter) {
    inherits(Flv, _Emitter);

    function Flv(options) {
      var _this;

      classCallCheck(this, Flv);

      _this = possibleConstructorReturn(this, getPrototypeOf(Flv).call(this));
      _this.options = Object.assign({}, Flv.DEFAULTS, options);
      validateOptions(_this.options);
      checkSupport(_this.options);
      _this.debug = new Debug(assertThisInitialized(assertThisInitialized(_this)));
      _this.events = new Events(assertThisInitialized(assertThisInitialized(_this)));
      _this.workers = new Workers(assertThisInitialized(assertThisInitialized(_this)));
      _this.parse = new Parse(assertThisInitialized(assertThisInitialized(_this)));
      _this.transmuxer = new Transmuxer(assertThisInitialized(assertThisInitialized(_this)));
      _this.mse = new MSE(assertThisInitialized(assertThisInitialized(_this)));
      _this.stream = new Stream(assertThisInitialized(assertThisInitialized(_this)));
      id += 1;
      _this.id = id;
      Flv.instances.push(assertThisInitialized(assertThisInitialized(_this)));
      return _this;
    }

    createClass(Flv, [{
      key: "destroy",
      value: function destroy() {
        this.events.destroy();
        this.workers.killAll();
        Flv.instances.splice(Flv.instances.indexOf(this), 1);
        this.emit('destroy');
      }
    }], [{
      key: "DEFAULTS",
      get: function get() {
        return {
          mediaElement: '',
          url: '',
          debug: false,
          headers: {}
        };
      }
    }, {
      key: "version",
      get: function get() {
        return '1.0.0';
      }
    }, {
      key: "config",
      get: function get() {
        return config;
      }
    }, {
      key: "utils",
      get: function get() {
        return utils;
      }
    }]);

    return Flv;
  }(tinyEmitter);

  Object.defineProperty(Flv, 'instances', {
    value: []
  });
  window.Flv = Flv;

  exports.default = Flv;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=flv-reader.js.map
