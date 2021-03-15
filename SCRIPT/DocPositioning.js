function setPosVisuals() {
    let val = "pos";

    val += "-" + document.getElementById("PosSelect").value;
    val += "-" + document.getElementById("PlcSelect").value;

    let tmp = document.querySelector("#PosDemoWrap > .demo-container > .item");
    tmp.className = "";
    tmp.classList.add("item");
    tmp.classList.add(val);
};

setPosVisuals();
