//Selectors
const cellElements = document.querySelectorAll('[data-cell]'); // Sélectionne toutes les cellules du morpions.
const displaySign = document.getElementById('sign'); // Sélecteur du tour en cour.
const boardGame = document.getElementById('board-game'); // Variable qui sélectionne le baord-game.
const reset = document.getElementById('reset'); // Sélectionne le boutton reset.
const nextButton = document.getElementById('next');
const opaScreen = document.getElementById('screen');
const winScreen = document.getElementById('winning-screen');
const xScore = document.getElementById('x-score');
const oScore = document.getElementById('o-score');
const fooSpan = document.querySelector('.foo span');
const fooDiv = document.querySelector('#winning-screen p');
const foo = document.querySelector('.foo div');
const tieScore = document.querySelector('#tie-score');
const bar = document.querySelector('.bar-grey');
const winningCondition = [ // Condition de victoire une case correspond à un index dans l'Array.
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Variables globales:
let circleTurn; // Booléen qui sert à définir le tour en cours.
const oClass = 'o'; // Variable qui stocke le string 'o' à ajouter dans les class.
const xClass = 'x'; // Variable qui stocke le string 'x' à ajouter dans les class.
let scoreX = 0;
let scoreO = 0;
let scoreTie = 0;
let count = 0;

let select;

//Logiques
startGame();

function startGame(){   // Function de début de game.

    circleTurn = false; // Pour le 1er tour X commence en 1er.

    // Reset de toutes les classes afin d'avoir un board vide 
    xScore.innerHTML = scoreX;
    oScore.innerHTML = scoreO;
    tieScore.innerHTML = scoreTie;
    winScreen.style.visibility = 'hidden';
    opaScreen.style.visibility = 'hidden';
    winScreen.classList.remove('tie');
    foo.classList.remove('imgX');
    fooSpan.classList.remove('winX');
    foo.classList.remove('imgO');
    fooSpan.classList.remove('winO');
    fooSpan.innerHTML = '';
    fooDiv.innerHTML = ''

    //Events
    cellElements.forEach( cell => {
        //Pour chaque cases du morpions ajoute un événement au click
        cell.addEventListener('click', handleClick, {once:true});
    })

    reset.addEventListener('click', resetBoard);

    nextButton.addEventListener('click', resetBoard);  
    
    turnSign();

    boardHoverClass(); // Permet d'activer le X hover lors du 1er tours
    
}

function resetBoard(){
    cellElements.forEach( el => {
        el.classList.remove(xClass);
        el.classList.remove(oClass);
        el.classList.remove('win');
    });
    count = 0;
    if(signIA() == xClass){
        easyCPU();
    }
    startGame();

};

function handleClick(e){ // function principale à chaque clique souris
    
    let cell = e.target; // Sélectionne la cellule sur laquelle il y a un clique dessus.

    let currentClass = circleTurn ? oClass : xClass; // Si le circleTurn est à true alors c'est au tour de X de jouer, sinon O.

    if(select == 1){

        setTimeout(() => {easyCPU()}, 10);

        playVsIa(cell);

        checkWin(oClass) || checkWin(xClass);

    }else {

        playAtTurn(cell, currentClass); // Function qui prend en paramètre la cellule et la class en cours (soit x, soit o).
    
        swapTurn(); // Le 1er tour la varialbe est à true, au prochain click elle sera à false est donc modifiera le signe en cours (soit x, soit o).
        
        turnSign(); // Function qui affiche le signe du tour en cours.
        
        boardHoverClass(); // Permet d'activer le hover en fonction du tour en cours.
        
        checkWin(currentClass);
    }
    
}


function easyCPU(){

    getEmptyCells();
    
    const emptyCells = getEmptyCells(); 
    const randomNumber = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    randomNumber.classList.add(signIA());
    checkWin(oClass) || checkWin(xClass);
    
}

function getEmptyCells() {
	const cellsArray = Array.from(cellElements);

	return cellsArray.filter(
		cell => !cell.classList.contains('x') && !cell.classList.contains('o')
	);
}

function playVsIa(cell){

    if(signIA() == oClass){

        cell.classList.add(xClass);

    }else {

        cell.classList.add(oClass);

    }

}

function signIA(){
        
    let style = bar.style.left;

    if(style == '0%'){

        boardGame.classList.add(xClass);
        boardGame.classList.remove(oClass);
        displaySign.classList.add(xClass);


        return oClass;

    }else {

        boardGame.classList.add(oClass);
        boardGame.classList.remove(xClass);
        displaySign.classList.add(oClass);


        return xClass;
    }
}

function turnSign(){

    displaySign.classList.remove(xClass);

    displaySign.classList.remove(oClass);

    if(circleTurn){

        displaySign.classList.add(oClass);

    }else {

        displaySign.classList.add(xClass);

    }

}

function playAtTurn(cell, currentClass){

    cell.classList.add(currentClass); // Sur la cellule qui est cliqué ajoute la class en cours (soit x, soit o). 
    
}

function boardHoverClass(){
    
    boardGame.classList.remove(xClass);

    boardGame.classList.remove(oClass);
    
    if(circleTurn){

        boardGame.classList.add(oClass);

    }else {

        boardGame.classList.add(xClass);

    }  

}

function swapTurn(){

    circleTurn = !circleTurn;

}

function winning(currentClass){

    return winningCondition.some(el=> {

        return el.every(index => {

            let result = (cellElements[index].classList.contains(currentClass));

            return result; 
            // Va regarder dans chaque cellule si c'est bien la même classe en fonction de la combinaison gagnante            
        
        });
    });
};


function checkWin(currentClass){

    for(let i = 0; i< 9; i++){ // Compteur lorsque le compteur est à 81 il considère que c'est un TIE
        count = count + 1;
    }

    if(winning(currentClass)){

        // First horizontal Line
        if([...cellElements][0].classList[1] == [...cellElements][1].classList[1] && [...cellElements][1].classList[1] == [...cellElements][2].classList[1]){

            [...cellElements][0].classList.add('win');
            [...cellElements][1].classList.add('win');
            [...cellElements][2].classList.add('win');

        }

        //Second horizontal Line
        if([...cellElements][3].classList[1] == [...cellElements][4].classList[1] && [...cellElements][4].classList[1] == [...cellElements][5].classList[1]){

            [...cellElements][3].classList.add('win');
            [...cellElements][4].classList.add('win');
            [...cellElements][5].classList.add('win');
            count = 0;
        }

        //Third horizontal Line
        if([...cellElements][6].classList[1] == [...cellElements][7].classList[1] && [...cellElements][7].classList[1] == [...cellElements][8].classList[1]){

            [...cellElements][6].classList.add('win');
            [...cellElements][7].classList.add('win');
            [...cellElements][8].classList.add('win');
            count = 0;
        }

        // First Vertical Line
        if([...cellElements][0].classList[1] == [...cellElements][3].classList[1] && [...cellElements][3].classList[1] == [...cellElements][6].classList[1]){

            [...cellElements][0].classList.add('win');
            [...cellElements][3].classList.add('win');
            [...cellElements][6].classList.add('win');
            count = 0; 
        }

        // Second Vertical Line
        if([...cellElements][1].classList[1] == [...cellElements][4].classList[1] && [...cellElements][4].classList[1] == [...cellElements][7].classList[1]){

            [...cellElements][1].classList.add('win');
            [...cellElements][4].classList.add('win');
            [...cellElements][7].classList.add('win');
            count = 0;
        }

        // Third Vertical Line
        if([...cellElements][2].classList[1] == [...cellElements][5].classList[1] && [...cellElements][5].classList[1] == [...cellElements][8].classList[1]){

            [...cellElements][2].classList.add('win');
            [...cellElements][5].classList.add('win');
            [...cellElements][8].classList.add('win');
            count = 0;
        }

        // First Diagonal Line
        if([...cellElements][0].classList[1] == [...cellElements][4].classList[1] && [...cellElements][4].classList[1] == [...cellElements][8].classList[1]){

            [...cellElements][0].classList.add('win');
            [...cellElements][4].classList.add('win');
            [...cellElements][8].classList.add('win');
            count = 0;
        }

        // Second Diagonal Line
        if([...cellElements][2].classList[1] == [...cellElements][4].classList[1] && [...cellElements][4].classList[1] == [...cellElements][6].classList[1]){

            [...cellElements][2].classList.add('win');
            [...cellElements][4].classList.add('win');
            [...cellElements][6].classList.add('win');
            count = 0;
        }       

        screenFunctionWin(currentClass);

    }  

    // Gestion des parties nuls:  
    if(select == 1){

        if(count == 162 ){
            const fooSpan = document.querySelector('.foo span');
    
            fooSpan.innerHTML = 'ROUND TIED';
            opaScreen.style.visibility = 'visible';
            winScreen.style.visibility = 'visible';
            tieScore.innerHTML = scoreTie++;
            winScreen.classList.add('tie');
        }
    }else{

        if(count == 81){
            const fooSpan = document.querySelector('.foo span');
    
            fooSpan.innerHTML = 'ROUND TIED';
            opaScreen.style.visibility = 'visible';
            winScreen.style.visibility = 'visible';
            tieScore.innerHTML = scoreTie++;
            winScreen.classList.add('tie');
        }

    } 
    
}

function screenFunctionWin(currentClass){

    winScreen.style.visibility = 'visible';
    winScreen.classList.add('move-screen');
    opaScreen.style.visibility = 'visible';

    if(currentClass == 'x'){

        foo.classList.add('imgX');
        fooSpan.classList.add('winX');
        xScore.innerHTML = scoreX++;
        fooSpan.innerHTML = 'TAKES THE ROUND';
        fooDiv.innerHTML = 'PLAYER 1 WINS';

    }

    if(currentClass == 'o'){

        foo.classList.add('imgO');
        fooSpan.classList.add('winO');
        oScore.innerHTML = scoreO++;
        fooSpan.innerHTML = 'TAKES THE ROUND';
        fooDiv.innerHTML = 'PLAYER 2 WINS';
    }

}
