const grid = document.getElementById('grid')
let scoreDiv = document.getElementById('score')
const start = document.getElementById('start')
let currentSnake = [49,29,9] //the starts from top toward down
const squares = [] // array of all the ground boxes
const width = 20 // the width of our game
let timer  = 0 // default timer for snake speed
let intervalTime = 1000 // default speed for snake
const difficultyTimer = 2000 // default time for apple to be hidden when hard
let tail = 0 
let direction = width // by default the snake goes down
let appleIndex = 0
let dangerIndex = 0
let score = 0
const dangerLimit = 5 //every 5 scores, one danger point will be added
let dangerList = []
let difficulty = false // in hard difficulty the apple gets disapper

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
    dangerList.forEach(index => squares[index].classList.remove('danger'))
    if(document.getElementById('hard').checked){
        difficulty = true
    }
    clearInterval(timer)
    currentSnake = [49,29,9]
    dangerList = []
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
        squares[currentSnake[0] + direction].classList.contains('snake') ||
        squares[currentSnake[0] + direction].classList.contains('danger')
    ){
        return clearInterval(timer)
    }
    tail = currentSnake.pop() //remove first index of currentSnake array
    squares[tail].classList.remove('snake') // remove the background from tail
    squares[currentSnake[0]].classList.remove('snake-head')
    currentSnake.unshift(currentSnake[0] + direction) //add to snake array according to direction
    
    if(squares[currentSnake[0]].classList.contains('apple')){//hit the apple
        squares[currentSnake[0]].classList.remove('apple')
        squares[currentSnake[0]].style=''
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        if(difficulty){
            score+=2
        }else{
            score++
        }
        generateApple()
        if(score % dangerLimit === 0){//for every 5 scores, add one danger point
            generateDangerPoint()
        }
        intervalTime = intervalTime * 0.9
        clearInterval(timer)
        timer = setInterval(move,intervalTime)
        
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
    if(difficulty){
        let hideId = setTimeout(hideApple,difficultyTimer)
    }
}
function generateDangerPoint(){
    do{
        dangerIndex = Math.floor(Math.random() * 400 )
    }while(squares[dangerIndex].classList.contains('snake') && 
            squares[dangerIndex].classList.contains('apple') && 
            squares[dangerIndex].classList.contains('danger')
        )
    squares[dangerIndex].classList.add('danger')
    dangerList.push(dangerIndex)
}
function hideApple(){
    squares[appleIndex].style.background = 'white'
}