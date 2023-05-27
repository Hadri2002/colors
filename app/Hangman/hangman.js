// update the word and guesses on page load
Wordthings.updateGuesses();
Wordthings.updateWord();

//billentyűzet helye

Keyboard.KeyBoardAdd();


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