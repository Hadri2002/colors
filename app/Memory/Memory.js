import Application from "../Application.js";

export default class Memory extends Application{
    static colors = [];

    /**
     * @type {HTMLElement}
     */
    colorsElement;

    /**
     * @type {Number}
     */
    static counter = 0;

    init(){
        super.init();
        this.initDom();
    }

    initDom(){
        const memoryContainer = document.createElement("div");
        this.target.appendChild(memoryContainer);
        memoryContainer.className = "memory-container";

        memoryContainer.appendChild(document.createElement("h1"));
        memoryContainer.lastChild.textContent = "Memory Sequence Game";

        memoryContainer.appendChild(document.createElement("div"));
        memoryContainer.lastChild.textContent = "Click the shuffled color boxes in the original order to win in this color themed memory sequence mini game.";

        this.colorsElement = document.createElement("div");
        console.log(this.colorsElement);
        this.colorsElement.className = "memory-colors";
        memoryContainer.appendChild(this.colorsElement);
        console.log(this.colorsElement);

        this.initColors(this.colorsElement);
    }

    async initColors(colorsElement){
        for(let i = 0; i < 5; i++){
            const color = new Color(i);
            await color.data;
            Memory.colors.push(color);
            colorsElement.appendChild(color.domElem);
        }
        
        setTimeout(() => {
            this.shuffleColors(colorsElement);
        }, 4000);
    }

    shuffleColors(colorsElement){
        colorsElement.innerHTML = "";
        for (let i = Memory.colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = Memory.colors[i];
            Memory.colors[i] = Memory.colors[j];
            Memory.colors[j] = temp;
        }
        for(let i = 0; i < Memory.colors.length; i++){
            colorsElement.appendChild(Memory.colors[i].domElem);
            Memory.colors[i].domElem.addEventListener('click', this.colorCheck.bind(this)); 
        }
    }

    colorCheck(evt){
        console.log(evt.target)
    }

}

class Color{
    constructor(originalPlace){
        this.originalPlace = originalPlace;
        // this.data contains the randomly generated color and its rgb values
        this.data = this.getData();
        this.initDom();
    }

    async getData(){
        let data = await this.fetchData();
        // once the data is fetched, it is returned for the constructor
        return data;
    }
 
    async fetchData(){
        try{
            let red = Math.floor(Math.random() * 256)
            let green = Math.floor(Math.random() * 256)
            let blue = Math.floor(Math.random() * 256)
            
            // using a color api to get data from our randomly generated color
            const apiUrl = `https://www.thecolorapi.com/id?rgb=${red},${green},${blue}&format=json`;
            let response = await fetch(apiUrl);
            if(response.ok){
                let jsonResponse = await response.json();
                return jsonResponse;
            }
        }
        catch(err){
            console.error(err);
        }
    }

    async initDom(){
        console.log("asd");
        let data = await this.data;
        this.domElem = document.createElement('div');
        this.domElem.className = 'memory-color';
        this.domElem.style.backgroundColor = `rgb(${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b})`;
        this.domElem.textContent = `${data.name.value}`;
    }
}