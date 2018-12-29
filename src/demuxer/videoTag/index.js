import H264 from './h264';

export default class VideoTag {
    constructor(flv, tag, requestHeader) {
        this.flv = flv;
        const { debug } = flv;
        const { codecID } = this.getVideoMeta(tag);
        debug.error(codecID === 7, `[videoTrack] Unsupported codec in video frame: ${codecID}`);
        const { frame, header } = new H264(flv, tag, requestHeader);
        this.frame = frame;
        this.header = header;
    }

    getVideoMeta(tag) {
        const { debug } = this.flv;
        debug.error(tag.body.length > 1, 'Invalid video packet');
        const meta = tag.body[0];
        return {
            frameType: (meta & 0xf0) >> 4,
            codecID: meta & 0x0f,
        };
    }
}
