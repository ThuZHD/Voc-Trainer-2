window.onload = function() {
    test();
}

async function test() {
    await import("./voc.json")
    console.log(data)
}

let buttons = [
    "#btn1",
    "#btn2",
    "#btn3",
    "#btn4",
]

let buttonsReplace = [
    "btn1",
    "btn2",
    "btn3",
    "btn4",
]

const url = "https://api.thecatapi.com/v1/images/search";

let amount

let score = 0;

let number

let order

let scoreable

let availableNewVoc = true;

let rightSolution


let used1
let used2
let used3
let used4


function loadNewVoc() {
    if(availableNewVoc === true) {
        scoreable = true;

        availableNewVoc = false;
    
        number = Math.floor(Math.random() * amount);

        document.getElementById("GermanTexts").innerHTML = german[number];

        order = Math.floor(Math.random() * 4);

        rightSolution = number;
        
        resetToDefault();
        
        newVoc(0);
        newVoc(1);
        newVoc(2);
        newVoc(3);
    }
}

function newVoc(x) {
    if(order === x) {
        insertVoc(x, number);
    }
    else {
        while (true) {
            randomNum = Math.floor(Math.random() * amount);
            
            if(randomNum !== used1 && randomNum !== used2 && randomNum !== used3 && randomNum !== used4 && randomNum !== rightSolution) {
                insertVoc(x, randomNum);
            }
            break;
        }
    }
}

function insertVoc(x, y) {
    if(x === 0) {
        document.getElementById("btn1").innerHTML = french[y];
        used1 = y;
    }

    if(x === 1) {
        document.getElementById("btn2").innerHTML = french[y];
        used2 = y;
    }

    if(x === 2) {
        document.getElementById("btn3").innerHTML = french[y];
        used3 = y;
    }

    if(x === 3) {
        document.getElementById("btn4").innerHTML = french[y];
        used4 = y;
    }
}

function resetToDefault() {
    const btn1 = document.getElementById("answer1");
    btn1.style.backgroundColor = "rgb(15, 22, 119)";
    btn1.style.borderColor = "rgb(17, 60, 139)";
    const btn2 = document.getElementById("answer2");
    btn2.style.backgroundColor = "rgb(15, 22, 119)";
    btn2.style.borderColor = "rgb(17, 60, 139)";
    const btn3 = document.getElementById("answer3");
    btn3.style.backgroundColor = "rgb(15, 22, 119)";
    btn3.style.borderColor = "rgb(17, 60, 139)";
    const btn4 = document.getElementById("answer4");
    btn4.style.backgroundColor = "rgb(15, 22, 119)";
    btn4.style.borderColor = "rgb(17, 60, 139)";
    document.getElementById("result").innerHTML = "";
    
    document.getElementById("btnStart").innerHTML = "Load new voc";

    document.getElementById("catIMG").src = "";

    console.log("nigga");
}

function solution(x){
    availableNewVoc = true;
    
    if(x === order){
        //console.log("right solution");
        
        if(scoreable === true){
            score = score + 1;
            document.getElementById("score").innerHTML = "Score: " + score;
            scoreable = false;

            let testVariable = document.querySelector(buttons[x]);
            testVariable.style.backgroundColor = "green";
            testVariable.style.borderColor = "rgb(26, 136, 40)";
            positiveAnswer();
        }
    }
    else{
        //console.log("wrong solution");

        if(scoreable === true){
            score = score - 1;
            document.getElementById("score").innerHTML = "Score: " + score;
            scoreable = false;
            
            let testVariable = document.querySelector(buttons[x]);
            testVariable.style.backgroundColor = "red";
            testVariable.style.borderColor = "rgb(153, 9, 2)";

            let testVariable2 = document.querySelector(buttons[order]);
            testVariable2.style.backgroundColor = "green";
            testVariable2.style.borderColor = "rgb(26, 136, 40)";

            negativeAnswer();
        }
    }
}

function positiveAnswer() {
    randomNum = Math.floor(Math.random() * 7);

    document.getElementById("result").innerHTML = positiveAnswers[randomNum];

    //console.log(randomNum);

    getCat();
}

function negativeAnswer() {
    randomNum = Math.floor(Math.random() * 7);

    document.getElementById("result").innerHTML = negativeAnswers[randomNum];

    console.log(randomNum);
}

async function getCat() {
    let res = await fetch(url);

    let data = await res.json();

    let catURL = data["0"]["url"];

    document.getElementById("catIMG").src = catURL;
}