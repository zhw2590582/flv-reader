(function() {
    var $video = document.querySelector('#video');
    var $urlInput = document.querySelector('.urlInput');
    var $playBtn = document.querySelector('.playBtn');
    var $fileInput = document.querySelector('.fileInput');
    var $audioBtn = document.querySelector('.audioBtn');

    if (!location.port.trim()) {
        consola.creat({
            target: '.console',
            size: '100%',
            zIndex: 99,
        });
        
        console.info('Welcome, if you like it, consider star it, thank you.');
        console.info('https://github.com/zhw2590582/flv-reader');

        window.addEventListener('error', function(err) {
            console.error(err.message);
        });
    }

    function creatPlayer(url) {
        FlvReader.instances.forEach(function(flv) {
            flv.destroy();
        });

        var flv = new FlvReader({
            mediaElement: $video,
            url: url,
            debug: true,
        });
    }

    creatPlayer($urlInput.value);
    $playBtn.addEventListener('click', function () {  
        creatPlayer($urlInput.value);
    });

    $fileInput.addEventListener('change', function () {
        const file = $fileInput.files[0];
        creatPlayer(file);
    });

    $audioBtn.addEventListener('click', function () {  
        FlvReader.instances[0].demuxer.audioTrack.download();
    });
})();
