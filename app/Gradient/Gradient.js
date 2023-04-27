import Application from "../Application.js";

export default class Gradient extends Application{

    static size = 12;
    static step = 20;
    static colors = [];

     /**
     * @type {HTMLElement}
     */
     gridElem;

     /**
     * @type {Color}
     */
    chosen;

    /**
     * @type {boolean}
     */
    locked = false;

    init() {
        super.init();
        this.initStart();
        //this.initColors();
    }

    initStart(){

        const containerElem = document.createElement('div');
        containerElem.className = "Choser";

        containerElem.appendChild(document.createElement('div'));
        containerElem.lastChild.className = "Choser-states";

        const sizes = ['Könnyű', 'Közepes', 'Nehéz'];
        
        //containerElem.lastChild.appendChild(document.createElement('div'));
        //containerElem.lastChild.lastChild.className = "radio-size";

        const radio = document.createElement('div');
        
        radio.innerHTML = 
            (`<label class="radio">
                <input type="radio" checked="checked" name="${sizes[0]}">
                <span class="checkmark"></span>
                ${sizes[0]}
            </label>
            <label class="radio">
                <input type="radio" name="${sizes[1]}">
                <span class="checkmark"></span>
                ${sizes[1]}
            </label>
            <label class="radio">
                <input type="radio" name="${sizes[2]}">
                <span class="checkmark"></span>
                ${sizes[2]}
            </label>`);
        containerElem.lastChild.appendChild(radio);
        containerElem.lastChild.lastChild.className = "radio";

        const range = document.createElement('div');
        
        

        range.innerHTML =  `<div>
                <input type="range" name="size" value="5" min="5" max="12">
                 <label for="why">Méret</label>
            </div>`;
        containerElem.lastChild.appendChild(range);
        containerElem.lastChild.lastChild.className = "range";

        const createButton= document.createElement('button');
        containerElem.lastChild.appendChild(createButton);
        createButton.innerText= 'Start';
        containerElem.lastChild.lastChild.className = "Button";
        
        
        this.target.appendChild(containerElem);
        
        
    }

    initDom(){

        const containerElem = document.createElement('div');
        containerElem.className = "gradient-container";

        containerElem.appendChild(document.createElement('div'));
        containerElem.lastChild.className = "gradient-ghost";

        containerElem.lastChild.appendChild(document.createElement('div'));
        containerElem.lastChild.lastChild.className = "gradient-grid";
        
        
        this.gridElem = containerElem.lastChild.lastChild;
        this.gridElem.style.gridTemplateColumns = `repeat(${Gradient.size}, 1fr)`;
        this.gridElem.style.gridTemplateRows = `repeat(${Gradient.size}, 1fr)`;

        this.target.appendChild(containerElem);

        //Lock game on win condition
        this.gridElem.addEventListener('click', function(evt) {
            if (this.locked) {
                console.log('Grid is locked');
                evt.stopPropagation();
            }
        }.bind(this), true);

    }

    initColors(){
        let r = this.colorCheck(Math.floor(Math.random()*256));
        let g = this.colorCheck(Math.floor(Math.random()*256));
        let b = this.colorCheck(Math.floor(Math.random()*256));

        const rdif = this.getdif(r);
        const gdif = this.getdif(g);
        const bdif = this.getdif(b);

        const fixedColors = [];
        const randomColors = [];

        for(let i = 0; i < Gradient.size; i++){
            for(let j = 0; j < Gradient.size; j++){
                   
                let ract = r + (i * rdif)
                let bact = b + (j * bdif);
                let gact;
                if(i < j) gact = g + (j * gdif)
                else gact = g + (i * gdif);
                
                const color = new Color(i, j, [ract, gact, bact]);
                Gradient.colors.push(color);         
                color.domElem.addEventListener('choose', this.onColorChosen.bind(this));       

                //Determines fixed points, this is where difficulty can be implemented
                if(i == 0 || j == 0 || i == Gradient.size-1 || j == Gradient.size - 1){
                    color.fixed = true;
                    fixedColors.push(color);
                }
                else randomColors.push(color);
            }
        }

        this.shuffleColors(randomColors, fixedColors);
    }

    shuffleColors(randomColors, fixedColors){
        for (let i = randomColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomColors[i], randomColors[j]] = [randomColors[j], randomColors[i]];
        }
        
        
        for(let i = 0; i < Gradient.colors.length; i++){
            if(fixedColors.includes(Gradient.colors[i])) {
                this.gridElem.appendChild(Gradient.colors[i].domElem);
                Gradient.colors[i].actualPlace = i;
            }
            else {
                randomColors[randomColors.length-1].actualPlace = i;
                this.gridElem.appendChild(randomColors.pop().domElem);
            }
        }
    }

    colorCheck(color){
        if(color < 255 - (Gradient.size*Gradient.step) || color > Gradient.size*Gradient.step) return color;
        else {
            color = Math.floor(Math.random()*255);
            color = this.colorCheck(color);
        }
        return color;
    }

    getdif(color){
        let dif;
        if(color < 255-(Gradient.size*Gradient.step)) dif = 255-color;
        else dif = -1 * color;
        
        let amount; 
        
        if(dif > 0)
            amount = (Gradient.size*Gradient.step) + Math.floor(Math.random()*(dif-(Gradient.size*Gradient.step)));
        else
            amount = -1*Gradient.size*Gradient.step + Math.floor(Math.random()*(dif+(Gradient.size*Gradient.step)));
        
        amount = Math.floor(amount / Gradient.size);
        return amount;
    }

    onColorChosen(evt) {
        if(Gradient.chosen){

            let place1 = evt.detail.actualPlace;
            let place2 = Gradient.chosen.actualPlace;
            let item1 = evt.detail.color;
            let item2 = Gradient.chosen;
            if(place1 >= place2) {
                [item1, item2] = [item2, item1];
                [place1, place2] = [place2, place1];

            }
            //Place1 is smaller

            const children = document.querySelectorAll('div.color');
            evt.detail.grid.innerHTML = "";

            for(let i = 0; i < Gradient.size*Gradient.size; i++){
                if(i == place1){
                    evt.detail.grid.appendChild(item2.domElem);
                    item2.actualPlace = i;
                }
                else if(i == place2){
                    evt.detail.grid.appendChild(item1.domElem);
                    item1.actualPlace = i;
                }
                else
                    evt.detail.grid.appendChild(children.item(i));
            }
            
            Gradient.chosen.domElem.style.border = 'none';
            Gradient.chosen = '';

            //check if the game is finished
            let i;
            for(i = 0; i < Gradient.colors.length; i++){
                if(Gradient.colors[i].actualPlace != Gradient.colors[i].place)
                    break;
            }

            if(i == Gradient.colors.length){
                console.log("nyertél!");
                
                //confirm("Nyertél")
                
                document.getElementsByClassName("text").id= "center";
                document.getElementsByClassName("text").innerHtml = "Nyertél";


                this.locked = true;

/*
                if (confirm("Nyertél")) {
                    location.reload()
                } else {
                    location.reload()
                }*/

            }
        }
        else{
            //There is no chosen color yet
            Gradient.chosen = evt.detail.color;
            Gradient.chosen.domElem.style.border = 'solid 1px white';
        }
    }
}

class Color{

    //where it currently is after shuffling
    actualPlace;

    constructor(row, col, rgb){
        this.row = row;
        this.col = col;
        this.rgb = rgb;
        //where it should be in the gradient
        this.place = (row * Gradient.size) + col;
        this.fixed = false;

        this.initDom();
    }

    initDom() {
        this.domElem = document.createElement('div');
        this.domElem.className = 'color';
        this.domElem.style.backgroundColor = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;

        this.domElem.addEventListener('click', this.choose.bind(this));
    }

    choose() {
        //we can only choose a colour if it's not one of the fixed ones!
        if(this.fixed == false){            
            const eventObj = new CustomEvent('choose', {
                detail: {
                    color: this,
                    grid: this.domElem.parentElement,
                    actualPlace: this.actualPlace
                }
            });

            this.domElem.dispatchEvent(eventObj);
        }
    }
}