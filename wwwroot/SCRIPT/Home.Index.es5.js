"use strict";

var touchSupported = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch;

if (touchSupported) {
    $(window).bind("touchmove", function (e) {
        parallax(e.currentTarget.scrollY);
    });
}

$(window).bind("scroll", function (e) {
    parallax($(this).scrollTop());
});

var parallax = function parallax(scrollTop) {
    var speed = arguments.length <= 1 || arguments[1] === undefined ? 0.65 : arguments[1];

    $(".parallax-bg").each(function () {
        if (scrollTop !== 0) {
            scrollTop = scrollTop * speed;
        }

        $(this).css({ "background-position-y": scrollTop });
    });
};

