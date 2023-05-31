import Application from "../Application.js";

export default class Memory extends Application{
    static colors = [];

    /**
     * @type {HTMLElement}
     */
    colorsElement;

    /**
     * @type {HTMLElement}
     */
    stats;

    /**
     * @type {Number}
     */
    static counter = 0;

    /**
     * @type {Number}
     */
    lives;

    /**
     * @type {Number}
     */
    static colorsNumber = 3;

    /**
     * @type {Number}
     */
    static round = 1;

    init(){
        super.init();
        this.initStart();
    }

    initStart(){
        const startContainer = document.createElement('div');
        this.target.appendChild(startContainer);  
        startContainer.className = "chooser";

        startContainer.append(document.createElement("h1"));
        startContainer.lastChild.textContent = "Memory Sequence Game";

        startContainer.appendChild(document.createElement("div"));
        startContainer.lastChild.textContent = "Click the shuffled color boxes in the original order to win in this color themed memory sequence mini game.";

        startContainer.append(document.createElement("img"));
        startContainer.lastChild.src = "app/Gradient/src/gradient.PNG";

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
            radio.lastChild.lastChild.textContent = diff;
        }

        //Start button
        startContainer.appendChild(document.createElement('button'));
        startContainer.lastChild.textContent = "Start";
        startContainer.lastChild.addEventListener('click', function(evt){
            this.target.innerHTML = "";
            this.initDom(radio.querySelector(('input[name="difficulty"]:checked')).id);
        }.bind(this));
    }

    initDom(difficulty){
        if(difficulty === "easy"){
            this.lives = 5;
        }
        else if(difficulty === "medium"){
            this.lives = 3;
        }
        else{
            this.lives = 1;
        }
        this.round = 1;

        const memoryContainer = document.createElement("div");
        this.target.appendChild(memoryContainer);
        memoryContainer.className = "memory-container";

        /*memoryContainer.appendChild(document.createElement("h1"));
        memoryContainer.lastChild.textContent = "Memory Sequence Game";

        memoryContainer.appendChild(document.createElement("div"));
        memoryContainer.lastChild.textContent = "Click the shuffled color boxes in the original order to win in this color themed memory sequence mini game.";*/

        this.colorsElement = document.createElement("div");
        console.log(this.colorsElement);
        this.colorsElement.className = "memory-colors";
        memoryContainer.appendChild(this.colorsElement);
        console.log(this.colorsElement);

        this.initColors();
        this.initStats();
        
    }

    initStats(){
        this.stats = document.createElement("div");
        this.stats.className = "memory-stats";
        this.target.lastChild.appendChild(this.stats);

        const level = document.createElement("h3");
        level.className = "memory-level";
        level.textContent = `Level ${this.round}`
        this.stats.appendChild(level);

        const lives = document.createElement("h3");
        lives.className = "memory-lives";
        lives.textContent = `Lives remaining: ${this.lives}`;
        this.stats.appendChild(lives);
    }

    async initColors(){
        for(let i = 0; i < Memory.colorsNumber; i++){
            const color = new Color(i);
            await color.data;
            Memory.colors.push(color);
            this.colorsElement.appendChild(color.domElem);
        }
        
        setTimeout(() => {
            this.shuffleColors();
        }, 4000);
    }

    shuffleColors(){
        this.colorsElement.innerHTML = "";
        for (let i = Memory.colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = Memory.colors[i];
            Memory.colors[i] = Memory.colors[j];
            Memory.colors[j] = temp;
        }
        for(let i = 0; i < Memory.colors.length; i++){
            this.colorsElement.appendChild(Memory.colors[i].domElem);
            if(this.round === 1){
                Memory.colors[i].domElem.addEventListener('choose', this.colorCheck.bind(this)); 
            }
        }
    }

    colorCheck(evt){
        console.log(evt.detail.originalPlace,"counter: ", Memory.counter)
        if(evt.detail.originalPlace === Memory.counter){
            evt.detail.color.fixed = true;
            evt.target.classList.add("memory-checked");
            Memory.counter++;
        }
        else{
            this.lives--;
            this.stats.lastChild.textContent = `Lives remaining: ${this.lives}`;
        }
        if(this.lives === 0){
            this.target.innerHTML = "";
        }
        if(Memory.counter === Memory.colorsNumber){
            console.log("nyertél egy kört hehe");
            setTimeout(()=>{
                this.startNextRound();
            }, 4000)
        }
    }

    async startNextRound(){
        Memory.colors.forEach(item => {
            item.domElem.classList.remove("memory-checked");
            item.fixed = false;
        });
        const color = new Color(Memory.colorsNumber);
        await color.data;
        Memory.colors.push(color);
        Memory.counter = 0;
        Memory.colorsNumber++;
        this.colorsElement.appendChild(color.domElem);
        setTimeout(() => {
            color.domElem.addEventListener("choose", this.colorCheck.bind(this));
            this.shuffleColors(this.colorsElement);
        }, 4000);
        console.log(this.stats);
        this.round++;
        this.stats.firstChild.textContent = `Level ${this.round}`;
        this.stats.lastChild.textContent = `Lives remaining: ${this.lives}`;
    }

}

class Color{
    constructor(originalPlace){
        this.originalPlace = originalPlace;
        // this.data contains the randomly generated color and its rgb values
        this.data = this.getData();
        this.fixed = false;
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
        this.domElem.addEventListener('click', this.choose.bind(this));
    }

    choose() {
        if(this.fixed == false){            
            const eventObj = new CustomEvent('choose', {
                detail: {
                    color: this,
                    originalPlace: this.originalPlace
                }
            });
            this.domElem.dispatchEvent(eventObj);
        }
    }
}