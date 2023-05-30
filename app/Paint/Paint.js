import Application from "../Application.js";

export default class Paint extends Application{
    static DEFAULT_COLOR = "#BCC9D5";
    static CLEAR_COLOR = "#f5f5f5";
    static DEFAULT_SIZE = 16;
    static DEFAULT_MODE = "normal";
    static choices = []

    /**
    * @type {HTMLElement}
    */
    grid = document.querySelector(".paint-grid");

    /**
     * @type {Grid}
     */
    gridElem;

    /**
    * @type {String}
    */
    currentMode = Paint.DEFAULT_MODE;

    /**
    * @type {String}
    */
    currentColor = Paint.DEFAULT_COLOR;



    
    init() {
        super.init();
        this.initDom();
    }

    initDom(){

        const paintContainer = document.createElement("div");
        this.target.appendChild(paintContainer);
        paintContainer.className = "paint-container";

        paintContainer.appendChild(document.createElement("h1"));
        paintContainer.lastChild.textContent = "Paint Game";

        paintContainer.appendChild(document.createElement("div"));
        paintContainer.lastChild.textContent = "Choose a size of your liking for the grid and use any color you want or even random generated colors for this pixel art mini game.";


        this.grid = paintContainer.appendChild(document.createElement("div"));
        this.grid.className = "paint-grid";
        Paint.gridElem = new Grid(Paint.DEFAULT_SIZE, this.grid);
        this.addListenersToGrid();

        const paintOptionsOne = document.createElement("div");
        paintContainer.appendChild(paintOptionsOne);
        paintOptionsOne.className = "paint-options-one";

        const paintSize = document.createElement("div");
        paintOptionsOne.appendChild(paintSize);
        paintSize.className = "paint-size";

        const paintGridNumber = document.createElement("input");
        paintSize.appendChild(paintGridNumber);
        paintGridNumber.type = "number";
        paintGridNumber.placeholder = "Enter grid size...";
        paintGridNumber.id = "paint-grid-number";
        paintGridNumber.max = 100;
        paintGridNumber.min = 2;
        paintGridNumber.addEventListener("input", function(evt){
            Paint.gridElem = new Grid(evt.target.value, this.grid);
            this.addListenersToGrid();
            paintClear.addEventListener("click", Paint.gridElem.clearGrid.bind(Paint.gridElem));
        }.bind(this))
        
        const paintColorPicker = document.createElement("div");
        paintOptionsOne.appendChild(paintColorPicker);
        paintColorPicker.className = "paint-color-picker";

        const paintColorChoice = document.createElement("div");
        paintColorPicker.appendChild(paintColorChoice);
        paintColorChoice.className = "paint-choice paint-active";
        paintColorChoice.id = "paint-color-choice";
        paintColorChoice.textContent = "Color";
        paintColorChoice.addEventListener("click", this.changeToColor.bind(this));
        Paint.choices.push(paintColorChoice);

        const paintColorpicker = document.createElement("input");
        paintColorPicker.appendChild(paintColorpicker);
        paintColorpicker.type = "color";
        paintColorpicker.id = "paint-colorpicker";
        paintColorpicker.value = "#BCC9D5";
        paintColorPicker.addEventListener("change", this.changeColor.bind(this));

        
        const paintOptionsTwo = document.createElement("div");
        paintContainer.appendChild(paintOptionsTwo);
        paintOptionsTwo.className = "paint-options-two";

        const paintRandom = document.createElement("div");
        paintOptionsTwo.appendChild(paintRandom);
        paintRandom.className = "paint-choice";
        paintRandom.id = "paint-random";
        paintRandom.textContent = "Random colors";
        paintRandom.addEventListener("click", this.changeToRandom.bind(this));
        Paint.choices.push(paintRandom);

        const paintEraser = document.createElement("div");
        paintOptionsTwo.appendChild(paintEraser);
        paintEraser.className = "paint-choice";
        paintEraser.id = "paint-eraser";
        paintEraser.textContent = "Eraser";
        paintEraser.addEventListener("click", this.erase.bind(this));
        Paint.choices.push(paintEraser);

        const paintClear = document.createElement("div");
        paintOptionsTwo.appendChild(paintClear);
        paintClear.className = "paint-choice";
        paintClear.id = "paint-clear";
        paintClear.textContent = "Clear board";
        paintClear.addEventListener("click", Paint.gridElem.clearGrid.bind(Paint.gridElem));
        Paint.choices.push(paintClear);   
    }

    addListenersToGrid(){
        Paint.gridElem.grids.forEach(item => {
            item.addEventListener("click", (event) => {
                Paint.gridElem.mouseDown = true;
                const paintGridClick = Paint.gridElem.paintGrid.bind(Paint.gridElem)
                paintGridClick(event, this.currentMode, this.currentColor);
                Paint.gridElem.mouseDown = false;
            });
            item.addEventListener("mouseover", (event) => {
                const paintGridOver = Paint.gridElem.paintGrid.bind(Paint.gridElem)
                paintGridOver(event, this.currentMode, this.currentColor);
            });
        })
    }

    changeColor(event){
        this.currentColor = event.target.value;
        this.currentMode = "normal";
        Paint.choices[0].classList.add("paint-active");
        Paint.choices[1].classList.remove("paint-active");
        Paint.choices[2].classList.remove("paint-active");
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

    erase(event){
        this.currentColor = Paint.CLEAR_COLOR;
        this.currentMode = "normal";
        this.changeMode(event);
    }

    /*changeMode = function(event){
        Paint.choices.forEach(function(item){
            item.classList.remove("paint-active");
        });
        event.target.classList.add("paint-active");
    }.bind(this);*/
    changeMode(event){
        Paint.choices.forEach(function(item){
            item.classList.remove("paint-active");
        });
        event.target.classList.add("paint-active");
    }
}


class Grid{

    constructor(size, grid){
        this.size = size;
        this.domElem = grid;
        this.initDom();
        console.log(this.domElem.parentElement.parentElement);
    }
    /**
    * @type {HTMLElement}
    */
    gridElem;

    /**
    * @type {boolean}
    */
    mouseDown = false;

    initDom(){
        
        if(this.size < 2){
            this.sendAlert(2);
            this.size = 2;
        }
        
        if(this.size > 100){
            this.sendAlert(100);
            this.size = 100;
        }
        if (this.size === "" || this.size === undefined || this.size === null){
            this.size = Paint.DEFAULT_SIZE;
        }
        
        console.log("Grid class, megadott size: ", this.size);
        console.log(this.domElem);
        this.domElem.innerHTML = "";
        this.gridElem = this.domElem.appendChild(document.createElement('div'));
        this.gridElem.className = "paint-grid-elements";
        this.gridElem.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        this.gridElem.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;
        for(let i = 0; i < this.size * this.size; i++){
            this.gridElem.appendChild(document.createElement("div"));
            this.gridElem.lastChild.className = "paint-gridsquare";
        }
        this.grids = [...this.gridElem.children];
        this.domElem.addEventListener("mousedown", (event) => {
            event.preventDefault();
            this.mouseDown = true;
        })
        this.domElem.addEventListener("mouseup", (event) => {
            event.preventDefault();
            this.mouseDown = false;
        })
    }

    paintGrid(event, currentMode, currentColor){
        if(!this.mouseDown) return;
        if(currentMode === "normal"){
            event.target.style.backgroundColor = currentColor;
        }
        else{
            let red = Math.floor(Math.random() * 256)
            let green = Math.floor(Math.random() * 256)
            let blue = Math.floor(Math.random() * 256)
            event.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
        }
    }

    clearGrid(){
        this.grids.forEach(function(item){
            item.style.backgroundColor = Paint.CLEAR_COLOR;
        });
    }

    sendAlert = function(limit){
        let alert = this.domElem.parentElement.parentElement.appendChild(document.createElement("div"));
        alert.className = "alert";
        if(limit === 2){
            alert.textContent = "Grid size can't be smaller than 2!!";
        }
        else{
            alert.textContent = "Grid size can't be greater than 100!!";
        }
        setTimeout(function () {
            alert.remove();
        }, 3000);
    }.bind(this);
}