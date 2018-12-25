import FlvError from './error';

export function errorHandle(condition, msg) {
    if (!condition) {
        throw new FlvError(msg);
    }
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

export function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
