function setPadMargVisuals() {
    let val = document.getElementById("PadMargType").value;   

    val += "-" + document.getElementById("PadMargSize").value;

    let dir = document.getElementById("PadMargDir").value;

    if (dir !== "[none]") {
        val += "-" + dir;
    }

    let tmp = document.getElementById("PadMargDemo");
    tmp.className = "";
    tmp.classList.add(val);

    document.getElementById("PadMargCode").innerHTML = val;
};

setPadMargVisuals();
