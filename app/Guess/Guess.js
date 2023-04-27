import Application from "../Application.js";

export default class Guess extends Application{

    /**
     * @type {HTMLElement}
     */
    containerElem;

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
        this.containerElem.appendChild(color.domElem);
    }

    initDom(){
        this.containerElem = document.createElement('div');
        
        this.target.appendChild(this.containerElem);
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