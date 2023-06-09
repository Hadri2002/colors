import Paint from "./Paint.js";

export default class GridElem{

    constructor(size, grid){
        this.size = size;
        this.grid = grid;
        this.initDom();
    }
    /**
    * @type {HTMLElement}
    */
    domElem;

    /**
    * @type {boolean}
    */
    mouseDown = false;

    initDom(){
        
        // making sure the board size remains between 2 and 100
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
        
        // initializing the drawing board
        this.grid.innerHTML = "";
        this.domElem = this.grid.appendChild(document.createElement('div'));
        this.domElem.className = "paint-grid-elements";
        this.domElem.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        this.domElem.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;
        for(let i = 0; i < this.size * this.size; i++){
            this.domElem.appendChild(document.createElement("div"));
            this.domElem.lastChild.className = "paint-gridsquare";
        }
        this.grids = [...this.domElem.children];

        // making the "pencil" draggable by using a mouseDown mechanic
        this.grid.addEventListener("mousedown", (event) => {
            event.preventDefault();
            this.mouseDown = true;
        })
        this.grid.addEventListener("mouseup", (event) => {
            event.preventDefault();
            this.mouseDown = false;
        })
    }

    // coloring depending on the currentMode (erasing is coloring as well) 
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

    // everytime the size limits are broken we send an alert to the user by creating an alert div for three seconds
    sendAlert = function(limit){
        let alert = this.grid.parentElement.parentElement.appendChild(document.createElement("div"));
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