define(["../utils", "text!./start.html"], function (utils, template) {

    return function (el) {
        function setData (data) {
            window.droppedFile = data;
            utils.dispatchCustomEvent(el, "pagechange", false, true, { page: "home" });
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
                setData(reader.result);
            };
            reader.readAsText(file);
        }
        function create () {
            el.innerHTML = template;
            el.addEventListener("drop", onDrop);
        }
        function destroy () {
            el.removeEventListener("drop", onDrop);
        }

        return {
            el: el,
            setData: setData,
            create: create,
            destroy: destroy
        }
    };
});