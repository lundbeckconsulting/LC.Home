"use strict";

$(document).ready(function () {
    var $media = $("#lc-common-media");

    $media.on("resize", function (event, sizeInt, size, orientation) {});

    $("div.lc.content-details").find("div.link-wrap > input.link").click(function () {
        var $wrap = this.closest("div.lc.content-details");

        $(this).fadeOut();
        $($wrap).find("div.main-wrap").show();
    });

    $("div.lc.lcm.content-details").find("div.link-wrap > input.link").click(function () {
        $(this).removeClass("virgin");
    });
});

