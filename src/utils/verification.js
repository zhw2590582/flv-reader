import { errorHandle } from '.';

export default function verification(options) {
    const { mediaElement, url } = options;
    errorHandle(mediaElement instanceof HTMLVideoElement, 'The first parameter is not a video tag element');
    errorHandle(
        typeof url === 'string' || (url instanceof File && url.type === 'video/x-flv'),
        'The second parameter is not a string type or flv file',
    );
}
