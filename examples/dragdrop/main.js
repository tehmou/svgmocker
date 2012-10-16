require(["./js/pages", "text!./img/3dprinting.svg"], function (pages, sampleSvg) {

    var pageController = (function (el, pages) {
        var currentPage;

        function onPageChange (e) {
            showPage(e.detail.page);
        }

        function showPage (id) {
            if (currentPage) {
                el.removeChild(currentPage.el);
                currentPage.el.removeEventListener("pageChange", onPageChange);
                currentPage.destroy();
                currentPage = undefined;
            }
            var pageEl = document.createElement("div");
            pageEl.addEventListener("pagechange", onPageChange);
            currentPage = pages[id](pageEl, pageController);
            currentPage.create();
            el.appendChild(pageEl);
        }

        document.body.querySelector("#useSampleSvg").onclick = function () {
            currentPage.setData(sampleSvg);
        };

        return {
            showPage: showPage
        };
    })(document.querySelector("#content"), pages);

    pageController.showPage("start");
});