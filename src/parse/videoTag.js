import { prefixInteger } from '../utils';

export default function videoTag(videoTagBody) {
    const metaData = prefixInteger(videoTagBody[0].toString(2), 8);
    const frameType = parseInt(metaData.slice(0, 4), 2);
    const codecID = parseInt(metaData.slice(4), 2);
    return {
        frameType,
        codecID,
    };
}
