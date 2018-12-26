export function readBuffer(buffer) {
    let index = 0;
    return function read(length) {
        const tempUint8 = new Uint8Array(length);
        for (let i = 0; i < length; i += 1) {
            tempUint8[i] = buffer[index];
            index += 1;
        }
        read.index = index;
        return tempUint8;
    };
}

export function mergeBuffer(a, b) {
    const c = new a.constructor(a.length + b.length);
    c.set(a);
    c.set(b, a.length);
    return c;
}

export function readDouble(array) {
    const view = new DataView(new ArrayBuffer(array.length));
    array.forEach((b, i) => {
        view.setUint8(i, b);
    });
    return view.getFloat64(0);
}

export function readBoolean(array) {
    return array[0] !== 0;
}

export function readString(array) {
    return String.fromCharCode.call(String, ...array);
}

export function string2Buffer(string) {
    const result = [];
    for (let i = 0; i < string.length; i += 1) {
        result.push(Number(string.charCodeAt(i).toString(10)));
    }
    return result;
}

export function readBufferSum(array) {
    return array.reduce((totle, num, index) => totle + num * 256 ** (array.length - index - 1), 0);
}