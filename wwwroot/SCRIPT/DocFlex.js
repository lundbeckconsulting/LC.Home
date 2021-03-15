function setVisuals() {
    let val = "flex";

    val += "-" + document.getElementById("SelectJustify").value;
    val += "-" + document.getElementById("SelectAlign").value;

    let tmp = document.getElementById("VisualsWrap");
    tmp.className = "";
    tmp.classList.add(val);

    document.getElementById("VisualsCode").innerHTML = val;
};

setVisuals();


	//# sourceMappingUrl=DocFlex.js.map
