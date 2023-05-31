# Colors
A JavaScript project for Webprogramming II with mini applications and games based on colors


## Team
* Fürtös Márton
* Gerlecz Tamás
* Horváth Adrienn
* Szili Janka

## Gradient
### Premise
Create a full gradient by switching the tiles to their respective places! Difficulties determine how many set pieces there are in the grid.

![image](https://github.com/Hadri2002/colors/assets/93373919/6f4a5fc2-8e2d-4af6-b4d1-7b0a9e93dd60)


### Color Class
A class for individual colors in the grid. Upon construction, it stores its current, shuffled place in the grid and the correct place as well, based on the gradient.

**Choose method**


This allows for a color to be 'chosen' by the user for switching

### Gradient Class
Handles the logic of the application itself

**InitStart method**

* Creates the difficulty and size choosing screen, then calls the start method with the correct settings

**InitDom method**

* Creates the grid for the gradient

**InitColors method**

* Randomizes the colors that will fill the grid. Chooses which colors are fixed, based on the difficulty level

**ShuffleColors method**

* Shuffles the gradient's nonfixed colors, readying it for the user to fix

**ColorCheck method**

* Helper method of initColors, makes sure the color chosen will be good to have a gradient with with the given size of the grid

**GetDif method**

* Helper method of initColors, readies the randomized steps for the color gradient to be made

**OnColorChosen method**

* Allows for colors to be switched, and checks if the gradient is completed

## Guess
### Premise 
Match the given color by choosing the correct rgb values! You have three tries every time. Difficulty determines the range of available rgb values.

![image](https://github.com/Hadri2002/colors/assets/93373919/d229c70c-c444-4350-bcb1-3011732a82da)


### Color Class
A class for the color to be guessed.

### Guess Class
Handles the logic of the application itself

**InitStart method**

* Creates the difficulty choosing screen, then calls the start method with the correct settings

**InitColor method**

* Randomizes the color to be guessed

**InitDom method**

* Creates the HTML base for the game

**ChooseRange method**

* Decides the range of available rgb values, based on the difficulty

**MakeGuess method**

* Handles the guesses of the user, adding them to the page, checking if there have been three guesses already

**GetScore method**

* Helper method of makeGuess, calculates the highest score of the user 

**Win method**

* Method is called once the user has guessed three times, displays their best score and the original color's rgb values

## Guess Remix
### Premise 
Match the given RGB value by choosing the correct color! No mistakes accepted.

![remix](https://github.com/Hadri2002/colors/assets/99468829/347b8aa9-f967-415c-be50-e3fc4b715b67)


### Color Class
A class for generating colors.

**initStart method**

* Creates a start screen for the game.

**buttonInit method**

* Creates a button with the string of the methods argument.

**initRGB method**

* Generates three random colors. One to be the main color and two other to pick from.

**shuffleArray method**

* Shuffles the array, so the order won't be constant.

**InitDom method**

* Creates the HTML base for the game.

**guessing method**

* Gets an element as an argument, compares it's background color with the main color if the argument's style is the same then generates a new turn. If it's not the same then generates a lose screen.

**newTurn method**

* Basically the initalization but without making the score's value 0.


## Paint
### Premise
Simple pixel art, draw anything by switching between a custom color of your choice and randomly generated colors! You can also erase your mistakes or adjust the number of pixels on the board.

![paint](https://github.com/Hadri2002/colors/assets/93374277/8ddb3fb7-bca0-4d62-b7bb-02706d5e2d76)


### Paint Class
A class for the base the application. During initialization the container of the drawing board and the options are all constructed and stored inside the class fields.

**Fields**
* DEFAULT_COLOR - default color of the pencil
* CLEAR_COLOR - default clearing color of the application
* DEFAULT_SIZE - the default number of pixels on the board is 16*16
* DEFAULT_MODE - the default mode is normal coloring mode
* choices - this array contains the HTMLElement of each coloring option

* grid - the HTMLElement of the grid container
* gridElem - the current instance of the GridElem class
* currentMode - the current coloring mode, it's value is DEFAULT_MODE by default
* currentColor - the current color of the pencil, it's value is DEFAULT_COLOR by default


**InitDom method method**
* Creates the backbone of the application by initializing the DOM and adds eventListeners to each option field. A default instance of the GridElem class (the drawing board itself) is called.

**addListenersToGrid method**
* The required eventListeners for painting are added and handled inside this function, so the user can color by dragging and clicking as well.

**changeColor method**
* If the user changes color on the palette, the currentMode is automatically set to default coloring mode and the currentColor is set to the chosen value.

**changeToColor method**
* This function handles clicking on "Color" button by changing currentMode to normal and currentColor to the value the palette currently holds.

**changeToRandom method**
* This function handles clicking on "Random colors" button by changing currentMode to random.

**changeToErase method**
* This function handles clicking on "Eraser" button by changing currentMode to normal and currentColor to the default clearing color of the class.

**changeMode method**
* Once one of the previously mentioned options are clicked this method is called to handle the css changes on these buttons.

### GridElem Class
A class for the grid/drawing board itself, the painting/clearing logic is handled here as well.

**Fields**
* size - contains the current size of the drawing board (number pixels = size*size)
* grid - the HTMLElement of the grid container
* domElem - the HTMLElement of the drawing board, the instance of the class itself, appended to the grid
* mouseDown - if the mouse is held down it's value is true, otherwise it's false by default

**initDom method**
* Creates the grid in the given size by using gridTemplate and stores the grid and it's each and every small cell as well. A mouseDown eventListener is added so the application remembers when it's pressed down.

**paintGrid method**
* If the mouse is clicked or hovered and pressed down at the same time the function receives the currentMode and currentColor and changes the backgroundColor of the affected small div. If the currentMode is random the backgroundColor will be a randomly generated color.

**clearGrid method**
* This function changes the backgroundColor of every small div inside the grid to default clearing color of the Paint class thus resetting/clearing the drawing board.

**sendAlert method**
* If the size limit has been exceeded an alert is sent to the user to use a valid value.

## Sequence memory
### Premise
Test your sequence memory! Click the shuffled color boxes in the original order to win in this color themed sequence memory mini game.

### Memory class
A class to handle the logic for the memory game, during initialization we'll see the whole application using multiple functions.

**initStart method**
* This method constructs the "home page" of the application, the user can choose a difficulty here. Once it's chosen the main game initialization begins.

**initDom method**
* This function initializes all the required values and displays them on the screen.

**initStats method**
* This function makes sure to keep track of the user's stats.

**initColors method**
* This method initializes the default three colors using Color class and shuffles them after 4 seconds.

**shuffleColors method**
* First a copy of the main colors list is created and then shuffled in order to prevent losing data, then the colors are added to the DOM in the shuffled order.

**colorCheck method**
* Checks if the clicked color is the right one in the current order, if not the user loses a life, if it is then they advance to the next one. If the user clicked all colors in the right order a new turn begins. If they lose all their lives, the game is over.

**initEnd method**
* Displays an endscreen with the users stats and a restart button. If it's clicked the initialization begins all over.

**startNextRound method**
* Once the next round has started the original order is shown again, this time with a new color. After 4 seconds the colors are shuffled and become clickable once again. The specific values are changed appropriately.

### Color class
* Contains the randomly generated color and its rgb values, it's original position.

**getData method**
* Once the data is fetched, it is returned for the constructor.

**fetchData method**
* Using a color api to get data from our randomly generated color.

**initDom method**
* Initializing the domElement of the class using the rgb values and applying eventListeners for the custom event.

**choose method**
* Custom event to store the instance of the class and to remove events