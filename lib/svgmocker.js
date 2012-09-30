(function (exports) {

    var svgns = "http://www.w3.org/2000/svg";
    var xlinkns = "http://www.w3.org/1999/xlink";

    function filterById (regExString) {
        var regExp = new RegExp(regExString);
        return function () {
            var result = !!regExp.exec(this.id);
            console.log("Filtering '" + this.id + "' with regexp '" + regExString + "' resulted in '" + result + "'");
            return result;
        }
    }

    function findSlides (svg, nameRegEx) {
        console.log("Find slides for " + svg.id);
        return d3.select(svg).selectAll("g").filter(filterById(nameRegEx));
    }

    function findSlideShape (g) {
        console.log("Find shape for " + g.id);
        return d3.select(g).selectAll("rect").filter(filterById("^shape")).node();
    }

    function getSvgValue (animatedLength) {
        return animatedLength.baseVal.value;
    }

    function calculateReverseTransform (rect) {
        return "matrix(1 0 0 1 " + -getSvgValue(rect.x) + " " + -getSvgValue(rect.y) + ")";
    }

    function createSlideSvgFromGroup (g, shape) {
        console.log("Create slide for " + g.id);
        var svg = document.createElementNS(svgns, "svg");
        g.setAttribute("transform", calculateReverseTransform(shape));
        svg.appendChild(g);
        return svg;
    }

    function extractSlide (g) {
        var shape = findSlideShape(g);
        if (!shape) {
            throw "No shape defined for " + g.id;
        }
        var slideWidth = getSvgValue(shape.width);
        var slideHeight = getSvgValue(shape.height);
        var slideSvg = createSlideSvgFromGroup(g, shape);
        var el = document.createElement("div");

        el.style.width = slideWidth + "px";
        el.style.height = slideHeight + "px";
        el.appendChild(slideSvg);
        shape.style.opacity = 0;

        return {
            width: slideWidth,
            height: slideHeight,
            svg: slideSvg,
            el: el
        };
    }

    function findAndCreateSlides (svg, nameRegEx) {
        nameRegEx = nameRegEx || "^slide";
        var slides = [];
        findSlides(svg, nameRegEx).each(function () {
            slides.push(extractSlide(this));
        });
        return slides;
    }

    exports.svgns = svgns;
    exports.xlinkns = xlinkns;
    exports.findAndCreateSlides = findAndCreateSlides;

})(window.svgmocker = {});