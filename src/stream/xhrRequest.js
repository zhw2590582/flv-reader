import { createAbortError } from '../utils';

export default function xhrRequest(flv, url) {
    const { proxy } = flv.events;
    const textEncoder = new TextEncoder();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    let index = 0;

    proxy(xhr, 'readystatechange', () => {
        flv.emit('readystatechange', xhr);
    });

    proxy(xhr, 'progress', () => {
        const rawText = xhr.responseText.substr(index);
        index = xhr.responseText.length;
        flv.emit('flvFetching', textEncoder.encode(rawText, { stream: true }));
    });

    proxy(xhr, 'loadend', () => {
        flv.emit('flvFetching', textEncoder.encode('', { stream: false }));
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
