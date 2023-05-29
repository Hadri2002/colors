import Application from "../Application.js";

export default class Remix extends Application{

    /**
     * @type {HTMLElement}
     */
    containerElem

    /**
     * @type {Array}
     */
    colors

    /**
     * @type {Color}
     */
    color

    /**
     * @type {Number}
     */
    score

    init(){
        super.init();
        this.score = 0;
        this.initRGB();
        this.shuffleArray();
        this.initDom();
    }

    shuffleArray(){
        for (let i = this.colors.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = this.colors[i];
          this.colors[i] = this.colors[j];
          this.colors[j] = temp;
        }
      }

    initDom(){
        this.containerElem = document.createElement('div');
        this.containerElem.className="remix-container";

        this.containerElem.appendChild(document.createElement('div'));
        this.containerElem.lastChild.className="remix-guess-colors";

        this.containerElem.lastChild.appendChild(document.createElement('div'));
        this.containerElem.lastChild.lastChild.className="remix-color-1";
        this.containerElem.lastChild.lastChild.style.backgroundColor = `rgb(${this.colors[0].color[0]},${this.colors[0].color[1]},${this.colors[0].color[2]})`;
        this.containerElem.lastChild.lastChild.addEventListener('click', this.guessing.bind(this));
        this.containerElem.lastChild.appendChild(document.createElement('div'));
        this.containerElem.lastChild.lastChild.className="remix-color-2";
        this.containerElem.lastChild.lastChild.style.backgroundColor = `rgb(${this.colors[1].color[0]},${this.colors[1].color[1]},${this.colors[1].color[2]})`;
        this.containerElem.lastChild.lastChild.addEventListener('click', this.guessing.bind(this));
        this.containerElem.lastChild.appendChild(document.createElement('div'));
        this.containerElem.lastChild.lastChild.className="remix-color-3";
        this.containerElem.lastChild.lastChild.style.backgroundColor = `rgb(${this.colors[2].color[0]},${this.colors[2].color[1]},${this.colors[2].color[2]})`;
        this.containerElem.lastChild.lastChild.addEventListener('click', this.guessing.bind(this));

        this.containerElem.appendChild(document.createElement('div'));
        this.containerElem.lastChild.className="remix-lyrics";

        this.containerElem.lastChild.appendChild(document.createElement('div'));
        this.containerElem.lastChild.lastChild.className="remix-color-text";
        this.containerElem.lastChild.lastChild.appendChild(document.createElement('h1'));
        this.containerElem.lastChild.lastChild.lastChild.innerHTML = `Color -> (${this.color.color[0]}, ${this.color.color[1]}, ${this.color.color[2]})`;

        this.containerElem.lastChild.appendChild(document.createElement('div'));
        this.containerElem.lastChild.lastChild.className="remix-score";
        this.containerElem.lastChild.lastChild.appendChild(document.createElement('h2'));
        this.containerElem.lastChild.lastChild.lastChild.innerHTML = `Score: ${this.score}`;

        this.target.appendChild(this.containerElem);
    }

    initRGB(){
        this.color = new Color();
        let fakecolor = new Color();
        let fake2color = new Color();

        this.colors = [this.color, fakecolor, fake2color];
    }

    guessing(evt){
        console.log(this);
        console.log(evt.target.style.backgroundColor);
        console.log(this.score);
            if(evt.target.style.backgroundColor == `rgb(${this.color.color[0]}, ${this.color.color[1]}, ${this.color.color[2]})`){
            this.score += 1;
        }
    }
}

class Color{
    constructor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);

        this.color = [r, g, b];
    }
}