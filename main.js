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

horizontalCheck = (value , row) => {
    let counter = 0;
    for(let column = 0 ; column <9 ; column++)
    {
        if (gameGrid[row][column].innerText === value)
        {
            counter += 1;
        }
    }
    return counter > 1 ? false : true;
};

verticalCheck = (value , column) => {
    let counter = 0;
    for(let row = 0 ; row <9 ; row++)
    {
        if (gameGrid[row][column].innerText === value)
        {
            counter += 1;
        }
    }
    return counter > 1 ? false : true;
}

boxCheck = (value , row , column) => {
    let blockRowStart = Math.floor((row /3)) * 3;
    let blockColumnStart = Math.floor((column /3))  * 3;
    let counter = 0;
    for (let i = blockRowStart; i < blockRowStart + 3; i++)
    {
        for (let j = blockColumnStart; j < blockColumnStart + 3; j++)
        {
            if (gameGrid[i][j].innerText === value)
            {
                counter += 1;
            }
        }
    }
    return counter > 1 ? false : true;
}

checkGameGridBeforStart = () => {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            let value = gameGrid[row][column].innerText ;
            if(value !== '')
            {
                if(horizontalCheck(value , row ) && verticalCheck(value, column) && boxCheck(value , row , column))
                {
                    continue;
                }
                return false;
            }
        }
    }   
    return true; 
}

solvingAlgorithm = ()=>{
    if(!checkGameGridBeforStart())
    {
        alert("Wrong Game Table input");
        return;
    }

    // solving algo logic

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