import { readBuffer, readBufferSum, decimalToHex } from '../../utils/buffer';

export default class H264 {
    constructor(flv, tag, requestHeader) {
        this.flv = flv;

        this.AVCDecoderConfigurationRecord = {
            configurationVersion: 0,
            AVCProfileIndication: 0,
            profile_compatibility: 0,
            AVCLevelIndication: 0,
            lengthSizeMinusOne: 0,
            numOfSequenceParameterSets: 0,
            sequenceParameterSetLength: 0,
            sequenceParameterSetNALUnit: {},
            numOfPictureParameterSets: 0,
            pictureParameterSetLength: 0,
            pictureParameterSetNALUnit: {},
        };

        const { debug } = this.flv;
        const packet = tag.body.slice(1);
        debug.error(packet.length >= 4, '[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime');

        const view = new DataView(packet.buffer);
        const packetType = view.getUint8(0);
        const cts = ((view.getUint32(0) & 0x00ffffff) << 8) >> 8;

        const packetData = packet.slice(4);

        if (packetType === 0) {
            this.AVCDecoderConfigurationRecord = this.getAVCDecoderConfigurationRecord(packetData);
            this.flv.emit('AVCDecoderConfigurationRecord', this.AVCDecoderConfigurationRecord);
            debug.log('avc-decoder-configuration-record', this.AVCDecoderConfigurationRecord);
        } else if (packetType === 1) {
            this.getAVCVideoData(packetData, cts);
        } else {
            debug.error(packetType === 2, `[H264] Invalid video packet type ${packetType}`);
        }
    }

    getAVCDecoderConfigurationRecord(packetData) {
        const { debug } = this.flv;
        console.log(decimalToHex(packetData));
        debug.error(packetData.length >= 7, '[H264] AVCDecoderConfigurationRecord parse length is not enough');
        const readDcr = readBuffer(packetData);
        const result = {};
        [result.configurationVersion] = readDcr(1);
        [result.AVCProfileIndication] = readDcr(1);
        [result.profile_compatibility] = readDcr(1);
        [result.AVCLevelIndication] = readDcr(1);
        result.lengthSizeMinusOne = (readDcr(1)[0] & 3) + 1;
        result.numOfSequenceParameterSets = readDcr(1)[0] & 31;
        for (let index = 0; index < result.numOfSequenceParameterSets; index += 1) {
            result.sequenceParameterSetLength = readBufferSum(readDcr(2));
            if (result.sequenceParameterSetLength > 0) {
                const sequenceParameterSetNALUnit = readDcr(result.sequenceParameterSetLength);
                if (index === 0) {
                    result.sequenceParameterSetNALUnit = this.getSPS(sequenceParameterSetNALUnit);
                }
            }
        }

        [result.numOfPictureParameterSets] = readDcr(1);
        for (let index = 0; index < result.numOfPictureParameterSets; index += 1) {
            result.pictureParameterSetLength = readBufferSum(readDcr(2));
            if (result.pictureParameterSetLength > 0) {
                const pictureParameterSetNALUnit = readDcr(result.pictureParameterSetLength);
                if (index === 0) {
                    result.pictureParameterSetNALUnit = pictureParameterSetNALUnit;
                }
            }
        }

        debug.error(
            result.configurationVersion === 1,
            `[H264] Invalid configurationVersion: ${result.configurationVersion}`,
        );

        debug.error(
            result.AVCProfileIndication !== 0,
            `[H264] Invalid AVCProfileIndication: ${result.AVCProfileIndication}`,
        );

        debug.error(
            result.lengthSizeMinusOne === 4 || result.lengthSizeMinusOne !== 3,
            `[H264] Invalid lengthSizeMinusOne: ${result.lengthSizeMinusOne}`,
        );

        debug.error(
            result.numOfSequenceParameterSets !== 0,
            `[H264] Invalid numOfSequenceParameterSets: ${result.numOfSequenceParameterSets}`,
        );

        debug.warn(
            result.numOfSequenceParameterSets === 1,
            `[H264] Strange numOfSequenceParameterSets: ${result.numOfSequenceParameterSets}`,
        );

        debug.error(
            result.numOfPictureParameterSets !== 0,
            `[H264] Invalid numOfPictureParameterSets: ${result.numOfPictureParameterSets}`,
        );

        debug.warn(
            result.numOfPictureParameterSets === 1,
            `[H264] Strange numOfPictureParameterSets: ${result.numOfPictureParameterSets}`,
        );

        return result;
    }

    getSPS(uint8) {
        console.log(uint8);
    }

    getAVCVideoData(packet) {
        // TODO
    }
}
