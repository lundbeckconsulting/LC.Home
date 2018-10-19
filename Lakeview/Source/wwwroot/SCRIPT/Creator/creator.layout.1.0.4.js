"use strict";

$(document).ready(function () {
    var resizeTimer;
    var $media = $("#lc-media");
    var $mediaOrientation = $("#lc-media-orientation");

    (function Init() {
        InitRows();
        InitMedia();
    })();

    $(window).on('resize', function (e) {
        HandleResize();
    });

    function InitMedia() {
        $media.data("base", $media.css("z-index"));
        $mediaOrientation.data("base", $media.css("z-index"));

        HandleResize(true);
    };

    function InitRows() {
        $.each($(".row"), function (i) {
            var $row = $(this);
            var $cols = $row.find("div[class^='col']");
            var $container = $("<div></div>").attr("row-id", i).addClass("row-container");

            $row.attr("id", i);

            $cols.each(function (ii) {
                var $col = $(this);

                $($col).addClass("r");

                $col.attr("id", ii);
                $col.attr("row", i);

                if (!$col.hasClass("col")) {
                    $($col).detach();
                    $($col).appendTo($container);
                }
            });

            $row.after($container);
        });
    };

    function HandleResize() {
        var forceTrigger = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            var runTrigger = false;

            if ($media.data("base") !== $media.css("z-index")) {
                $media.data("base", $media.css("z-index"));

                runTrigger = true;
            }

            if ($mediaOrientation.data("base") !== $mediaOrientation.css("z-index")) {
                $mediaOrientation.data("base", $mediaOrientation.css("z-index"));

                runTrigger = true;
            }

            if (runTrigger || forceTrigger) {
                var sizeInt = $media.css("z-index");
                var size = "xs";
                var orientation = "landscape";

                switch (parseInt($media.css("z-index"))) {
                    case 1:
                        size = "sm";
                        break;

                    case 2:
                        size = "md";
                        break;

                    case 3:
                        size = "lg";
                        break;

                    case 4:
                        size = "xl";
                        break;
                }

                switch ($mediaOrientation.css("z-index")) {
                    case 1:
                        orientation = "portrait";
                        break;

                    case 2:
                        orientation = "landscape";
                        break;
                }

                HandleRows(size);

                $media.trigger("resize", [sizeInt, size, orientation]);
            }
        }, 250);
    }

    function HandleRows(size) {
        $.each($(".row"), function (index) {
            var $row = $(this);
            var rowId = parseInt($row.attr("id"));
            var sizeList = [],
                downSizeList = [];

            switch (size.toUpperCase()) {
                case "XS":
                    sizeList = ["XS"];
                    downSizeList = ["SM", "MD", "LG", "XL"];
                    break;

                case "SM":
                    sizeList = ["XS", "SM"];
                    downSizeList = ["MD", "LG", "XL"];
                    break;

                case "MD":
                    sizeList = ["XS", "SM", "MD"];
                    downSizeList = ["LG", "XL"];
                    break;

                case "LG":
                    sizeList = ["XS", "SM", "MD", "LG"];
                    downSizeList = ["XL"];
                    break;

                case "XL":
                    sizeList = ["XS", "SM", "MD", "LG", "XL"];
                    break;
            }

            $.each(downSizeList, function (i, val) {
                $.each($row.find("div[class^='col-" + val.toLowerCase() + "']"), function (ii) {
                    var $col = $(this);
                    var $container = $("div.row-container[row-id='" + rowId + "']");

                    $col.addClass("r");

                    $col.detach();
                    $container.append($col);
                });
            });

            $.each(sizeList, function (i, val) {
                $.each($("div.row-container"), function (i) {
                    var $container = $(this);
                    var $r = $(".row[id='" + $container.attr("row-id") + "']");

                    console.log({ row: $row, r: $r });

                    $.each($container.find("div[class^='col-" + val.toLowerCase() + "']"), function (ii) {
                        var $col = $(this);

                        $col.removeClass("r");

                        $col.detach();
                        $r.append($col);
                    });
                });
            });

            ReorderRow(rowId);
        });

        function ReorderRow(id) {
            $(".row[id='" + id + "'] div[class^='col']").sort(function (a, b) {
                a = Number($(a).attr("id"));
                b = Number($(b).attr("id"));

                return a - b;
            }).appendTo(".row[id='" + id + "']");
        }
    }
});

