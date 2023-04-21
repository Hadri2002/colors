const size = 12;
const step = 20;

let r = Math.floor(Math.random()*255);
let g = Math.floor(Math.random()*255);
let b = Math.floor(Math.random()*255);

console.log(r);
console.log(g);
console.log(b);

function colorCheck(color){
    console.log("Bevett szín: " + color);
    if(color < 255 - (size*step) || color > size*step){
        console.log("Visszaadom: " + color);
        return color;
    }
    else {
        color = Math.floor(Math.random()*255);
        console.log("Váltottam!" + color);
        color = colorCheck(color);
    }
    return color;
}

r = colorCheck(r);
g = colorCheck(g);
b = colorCheck(b);

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
        if(i < j){
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

for(let i = 0; i < colors.length; i++){
    for(let j = 0; j < colors.length; j++){
        if(i != j){
            if(this.gridElem.childNodes[i].style.backgroundColor == this.gridElem.childNodes[j].style.backgroundColor){
                console.log("UGYANAZ!");
            }
        }
    }
}
