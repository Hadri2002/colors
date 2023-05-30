import Application from "../Application.js";

export default class Guess extends Application{

    /**
     * @type {Color}
     */
    color;

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
        this.initStart();
    }

    initStart(){
        //Base setup
        const startContainer = document.createElement('div');
        this.target.appendChild(startContainer);  
        startContainer.className = "chooser";

        startContainer.append(document.createElement("h1"));
        startContainer.lastChild.innerHTML = "Color Guessing Game";

        startContainer.appendChild(document.createElement("div"));
        startContainer.lastChild.innerHTML = "Match the given color by choosing the correct rgb values! You have three tries every time. Difficulty determines the range of available rgb values.";

        startContainer.append(document.createElement("img"));
        startContainer.lastChild.src = "app/Guess/src/guess.PNG";

        //Difficulty chooser
        const difficulty = ['Easy', 'Medium', 'Hard'];
        const radio = document.createElement('div');
        radio.className="gradient-diffinput";
        startContainer.appendChild(radio);

        for(let diff of difficulty){
            radio.appendChild(document.createElement('label'));
            radio.lastChild.className = "radio";
            radio.lastChild.appendChild(document.createElement('input'));
            radio.lastChild.lastChild.type = "radio";
            if(diff == 'Easy') radio.lastChild.lastChild.checked = "checked";
            radio.lastChild.lastChild.name = "difficulty";
            radio.lastChild.lastChild.id = diff.toLowerCase();
            radio.lastChild.appendChild(document.createElement('span'));
            radio.lastChild.lastChild.className = "checkmark";
            radio.lastChild.appendChild(document.createElement('label'));
            radio.lastChild.lastChild.setAttribute('for', diff.toLowerCase(0));
            radio.lastChild.lastChild.innerHTML = diff;
        }
        //Start button
        startContainer.appendChild(document.createElement('button'));
        startContainer.lastChild.innerHTML = "Start";
        startContainer.lastChild.addEventListener('click', function(evt){
            this.target.innerHTML = "";
            
            this.initDom(radio.querySelector(('input[name="difficulty"]:checked')).id);
            //this.initColor();
        
        }.bind(this));
    }

    initColor(){
        //Creates the color to guess
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        console.log(r);
        console.log(g);
        console.log(b);

        this.color = new Color({Red: r, Green: g, Blue: b});        

        return this.color.domElem;
    }

    initDom(difficulty){

        this.containerElem = document.createElement('div');
        this.containerElem.className="guess-container";
        this.rand = document.createElement('div');
        this.containerElem.appendChild(this.rand);

        this.guesses = document.createElement('div');
        this.guesses.className = "guess-guesses";
        this.rand.appendChild(this.guesses);    

        this.rand.appendChild(this.initColor());
        
        this.input = document.createElement('div');
        this.input.className = "guess-input";
        this.containerElem.appendChild(this.input);

        
        for(let elem of ['Red', 'Green', 'Blue']){

            let values = this.chooseRange(this.color.rgb[elem] ,difficulty);
            const holder = document.createElement("div");
            holder.className = "guess-inputholder";
            this.input.appendChild(holder);

            holder.appendChild(document.createElement('label'));
            holder.lastChild.setAttribute('for', elem.toLowerCase());
            holder.lastChild.innerHTML = elem;

            const range = document.createElement('input')
            holder.appendChild(range);
            range.type = "range";
            range.name = elem.toLowerCase();
            range.value = values.first;
            range.min = values.first;
            range.max = values.second;
            range.className=elem.toLowerCase();

            
            holder.appendChild(document.createElement('label'));
            holder.lastChild.setAttribute('for', elem.toLowerCase());
            holder.lastChild.className = "label" + elem.toLowerCase();
            holder.lastChild.innerHTML = range.value;
            
            range.addEventListener('input', function(){
                range.parentElement.querySelector(".label" + elem.toLowerCase()).innerHTML = range.value
            });
        }

        this.input.appendChild(document.createElement('button'));
        this.input.lastChild.innerHTML = "Submit";
        this.target.appendChild(this.containerElem);

        this.input.lastChild.addEventListener('click', this.makeGuess.bind(this));
        
        
    }

    chooseRange(value, difficulty){
        let range;
        if(difficulty == "easy") range = 50
        else if(difficulty == "medium") range = 150;
        else return {first: 0, second: 255};
        
        let firstval = Math.floor(Math.random()*range) + 1;
        let secondval = range - firstval;

        while((value - firstval) < 0 || (value + secondval) > 255){
            firstval = Math.floor(Math.random()*range) + 1;
            secondval = range - firstval;
        }

        return {first: value - firstval, second: value + secondval};
    }

    makeGuess(){
        if(this.numOfGuesses < 3){
            const r = document.querySelector("input.red").value;
            const g = document.querySelector("input.green").value;
            const b = document.querySelector("input.blue").value;

            const guess = document.createElement("div");
            guess.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            guess.style.height =`${100/3}%`;
            guess.innerHTML = `(${r}, ${g}, ${b})`;
            guess.className = "guess-guess";

            if((r*0.299 + g*0.587 + b*0.114) > 186){
                guess.style.color = "black";
            }
            else{
                guess.style.color = "white";
            }
            this.guesses.appendChild(guess);

            this.getScore(r, g, b);         
            
            this.numOfGuesses++;

            if(this.numOfGuesses == 3){
                this.win();
            }
        }
    }

    getScore(r, g, b){
        const rscore = Math.abs(this.color.rgb.Red - r);
        const gscore = Math.abs(this.color.rgb.Green - g);
        const bscore = Math.abs(this.color.rgb.Blue - b);
        const score = rscore + gscore + bscore;

        if(score < this.score) this.score = score;
    }

    win(){
        this.input.innerHTML = "";
        this.input.style.display = "block";
        this.input.style.textAlign = "center";
        this.input.appendChild(document.createElement("h2"));
        this.input.lastChild.innerHTML = `(${this.color.rgb.Red}, ${this.color.rgb.Green}, ${this.color.rgb.Blue})`;
        this.input.appendChild(document.createElement('p'));
        this.input.lastChild.innerHTML = "Smallest distance of your guesses from the real rgb values: ";
        this.input.appendChild(document.createElement('p'));
        this.input.lastChild.innerHTML = this.score;
    }

}

class Color{
    constructor(rgb){
        this.rgb = rgb;
        console.log(this.rgb);

        this.initDom();
    }

    initDom() {
        this.domElem = document.createElement('div');
        this.domElem.className = 'guess-color';
        this.domElem.style.backgroundColor = `rgb(${this.rgb.Red}, ${this.rgb.Green}, ${this.rgb.Blue})`;
    }
}