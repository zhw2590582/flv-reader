export default function videoTag(videoTagBody) {
    const meta = videoTagBody[0];
    const frameType = (meta & 0xf0) >> 4;
    const codecID = meta & 0x0f;
    return {
        frameType,
        codecID,
    };
}
