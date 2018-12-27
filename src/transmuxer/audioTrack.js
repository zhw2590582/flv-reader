import { errorHandle, download } from '../utils';
import { mergeBuffer } from '../utils/buffer';

export default class AudioTrack {
    constructor(flv) {
        this.flv = flv;
        this.soundFormat = '';
        this.audioBuffers = new Uint8Array(0);
        this.AudioSpecificConfig = {
            audioObjectType: 0,
            samplingFrequencyIndex: 0,
            channelConfiguration: 0,
        };
    }

    static get AAC_SAMPLE_RATES() {
        return [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
    }

    static get AAC_CHANNELS() {
        return [0, 1, 2, 3, 4, 5, 6, 8];
    }

    get codec() {
        return `mp4a.40.${this.AudioSpecificConfig.audioObjectType}`;
    }

    muxer(tag) {
        const { debug } = this.flv;
        const { soundFormat } = tag.meta;
        const packet = tag.body.slice(1);
        if (soundFormat === 10) {
            this.soundFormat = 'aac';
            const packetType = packet[0];
            const packetData = packet.slice(1);
            if (packetType === 0) {
                this.AudioSpecificConfig = AudioTrack.getAudioSpecificConfig(packetData);
                this.flv.emit('AudioSpecificConfig', this.AudioSpecificConfig);
                debug.log('audio-specific-config', this.AudioSpecificConfig);
            } else {
                const ADTSLen = tag.dataSize - 2 + 7;
                const ADTSHeader = this.getADTSHeader(ADTSLen);
                const ADTSBody = tag.body.slice(2);
                const ADTSFrame = mergeBuffer(ADTSHeader, ADTSBody);
                this.flv.emit('addAudioBuffer', ADTSFrame);
                this.audioBuffers = mergeBuffer(this.audioBuffers, ADTSFrame);
            }
        } else if (soundFormat === 2) {
            this.soundFormat = 'mp3';
            this.flv.emit('addAudioBuffer', packet);
            this.audioBuffers = mergeBuffer(this.audioBuffers, packet);
        } else {
            debug.warn('unsupported-audio-format', soundFormat);
        }
    }

    static getAudioSpecificConfig(packetData) {
        errorHandle(packetData.length >= 2, 'AudioSpecificConfig parss length is not enough');
        const AudioSpecificConfig = {};
        AudioSpecificConfig.audioObjectType = (packetData[0] & 0xf8) >> 3;
        const rateIndex = ((packetData[0] & 7) << 1) + (((packetData[1] & 0x80) >> 7) & 1);
        AudioSpecificConfig.samplingFrequencyIndex = AudioTrack.AAC_SAMPLE_RATES[rateIndex] || null;
        const channelsIndex = (packetData[1] & 0x7f) >> 3;
        AudioSpecificConfig.channelConfiguration = AudioTrack.AAC_CHANNELS[channelsIndex] || null;
        return AudioSpecificConfig;
    }

    getADTSHeader(ADTSLen) {
        const { audioObjectType, samplingFrequencyIndex, channelConfiguration } = this.AudioSpecificConfig;
        const ADTSHeader = new Uint8Array(7);
        ADTSHeader[0] = 0xff;
        ADTSHeader[1] = 0xf0;
        ADTSHeader[1] |= 0 << 3;
        ADTSHeader[1] |= 0 << 1;
        ADTSHeader[1] |= 1;
        ADTSHeader[2] = (audioObjectType - 1) << 6;
        ADTSHeader[2] |= (samplingFrequencyIndex & 0x0f) << 2;
        ADTSHeader[2] |= 0 << 1;
        ADTSHeader[2] |= (channelConfiguration & 0x04) >> 2;
        ADTSHeader[3] = (channelConfiguration & 0x03) << 6;
        ADTSHeader[3] |= 0 << 5;
        ADTSHeader[3] |= 0 << 4;
        ADTSHeader[3] |= 0 << 3;
        ADTSHeader[3] |= 0 << 2;
        ADTSHeader[3] |= (ADTSLen & 0x1800) >> 11;
        ADTSHeader[4] = (ADTSLen & 0x7f8) >> 3;
        ADTSHeader[5] = (ADTSLen & 0x7) << 5;
        ADTSHeader[5] |= 0x1f;
        ADTSHeader[6] = 0xfc;
        return ADTSHeader;
    }

    download() {
        const url = URL.createObjectURL(
            new Blob([this.audioBuffers], {
                type: `audio/${this.soundFormat}`,
            }),
        );
        download(url, `audioTrack.${this.soundFormat}`);
    }
}
