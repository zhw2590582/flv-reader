import FlvError from './error';

export default function checkSupport({ options }) {
    const MP4H264MimeCodec = 'video/mp4; codecs="avc1.42001E, mp4a.40.2"';
    const canPlay = options.mediaElement.canPlayType(MP4H264MimeCodec);

    if (
        !window.MediaSource ||
        !window.MediaSource.isTypeSupported(MP4H264MimeCodec) ||
        (canPlay !== 'probably' && canPlay !== 'maybe')
    ) {
        throw new FlvError(`Unsupported MIME type or codec: ${MP4H264MimeCodec}`);
    }

    if (typeof window.Promise !== 'function') {
        throw new FlvError("Unsupported 'Promise' method");
    }

    if (typeof window.fetch !== 'function') {
        throw new FlvError("Unsupported 'fetch' method");
    }
}
