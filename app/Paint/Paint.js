import Application from "../Application.js";

export default class Paint extends Application{
    static DEFAULT_COLOR = "#BCC9D5";
    static CLEAR_COLOR = "#ffffffb3";
    static DEFAULT_SIZE = 16;
    static DEFAULT_MODE = "normal";

    init() {
        super.init();
        this.initDom();
    }

    initDom(){
        let paintContainer = document.createElement("div");
        paintContainer.className = "paint-container";

        paintContainer.appendChild(document.createElement("h1"));
        paintContainer.lastChild.textContent = "Paint Game";


        paintContainer.appendChild(document.createElement("div"));
        paintContainer.lastChild.className = "paint-grid";


        paintContainer.appendChild(document.createElement("div"));
        paintContainer.lastChild.className = "paint-options-one";

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-size";

        paintContainer.lastChild.lastChild.appendChild(document.createElement("input"));
        paintContainer.lastChild.lastChild.lastChild.type = "number";
        paintContainer.lastChild.lastChild.lastChild.placeholder = "Enter grid size...";
        paintContainer.lastChild.lastChild.lastChild.id = "paint-grid-number";

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-color-picker";

        paintContainer.lastChild.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.lastChild.className = "paint-choice";
        paintContainer.lastChild.lastChild.lastChild.id = "paint-color-choice";
        paintContainer.lastChild.lastChild.lastChild.textContent = "Color";

        paintContainer.lastChild.lastChild.appendChild(document.createElement("input"));
        paintContainer.lastChild.lastChild.lastChild.type = "color";
        paintContainer.lastChild.lastChild.lastChild.id = "paint-colorpicker";
        paintContainer.lastChild.lastChild.lastChild.value = "#BCC9D5";


        paintContainer.appendChild(document.createElement("div"));
        paintContainer.lastChild.className = "paint-options-two";

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-choice";
        paintContainer.lastChild.lastChild.id = "paint-random";
        paintContainer.lastChild.lastChild.textContent = "Random colors";

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-choice";
        paintContainer.lastChild.lastChild.id = "paint-eraser";
        paintContainer.lastChild.lastChild.textContent = "Eraser";

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-choice";
        paintContainer.lastChild.lastChild.id = "paint-clear";
        paintContainer.lastChild.lastChild.textContent = "Clear table";

        this.target.appendChild(paintContainer);
    }
}