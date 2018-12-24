(function() {
    var $video = document.querySelector('#video');
    var $urlInput = document.querySelector('.urlInput');
    var $playBtn = document.querySelector('.playBtn');
    var $fileInput = document.querySelector('.fileInput');
    var $jsonTree = document.querySelector('.jsonTree');

    function creatPlayer(url) {
        Flv.instances.forEach(function(flv) {
            flv.destroy();
        });

        var flv = new Flv({
            mediaElement: $video,
            url: url,
            debug: true,
        });

        $jsonTree.innerHTML = '';
        flv.on('scripTagMeta', function(meta) {
            jsonTree.create(meta.amf2.metaData, $jsonTree).expand(function(node) {
                return node.childNodes.length < 10;
             });
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
