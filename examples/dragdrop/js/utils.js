define([], function () {
    function dispatchCustomEvent(el, eventType, canItBubble, IsItCancelable, detailAboutEvent) {
        el = el || document;
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(eventType, false, false, detailAboutEvent);
        el.dispatchEvent(evt);
    }

    return {
        dispatchCustomEvent: dispatchCustomEvent
    };
});
