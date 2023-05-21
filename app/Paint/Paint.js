import Application from "../Application.js";

export default class Paint extends Application{
    static DEFAULT_COLOR = "#BCC9D5";
    static CLEAR_COLOR = "#f5f5f5";
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
    * @type {boolean}
    */
    mouseDown = false;

    /**
    * @type {String}
    */
    currentMode = Paint.DEFAULT_MODE;

    /**
    * @type {String}
    */
    currentColor = Paint.DEFAULT_COLOR;

    /**
     * @type {Array}
     */
    choices = document.querySelectorAll(".paint-choice");

    
    init() {
        super.init();
        this.initDom();
    }

    initDom(){

        const paintContainer = document.createElement("div");
        paintContainer.className = "paint-container";

        paintContainer.appendChild(document.createElement("h1"));
        paintContainer.lastChild.textContent = "Paint Game";

        paintContainer.appendChild(document.createElement("div"));
        paintContainer.lastChild.textContent = "Choose a size of your liking for the grid and use any color you want or even random generated colors for this pixel art mini game.";


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
        paintContainer.lastChild.lastChild.lastChild.addEventListener("input", function(evt){
            this.initGrid(evt.target.value);
        }.bind(this))
        
        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-color-picker";

        paintContainer.lastChild.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.lastChild.className = "paint-choice paint-active";
        paintContainer.lastChild.lastChild.lastChild.id = "paint-color-choice";
        paintContainer.lastChild.lastChild.lastChild.textContent = "Color";
        paintContainer.lastChild.lastChild.lastChild.addEventListener("click", this.changeToColor.bind(this));

        paintContainer.lastChild.lastChild.appendChild(document.createElement("input"));
        paintContainer.lastChild.lastChild.lastChild.type = "color";
        paintContainer.lastChild.lastChild.lastChild.id = "paint-colorpicker";
        paintContainer.lastChild.lastChild.lastChild.value = "#BCC9D5";
        paintContainer.lastChild.lastChild.addEventListener("change", this.changeColor.bind(this));


        paintContainer.appendChild(document.createElement("div"));
        paintContainer.lastChild.className = "paint-options-two";

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-choice";
        paintContainer.lastChild.lastChild.id = "paint-random";
        paintContainer.lastChild.lastChild.textContent = "Random colors";
        paintContainer.lastChild.lastChild.addEventListener("click", this.changeToRandom.bind(this));

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-choice";
        paintContainer.lastChild.lastChild.id = "paint-eraser";
        paintContainer.lastChild.lastChild.textContent = "Eraser";
        paintContainer.lastChild.lastChild.addEventListener("click", this.erase.bind(this));

        paintContainer.lastChild.appendChild(document.createElement("div"));
        paintContainer.lastChild.lastChild.className = "paint-choice";
        paintContainer.lastChild.lastChild.id = "paint-clear";
        paintContainer.lastChild.lastChild.textContent = "Clear board";
        paintContainer.lastChild.lastChild.addEventListener("click", this.clearGrid.bind(this));

        this.target.appendChild(paintContainer);
        this.choices = document.querySelectorAll(".paint-choice");
        console.log("choices: ",this.choices);       
    }

    initGrid(size){
        window.addEventListener("mousedown", ()=>{
            this.mouseDown = true;
        })
        window.addEventListener("mouseup", ()=>{
            this.mouseDown = false;
        })
        console.log(size);
        if(size < 2){
            let alert = this.target.appendChild(document.createElement("div"));
            alert.className = "alert";
            alert.textContent = "Grid size can't be smaller than 2!!";
            setTimeout(function () {
                alert.remove();
            }, 4000);
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
        for(let i = 0; i < size * size; i++){
            this.gridElem.appendChild(document.createElement("div"));
            this.gridElem.lastChild.className = "paint-gridsquare";
            this.gridElem.lastChild.addEventListener("mouseover", this.paintGrid.bind(this))
        }
    }

    changeColor(event){
        this.currentColor = event.target.value;
        this.currentMode = "normal";
        this.choices[0].classList.add("paint-active");
        this.choices[1].classList.remove("paint-active");
        this.choices[2].classList.remove("paint-active");
    }

    changeToColor(event){
        this.currentColor = document.getElementById("paint-colorpicker").value;
        this.currentMode = "normal";
        this.changeMode(event);
    }

    changeToRandom(event){
        this.currentMode = "random";
        this.changeMode(event);
    }

    paintGrid(event){
        if(!this.mouseDown) return;
        if(this.currentMode === "normal"){
            event.target.style.backgroundColor = this.currentColor;
        }
        else{
            let red = Math.floor(Math.random() * 256)
            let green = Math.floor(Math.random() * 256)
            let blue = Math.floor(Math.random() * 256)
            event.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
        }
    }

    erase(event){
        this.currentColor = Paint.CLEAR_COLOR;
        this.currentMode = "normal";
        this.changeMode(event);
    }

    clearGrid(){
        let grids = [...this.gridElem.children]
        grids.forEach(function(item){
            item.style.backgroundColor = Paint.CLEAR_COLOR;
        });
    }

    changeMode = function(event){
        this.choices.forEach(function(item){
            item.classList.remove("paint-active");
        });
        event.target.classList.add("paint-active");
    }.bind(this);
}