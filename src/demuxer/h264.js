export default class H264 {
    constructor(flv) {
        this.flv = flv;
        this.AVCDecoderConfigurationRecord = {
            configurationVersion: 0,
        };
    }

    demuxer(tag) {
        const { debug } = this.flv;
        const packet = tag.body.slice(1);
        debug.error(packet.length >= 4, '[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
        const packetType = packet[0];
        const cts = 0;
        console.log(cts);
        const packetData = packet.slice(4);
        if (packetType === 0) {
            this.AVCDecoderConfigurationRecord = this.getAVCDecoderConfigurationRecord(packetData);
        } else if (packetType === 1) {
            this.getAVCVideoData(packetData);
        } else {
            debug.error(packetType === 2, `[H264] Invalid video packet type ${packetType}`);
        }
    }

    getAVCDecoderConfigurationRecord(packetData) {
        const { debug } = this.flv;
        debug.error(packetData.length >= 7, '[H264] AVCDecoderConfigurationRecord parss length is not enough');
        const AVCDecoderConfigurationRecord = {};
        [
            AVCDecoderConfigurationRecord.configurationVersion,
            AVCDecoderConfigurationRecord.avcProfileIndication,
            AVCDecoderConfigurationRecord.profile_compatibility,
            AVCDecoderConfigurationRecord.AVCLevelIndication,
        ] = packetData;
        console.log(AVCDecoderConfigurationRecord);
        return AVCDecoderConfigurationRecord;
    }

    getAVCVideoData(packet) {
        // TODO
    }
}
