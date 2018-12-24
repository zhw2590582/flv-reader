export default function readFile(flv, file) {
    flv.emit('flvFetchStart');
    const { proxy } = flv.events;
    const reader = new FileReader();
    proxy(reader, 'load', e => {
        const buffer = e.target.result;
        flv.emit('flvFetchEnd', new Uint8Array(buffer));
    });
    reader.readAsArrayBuffer(file);
}
