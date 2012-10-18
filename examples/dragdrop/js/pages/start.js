define(["../utils", "text!./start.html"], function (utils, template) {

    return function (el) {
        function loadSvg (data) {
            utils.dispatchCustomEvent(el, "svgloaded", false, true, data);
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
        function show (data) {
            el.innerHTML = template;
            el.addEventListener("drop", onDrop);
        }
        function hide () {
            el.removeEventListener("drop", onDrop);
        }

        return {
            loadSvg: loadSvg,
            show: show,
            hide: hide
        }
    };
});