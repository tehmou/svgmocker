require(["./js/pages", "text!./img/3dprinting.svg"], function (pages, sampleSvg) {

    var pageController = (function (el, pages) {
        var currentPage;

        function onPageChange (e) {
            showPage(e.detail.page);
        }

        function showPage (id) {
            if (currentPage) {
                el.removeChild(currentPage);
                currentPage.removeEventListener("pageChange", onPageChange);
                currentPage.pageController.destroy();
                currentPage = undefined;
            }
            currentPage = document.createElement("div");
            currentPage.addEventListener("pagechange", onPageChange);
            currentPage.pageController = pages[id](currentPage, pageController);
            currentPage.pageController.create();
            el.appendChild(currentPage);
        }

        document.body.querySelector("#useSampleSvg").onclick = function () {
            currentPage.pageController.setData(sampleSvg);
        };

        return {
            showPage: showPage
        };
    })(document.querySelector("#content"), pages);

    pageController.showPage("start");
});