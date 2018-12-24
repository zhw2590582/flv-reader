import { prefixInteger } from '../utils';

export default function audioTag(audioTagBody) {
    const metaData = prefixInteger(audioTagBody[0].toString(2), 8);
    const soundFormat = parseInt(metaData.slice(0, 4), 2);
    const soundRate = parseInt(metaData.slice(0, 2), 2);
    const soundSize = parseInt(metaData.slice(0, 1), 2);
    const soundType = parseInt(metaData.slice(0, 1), 2);
    return {
        soundFormat,
        soundRate,
        soundSize,
        soundType,
    };
}
