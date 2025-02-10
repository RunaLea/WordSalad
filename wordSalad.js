// Array of letters on the grid
// 0 = unclicked
// 1 = clicked
// 2 = removed
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
let lastX;
let lastY;
let clickables = ["0-0","0-1","0-2","0-3","1-0","1-1","1-2","1-3","2-0","2-1","2-2","2-3","3-0","3-1","3-2","3-3"];
let lastClickables;
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
    // If the letter is not in clickables everything is unclicked
    let clickedLetter = (document.getElementById("box" + (boxNum+1)).innerText).toLowerCase();
    if(boxNum<4){
        if(clickables.includes(`${boxNum%4}-0`)){
            if(letterGrid[0][boxNum][1]=="0"){clickLetter(boxNum, clickedLetter, 0);}
            else if(letterGrid[0][boxNum][1]=="1"){
                if(lastClicked==clickedLetter){unclickLetter(boxNum, clickedLetter, 0)}
                else{resetClicks();}
            }
        }
        else{resetClicks();}  
    }
    else if(boxNum<8){
        if(clickables.includes(`${boxNum%4}-1`)){
            if(letterGrid[1][(boxNum%4)][1]=="0"){clickLetter(boxNum, clickedLetter, 1);}
            else if(letterGrid[1][(boxNum%4)][1]=="1"){
                if(lastClicked==clickedLetter){unclickLetter(boxNum, clickedLetter, 1);}
                else{resetClicks();}
            }
        }
        else{resetClicks();}
    }
    else if(boxNum<12){
        if(clickables.includes(`${boxNum%4}-2`)){
            if(letterGrid[2][(boxNum%4)][1]=="0"){clickLetter(boxNum, clickedLetter, 2);}
            else if(letterGrid[2][(boxNum%4)][1]=="1"){
                if(lastClicked==clickedLetter){unclickLetter(boxNum, clickedLetter, 2);}
                else{resetClicks();}
            }
        }
        else{resetClicks();}
    }
    else{
        if(clickables.includes(`${boxNum%4}-3`)){
            if(letterGrid[3][(boxNum%4)][1]=="0"){clickLetter(boxNum, clickedLetter, 3);}
            else if(letterGrid[3][(boxNum%4)][1]=="1"){
                if(lastClicked==clickedLetter){unclickLetter(boxNum, clickedLetter, 3);}
                else{resetClicks();}
            }
        }
        else{resetClicks();}
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
    console.log(`Words found: ${wordsFound.join(", ")}`);
    console.log(letterGrid);
}
function clickLetter(boxNum, clickedLetter, rowNum){
    // Changes the box to clicked
    letterGrid[rowNum][boxNum%4]=`${clickedLetter}1`;
    clickString += clickedLetter;
    document.getElementById("box" + (boxNum+1)).classList.remove("box");
    document.getElementById("box" + (boxNum+1)).classList.add("clickedBox");
    lastClicked = clickedLetter;
    lastX = (boxNum%4);
    lastY = rowNum;
    lastClickables = clickables;
    clickables = nearCheck();
    console.log(clickString);
    console.log(`Clickable letters: ${clickables}`);
    console.log(letterGrid);
}
function unclickLetter(boxNum, clickedLetter, rowNum){
    // Changes the box to unclicked
    letterGrid[rowNum][(boxNum%4)]=`${clickedLetter}0`;
    clickString = clickString.substring(0, clickString.length -1);
    document.getElementById("box" + (boxNum+1)).classList.remove("clickedBox");
    document.getElementById("box" + (boxNum+1)).classList.add("box");
    clickables = lastClickables;
    console.log(clickString);
    console.log(`Clickable letters: ${clickables}`)
    console.log(letterGrid);
}
function resetClicks(){
    // Resets all clicks that can be unclicked
    clickString="";
    clickables = ["0-0","0-1","0-2","0-3","1-0","1-1","1-2","1-3","2-0","2-1","2-2","2-3","3-0","3-1","3-2","3-3"];
    let z = 0;
    for(x=0;x<16;x++){
        let y = x % 4;
        if(letterGrid[z][y][1]!=2){
            letterGrid[z][y] = `${letterGrid[z][y][0]}0`;
            document.getElementById("box" + (x+1)).classList.remove("clickedBox");
            document.getElementById("box" + (x+1)).classList.add("box");
        }
        // Changes all boxes that are unclickable to be invisible
        else{
            document.getElementById("box" + (x+1)).classList.remove("clickedBox");
            document.getElementById("box" + (x+1)).classList.add("inactiveBox");
            document.getElementById("box" + (x+1)).onclick="";
        }
        if(y==3){z+=1;}
    }
}
function completeWord(){
    // Shows the newly completed word in a new element
    // Removes the completed word from the wordList
    newWord = document.createElement("div");
    document.getElementById("wordList").appendChild(newWord);
    newWord.className = "word";
    newWord.innerText = wordsFound[(wordsFound.length-1)];
    wordList.splice(wordList.indexOf(clickString),1);
    letterDel();
}
function nearCheck(){
    // Puts all clickable boxes around the last clicked number in an array
    let clickables = [];
    let a = -1;
    for(i=0;i<10;i++){
        let b = i % 3;
        y = (lastY)+a;
        x = (lastX)+(b-1);
        if(b==2){a+=1;}
        if(y>=0&&x>=0&&y<4&&x<4){clickables.push(`${x}-${y}`)};
    }
    return clickables;
}
function letterDel(){
    // Checks if the wordList has any words with the same letters as the completed word and adds them to doubles
    let doubles = [];
    for(i=0;i<clickString.length;i++){
        for(j=0;j<wordList.length;j++){
            if(wordList[j].includes(clickString[i])){doubles.push(clickString[i])};
        }
    }
    console.log("doubles: " + doubles);
    // Makes all letters that are not doubles uncklickable
    for(i=0;i<clickString.length;i++){
        if(doubles.includes(clickString[i])==false){
            for(j=0;j<4;j++){
                if(letterGrid[j].includes(`${clickString[i]}1`)){
                    for(k=0;k<4;k++){
                        if(letterGrid[j][k]==`${clickString[i]}1`){letterGrid[j][k]=`${clickString[i]}2`;}
                    }
                }
            }
        }
        // If there is a double that is not clicked, the double that is clicked becomes unclickable
        for(j=0;j<doubles.length;j++){
            for(k=0;k<4;k++){
                if(letterGrid[k].includes(`${doubles[j]}0`)){
                    let m = 0
                    for(l=0;l<16;l++){
                        let n = l % 4;
                        if(letterGrid[m][l]==`${doubles[j]}1`){letterGrid[m][l]=`${doubles[j]}2`;}
                        if(n==3){m+=1;}
                    }
                }
            }
        }
    }
    console.log(letterGrid);
}