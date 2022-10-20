//Selectors :
const option = document.querySelectorAll('div.option');
const vsPlayer = document.getElementById('vs-player');
const vsCPU = document.getElementById('vs-cpu');
const buttonVsPlayer = document.getElementById('pick-mark');
const afterMakeChoice = document.querySelector('.after-make-choice');
const quitButton = document.getElementById('quit');
const bar = document.querySelector('.bar-grey');
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
markPosition(player);

function grabVsPlayer(){   

    select = 0;
    
    buttonVsPlayer.style.visibility = 'hidden';
    afterMakeChoice.style.visibility ='visible';
    
}

function grabVersusCpu(){
    
    grabVsPlayer();
    easyCPU(currentIA);
    
    select = 1;
}

//For Players :
function changePosition(){
    
    markPosition(player);
    
    tradeMark();

}


function markPosition(player){
    const bar = document.querySelector('div.bar-grey');

    if(player){
        bar.style.left = '50%';
        playX.innerHTML = `(${pTwo})`;
        playO.innerHTML = `(${pOne})`;
    }else{
        playX.innerHTML = `(${pOne})`;
        playO.innerHTML = `(${pTwo})`;
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

function easyCPU(currentIA){

    getEmptyCells()
    
    const emptyCells = getEmptyCells(); 
    const randomNumber = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    randomNumber.classList.add(currentIA);
    
}

function getEmptyCells() {
	const cellsArray = Array.from(cellElements);

	return cellsArray.filter(
		cell => !cell.classList.contains('x') && !cell.classList.contains('o')
	);
}

//Events :
option.forEach(option => option.addEventListener('click', changePosition));
vsPlayer.addEventListener('click', grabVsPlayer);
vsCPU.addEventListener('click', grabVersusCpu);
quitButton.addEventListener('click', returnOption);
