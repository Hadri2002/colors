import Application from "../Application.js";

export default class Paint extends Application{
    init() {
        super.init();
        let paintElem = document.createElement("div");
        paintElem.textContent = "PAINT";
        this.target.appendChild(paintElem);
    }
}