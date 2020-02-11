$(".download-wrap").find("a.assets-link.read").click(function () {
    $("#cvBackground").fadeIn("slow", function () {
        $("#CV").fadeIn("fast");
    });

    $("#cvBackground").click(function () {
        closeCV();
    });

    $("#CV").find(".close-cv").click(function () {
        closeCV();
    });

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            closeCV();
        }
    };

    function closeCV() {
        $("#CV").fadeOut("fast", function () {
            $("#cvBackground").fadeOut("fast");
        });
    }
});