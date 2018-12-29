export default class AudioTag {
    constructor(flv, audioTagBody) {
        flv.debug.error(audioTagBody.length > 1, 'Invalid audio packet');
        const meta = audioTagBody[0];
        this.soundFormat = (meta & 0xf0) >> 4;
        this.soundRate = (meta & 0x0c) >> 2;
        this.soundSize = (meta & 0x02) >> 1;
        this.soundType = (meta & 0x01) >> 0;
    }
}