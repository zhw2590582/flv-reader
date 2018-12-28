import { errorHandle } from '.';

export default function validateOptions(flv) {
    const { mediaElement, url } = flv.options;
    errorHandle(mediaElement instanceof HTMLVideoElement, "The 'mediaElement' option is not a video tag element");

    errorHandle(
        flv.constructor.instances.every(item => item.options.mediaElement !== mediaElement),
        'Cannot mount multiple instances on the same media element, please destroy the instance first',
    );

    errorHandle(
        typeof url === 'string' || url instanceof File,
        "The 'url' option is not a string or file",
    );
}
