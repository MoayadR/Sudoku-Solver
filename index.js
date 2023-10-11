const body = document.getElementsByTagName('body')[0];
const choiceBtns = document.querySelectorAll('.game-choice-btn');
let solvingAlgo = 0

clearBody = (btn)=>{
    body.innerHTML = '';
    solvingAlgo = btn.dataset.id;
    console.log(solvingAlgo);
}

choiceBtns.forEach(element => {
    element.addEventListener('click' , clearBody.bind(null , element));
});

