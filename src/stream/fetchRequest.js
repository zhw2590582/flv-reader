export default function fetchRequest(flv, url) {
    flv.emit('flvFetchStart');
    fetch(url).then(response => {
        const reader = response.body.getReader();

        flv.on('destroy', () => {
            reader.cancel();
        });

        flv.on('streamCancel', () => {
            reader.cancel();
        });

        (function read() {
            reader
                .read()
                .then(({ done, value }) => {
                    if (done) {
                        flv.emit('flvFetchEnd');
                        return;
                    }
                    flv.emit('flvFetching', new Uint8Array(value));
                    read();
                })
                .catch(error => {
                    throw error;
                });
        })();
    });
}
