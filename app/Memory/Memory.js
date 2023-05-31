import Application from "../Application.js";

export default class Memory extends Application{

    /**
     * @type {Array}
     */
    colors;

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
    counter = 0;

    /**
     * @type {Number}
     */
    lives;

    /**
     * @type {Number}
     */
    colorsNumber = 3;

    /**
     * @type {Number}
     */
    round = 1;

    init(){
        super.init();
        this.initStart();
    }

    initStart(){

        // starting page initialization
        this.target.innerHTML = "";
        const startContainer = document.createElement('div');
        this.target.appendChild(startContainer);  
        startContainer.className = "chooser";

        startContainer.append(document.createElement("h1"));
        startContainer.lastChild.textContent = "Memory Sequence Game";

        startContainer.appendChild(document.createElement("div"));
        startContainer.lastChild.textContent = "Click the shuffled color boxes in the original order to win in this color themed memory sequence mini game.";

        startContainer.append(document.createElement("img"));
        startContainer.lastChild.src = "app/Memory/src/memory2.PNG";
        startContainer.lastChild.style.width = "50%";

        // difficulty chooser
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

        // start button
        startContainer.appendChild(document.createElement('button'));
        startContainer.lastChild.textContent = "Start";
        startContainer.lastChild.addEventListener('click', function(){
            this.target.innerHTML = "";
            this.initDom(radio.querySelector(('input[name="difficulty"]:checked')).id);
        }.bind(this));
    }

    initDom(difficulty){
        // setting the number of lives depending on the difficulty and initializing all used variables
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
        this.colorsNumber = 3;
        this.counter = 0;
        this.colors = [];

        // initializing the game
        const memoryContainer = document.createElement("div");
        this.target.appendChild(memoryContainer);
        memoryContainer.className = "memory-container";

        this.colorsElement = document.createElement("div");
        this.colorsElement.className = "memory-colors";
        memoryContainer.appendChild(this.colorsElement);

        this.initColors();
        this.initStats();
        
    }

    // keeping track of the user's stats
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

    // initializing the default three colors using Color class
    async initColors(){
        for(let i = 0; i < this.colorsNumber; i++){
            const color = new Color(i);
            await color.data;
            this.colors.push(color);
            this.colorsElement.appendChild(color.domElem);
        }
        // adding a message box for the user
        const ready = document.createElement("div");
        ready.className = "memory-ready";
        ready.textContent = "Get ready..."
        this.target.parentElement.appendChild(ready);
        // after 4 seconds the colors are shuffled and the turn has started
        setTimeout(() => {
            this.shuffleColors();
            ready.remove();
        }, 4000);
    }

    // initilalizing a new array for the shuffled colors and filling the DOM according to the new order
    shuffleColors(){
        this.colorsElement.innerHTML = "";
        const shuffledColors = [];
        this.colors.forEach(item => {
            shuffledColors.push(item);
        });
        for (let i = shuffledColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffledColors[i];
            shuffledColors[i] = shuffledColors[j];
            shuffledColors[j] = temp;
        }
        for(let i = 0; i < this.colors.length; i++){
            this.colorsElement.appendChild(shuffledColors[i].domElem);
            if(this.round === 1){
                shuffledColors[i].domElem.addEventListener('choose', this.colorCheck.bind(this)); 
            }
        }
    }

    colorCheck(evt){
        // if the user clicks on the right element the color becomes "unclickable"
        if(evt.detail.originalPlace === this.counter){
            evt.detail.color.fixed = true;
            evt.target.classList.add("memory-checked");
            this.counter++;
        }
        // otherwise they lose a life point
        else{
            this.lives--;
            this.stats.lastChild.textContent = `Lives remaining: ${this.lives}`;
        }
        // if they lose all their lives the endscreen is initialized
        if(this.lives === 0){
            this.target.innerHTML = "";
            this.initEnd();
        }
        // if they click all colors in the right order they advance to the next level
        if(this.counter === this.colorsNumber){
            setTimeout(()=>{
                this.startNextRound();
            }, 1500)
        }
    }

    // endscreen with stats and restart button
    initEnd(){
        const endContainer = document.createElement("div");
        endContainer.className = "memory-end-container";
        this.target.appendChild(endContainer);

        endContainer.appendChild(document.createElement("h1"));
        endContainer.lastChild.textContent = "Game Over";

        const endScore = document.createElement("h2");
        endScore.textContent = `You made it to level ${this.round}`;
        endContainer.appendChild(endScore);

        const restart = document.createElement("div");
        restart.textContent = "Restart";
        restart.className = "memory-restart";
        endContainer.appendChild(restart);
        restart.addEventListener("click", this.init.bind(this));
    }

    async startNextRound(){
        // once the next round has started the original order is shown again, this time with a new color
        this.colorsElement.innerHTML = "";
        this.colors.forEach(item => {
            this.colorsElement.appendChild(item.domElem);
            item.domElem.classList.remove("memory-checked");
        });
        const color = new Color(this.colorsNumber);
        await color.data;
        this.colors.push(color);
        this.counter = 0;
        this.colorsNumber++;
        this.colorsElement.appendChild(color.domElem);
        const ready = document.createElement("div");
        ready.className = "memory-ready";
        ready.textContent = "Get ready..."
        this.target.parentElement.appendChild(ready);
        // after 4 seconds the colors are shuffled and become clickable once again
        setTimeout(() => {
            this.colors.forEach(item => {
                item.fixed = false;
            });
            color.domElem.addEventListener("choose", this.colorCheck.bind(this));
            this.shuffleColors(this.colorsElement);
            ready.remove();
        }, 4000);
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

    // initializing the domElement of the class using the rg values
    async initDom(){
        let data = await this.data;
        this.domElem = document.createElement('div');
        this.domElem.className = 'memory-color';
        this.domElem.style.backgroundColor = `rgb(${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b})`;
        //this.domElem.textContent = `${data.name.value}`;
        this.domElem.addEventListener('click', this.choose.bind(this));
    }

    // custom event to store the instance of the class and to remove events
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