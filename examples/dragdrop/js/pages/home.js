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
        function create () {
            el.innerHTML = template;
            el.querySelector("#viewSvg").onclick = function () { viewSvg(window.droppedFile); };
            el.querySelector("#downloadSvg").onclick = downloadSvg;
        }
        function destroy () {

        }

        return {
            el: el,
            create: create,
            destroy: destroy
        };
    };
});