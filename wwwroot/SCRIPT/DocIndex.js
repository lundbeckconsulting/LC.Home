document.querySelector("#BarsMenuWrap > .bars-icon").onclick = () => {
    const bg = document.querySelector("#BarsMenuBackground");

    bg.classList.remove("hide");

    bg.onclick = () => {
        bg.classList.add("hide");
    };
};


	//# sourceMappingUrl=DocIndex.js.map
