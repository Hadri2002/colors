const size = 8;
const step = 20;

let r = Math.floor(Math.random()*255);
let g = Math.floor(Math.random()*255);
let b = Math.floor(Math.random()*255);

function colorIsGood(color){
    if(color < 128){
        while((255 - color) < size*step){
            color = Math.floor(Math.random()*255);
            console.log("Váltottam!" + color)
        }
    }
    else{
        while(color < size*step){
            color = Math.floor(Math.random()*255);
            console.log("Váltottam!" + color);
        }
    } 
    return color;  
}

r = colorIsGood(r);
g = colorIsGood(g);
b = colorIsGood(b);


function getdif(color){
    let dif;
    if(color < 255-(size*step)){
        dif = 255-color;
        console.log(color + " Kisebb voltam 180-nál");
        //felfele megyek
    }
    else{
        dif = -1 * color;
        console.log(color + " Nagyobb voltam 180-nál");
        //lefele megyek
    }
    console.log("dif:" + dif);
    let amount; 
    
    if(dif > 0){
        amount = (size*step) + Math.floor(Math.random()*(dif-(size*step)));
        console.log("Eredeti amount:" + amount);
    }
    else{
        amount = -1*size*step + Math.floor(Math.random()*(dif+(size*step)));
        console.log("Eredeti amount:" + amount);
    }
    amount = Math.floor(amount / size);
    console.log("Final amount: " + amount);

    return amount;
}

let rdif = getdif(r);
let gdif = getdif(g);
let bdif = getdif(b);

const colors = [];
for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
        
        
        let ract = r + (i * rdif)
        let bact = b + (j * bdif);
        let gact;
        if(i <= j){
            gact = g + (j * gdif)
        }
        else{
            gact = g + (i * gdif);
        }
        colors.push([ract, gact, bact]);
    }
}



const containerElem = document.createElement('div');
        containerElem.className = "picture-matching-container";

        containerElem.appendChild(document.createElement('div'));
        containerElem.lastChild.className = "picture-matching-ghost";

        containerElem.lastChild.appendChild(document.createElement('div'));
        containerElem.lastChild.lastChild.className = "picture-matching-grid";
        
        this.gridElem = containerElem.lastChild.lastChild;
        this.gridElem.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        this.gridElem.style.gridTemplateRows = `repeat(${size}, 1fr)`;

document.querySelector('body').appendChild(containerElem);

for(let i = 0; i < colors.length; i++){
    this.gridElem.appendChild(document.createElement('div'));
    this.gridElem.lastChild.style.backgroundColor = `rgb(${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`;
}
