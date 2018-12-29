import H264 from './h264';

export default class VideoTrack {
    constructor(flv) {
        this.videoBuffers = [];
        this.videoHeader = null;
        this.h264 = new H264(flv, this);
    }

    demuxer(tag) {
        this.h264.demuxer(tag);
    }
}