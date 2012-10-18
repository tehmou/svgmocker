define(["text!./home.html"], function (template) {

    return function (el) {
        function downloadSvg () {
            var a = document.createElement("a");
            a.href = 'data:Application/octet-stream,' + encodeURIComponent(window.droppedFile);
            a.download = "youFile.svg";
            a.click();
        }
        function viewSvg (svgText) {
            var doc = new DOMParser().parseFromString(svgText, "application/xml");
            var svg = document.importNode(doc.documentElement, true);
            var svgEl = el.querySelector("#svgContent");
            svgEl.innerHTML = "";
            svgEl.appendChild(svg);
        }
        function show () {
            el.innerHTML = template;
            el.querySelector("#viewSvg").onclick = function () { viewSvg(window.droppedFile); };
            el.querySelector("#downloadSvg").onclick = downloadSvg;
        }
        function hide () {

        }

        return {
            el: el,
            show: show,
            hide: hide
        };
    };
});