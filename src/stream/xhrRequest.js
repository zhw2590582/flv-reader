import { createAbortError } from '../utils';

export default function xhrRequest(flv, url) {
    flv.emit('flvFetchStart');
    const { events: { proxy }, options: { headers } } = flv;
    const textEncoder = new TextEncoder();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
    });
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
        throw createAbortError();
    });

    flv.on('streamCancel', () => {
        xhr.abort();
        createAbortError();
    });

    xhr.send();
}
