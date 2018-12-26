import { errorHandle } from '../utils';
import { mergeBuffer, readBufferSum, readString } from '../utils/buffer';
import scripTag from './scripTag';
import videoTag from './videoTag';
import audioTag from './audioTag';

export default class Parse {
    constructor(flv) {
        this.flv = flv;
        const {
            options: { url },
            debug,
        } = flv;
        this.uint8 = new Uint8Array(0);
        this.index = 0;
        this.header = null;
        this.tags = [];
        this.done = false;

        flv.on('flvFetchStart', () => {
            debug.log('flv-fetch-start', url);
        });

        flv.on('flvFetching', uint8 => {
            this.uint8 = mergeBuffer(this.uint8, uint8);
            this.parse();
        });

        flv.on('flvFetchEnd', uint8 => {
            debug.log('flv-fetch-end');
            if (uint8) {
                this.uint8 = uint8;
                this.index = 0;
                this.header = null;
                this.scripTag = null;
                this.tags = [];
                this.parse();
            }
            this.done = true;
            flv.emit('flvParseDone');
            debug.log('flv-parse-done');
        });
    }

    parse() {
        const { debug } = this.flv;
        if (!this.header) {
            const header = Object.create(null);
            header.signature = readString(this.read(3));
            [header.version] = this.read(1);
            errorHandle(header.signature === 'FLV' && header.version === 1, 'FLV header not found');
            [header.flags] = this.read(1);
            header.headersize = readBufferSum(this.read(4));
            this.header = header;
            this.read(4);
            this.flv.emit('flvParseHeader', this.header);
            debug.log('flv-parse-header', this.header);
        }

        while (this.index < this.uint8.length) {
            const tag = Object.create(null);
            const startIndex = this.index;
            [tag.tagType] = this.read(1);
            tag.dataSize = readBufferSum(this.read(3));
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
                    break;
                case 8:
                    tag.meta = audioTag(tag.body);
                    this.flv.emit('audioTagMeta', tag.meta);
                    break;
                default:
                    break;
            }

            this.flv.emit('flvParseTag', tag, startIndex, this.index);
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
