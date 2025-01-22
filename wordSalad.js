let letterGrid =[
        ["a","b","c","d"],
        ["e","f","g","h"],
        ["i","j","k","l"],
        ["m","n","o","p"]
    ];
let z = 0;
for(x=0;x<16;x++){
    let y = x % 4;
    document.getElementById("box"+(x+1)).innerHTML = letterGrid[z][y];
    console.log("box"+(x+1),letterGrid[z][y])
    if(y==3){z+=1;}
}