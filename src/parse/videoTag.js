export default class VideoTag {
    constructor(flv, videoTagBody) {
        flv.debug.error(videoTagBody.length > 1, 'Invalid video packet');
        const meta = videoTagBody[0];
        this.frameType = (meta & 0xf0) >> 4;
        this.codecID = meta & 0x0f; 
    }
}