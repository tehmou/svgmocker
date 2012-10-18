define(["text!./svgSlideView.html"], function (template) {

    return function (el) {

        function show(data) {
            el.innerHTML = template;
        }
        function hide() {

        }

        return {
            show: show,
            hide: hide
        }
    };
});