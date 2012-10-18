define(["text!./home.html"], function (template) {

    function createSvg (svgText) {
        var doc = new DOMParser().parseFromString(svgText, "application/xml");
        return document.importNode(doc.documentElement, true);
    }

    function downloadSvg (svgText) {
        var a = document.createElement("a");
        a.href = 'data:Application/octet-stream,' + encodeURIComponent(svgText);
        a.download = "yourFile.svg";
        a.click();
    }

    return function (el) {
        var svgText;

        function onDownloadSvg () {
            downloadSvg(svgText);
        }
        function onViewSvg () {
            var svg = createSvg(svgText);
            var svgEl = el.querySelector("#svgContent");
            svgEl.innerHTML = "";
            svgEl.appendChild(svg);
        }
        function show (data) {
            svgText = data;
            el.innerHTML = template;
            el.querySelector("#viewSvg").onclick = onViewSvg;
            el.querySelector("#downloadSvg").onclick = onDownloadSvg;
        }
        function hide () {

        }

        return {
            show: show,
            hide: hide
        };
    };
});