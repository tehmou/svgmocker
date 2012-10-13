require(["./js/pages/start"], function () {
    function $ (query) {
        return document.body.querySelector(query);
    }

    var screenController = (function (el) {
        var currentScreen;
        var screens;

        function setScreens (value) {
            screens = value;
        }
        function showScreen (id) {
            if (currentScreen) {
                currentScreen.hide();
                currentScreen = undefined;
            }
            currentScreen = screens[id](document.body);
            currentScreen.show();
        }

        return {
            setScreens: setScreens,
            showScreen: showScreen
        };
    })($("#content"));

    var screens = (function (screenController) {
        var droppedFile;

        return {
            start: function (el) {
                var template = $("#startScreenTemplate").innerHTML;
                function onDrop (e) {
                    e.preventDefault();
                    var files = e.target.files || e.dataTransfer.files;
                    if (files.length !== 1) {
                        alert("Please drag only one SVG file.")
                    }
                    var file = files[0];
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        droppedFile = reader.result;
                        screenController.showScreen("controls");
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
                    show: show,
                    hide: hide
                }
            },
            controls: function (el) {
                var template = $("#controlsScreenTemplate").innerHTML;

                function downloadSvg () {
                    var a = document.createElement("a");
                    a.href = 'data:Application/octet-stream,' + encodeURIComponent(droppedFile);
                    a.download = "youFile.svg";
                    a.click();
                }
                function viewSvg (svgText) {
                    var doc = new DOMParser().parseFromString(svgText, "application/xml");
                    var svg = document.importNode(doc.documentElement, true);
                    var svgEl = el.querySelector("#svgContent");
                    svgEl.innerHTML = "";
                    svgEl.appendChild(svg);
                }
                function show () {
                    el.innerHTML = template;
                    el.querySelector("#viewSvg").onclick = function () { viewSvg(droppedFile); };
                    el.querySelector("#downloadSvg").onclick = downloadSvg;
                }
                function hide () {

                }

                return {
                    show: show,
                    hide: hide
                };
            }
        };
    })(screenController);

    screenController.setScreens(screens);
    screenController.showScreen("start");
});