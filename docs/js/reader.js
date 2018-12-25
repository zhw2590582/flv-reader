(function() {
    var $urlInput = document.querySelector('.urlInput');
    var $loadBtn = document.querySelector('.loadBtn');
    var $binaryBody = document.querySelector('.binaryBody');
    var $state = document.querySelector('.state');
    var $index = document.querySelector('.index');
    var $decimal = document.querySelector('.decimal');
    var $ascii = document.querySelector('.ascii');
    var $jsonTree = document.querySelector('.jsonTree');
    var allData = new Uint8Array(0);
    var loadIndex = 0;

    console.info('For more information please print: Flv.instances[0]')

    function mergeBuffer(a, b) {
        const c = new a.constructor(a.length + b.length);
        c.set(a);
        c.set(b, a.length);
        return c;
    }

    function showBinary(arr) {
        if (loadIndex !== 0) return;
        var html = '';
        arr.forEach(function(item, index) {
            html +=
                '<span data-ascii="' +
                String.fromCharCode(item) +
                '" data-decimal="' +
                item +
                '" data-index="' +
                (loadIndex + index) +
                '">' +
                item.toString(16).toUpperCase() +
                '</span>';
        });
        $binaryBody.insertAdjacentHTML('beforeend', html);
        loadIndex += arr.length;
    }

    function creatPlayer(url) {
        allData = new Uint8Array(0);
        loadIndex = 0;
        Flv.instances.forEach(function(flv) {
            flv.destroy();
        });

        var flv = new Flv({
            mediaElement: document.createElement('video'),
            url: url,
        });

        $binaryBody.innerHTML = '';
        flv.on('flvFetching', function(uint8) {
            allData = mergeBuffer(allData, uint8);
            showBinary(allData.slice(0, 16000));
        });

        $jsonTree.innerHTML = '';
        $state.innerHTML = 'Loading...';
        flv.on('scripTagMeta', function(meta) {
            jsonTree.create(meta.amf2.metaData, $jsonTree).expand(function(node) {
                return node.childNodes.length < 10;
            });
        });

        flv.on('flvFetchEnd', function(uint8) {
            $state.innerHTML = 'complete';
        });
    }

    creatPlayer($urlInput.value);
    $loadBtn.addEventListener('click', () => {
        creatPlayer($urlInput.value);
    });

    $binaryBody.addEventListener('click', event => {
        var target = event.target;
        $index.innerHTML = target.dataset.index;
        $decimal.innerHTML = target.dataset.decimal;
        $ascii.innerHTML = target.dataset.ascii;
    });
})();
