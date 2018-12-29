export default class VideoTag {
    constructor(flv, videoTagBody) {
        const meta = videoTagBody[0];
        this.frameType = (meta & 0xf0) >> 4;
        this.codecID = meta & 0x0f; 
    }
}