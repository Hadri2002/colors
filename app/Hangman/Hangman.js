import Application from "../Application.js";
 
export default class Hangman extends Application{
 
    // array to hold correct guesses
    /**
     * @type {Set}
     */
    correctGuesses = new Set();
 
    // array to hold incorrect guesses
    /**
     * @type {Set}
     */
    incorrectGuesses = new Set();
 
    /**
     * @type {HTMLElement}
     */
    guesses;
 
    /**
     * @type {HTMLElement}
     */
    word;
 
    /**
     * @type {HTMLElement}
     */
    keyBoard;
 
    answer;
    red;
    green;
    blue;
 
    /**
     * @type {boolean}
     */
    locked = false;
 
    async init() {
        this.correctGuesses = new Set();
        this.incorrectGuesses = new Set();
        const word = new Word();
        let data = await word.data;
        this.answer = data.name.value.toLowerCase();
        this.red = data.rgb.r;
        this.green = data.rgb.g;
        this.blue = data.rgb.b;
 
        this.initDom();
        this.updateGuesses();
        this.updateWord();
        this.keyboardAdd();
      }
 
    initDom(){
 
        this.target.appendChild(document.createElement('div'));
        this.target.lastChild.appendChild(document.createElement("div"));
        this.target.lastChild.lastChild.className = "colorToGuess";
        this.target.lastChild.lastChild.style.backgroundColor = `rgb(${this.red},${this.green},${this.blue})`;
        this.target.lastChild.appendChild(document.createElement("img"));
        this.target.lastChild.lastChild.id="kep";
        this.target.lastChild.lastChild.src = "app/Hangman/photos/akasztofa1.png";
 
        this.target.appendChild(document.createElement('div'));
        this.word = document.createElement('div');
        this.word.id="word";
        this.guesses = document.createElement('div');
        this.guesses.id="guesses";
 
        this.target.lastChild.appendChild(this.word);
        this.target.lastChild.appendChild(this.guesses);
 
        this.keyBoard = document.createElement("div");
        this.keyBoard.id="keyboard";
 
        this.keyBoard.addEventListener('click', function(evt) {
            console.log(this.locked);
            if (this.locked) {
                console.log('Keys are locked');
                evt.stopPropagation();
            }
        }.bind(this), true);
 
        this.target.appendChild(this.keyBoard);
 
        this.target.appendChild(document.createElement("button"));
        this.target.lastChild.role="button";
        this.target.lastChild.className="button";
        this.target.lastChild.innerHTML = "Refresh";
        this.target.lastChild.setAttribute("onClick", "window.location.reload();");
    }
 
    // function to update the guesses
    updateGuesses(){
        document.querySelector("#guesses").innerHTML = `Correct Guesses: ${[...this.correctGuesses].join(", ")}<br>Incorrect Guesses: ${[...this.incorrectGuesses].join(", ")}`;
    }
 
    updateWord(){
        console.log(this.answer);
        document.querySelector("#word").innerHTML = "";
            for (let letter of this.answer) {
                const span = document.createElement("span");
                span.textContent = this.correctGuesses.has(letter) ? letter : "_ ";
                document.querySelector("#word").appendChild(span);
            }
    }
 
 
    keyboardAdd() {
        for (let i = 97; i <= 122; i++) {
          const key = document.createElement("div");
          key.classList.add("key");
          key.id = "key_" + String(i);
          key.textContent = String.fromCharCode(i);
          let keyletterid = key.id;
          if (keyletterid != "hasznaltkey") {
            const answer = this.answer;
            key.addEventListener('click', function(evt){
              key.id = "hasznaltkey";
              this.makeGuess(String.fromCharCode(i), i, answer);
 
            }.bind(this));
          }
          this.keyBoard.appendChild(key);
        }
      }
 
    makeGuess(letter, i, answer){


        let keyletter = document.getElementById("hasznaltkey");
 
        this.answer = answer;
 
        if (answer.includes(letter)) {
            this.correctGuesses.add(letter);
            console.log("correctGuesses+1");
            keyletter.replaceWith(keyletter.cloneNode(true));
        }
        else {
            this.incorrectGuesses.add(letter);
            console.log("incorrectGuesses+1");
            keyletter.replaceWith(keyletter.cloneNode(true));
        }
 
        if(this.incorrectGuesses.size === 1){
            document.getElementById("kep").src = "app/Hangman/photos/akasztofa2.png";
        }
        else if(this.incorrectGuesses.size === 2){
            document.getElementById("kep").src = "app/Hangman/photos/akasztofa3.png";
        }
        else if(this.incorrectGuesses.size === 3){
            document.getElementById("kep").src = "app/Hangman/photos/akasztofa4.png";
        }
        else if(this.incorrectGuesses.size === 4){
            document.getElementById("kep").src = "app/Hangman/photos/akasztofa5.png";
        }
        else if(this.incorrectGuesses.size === 5){
            document.getElementById("kep").src = "app/Hangman/photos/akasztofa6.png";
        }
 
        this.updateWord();
        this.updateGuesses();
 
        if ([...this.answer].every(letter => this.correctGuesses.has(letter))) {
 
            const win = document.getElementById("word");
            win.innerHTML  = `<h2 class="win">You Win!</br>The word was: `+ this.answer +`.</br>Congratulation!</h2>`;
            document.getElementById("kep").src = "app/Hangman/photos/akasztofaWIN.png";
            this.gameEnd();
            this.locked = true;
            }
            else if (this.incorrectGuesses.size === 6) {
              const lose = document.getElementById("word");
              lose.innerHTML = `<h2 class="lose">Game Over!</br>The word was: `+ this.answer +`. </br>Try again!</h2>`;
              document.getElementById("kep").src = "app/Hangman/photos/akasztofaLOSE.png";
              this.gameEnd();
              this.locked = true;
          }
}
 
    gameEnd(){
        console.log("Im doing it");
        const letters = document.getElementById("keyboard");
        console.log(letters.children);

        for(let i = 0; i < letters.children.length; i++){
            console.log(letters.children[i]);
            letters.children[i].id = "hasznaltkey";
            letters.children[i].replaceWith(letters.children[i].cloneNode(true));
        }
    }

}
class Word{
    constructor(){
        // this.data contains the randomly generated color (the hangman game's answer) and its rgb values
        this.data = this.getData();
    }
 
    async getData(){
        let data = await this.fetchData();
        console.log(data.name.value);
        let newData = await this.wordCheck(data);
        console.log(newData);
        // once the data is fetched and the color passed the wordCheck, it is returned for the constructor
        return newData;
    }
 
    async wordCheck(dataToCheck){
        let word = dataToCheck.name.value;
        console.log(word);
        // making sure the chosen color only consists of one word
        if(word.includes(" ")){
            let data = await this.fetchData();
            dataToCheck = await this.wordCheck(data);
        }
        console.log(dataToCheck);
        return dataToCheck;
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
}
