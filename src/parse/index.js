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

        flv.on('streamStart', () => {
            debug.log('stream-start', url);
        });

        flv.on('streaming', uint8 => {
            this.uint8 = mergeBuffer(this.uint8, uint8);
            this.parse();
        });

        flv.on('streamEnd', uint8 => {
            debug.log('stream-end');
            if (uint8) {
                this.uint8 = uint8;
                this.index = 0;
                this.header = null;
                this.scripTag = null;
                this.tags = [];
                this.parse();
            }

            this.flv.loaded = true;
            flv.emit('parseDone');
            debug.log('parse-done');
        });
    }

    parse() {
        const { debug } = this.flv;
        if (!this.header && this.readable(13)) {
            const header = Object.create(null);
            header.signature = readString(this.read(3));
            [header.version] = this.read(1);
            errorHandle(header.signature === 'FLV' && header.version === 1, 'FLV header not found');
            [header.flags] = this.read(1);
            header.headersize = readBufferSum(this.read(4));
            this.header = header;
            this.read(4);
            this.flv.emit('parseHeader', this.header);
            debug.log('parse-header', this.header);
        }

        while (this.index < this.uint8.length) {
            const restIndex = this.index;
            const tag = Object.create(null);

            if (this.readable(11)) {
                [tag.tagType] = this.read(1);
                tag.dataSize = readBufferSum(this.read(3));
                tag.timestamp = this.read(4);
                tag.streamID = this.read(3);
            } else {
                this.index = restIndex;
                break;
            }

            if (this.readable(tag.dataSize)) {
                tag.body = this.read(tag.dataSize);
            } else {
                this.index = restIndex;
                break;
            }

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
                    debug.warn('unknown-tag-type', tag.tagType);
                    break;
            }

            this.read(4);
            this.tags.push(tag);
            this.flv.emit('parseTag', tag);
        }
    }

    readable(length) {
        return this.uint8.length - this.index >= length;
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
