const Win = (function()
{
    var self = 
    {

// function to check for a win
checkWin: function(word,letter,correctGuesses,incorrectGuesses) {
    if ([...word].every(letter => correctGuesses.has(letter))) {
      
      const win = document.getElementById("word");
      win.innerHTML  = `<h2 class="win">You Win!</br>The word was: `+word+`.</br>Congratulation!</h2>`;
      document.getElementById("kep").src = "app/Hangman/photos/akasztofaWIN.png";
      wordElement = win;
      Remove.removeClickListenersAndSetClass();//document.getElementById(startsWith("key_")).removeEventListener("click", null).id= "hasznaltkey";
      }
      else if (incorrectGuesses.size === 6) {
        const lose = document.getElementById("word");
        lose.innerHTML = `<h2 class="lose">Game Over!</br>The word was: `+word+`. </br>Try again!</h2>`;
        document.getElementById("kep").src = "app/Hangman/photos/akasztofaLOSE.png";
        wordElement = lose;
        Remove.removeClickListenersAndSetClass();//document.getElementById(startsWith("key_")).removeEventListener("click", null).id= "hasznaltkey";
    }
  }
};

return self;

})();