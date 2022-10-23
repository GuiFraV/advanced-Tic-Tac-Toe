//Selectors :
const option = document.querySelectorAll('div.option');
const vsPlayer = document.getElementById('vs-player');
const vsCPU = document.getElementById('vs-cpu');
const buttonVsPlayer = document.getElementById('pick-mark');
const afterMakeChoice = document.querySelector('.after-make-choice');
const quitButton = document.getElementById('quit');
const playX = document.getElementById('xPlayer');
const playO = document.getElementById('oPlayer');

//Variables Globales:
const pOne = 'P1';
const pTwo = 'P2';
let player;
const cpu = ('CPU');
const pYou = ('YOU');
let a = [];
let currentIA = circleTurn ? xClass : oClass;

//Logiques :
changePosition();

function grabVsPlayer(){   

    select = 0;
    
    buttonVsPlayer.style.visibility = 'hidden';
    afterMakeChoice.style.visibility ='visible';

    if(player){
        playX.innerHTML = `(${pTwo})`;
        playO.innerHTML = `(${pOne})`;
    }else{
        playX.innerHTML = `(${pOne})`;
        playO.innerHTML = `(${pTwo})`;
    }
    
}

function grabVersusCpu(){
    
    grabVsPlayer();
    
    if(signIA() == xClass){
        easyCPU();
        playX.innerHTML = '(CPU)';
        playO.innerHTML = '(YOU)';
    }else{
        playX.innerHTML = '(YOU)';
        playO.innerHTML = '(CPU)';
    }
    
    select = 1;
    
}

function changePosition(){

    markPosition(player);
    
    tradeMark();

}


function markPosition(player){

    if(player){
        bar.style.left = '50%';
    }else{
        bar.style.left = '0%';
    }
}

function tradeMark(){

    player = !player;
}

function returnOption(){
    buttonVsPlayer.style.visibility = 'visible';
    afterMakeChoice.style.visibility ='hidden';
    resetBoard();
}

//Events :
option.forEach(option => option.addEventListener('click', changePosition));
vsPlayer.addEventListener('click', grabVsPlayer);
vsCPU.addEventListener('click', grabVersusCpu);
quitButton.addEventListener('click', returnOption);
