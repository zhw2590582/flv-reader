import { createAbortError } from '../utils';

export default function mozXhrRequest(flv, url) {
    const { proxy } = flv.events;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'moz-chunked-arraybuffer';

    proxy(xhr, 'readystatechange', () => {
        flv.emit('readystatechange', xhr);
    });

    proxy(xhr, 'progress', () => {
        flv.emit('flvFetching', new Uint8Array(xhr.response));
    });

    proxy(xhr, 'loadend', () => {
        flv.emit('flvFetchEnd');
    });

    proxy(xhr, 'error', error => {
        throw error;
    });

    flv.on('destroy', () => {
        xhr.abort();
        createAbortError();
    });

    flv.on('streamCancel', () => {
        xhr.abort();
        createAbortError();
    });

    xhr.send();
}
