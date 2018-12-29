import H264 from './h264';

export default class VideoTrack {
    constructor(flv) {
        this.flv = flv;
        this.videoBuffers = [];
        this.videoHeader = null;
        this.h264 = new H264(flv, this);
    }

    demuxer(tag) {
        const { debug } = this.flv;
        const { codecID } = tag.meta;
        debug.error(codecID === 7, `[videoTrack] Unsupported codec in video frame: ${codecID}`);
        this.h264.demuxer(tag);
    }
}
