const Wordthings= (function()
{
    // array of words
    var words = [
        "legacy","butterfly","magnetic","thunder","horizon","harmony","celebrate","island","spectrum","rainbow","bubble","eclipse"
        ,"treasure","melody","adventure","galaxy","firefly","radiant","victory","mystery","universe","oasis","wilderness","legend"
        ,"magic","journey","fortune","paradise","blossom","pearl","oasis","miracle","wisdom","destiny","fantasy","paradise","passion"
        ,"treasure","cosmic","wonder","infinity","horizon","harmony","galaxy","symphony","dreamland","departure","cookie","area"
        ,"employee","association","restaurant","intention","month","client","video","love","warning","transport","response","volume"
        ,"activity","vehicle","satisfaction","tale","lady","cancer","ladder","guitar","knowledge","error","assistant","army","percentage"
        ,"confusion","tongue","king","poem","excitement","government","exam","cabinet","competition","bonus","engineer","memory"
        ,"potato","professor","strategy","find","contribution","appointment","bread"
    ];
    // choose a random word
    var word = words[Math.floor(Math.random() * words.length)]


    // array to hold correct guesses
    var correctGuesses = new Set();

    // array to hold incorrect guesses
    var incorrectGuesses = new Set();


    var self = 
    {
        // function to update the guesses
        updateGuesses: function() {
            const guessesElement = document.getElementById("guesses");
            guessesElement.innerHTML = `Correct Guesses: ${[...correctGuesses].join(", ")}<br>Incorrect Guesses: ${[...incorrectGuesses].join(", ")}`;
        },



        
        // function to update the word
        updateWord: function() {
        
            const wordElement = document.getElementById("word");
            wordElement.innerHTML = "";
            for (let letter of word) {
                const span = document.createElement("span");
                span.textContent = correctGuesses.has(letter) ? letter : "_ ";
                wordElement.appendChild(span);
            }
        },


        // function to make a guess
        makeGuess: function(letter,i) {
            let keyletter = document.getElementById("hasznaltkey");
            if(document.getElementById("key_"+String(i)) !== null){
                keyletter = document.getElementById("key_"+String(i));
            }else{
                keyletter.id= ("hasznaltkey");
            }
            //keyletter = document.getElementById("key_"+String(i));

            if ((word.includes(letter)) && (keyletter !==("hasznaltkey"))) {
                correctGuesses.add(letter);
                console.log("correctGuesses+1");
                keyletter.id= ("hasznaltkey");
                keyletter.removeEventListener("click",() => Wordthings.makeGuess(String.fromCharCode(i),i));
                
            } else  {
                if(keyletter !== ("hasznaltkey")){
                    incorrectGuesses.add(letter);
                    console.log("incorrectGuesses+1");
                    keyletter.id= ("hasznaltkey");
                    keyletter.removeEventListener("click",() => Wordthings.makeGuess(String.fromCharCode(i),i));
                    console.log("itt is bemegy?");
                    
                }else{
                    incorrectGuesses.add(letter);
                    console.log("incorrectGuesses+1");
                    keyletter.removeClickListenersAndSetClass("click",() => Wordthings.makeGuess(String.fromCharCode(i),i));
                    //console.log("itt is bemegy?");
                }
                if(incorrectGuesses.size ===1){
                    document.getElementById("kep").src = "app/Hangman/photos/akasztofa2.png";
                }
                if(incorrectGuesses.size ===2){
                    document.getElementById("kep").src = "app/Hangman/photos/akasztofa3.png";
                }
                if(incorrectGuesses.size ===3){
                    document.getElementById("kep").src = "app/Hangman/photos/akasztofa4.png";
                }
                if(incorrectGuesses.size ===4){
                    document.getElementById("kep").src = "app/Hangman/photos/akasztofa5.png";
                }
                if(incorrectGuesses.size ===5){
                    document.getElementById("kep").src = "app/Hangman/photos/akasztofa6.png";
                }
            }
            Wordthings.updateWord();
            Wordthings.updateGuesses();
            Win.checkWin(word,letter,correctGuesses,incorrectGuesses);
        }




    };

return self;

})();