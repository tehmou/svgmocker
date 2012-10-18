define(["text!../img/3dprinting.svg"], function (svg) {

    return function (pager) {
        var pages = pager.getPages();

        document.body.querySelector("#useSampleSvg").onclick = function () {
            pages.start.pageController.loadSvg(svg);
        };

        pages.start.addEventListener("svgloaded", function (e) {
            var data = e.detail;
            pager.showPage("home", data);
        });

        pager.showPage("start");
    };

});