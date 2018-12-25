(function () {
    var $urlInput = document.querySelector('.urlInput');
    var $loadBtn = document.querySelector('.loadBtn');
    var $binaryBody = document.querySelector('.binaryBody');
    var $range = document.querySelector('.range');
    var $state = document.querySelector('.state');
    var $index = document.querySelector('.index');
    var $decimal = document.querySelector('.decimal');
    var $ascii = document.querySelector('.ascii');
    var $jsonTree = document.querySelector('.jsonTree');
    var flvData = new Uint8Array(0);
    var lastRange = [];

    function mergeBuffer(a, b) {
        const c = new a.constructor(a.length + b.length);
        c.set(a);
        c.set(b, a.length);
        return c;
    }

    function showBinary() {
        var range = $range.value.split('-').map(Number);
        if (range[0] !== lastRange[0] && range[1] !== lastRange[1]) {
            var html = '';
            var arr = flvData.slice(range[0], range[1]);
            arr.forEach(function (item, index) {
                var asciiStr = String.fromCharCode(item);
                var hexNum = item.toString(16).toUpperCase();
                hexNum = hexNum.length === 1 ? '0' + hexNum : hexNum;
                var indexNum = range[0] + index;
                html += `<span data-index="${indexNum}" data-ascii="${asciiStr}" data-decimal="${item}">${hexNum}</span>`;
            });
            $binaryBody.innerHTML = html;
            lastRange = range;
        }
    }

    function creatPlayer(url) {
        flvData = new Uint8Array(0);
        lastRange = [];
        Flv.instances.forEach(function (flv) {
            flv.destroy();
        });

        var flv = new Flv({
            mediaElement: document.createElement('video'),
            url: url,
        });

        flv.on('flvFetching', function (uint8) {
            flvData = mergeBuffer(flvData, uint8);
            $state.innerHTML = `Loading[${flvData.length}]`;
            showBinary();
            if (flvData.length > 10000) {
                var selectNum = flvData.length / 10000;
                var selectArr = [];
                for (let index = 0; index < selectNum; index++) {
                    selectArr.push([10000 * index, 10000 * (index + 1)]);
                }
    
                var html = '';
                selectArr.forEach(item => {
                    html += `<option value="${item[0]}-${item[1]}">${item[0]} ~ ${item[1]}</option>`
                });
                $range.innerHTML = html;
            }
        });

        $jsonTree.innerHTML = '';
        flv.on('scripTagMeta', function (meta) {
            jsonTree.create(meta.amf2.metaData, $jsonTree).expand(function (node) {
                return node.childNodes.length < 10;
            });
        });

        flv.on('flvFetchEnd', function () {
            $state.innerHTML = `complete[${flvData.length}]`;
        });
    }

    creatPlayer($urlInput.value);
    $loadBtn.addEventListener('click', () => {
        creatPlayer($urlInput.value);
    });

    $range.addEventListener('change', () => {
        showBinary();
    });

    $binaryBody.addEventListener('click', event => {
        var target = event.target;
        $index.innerHTML = target.dataset.index;
        $decimal.innerHTML = target.dataset.decimal;
        $ascii.innerHTML = target.dataset.ascii;
    });
})();
