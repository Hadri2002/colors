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

## Paint
### Premise
Simple pixel art, draw anything by switching between a custom color of your choice and randomly generated colors! You can also erase your mistakes or adjust the number of pixels on the board.

kephelye


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


**InitDom method**
* Creates the backbone of the application by initializing the DOM and adds eventListeners to each option field. A default instance of the GridElem class (the drawing board itself) is called.

**addListenersToGrid**
* The required eventListeners for painting are added and handled inside this function, so the user can color by dragging and clicking as well.

**changeColor**
* If the user changes color on the palette, the currentMode is automatically set to default coloring mode and the currentColor is set to the chosen value.

**changeToColor**
* This function handles clicking on "Color" button by changing currentMode to normal and currentColor to the value the palette currently holds.

**changeToRandom**
* This function handles clicking on "Random colors" button by changing currentMode to random.

**changeToErase**
* This function handles clicking on "Eraser" button by changing currentMode to normal and currentColor to the default clearing color of the class.

**changeMode**
* Once one of the previously mentioned options are clicked this method is called to handle the css changes on these buttons.

### GridElem Class
A class for the grid/drawing board itself, the painting/clearing logic is handled here as well.

**Fields**
* size - contains the current size of the drawing board (number pixels = size*size)
* grid - the HTMLElement of the grid container
* domElem - the HTMLElement of the drawing board, the instance of the class itself, appended to the grid
* mouseDown - if the mouse is held down it's value is true, otherwise it's false by default

**initDom**
* Creates the grid in the given size by using gridTemplate and stores the grid and it's each and every small cell as well. A mouseDown eventListener is added so the application remembers when it's pressed down.

**paintGrid**
* If the mouse is clicked or hovered and pressed down at the same time the function receives the currentMode and currentColor and changes the backgroundColor of the affected small div. If the currentMode is random the backgroundColor will be a randomly generated color.

**clearGrid**
* This function changes the backgroundColor of every small div inside the grid to default clearing color of the Paint class thus resetting/clearing the drawing board.

**sendAlert**
* If the size limit has been exceeded an alert is sent to the user to use a valid value.