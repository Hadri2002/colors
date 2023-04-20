const size = 9;

let r = Math.floor(Math.random()*255);
let g = Math.floor(Math.random()*255);
let b = Math.floor(Math.random()*255);
//meg kéne nézni hogy a létrehozott színből kijöhet-e egyáltalán az átmenet

function getdif(color){
    let dif;
    if(color < 255-(size*15)){
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
        amount = size*15 + Math.floor(Math.random()*(dif-size*15));
        console.log("Eredeti amount:" + amount);
        /*while(amount < size*15){
            amount = size*15 + Math.floor(Math.random()*(dif-75));
            console.log("Változtatott amount:" + amount);
        }*/
    }
    else{
        amount = size*-15 + Math.floor(Math.random()*(dif+size*15));

        console.log("Eredeti amount:" + amount);
        /*while(amount > size*-15){
        amount = -size*15 + Math.floor(Math.random()*(dif+75));
        console.log("Változtatott amount:" + amount);
    }*/
    }
    amount = Math.floor(amount / size);
    console.log("Final amount: " + amount);
    //console.log(color);
    //console.log(amount);
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
