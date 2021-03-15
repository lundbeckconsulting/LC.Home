function openDialog() {
    let dialog = document.getElementById("TheMainDialog");

}


	

﻿function setVisuals() {
    let val = "flex";

    val += "-" + document.getElementById("SelectJustify").value;
    val += "-" + document.getElementById("SelectAlign").value;

    let tmp = document.getElementById("VisualsWrap");
    tmp.className = "";
    tmp.classList.add(val);

    document.getElementById("VisualsCode").innerHTML = val;
};

setVisuals();


	

﻿function setGridVisuals() {
    let val = "grid";

    val += "-" + document.getElementById("GridSize").value;
    val += "-" + document.getElementById("GridType").value;

    let tmp = document.getElementById("GridExample");
    tmp.className = "";
    tmp.classList.add(val);

    document.getElementById("GridCode").innerHTML = val;
};

setGridVisuals();


	

﻿document.querySelector("#BarsMenuWrap > .bars-icon").onclick = () => {
    const bg = document.querySelector("#BarsMenuBackground");

    bg.classList.remove("hide");

    bg.onclick = () => {
        bg.classList.add("hide");
    };
};


	

﻿function setPadMargVisuals() {
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


	

﻿function setPosVisuals() {
    let val = "pos";

    val += "-" + document.getElementById("PosSelect").value;
    val += "-" + document.getElementById("PlcSelect").value;

    let tmp = document.querySelector("#PosDemoWrap > .demo-container > .item");
    tmp.className = "";
    tmp.classList.add("item");
    tmp.classList.add(val);
};

setPosVisuals();


	

	//# sourceMappingUrl=CreatorButter.js.map
