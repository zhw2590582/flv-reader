export default class Debug {
    constructor(flv) {
        const { debug } = flv.options;
        this.log = (name, ...args) => {
            flv.emit('log', name, ...args);
            if (debug) {
                console.log(`Flv: [${name}]`, ...args);
            }
        };

        this.warn = (name, ...args) => {
            flv.emit('warn', name, ...args);
            if (debug) {
                console.warn(`Flv: [${name}]`, ...args);
            }
        };
    }
}
