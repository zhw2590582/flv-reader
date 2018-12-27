import { download, errorHandle } from '../utils';
import { mergeBuffer } from '../utils/buffer';
import AAC from './aac';
import MP3 from './mp3';

export default class AudioTrack {
    constructor(flv) {
        this.flv = flv;
        this.audioBuffers = new Uint8Array(0);
        this.audioInfo = null;
        this.aac = new AAC(flv, this);
        this.mp3 = new MP3(flv, this);
    }

    static get SOUND_FORMATS() {
        return {
            10: 'aac',
            2: 'mp3',
        };
    }

    muxer(tag) {
        const { debug } = this.flv;
        const { soundFormat } = tag.meta;
        if (soundFormat !== 10 && soundFormat !== 2) {
            debug.warn('unsupported-audio-format', soundFormat);
        } else {
            const formatName = AudioTrack.SOUND_FORMATS[soundFormat];
            const { frame, info } = this[formatName].muxer(tag);
            this.flv.emit('addAudioFrame', frame);
            this.audioBuffers = mergeBuffer(this.audioBuffers, frame);
            if (!this.audioInfo) {
                this.audioInfo = info;
                debug.log('audio-info', this.audioInfo);
            }
        }
    }

    download() {
        errorHandle(this.audioInfo && this.audioBuffers.length > 0, 'Audio data seems to be not ready');
        const url = URL.createObjectURL(
            new Blob([this.audioBuffers], {
                type: `audio/${this.audioInfo.format}`,
            }),
        );
        download(url, `audioTrack.${this.audioInfo.format}`);
    }
}
