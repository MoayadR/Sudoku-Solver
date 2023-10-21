const body = document.getElementsByTagName('body')[0];
const choiceBtns = document.querySelectorAll('.game-choice-btn');
const validChars = ['1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9'] ;
let gameGridDiv = document.querySelector('.game-grid-div');
let gameGrid = [[] , [] , [] , [] , [] , [] , [] , [] , []];
let solvingAlgoType = 0;
let solveBtn = null;
let currentBtn = null;
let currentRow = null;
let currentColumn = null;



clearBody = (btn)=>{
    body.innerHTML = '';
    solvingAlgoType = btn.dataset.id;

    if (solvingAlgoType == 1)
    {
        setXColor = () =>{
            return true;
        }

        xCheck = () => {
            return true;
        }
    }
    else
    {
        setXColor = (color) =>{
            let r = 0 , c=0;
            while(r<9 && c <9)
            {
                gameGrid[r][c].style.background = color;
                r+=1;
                c+=1;
            }
        
            r = 8 , c = 0;
            while(r>0 && c<9)
            {
                gameGrid[r][c].style.background = color;
                r-=1;
                c+=1;
            }
        
        };

        xCheck = () => {
            let map = [null , false,false,false,false,false,false,false,false,false]
            let r = 0 , c=0;
        
            while(r<9 && c <9)
            {
                if(gameGrid[r][c].innerText != '')
                {
                    if (map[gameGrid[r][c].innerText])
                    {
                        return false;
                    }
                    map[gameGrid[r][c].innerText] = true;   
                }
                r+=1;
                c+=1;
            }
        
            map = [null ,false,false,false,false,false,false,false,false,false];
        
            r = 8 , c = 0;
            while(r>=0 && c<9)
            {
                if(gameGrid[r][c].innerText != '')
                {
                    if (map[gameGrid[r][c].innerText])
                    {
                        return false;
                    }
                    map[gameGrid[r][c].innerText] = true;
                }
                r-=1;
                c+=1;
            }
        
            return true;  
        };

    }

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
            btn.addEventListener('click' , changeCurrentVariables.bind(null , btn , row , column) )
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

setCurrentRowColor = (color) => {
    if (currentRow != null)
    {
        for(let i = 0 ; i<9 ; i++)
        {
            gameGrid[currentRow][i].style.background = color;
        }
    }
    
};

setCurrentColumnColor = (color) => {
    if (currentColumn != null)
    {
        for(let i = 0 ; i<9 ; i++)
        {
            gameGrid[i][currentColumn].style.background = color;
        }
    }
};

setCurrentBlockColor = (color) => {
    if (currentColumn != null && currentRow != null)
    {
        let blockRowStart = Math.floor((currentRow /3)) * 3;
        let blockColumnStart = Math.floor((currentColumn /3))  * 3;
        for (let i = blockRowStart; i < blockRowStart + 3; i++)
        {
            for (let j = blockColumnStart; j < blockColumnStart + 3; j++)
            {
                gameGrid[i][j].style.background = color;
            }
        }
    }
};

changeCurrentVariables = (btn , row , column) => {
    setCurrentColumnColor('white');
    setCurrentRowColor('white');
    setCurrentBlockColor('white');

    currentBtn = btn;
    currentRow = row;
    currentColumn = column;


    setXColor('#E2DFD2');
    setCurrentColumnColor('#F3E5AB');
    setCurrentRowColor('#F3E5AB');
    setCurrentBlockColor('#F3E5AB');

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
                if(getHorizontalCount(value , row) != 1 && getVerticalCount(value , column) != 1 && getBoxCount(value , row,column) != 1 )
                {
                    return false;
                }

                if(!xCheck())
                {
                    return false;
                }
                
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

    if(!xCheck())
    {
        return false;
    }

    return true;
}


function initializeGuessTable(guessTable){
    for(let i =0 ; i<9 ; i++)
    {
        for(let j =0 ; j<9 ; j++)
        {
            if(gameGrid[i][j].innerText == '')
            {
                guessTable[i][j] = 1;
                continue;
            }
            guessTable[i][j] = -1;
        }
    }
}

function solveSudokuIterative(){
    let guessTable = [[0,0,0,0,0,0,0,0,0] , [0,0,0,0,0,0,0,0,0] , [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0] , [0,0,0,0,0,0,0,0,0] , [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0] , [0,0,0,0,0,0,0,0,0] , [0,0,0,0,0,0,0,0,0]];
    let r = 0;
    let c = 0;
    let back = false;

    initializeGuessTable(guessTable);

    while(r<9 && c < 9)
    {
        if(gameGrid[r][c].innerText == '' || guessTable[r][c] != -1 ) // empty or backtracked value
        {
            let value = guessTable[r][c];
            back = false;
            while(value < 10)
            {
                if(isSafe( r , c , value))
                {
                    guessTable[r][c] = value + 1;
                    gameGrid[r][c].innerText = value;
                    break;
                }

                value += 1;
            }

            if(value >= 10)
            {
                guessTable[r][c] = 1;
                gameGrid[r][c].innerText = '';
                // back
                back = true;
            }
        }

        if (back)
        {
            if(guessTable[r][c] != -1)
            {
                gameGrid[r][c].innerText = '';
            }
            c-=1;
            if(c<0)
            {
                r-=1;
                c=8;
            }
            continue;
        }

        c += 1;

        if (c == 9)
        {
            r+=1;
            c = 0;
        }


    }
};

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

    // solveSudoku(0 , 0);
    solveSudokuIterative();
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