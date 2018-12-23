import Emitter from 'tiny-emitter';
import support from './utils/support';
import Events from './events';
import Workers from './workers';
import MSE from './mse';
import Parse from './parse';
import * as utils from './utils';
import config from './config';

let id = 0;
class Flv extends Emitter {
    constructor(options) {
        super();
        this.options = Object.assign({}, Flv.DEFAULTS, options);
        support(this.options);
        this.events = new Events(this);
        this.workers = new Workers(this);
        this.mse = new MSE(this);
        this.parse = new Parse(this);
        id += 1;
        this.id = id;
        Flv.instances.push(this);
    }

    static get DEFAULTS() {
        return {
            mediaElement: '',
            url: '',
            debug: false,
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
