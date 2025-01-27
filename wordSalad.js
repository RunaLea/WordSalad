// Array of letters on the grid
let letterGrid =[
        ["o0","n0","l0","o0"],
        ["h0","i0","p0","p0"],
        ["g0","r0","f0","e0"],
        ["a0","f0","b0","z0"]
    ];
let wordList = ["hippo", "giraffe", "rhino", "zebra", "lion"]
let wordsFound = [];
let clickString = "";
let lastClicked;

lettersToGrid();
function lettersToGrid(){
    // Puts the letters of the array the boxes
    let z = 0;
    for(x=0;x<16;x++){
        let y = x % 4;
        document.getElementById("box"+(x+1)).innerHTML = letterGrid[z][y][0];
        if(y==3){z+=1;};
    }
}
function clickToString(boxNum){
    // Gets the letter from the clicked box and adds it to the clickString
    // If the letter was already clicked before, it is removed from the clickString
    // If the letter was clicked before but it is not the last clicked everything is unclicked
    let clickedLetter = (document.getElementById("box" + (boxNum+1)).innerText).toLowerCase();
    
    if(boxNum<4){
        if(letterGrid[0][boxNum][1]=="0"){clickLetter(boxNum, clickedLetter, 0);}
        else if(letterGrid[0][boxNum][1]=="1"){
            if(lastClicked==clickedLetter){unclickLetter(boxNum, clickedLetter, 0)}
            else{resetClicks();}
        }
    }
    else if(boxNum<8){
        if(letterGrid[1][(boxNum%4)][1]=="0"){clickLetter(boxNum, clickedLetter, 1);}
        else if(letterGrid[1][(boxNum%4)][1]=="1"){
            if(lastClicked==clickedLetter){unclickLetter(boxNum, clickedLetter, 1);}
            else{resetClicks();}
        }
    }
    else if(boxNum<12){
        if(letterGrid[2][(boxNum%4)][1]=="0"){clickLetter(boxNum, clickedLetter, 2);}
        else if(letterGrid[2][(boxNum%4)][1]=="1"){
            if(lastClicked==clickedLetter){unclickLetter(boxNum, clickedLetter, 2);}
            else{resetClicks();}
        }
    }
    else{
        if(letterGrid[3][(boxNum%4)][1]=="0"){clickLetter(boxNum, clickedLetter, 3);}
        else if(letterGrid[3][(boxNum%4)][1]=="1"){
            if(lastClicked==clickedLetter){unclickLetter(boxNum, clickedLetter, 3);}
            else{resetClicks();}
        }
    }
    wordCheck();
}
function wordCheck(){
    // If the word is in the wordList the word is added to the wordsFound
    if(wordList.includes(clickString)){
        console.log(`The word ${clickString} is found!`);
        wordsFound.push(clickString);
        completeWord();
        // Makes the board unclickable for a duration
        for(x=0;x<16;x++){
            document.getElementById("box"+(x+1)).style.pointerEvents = "none";
        }
        setTimeout(()=>{unlockBoard();}, 500);
    }
}
function unlockBoard(){
    // Makes the board clickable
    for(x=0;x<16;x++){
        document.getElementById("box"+(x+1)).style.pointerEvents = "all";
    }
    resetClicks();
    console.log(`Words found: ${wordsFound.join(" ")}`);
    console.log(letterGrid);
}
function clickLetter(boxNum, clickedLetter, rowNum){
    // Changes the box to clicked
    letterGrid[rowNum][boxNum%4]=`${clickedLetter}1`;
    clickString += clickedLetter;
    document.getElementById("box" + (boxNum+1)).classList.remove("box");
    document.getElementById("box" + (boxNum+1)).classList.add("clickedBox");
    lastClicked = clickedLetter;
    console.log(letterGrid);
    console.log(clickString);
}
function unclickLetter(boxNum, clickedLetter, rowNum){
    // Changes the box to unclicked
    letterGrid[rowNum][(boxNum%4)]=`${clickedLetter}0`;
    clickString = clickString.substring(0, clickString.length -1);
    document.getElementById("box" + (boxNum+1)).classList.remove("clickedBox");
    document.getElementById("box" + (boxNum+1)).classList.add("box");
    console.log(letterGrid);
    console.log(clickString);
}
function resetClicks(){
    // Resets all clicks
    clickString="";
    let z = 0;
    for(x=0;x<16;x++){
        let y = x % 4;
        letterGrid[z][y] = `${letterGrid[z][y][0]}0`;
        document.getElementById("box" + (x+1)).classList.remove("clickedBox");
        document.getElementById("box" + (x+1)).classList.add("box");
        if(y==3){z+=1;};
    }
}
function completeWord(){
    // Shows the newly completed word in a new element
    newWord = document.createElement("div");
    document.getElementById("wordList").appendChild(newWord);
    newWord.className = "word";
    newWord.innerText = wordsFound[(wordsFound.length-1)];
}