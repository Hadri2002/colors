import Application from "../Application.js";

export default class Gradient extends Application{
    static size = 12;
    static step = 20;
    static colors = [];

     /**
     * @type {HTMLElement}
     */
     gridElem;

    init() {
        super.init();
        this.initDom();
        this.initColors();
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

    }

    initColors(){
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);

        r = this.colorCheck(r);
        g = this.colorCheck(g);
        b = this.colorCheck(b);

        const rdif = this.getdif(r);
        const gdif = this.getdif(g);
        const bdif = this.getdif(b);

        for(let i = 0; i < Gradient.size; i++){
            for(let j = 0; j < Gradient.size; j++){
                
                
                let ract = r + (i * rdif)
                let bact = b + (j * bdif);
                let gact;
                if(i < j){
                    gact = g + (j * gdif)
                }
                else{
                    gact = g + (i * gdif);
                }
                const color = new Color(i+j, [ract, gact, bact]);
                this.gridElem.appendChild(color.domElem);
                Gradient.colors.push(color);
            }
        }

    }

    colorCheck(color){
        if(color < 255 - (Gradient.size*Gradient.step) || color > Gradient.size*Gradient.step){
            return color;
        }
        else {
            color = Math.floor(Math.random()*255);
            color = this.colorCheck(color);
        }
        return color;
    }

    getdif(color){
        let dif;
        if(color < 255-(Gradient.size*Gradient.step)){
            dif = 255-color;
        }
        else{
            dif = -1 * color;
        }
        let amount; 
        
        if(dif > 0){
            amount = (Gradient.size*Gradient.step) + Math.floor(Math.random()*(dif-(Gradient.size*Gradient.step)));
        }
        else{
            amount = -1*Gradient.size*Gradient.step + Math.floor(Math.random()*(dif+(Gradient.size*Gradient.step)));
        }
        amount = Math.floor(amount / Gradient.size);

        return amount;
    }
}

class Color{

    constructor(place, rgb){
        this.place = place;
        this.rgb = rgb;
        this.found = false;

        this.initDom();
    }

    initDom() {
        this.domElem = document.createElement('div');
        this.domElem.className = 'color';
        this.domElem.style.backgroundColor = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;

        this.domElem.addEventListener('click', this.choose.bind(this));
    }

    choose() {

    }
}