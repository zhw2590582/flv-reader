import { download } from '../../utils';
import { mergeBuffer } from '../../utils/buffer';
import AAC from './aac';
import MP3 from './mp3';

export default class AudioTag {
    constructor(flv) {
        this.flv = flv;
        this.audioBuffers = [];
        this.audioHeader = null;
        this.audioMeta = null;
        this.aac = new AAC(flv, this);
        this.mp3 = new MP3(flv, this);
    }

    static get SOUND_FORMATS() {
        return {
            10: 'aac',
            2: 'mp3',
        };
    }

    demuxer(tag) {
        const { debug } = this.flv;
        const { soundFormat } = tag.meta;
        debug.error(soundFormat === 10 || soundFormat === 2, `[audioTrack] unsupported audio format: ${soundFormat}`);
        const formatName = AudioTag.SOUND_FORMATS[soundFormat];
        const { frame, header } = this[formatName].demuxer(tag, !this.audioHeader);
        this.audioBuffers.push(frame);
        this.flv.emit('audioFrame', frame);
        if (!this.audioHeader) {
            this.audioHeader = header;
            this.flv.emit('audioHeader', this.audioHeader);
            debug.log('audio-header', this.audioHeader);
        }
    }

    download() {
        const { loaded, debug } = this.flv;
        debug.error(this.audioHeader && this.audioBuffers.length > 0, 'Audio data seems to be not ready');
        debug.warn(loaded, 'Audio data does not seem to be loaded completely');
        const url = URL.createObjectURL(
            new Blob([mergeBuffer(...this.audioBuffers)], {
                type: `audio/${this.audioHeader.format}`,
            }),
        );
        download(url, `audioTrack.${this.audioHeader.format}`);
    }
}
