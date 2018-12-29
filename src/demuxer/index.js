import AudioTag from './audioTag';
import VideoTag from './videoTag';
import ScripTag from './scripTag';

export default class Demuxer {
    constructor(flv) {
        const { debug } = flv;
        this.scripMeta = null;
        this.audioHeader = null;
        this.videoHeader = null;
        this.audioFrames = [];
        this.videoFrames = [];

        flv.on('parseTag', tag => {
            switch (tag.tagType) {
                case 18:
                    this.scripMeta = new ScripTag(flv, tag);
                    this.flv.emit('scripMeta', tag.meta);
                    debug.log('scrip-meta', tag.meta);
                    break;
                case 9: {
                    const { frame, header } = new VideoTag(flv, tag, !this.videoHeader);
                    this.videoFrames.push(frame);
                    if (!this.videoHeader && header) {
                        this.videoHeader = header;
                        this.flv.emit('videoHeader', header);
                        debug.log('video-header', header);
                    }
                    break;
                }
                case 8: {
                    const { frame, header } = new AudioTag(flv, tag, !this.audioHeader);
                    this.audioFrames.push(frame);
                    if (!this.audioHeader && header) {
                        this.audioHeader = header;
                        this.flv.emit('audioHeader', header);
                        debug.log('audio-header', header);
                    }
                    break;
                }
                default:
                    debug.error(false, `unknown tag type: ${tag.tagType}`);
                    break;
            }
        });
    }
}
