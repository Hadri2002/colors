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
