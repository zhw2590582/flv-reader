export default function audioTag(audioTagBody) {
    const meta = audioTagBody[0];
    const soundFormat = (meta & 0xf0) >> 4;
    const soundRate = (meta & 0x0c) >> 2;
    const soundSize = (meta & 0x02) >> 1;
    const soundType = (meta & 0x01) >> 0;
    return {
        soundFormat,
        soundRate,
        soundSize,
        soundType,
    };
}
