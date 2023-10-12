const body = document.getElementsByTagName('body')[0];
const choiceBtns = document.querySelectorAll('.game-choice-btn');
const validChars = ['1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9'] ;
let gameGridDiv = document.querySelector('.game-grid-div');
let gameGrid = [[] , [] , [] , [] , [] , [] , [] , [] , []];
let solvingAlgoType = 0;
let solveBtn = null;
let currentBtn = null;

clearBody = (btn)=>{
    body.innerHTML = '';
    solvingAlgoType = btn.dataset.id;
    createGameGridDiv();
    createGridBoxes();
    createSolveDiv();
};

createGameGridDiv = () => {
    gameGridDiv = document.createElement('div');
    gameGridDiv.className = 'game-grid-div';
    body.appendChild(gameGridDiv);
};

createGridBoxes = () => {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            btn = document.createElement('button');
            btn.className = 'game-cell';
            btn.addEventListener('click' , changeCurrentBtn.bind(null , btn) )
            gameGridDiv.append(btn);
            gameGrid[row][column] = btn;
        }
        
    }
};

createSolveDiv = () => {
    div = document.createElement('div');
    div.className = 'solve-div';
    div.style.display = 'block';
    solveBtn = document.createElement('button');
    solveBtn.className = 'solve-btn';
    solveBtn.innerText = 'Solve'

    solveBtn.addEventListener('click' , solvingAlgorithm );

    div.appendChild(solveBtn);
    body.appendChild(div);
};

changeCurrentBtn = (btn) => {
    if (currentBtn !== null){
        currentBtn.style.background = 'white';
    }
    currentBtn = btn;
    currentBtn.style.background = 'beige';
};

validateCharInput = (value) => {
    if (validChars.includes(value)){
        return true;
    }
    return false;
}

validateDelInput = (value) => {
    if (value === 'Backspace' || value === 'Delete'){
        return true;
    }
    return false;
}

solvingAlgorithm = ()=>{
    console.log("Solving Now");
}


main = () => {
    choiceBtns.forEach(element => {
        element.addEventListener('click' , clearBody.bind(null , element));
    });    

    body.addEventListener('keydown' , (ev) => {
        if (validateCharInput(ev.key))
        {
            if (currentBtn != null)
            {
                currentBtn.innerText = ev.key;
            }
        }
        else if(validateDelInput(ev.key))
        {
            if (currentBtn != null)
            {
                currentBtn.innerText = '';
            }
        }
    });


}

main();