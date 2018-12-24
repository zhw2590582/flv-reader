(function () {
    var $video = document.querySelector('#video');
    var $urlInput = document.querySelector('.urlInput');
    var $playBtn = document.querySelector('.playBtn');
    var $fileInput = document.querySelector('.fileInput');

    function creatPlayer(url) {
        Flv.instances.forEach(function(flv) {
            flv.destroy();
        });

        new Flv({
            mediaElement: $video,
            url: url,
            debug: true
        });
    }

    creatPlayer($urlInput.value);
    $playBtn.addEventListener('click', () => {
        creatPlayer($urlInput.value);
    });

    $fileInput.addEventListener('change', () => {
        const file = $fileInput.files[0];
        creatPlayer(file);
    });

})();