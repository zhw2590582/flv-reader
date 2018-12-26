import AudioTrack from './audioTrack';
import VideoTrack from './videoTrack';

export default class Transmuxer {
    constructor(flv) {
        this.audioTrack = new AudioTrack(flv);
        this.videoTrack = new VideoTrack(flv);
        flv.on('flvParseTag', tag => {
            switch (tag.tagType) {
                case 9:
                    this.videoTrack.push(tag);
                    break;
                case 8:
                    this.audioTrack.push(tag);
                    break;
                default:
                    break;
            }
        });
    }
}
