import Emitter from 'tiny-emitter';
import checkSupport from './utils/checkSupport';
import validateOptions from './utils/validateOptions';
import Debug from './debug';
import Events from './events';
import Workers from './workers';
import Stream from './stream';
import MSE from './mse';
import Parse from './parse';
import Demuxer from './demuxer';
import * as utils from './utils';
import config from './config';

let id = 0;
class FlvReader extends Emitter {
    constructor(options) {
        super();
        this.options = Object.assign({}, FlvReader.DEFAULTS, options);
        validateOptions(this);
        checkSupport(this);

        this.loaded = false;

        this.debug = new Debug(this);
        this.events = new Events(this);
        this.workers = new Workers(this);
        this.parse = new Parse(this);
        this.demuxer = new Demuxer(this);
        this.mse = new MSE(this);
        this.stream = new Stream(this);

        id += 1;
        this.id = id;
        FlvReader.instances.push(this);
    }

    static get DEFAULTS() {
        return {
            mediaElement: '',
            url: '',
            debug: false,
            live: false,
            headers: {}
        };
    }

    static get version() {
        return '__VERSION__';
    }

    static get config() {
        return config;
    }

    static get utils() {
        return utils;
    }

    destroy() {
        this.events.destroy();
        this.workers.killAll();
        FlvReader.instances.splice(FlvReader.instances.indexOf(this), 1);
        this.emit('destroy');
    }
}

Object.defineProperty(FlvReader, 'instances', {
    value: [],
});

window.FlvReader = FlvReader;
export default FlvReader;
