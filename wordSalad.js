// Array of letters on the grid
let letterGrid =[
        ["o0","n0","l0","o0"],
        ["h0","i0","p0","p0"],
        ["g0","r0","f0","e0"],
        ["a0","f0","b0","z0"]
    ];
lettersToGrid();
let clickString = "";

function lettersToGrid(){
    // Puts the letters of the array the boxes
    let z = 0;
    for(x=0;x<16;x++){
        let y = x % 4;
        document.getElementById("box"+(x+1)).innerHTML = letterGrid[z][y][0];
        // console.log("box"+(x+1),letterGrid[z][y])
        if(y==3){z+=1;}
    }
}
function clickToString(boxNum){
    // Gets the letter from the clicked box and adds it to the clickString
    // If the letter was already clicked before, it is removed from the clickString
    let boxID = "box" + (boxNum+1);
    let clickedLetter = (document.getElementById(boxID).innerText).toLowerCase();
    if(boxNum<4){
        if(letterGrid[0][boxNum][1]=="0"){
            letterGrid[0][boxNum]=`${clickedLetter}1`;
            clickString += clickedLetter;
        }
        else if(letterGrid[0][boxNum][1]=="1"){
            letterGrid[0][boxNum]=`${clickedLetter}0`;
            clickString = clickString.substring(0, clickString.length -1);
        }
    }
    else if(boxNum<8){
        if(letterGrid[1][(boxNum%4)][1]=="0"){
            letterGrid[1][(boxNum%4)]=`${clickedLetter}1`;
            clickString += clickedLetter;
        }
        else if(letterGrid[1][(boxNum%4)][1]=="1"){
            letterGrid[1][(boxNum%4)]=`${clickedLetter}0`;
            clickString = clickString.substring(0, clickString.length -1);
        }
    }
    else if(boxNum<12){
        if(letterGrid[2][(boxNum%4)][1]=="0"){
            letterGrid[2][(boxNum%4)]=`${clickedLetter}1`;
            clickString += clickedLetter;
        }
        else if(letterGrid[2][(boxNum%4)][1]=="1"){
            letterGrid[2][(boxNum%4)]=`${clickedLetter}0`;
            clickString = clickString.substring(0, clickString.length -1);
        }
    }
    else{
        if(letterGrid[3][(boxNum%4)][1]=="0"){
            letterGrid[3][(boxNum%4)]=`${clickedLetter}1`;
            clickString += clickedLetter;
        }
        else if(letterGrid[3][(boxNum%4)][1]=="1"){
            letterGrid[3][(boxNum%4)]=`${clickedLetter}0`;
            clickString = clickString.substring(0, clickString.length -1);
        }
    }

    console.log(letterGrid);
    console.log(clickString);
}