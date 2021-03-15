function setGridVisuals() {
    let val = "grid";

    val += "-" + document.getElementById("GridSize").value;
    val += "-" + document.getElementById("GridType").value;

    let tmp = document.getElementById("GridExample");
    tmp.className = "";
    tmp.classList.add(val);

    document.getElementById("GridCode").innerHTML = val;
};

setGridVisuals();
