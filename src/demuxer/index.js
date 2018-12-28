import AudioTrack from './audioTrack';
import VideoTrack from './videoTrack';

export default class Demuxer {
    constructor(flv) {
        this.audioTrack = new AudioTrack(flv);
        this.videoTrack = new VideoTrack(flv);
        flv.on('parseTag', tag => {
            switch (tag.tagType) {
                case 9:
                    this.videoTrack.demuxer(tag);
                    break;
                case 8:
                    this.audioTrack.demuxer(tag);
                    break;
                default:
                    break;
            }
        });
    }
}
