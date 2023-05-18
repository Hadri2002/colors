import Application from "../Application.js";

export default class Paint extends Application{
    static DEFAULT_COLOR = "#BCC9D5";
    static CLEAR_COLOR = "#ffffffb3";
    static DEFAULT_SIZE = 16;
    static DEFAULT_MODE = "normal";

    /**
    * @type {HTMLElement}
    */
    grid = document.querySelector(".paint-grid");

    /**
    * @type {HTMLElement}
    */
    gridElem = document.querySelector(".paint-grid-elements");

    /**
     * @type {Number}
     */
    currentSize = document.getElementById("paint-grid-number").value;

    init() {
        super.init();
        this.initDom();
    }

    initDom(){
        let paintContainer = document.createElement("div");
        paintContainer.className = "paint-container";

        paintContainer.appendChild(document.createElement("h1"));
        paintContainer.lastChild.textContent = "Paint Game";

        /*paintContainer.appendChild(document.createElement("div"));
        paintContainer.lastChild.textContent = "Choose a size of your liking for the grid and use any color you want or even random generated colors for this pixel art mini game.";*/


        this.grid = paintContainer.appendChild(document.createElement("div"));
        this.grid.className = "paint-grid";
        this.initGrid(Paint.DEFAULT_SIZE);


        paintContainer.appendChild(document.createElement("div"));
        paintContainer.lastChild.className = "paint-options-one";

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-size";

        paintContainer.lastChild.lastChild.appendChild(document.createElement("input"));
        paintContainer.lastChild.lastChild.lastChild.type = "number";
        paintContainer.lastChild.lastChild.lastChild.placeholder = "Enter grid size...";
        paintContainer.lastChild.lastChild.lastChild.id = "paint-grid-number";
        this.currentSize = paintContainer.lastChild.lastChild.lastChild.value;
        const asd = paintContainer.lastChild.lastChild.lastChild;
        
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
        console.log("még mindig: ",this.grid);
        //asd.oninput = ()=>{console.log(this)};
        console.log();
        
        
        asd.addEventListener("input", this.initGrid.bind(this, 8));
    }

    initGrid(size){
        console.log(size);
        if(size < 2){
            alert("Grid size can't be smaller than 2!!");
            return;
        }
        
        if(size > 100){
            size = 100;
        }
        if (size === "" || size === undefined || size === null){
            size = Paint.DEFAULT_SIZE;
        }

        console.log(this.grid);
        this.grid.innerHTML = "";
        this.gridElem = this.grid.appendChild(document.createElement('div'));
        this.gridElem.className = "paint-grid-elements";
        this.gridElem.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        this.gridElem.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    }
}