const grid = document.getElementById('grid')
let scoreDiv = document.getElementById('score')
const start = document.getElementById('start')
let currentSnake = [49,29,9]
const squares = []
const width = 20 // the width of our game
let timer  = 0
let intervalTime = 1000
let tail = 0
let direction = width // by default the snake goes down
let appleIndex = 0

let score = 0

for(let i = 0; i < 400; i++){
    let squar = document.createElement('div')
    squar.classList.add('default-squar')
    //squar.textContent=i
    grid.appendChild(squar)
    squares.push(squar)

}

//currentSnake.forEach(index => squares[index].classList.remove('default-squar'))
currentSnake.forEach(index => squares[index].classList.add('snake'))
squares[currentSnake[0]].classList.add('snake-head')
start.addEventListener('click',startGame)
function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[currentSnake[0]].classList.remove('snake-head')
    squares[appleIndex].classList.remove('apple')
    clearInterval(timer)
    currentSnake = [49,29,9]
    
    intervalTime = 1000
    direction = width
    score = 0
    scoreDiv.textContent = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    squares[currentSnake[0]].classList.add('snake-head')
    generateApple()
    timer = setInterval(move,intervalTime)
}
function move()
{
    if((currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
        return clearInterval(timer)
    }
    tail = currentSnake.pop() //remove first index of currentSnake array
    squares[tail].classList.remove('snake') // remove the background from tail
    squares[currentSnake[0]].classList.remove('snake-head')
    currentSnake.unshift(currentSnake[0] + direction) //add to snake array according to direction
    
    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        
        intervalTime = intervalTime * 0.9
        clearInterval(timer)
        timer = setInterval(move,intervalTime)
        score++
        scoreDiv.textContent = score;
    }
    squares[currentSnake[0]].classList.add('snake')
    squares[currentSnake[0]].classList.add('snake-head')
}
function controller(e){
    if(e.keyCode === 37){//turn the snake to left
        direction = -1
    }
    else if(e.keyCode === 38){//turn the snake to top
        direction = -width
    }
    else if(e.keyCode === 39){//turn the snake to right
        direction = 1
    }
    else if(e.keyCode === 40){//turn the snake to down
        direction = width
    }
}
document.addEventListener('keydown',controller)

function generateApple(){
    do{
        appleIndex = Math.floor(Math.random() * 400 )
    }while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
