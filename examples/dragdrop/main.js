require(["./js/pager", "./js/pages", "./js/router"], function (pager, pages, router) {
    var pageController = pager(document.querySelector("#content"), pages);
    router(pageController);
});