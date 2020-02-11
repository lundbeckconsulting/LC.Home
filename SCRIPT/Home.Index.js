let touchSupported = (("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

if (touchSupported) {
    $(window)
        .bind("touchmove", function (e) {
            parallax(e.currentTarget.scrollY);
        });
}

$(window)
    .bind("scroll", function (e) {
        parallax($(this).scrollTop());
    });

const parallax = (scrollTop, speed = 0.48) => {
    $(".parallax-bg").each(function () {
        if (scrollTop !== 0) {
            scrollTop = scrollTop * speed;
        }

        $(this).css({ "background-position-y": -Math.abs(scrollTop) });
    });
}