define(["text!./svgSlideView.html"], function (template) {

    return function (el) {

        function show(data) {
            el.innerHTML = template;
            var i = 0;
            _.each(data, function (slide) {
                el.appendChild(slide.el);
                slide.el.className = "slide";
                slide.el.style.left = i*50 + "px";
                slide.el.style.top = i*50 + "px";
                i++;
            });
        }
        function hide() {

        }

        return {
            show: show,
            hide: hide
        }
    };
});