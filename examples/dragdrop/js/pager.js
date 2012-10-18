define([], function () {
    return function (el, pageControllers) {
        var currentPage;
        var pages = {};

        _.each(pageControllers, function (value, key) {
            pages[key] = initPage(value)
        });

        function initPage (pageController) {
            var pageEl = document.createElement("div");
            pageEl.pageController = pageController(pageEl);
            return pageEl;
        }

        function showPage (id, data) {
            if (currentPage) {
                el.removeChild(currentPage);
                currentPage.pageController.hide();
                currentPage = undefined;
            }
            currentPage = pages[id];
            currentPage.pageController.show(data);
            el.appendChild(currentPage);
        }

        return {
            showPage: showPage,
            getPages: function () { return pages; }
        };
    };
});