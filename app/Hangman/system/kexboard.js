const Keyboard = (function()
{
    var keyboard = document.getElementById("keyboard");
    var self = 
    {
    KeyBoardAdd: function(){
        // add keyboard to page
        
        for (let i = 97; i <= 122; i++) {
            const key = document.createElement("div");
            key.classList.add("key");
            key.id = ("key_"+String(i));
            key.textContent = String.fromCharCode(i);
            //console.log("itt is bemegy?");
            let keyletterid= key.id;
            if(keyletterid != ("hasznaltkey")){
                key.addEventListener("click", () => Wordthings.makeGuess(String.fromCharCode(i),i));
            }
            keyboard.appendChild(key);
        }
    }
    };

    return self;
})();