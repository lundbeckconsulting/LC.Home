﻿"use strict";

$(function () {
    $("#burgerMenu").click(function () {
        $("#burger").fadeIn("slow");
    });

    $("#burger").click(function () {
        $("#burger").fadeOut("slow");
    });
});
