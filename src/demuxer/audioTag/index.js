import AAC from './aac';
import MP3 from './mp3';

export default class AudioTag {
    constructor(flv, tag, requestHeader) {
        this.flv = flv;
        const { debug } = flv;
        const { soundFormat } = this.getAudioMeta(tag);
        debug.error(soundFormat === 10 || soundFormat === 2, `[audioTrack] unsupported audio format: ${soundFormat}`);
        const Format = AudioTag.SOUND_FORMATS[soundFormat];
        const { frame, header } = new Format(flv, tag, requestHeader);
        this.frame = frame;
        this.header = header;
    }

    static get SOUND_FORMATS() {
        return {
            10: AAC,
            2: MP3,
        };
    }

    getAudioMeta(tag) {
        const { debug } = this.flv;
        debug.error(tag.body.length > 1, 'Invalid audio packet');
        const meta = tag.body[0];
        return {
            soundFormat: (meta & 0xf0) >> 4,
            soundRate: (meta & 0x0c) >> 2,
            soundSize: (meta & 0x02) >> 1,
            soundType: (meta & 0x01) >> 0,
        };
    }
}
