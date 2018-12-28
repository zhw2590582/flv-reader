import { mergeBuffer } from '../utils/buffer';

export default class MP3 {
    constructor(flv) {
        this.flv = flv;
    }

    muxer(tag) {
        let frame = tag.body.slice(1);
        let info = {
            format: 'mp3',
            codec: 'mp3',
        };

        return {
            frame,
            info,
        };
    }
}
