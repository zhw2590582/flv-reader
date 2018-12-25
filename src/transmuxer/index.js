import { mergeBuffer } from '../utils/buffer';

export default class Transmuxer {
    constructor(flv) {
        this.audio = {
            soundFormats: [],
            soundRates: [],
            soundSizes: [],
            soundTypes: [],
            data: new Uint8Array(0),
        };
        this.video = {
            frameTypes: [],
            codecIDs: [],
            data: new Uint8Array(0),
        };
        flv.on('flvParseTag', tag => {
            switch (tag.tagType) {
                case 9:
                    Transmuxer.mergeAttr(this.video.frameTypes, tag.meta.frameType);
                    Transmuxer.mergeAttr(this.video.codecIDs, tag.meta.codecID);
                    this.video.data = mergeBuffer(this.video.data, tag.body.slice(1));
                    break;
                case 8:
                    Transmuxer.mergeAttr(this.audio.soundFormats, tag.meta.soundFormat);
                    Transmuxer.mergeAttr(this.audio.soundRates, tag.meta.soundRate);
                    Transmuxer.mergeAttr(this.audio.soundSizes, tag.meta.soundSize);
                    Transmuxer.mergeAttr(this.audio.soundTypes, tag.meta.soundType);
                    this.audio.data = mergeBuffer(this.audio.data, tag.body.slice(1));
                    break;
                default:
                    break;
            }
        });
    }

    static mergeAttr(arr, item) {
        if (arr.indexOf(item) === -1) {
            arr.push(item);
        }
    }

    download() {
        const elink = document.createElement('a');
        elink.href = URL.createObjectURL(new Blob(this.audio.data, {
            type: 'audio/aac'
        }));
        elink.download = 'name.aac';
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
    }
}
