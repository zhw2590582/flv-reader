import { errorHandle, mergeTypedArrays, getUint8Sum, bin2String } from '../utils';
import scripTag from './scripTag';
import videoTag from './videoTag';
import audioTag from './audioTag';

export default class Parse {
    constructor(flv) {
        this.flv = flv;
        const { options: { url }, debug } = flv;
        this.uint8 = new Uint8Array(0);
        this.index = 0;
        this.header = null;
        this.tags = [];

        flv.on('flvFetchStart', () => {
            debug.log('flv-fetch-start', url);
        });

        flv.on('flvFetchCancel', () => {
            debug.log('flv-fetch-cancel');
        });

        flv.on('flvFetching', uint8 => {
            this.uint8 = mergeTypedArrays(this.uint8, uint8);
            this.parse();
        });

        flv.on('flvFetchEnd', uint8 => {
            flv.emit('flvFetchEnd');
            debug.log('flv-fetch-end');
            if (uint8) {
                this.uint8 = uint8;
                this.index = 0;
                this.header = null;
                this.scripTag = null;
                this.tags = [];
                this.parse();
            }
            flv.emit('flvParseDone');
            debug.log('flv-parse-done');
        });
    }

    parse() {
        const { debug } = this.flv;
        if (this.uint8.length >= 13 && !this.header) {
            const header = Object.create(null);
            header.signature = bin2String(this.read(3));
            errorHandle(header.signature === 'FLV', `[signature] expect 'FLV', but got ${header.signature}`);
            [header.version] = this.read(1);
            errorHandle(header.version === 1, `[version] expect 1, but got ${header.version}`);
            [header.flags] = this.read(1);
            header.headersize = getUint8Sum(this.read(4));
            this.header = header;
            this.read(4);
            this.flv.emit('flvParseHeader', this.header);
            debug.log('flv-parse-header', this.header);
        }

        while (this.index < this.uint8.length) {
            const tag = Object.create(null);
            [tag.tagType] = this.read(1);
            tag.dataSize = getUint8Sum(this.read(3));
            tag.timestamp = this.read(4);
            tag.streamID = this.read(3);
            tag.body = this.read(tag.dataSize);
            this.tags.push(tag);
            this.read(4);

            switch (tag.tagType) {
                case 18:
                    tag.meta = scripTag(tag.body);
                    this.flv.emit('scripTagMeta', tag.meta);
                    debug.log('scrip-tag-meta', tag.meta);
                    break;
                case 9:
                    tag.meta = videoTag(tag.body);
                    this.flv.emit('videoTagMeta', tag.meta);
                    debug.log('video-tag-meta', tag.meta);
                    break;
                case 8:
                    tag.meta = audioTag(tag.body);
                    this.flv.emit('audioTagMeta', tag.meta);
                    debug.log('audio-tag-meta', tag.meta);
                    break;
                default:
                    break;
            }

            this.flv.emit('flvParseTag', tag);
        }
    }

    read(length) {
        const tempUint8 = new Uint8Array(length);
        for (let i = 0; i < length; i += 1) {
            tempUint8[i] = this.uint8[this.index];
            this.index += 1;
        }
        return tempUint8;
    }
}
