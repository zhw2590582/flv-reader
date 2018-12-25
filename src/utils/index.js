import FlvError from './error';

export function errorHandle(condition, msg) {
    if (!condition) {
        throw new FlvError(msg);
    }
}

export function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function prefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

export function createAbortError() {
    try {
        return new DOMException('Aborted', 'AbortError');
    } catch (err) {
        const abortError = new Error('Aborted');
        abortError.name = 'AbortError';
        return abortError;
    }
}
