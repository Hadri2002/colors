import Application from "../Application.js";

export default class Guess extends Application{

    /**
     * @type {HTMLElement}
     */
    containerElem;

    /**
     * @type {HTMLElement}
     */
    rand;

    /**
     * @type {HTMLElement}
     */
    guesses;

    /**
     * @type {HTMLElement}
     */
    input;

    init() {
        super.init();
        this.initDom();
        this.initColor();
        
    }

    initColor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);

        const color = new Color([r,g,b]);
        console.log(color.rgb);
        this.rand.appendChild(color.domElem);
    }

    initDom(){
        this.containerElem = document.createElement('div');
        this.rand = document.createElement('div');
        this.containerElem.appendChild(this.rand);

        this.guesses = document.createElement('div');
        this.guesses.className = "color-guesses";
        this.rand.appendChild(this.guesses);    
        
        
        this.input = document.createElement('div');
        this.input.className = "guess-input";
        this.containerElem.appendChild(this.input);

        for(let elem of ['Red', 'Green', 'Blue']){
            
            const range = document.createElement('input')
            this.input.appendChild(range);
            range.type = "range";
            range.name = elem.toLowerCase();
            range.value = "0";
            range.min = "0";
            range.max = "255";

            
            this.input.appendChild(document.createElement('label'));
            this.input.lastChild.setAttribute('for', elem.toLowerCase());
            this.input.lastChild.className = "label" + elem.toLowerCase();
            this.input.lastChild.innerHTML = range.value;
            
            range.addEventListener('input', function(){
                range.parentElement.querySelector(".label" + elem.toLowerCase()).innerHTML = range.value
            });
        }

        this.input.appendChild(document.createElement('button'));
        this.input.lastChild.innerHTML = "Submit";

        //ide majd az adatok átadása kell és a játék logikája
        this.input.lastChild.addEventListener('click', function(){
            //NEM MŰKÖDIK A BIND, ELEGEM VAN
        }.bind(this));
        
        this.target.appendChild(this.containerElem);
    }

    makeGuess(){

    }

}

class Color{
    constructor(rgb){
        this.rgb = rgb;

        this.initDom();
    }

    initDom() {
        this.domElem = document.createElement('div');
        this.domElem.className = 'color-guess';
        this.domElem.style.backgroundColor = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
    }
}