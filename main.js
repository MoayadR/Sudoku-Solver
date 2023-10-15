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
    for(let column = 0 ; column <9 ; column++)
    {
        if (gameGrid[row][column].innerText == value)
        {
            return false;
        }
    }
    return true;
};

verticalCheck = (value , column) => {
    for(let row = 0 ; row <9 ; row++)
    {
        if (gameGrid[row][column].innerText == value)
        {
            return false;
        }
    }
    return true;
}

boxCheck = (value , row , column) => {
    let blockRowStart = Math.floor((row /3)) * 3;
    let blockColumnStart = Math.floor((column /3))  * 3;
    for (let i = blockRowStart; i < blockRowStart + 3; i++)
    {
        for (let j = blockColumnStart; j < blockColumnStart + 3; j++)
        {
            if (gameGrid[i][j].innerText == value)
            {
                return false;
            }
        }
    }
    return true;
};

getHorizontalCount = (value , row) => { 
    let count = 0;
    for(let column = 0 ; column <9 ; column++)
    {
        if (gameGrid[row][column].innerText == value)
        {
            count++;
        }
    }
    return count;
}

getVerticalCount = (value,column)=>{
    let count = 0;
    for(let row = 0 ; row <9 ; row++)
    {
        if (gameGrid[row][column].innerText == value)
        {
            count++;
        }
    }
    return count;
}

getBoxCount = (value , row , column) => {
    let blockRowStart = Math.floor((row /3)) * 3;
    let blockColumnStart = Math.floor((column /3))  * 3;
    let count = 0;
    for (let i = blockRowStart; i < blockRowStart + 3; i++)
    {
        for (let j = blockColumnStart; j < blockColumnStart + 3; j++)
        {
            if (gameGrid[i][j].innerText == value)
            {
                count++;
            }
        }
    }
    return count;
}

checkGameGridBeforStart = () => {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            let value = gameGrid[row][column].innerText ;
            if(value !== '')
            {
                if(getHorizontalCount(value , row) == 1 && getVerticalCount(value , column) == 1 && getBoxCount(value , row,column) == 1 )
                {
                    continue;
                }
                return false;
            }
        }
    }   
    return true; 
}


function isSafe(row, col, num)
{
    if(!horizontalCheck(num , row))
    {
        return false;
    }

    if(!verticalCheck(num , col)){
        return false;
    }

    if(!boxCheck(num , row , col))
    {
        return false;
    
    }
    return true;
}


function solveSudoku(row, col)
{
     
    if (row == 8 && col == 9)
        return true;

    if (col == 9)
    {
        row++;
        col = 0;
    }
    if (gameGrid[row][col].innerText != '')
        return solveSudoku(row, col + 1);
 
    for(let guess = 1; guess <= 9; guess++)
    {

        if (isSafe( row, col, guess))
        {
            gameGrid[row][col].innerText = guess;
            if (solveSudoku( row, col + 1))
                return true;
        }
         
        gameGrid[row][col].innerText = '';
    }
    return false;
}

solvingAlgorithm = ()=>{
    if(!checkGameGridBeforStart())
    {
        alert("Wrong Game Table input");
        return;
    }

    solveSudoku(0 , 0);
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