import FlvError from './error';

export default function validateOptions(flv) {
    const { mediaElement, url } = flv.options;

    if (!(mediaElement instanceof HTMLVideoElement)) {
        throw new FlvError("The 'mediaElement' option is not a video tag element");
    }

    if (flv.constructor.instances.some(item => item.options.mediaElement === mediaElement)) {
        throw new FlvError(
            'Cannot mount multiple instances on the same media element, please destroy the instance first',
        );
    }

    if (typeof url !== 'string' && !(url instanceof File)) {
        throw new FlvError("The 'url' option is not a string or file");
    }
}
