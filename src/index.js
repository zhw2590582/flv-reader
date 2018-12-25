import Emitter from 'tiny-emitter';
import checkSupport from './utils/checkSupport';
import validateOptions from './utils/validateOptions';
import Debug from './debug';
import Events from './events';
import Workers from './workers';
import Stream from './stream';
import MSE from './mse';
import Parse from './parse';
import Transmuxer from './transmuxer';
import * as utils from './utils';
import config from './config';

let id = 0;
class Flv extends Emitter {
    constructor(options) {
        super();
        this.options = Object.assign({}, Flv.DEFAULTS, options);
        validateOptions(this.options);
        checkSupport(this.options);
        this.debug = new Debug(this);
        this.events = new Events(this);
        this.workers = new Workers(this);
        this.parse = new Parse(this);
        this.transmuxer = new Transmuxer(this);
        this.mse = new MSE(this);
        this.stream = new Stream(this);
        id += 1;
        this.id = id;
        Flv.instances.push(this);
    }

    static get DEFAULTS() {
        return {
            mediaElement: '',
            url: '',
            debug: false,
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
        Flv.instances.splice(Flv.instances.indexOf(this), 1);
        this.emit('destroy');
    }
}

Object.defineProperty(Flv, 'instances', {
    value: [],
});

window.Flv = Flv;
export default Flv;
