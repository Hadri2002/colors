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

    numOfGuesses = 0;
    score = 3*256;

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
            range.className=elem.toLowerCase();

            
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
        this.target.appendChild(this.containerElem);

        //ide majd az adatok átadása kell és a játék logikája
        /*this.input.lastChild.addEventListener('click', function(){
            const r = this.querySelector("input.red").value;
            const g = this.querySelector("input.green").value;
            const b = this.querySelector("input.blue").value;
            
            Guess.makeGuess();

        }.bind(this.input)); //this.input*/

        this.input.lastChild.addEventListener('click', this.makeGuess.bind(this));
        
        
    }

    makeGuess(){
        if(this.numOfGuesses < 3){
            const r = document.querySelector("input.red").value;
            const g = document.querySelector("input.green").value;
            const b = document.querySelector("input.blue").value;

            console.log(document.querySelector("div.color-guesses"));
            const guess = document.createElement("div");
            guess.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            guess.style.height =`${100/3}%`;

            document.querySelector("div.color-guesses").appendChild(guess);

            //getScore
            const color = document.querySelector("div.color-guess").style.backgroundColor.split("(")[1].split(")")[0].split(", ");
            const rscore = Math.abs(color[0] - r);
            const gscore = Math.abs(color[1] - g);
            const bscore = Math.abs(color[2] - b);
            const score = rscore + gscore + bscore;

            if(score < this.score) this.score = score;

            console.log(this.score);

            //ez itt a főeredmény!
           
            
            this.numOfGuesses++;
        }
        
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