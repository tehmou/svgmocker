define(["../utils", "text!./start.html"], function (utils, template) {

    return function (el) {
        function loadSvg (data) {
            window.droppedFile = data;
            utils.dispatchCustomEvent(el, "svgloaded", false, true);
        }
        function onDrop (e) {
            e.preventDefault();
            var files = e.target.files || e.dataTransfer.files;
            if (files.length !== 1) {
                alert("Please drag only one SVG file.")
            }
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function () {
                loadSvg(reader.result);
            };
            reader.readAsText(file);
        }
        function show () {
            el.innerHTML = template;
            el.addEventListener("drop", onDrop);
        }
        function hide () {
            el.removeEventListener("drop", onDrop);
        }

        return {
            el: el,
            loadSvg: loadSvg,
            show: show,
            hide: hide
        }
    };
});