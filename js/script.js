import { initController } from './controller.js';

const grid = document.getElementById('grid')
let scoreDiv = document.getElementById('score')
const start = document.getElementById('start')
const error = document.getElementById('error')
const width = 20 // the width of our game
const startSnake = Math.floor(width/2) // the starting point of snake, it will be in the middle of the first row
let currentSnake = [width*2+startSnake,width+startSnake,startSnake] //the starts from top toward down (squar index)
const squares = [] // array of all the ground boxes
//let timer  = 0 // default timer for snake speed
const difficultyTimer = 2000 // default time for apple to be hidden when hard
let tail = 0 
let direction = width // by default the snake goes down
let appleIndex = 0
let dangerIndex = 0
let score = 0
const dangerLimit = 2 //every 2 scores, one danger point will be added
let dangerList = []
let difficulty = false // in hard difficulty the apple gets disapper after specific time(difficultyTimer)
let default_speed = 1 // default speed for snake, 1 means 1 move per second, 2 means 2 moves per second
const speedIncrement = 0.2 // the speed of snake will increase by this value after each apple hit
let snake_speed = default_speed // the speed of snake, it will increase after each apple hit
document.documentElement.style.setProperty('--default-squar-width', width + 'px');
document.documentElement.style.setProperty('--default-squar-height', width + 'px');
document.documentElement.style.setProperty('--grid-box-width', (width * width) + 'px');

for(let i = 0; i < width * width; i++){
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
    error.textContent = ''
    //reset all the classes from prevoiuse game
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[currentSnake[0]].classList.remove('snake-head')
    squares[appleIndex].classList.remove('apple')
    dangerList.forEach(index => squares[index].classList.remove('danger'))
    if(document.getElementById('hard').checked){
        difficulty = true
    }else{
        difficulty = false
    }
    //clearInterval(timer)
    //set all default values
    currentSnake = [width*2+startSnake,width+startSnake,startSnake] 
    dangerList = []
    snake_speed = default_speed
    direction = width
    score = 0
    scoreDiv.textContent = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    squares[currentSnake[0]].classList.add('snake-head')
    generateApple()
    animationId = window.requestAnimationFrame(main)
    //timer = setInterval(move,intervalTime)
}

let lastRenderTime = 0

let animationId
function main(currentTime){
    animationId = window.requestAnimationFrame(main)// Call the main function again on the next animation frame, recursive call
    const secondsSincelastRender = (currentTime - lastRenderTime) / 1000 // calculate the time since last render in seconds
    if(secondsSincelastRender < 1/ snake_speed) return // if the time since last render is less than the time for one move, return and wait for the next frame
    
    lastRenderTime = currentTime
    move()
}



function move()
{
    /*
    0 ... 19
    20 ... 39
    40 ... 59 
    */
   let head = currentSnake[0]
    if((head + width >= width*width && direction === width) ||//check if snake reachs the most bottom row
        (head % width === width-1 && direction === 1) ||//check if snake reaches the most right column
        (head % width === 0 && direction === -1) ||
        (head - width < 0 && direction === -width) ||//check if snake reaches the first row
        squares[head + direction].classList.contains('snake') ||
        squares[head + direction].classList.contains('danger')
    ){
        error.textContent = 'Game over !!!'
        window.cancelAnimationFrame(animationId)
        return
        //return clearInterval(timer)
    }
    tail = currentSnake.pop() //remove last index of currentSnake array
    squares[tail].classList.remove('snake') // remove the background from tail
    squares[currentSnake[0]].classList.remove('snake-head')
    currentSnake.unshift(currentSnake[0] + direction) //add to snake array according to direction as first index
    squares[currentSnake[0]].classList.add('snake')
    squares[currentSnake[0]].classList.add('snake-head')

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
        if(score % dangerLimit === 0){//for every 2 scores, add one danger point
            generateDangerPoint()
        }
        snake_speed += speedIncrement
        //intervalTime = intervalTime * 0.9
        //clearInterval(timer)
        //timer = setInterval(move,intervalTime)//recursive call
        
        scoreDiv.textContent = score;
        
    }
    
}

function generateApple(){
    do{
        appleIndex = Math.floor(Math.random() * width * width )
    }while(squares[appleIndex].classList.contains('snake') || squares[appleIndex].classList.contains('danger'))
    squares[appleIndex].classList.add('apple')
    if(difficulty){
        let hideId = setTimeout(hideApple,difficultyTimer)
    }
}
function generateDangerPoint(){
    do{
        dangerIndex = Math.floor(Math.random() * width * width )
    }while(squares[dangerIndex].classList.contains('snake') || 
            squares[dangerIndex].classList.contains('apple') || 
            squares[dangerIndex].classList.contains('danger')
        )
    squares[dangerIndex].classList.add('danger')
    dangerList.push(dangerIndex)
}
function hideApple(){
    squares[appleIndex].style.background = 'white'
}
const controllerConfig = {
  width: width,
  getDirection: function() {
    return direction // return the current direction of the snake
  },
  setDirection: function(newDirection) {
    direction = newDirection
  }
}

initController(controllerConfig)
// initController({
//   width,
//   getDirection: () => direction,
//   setDirection: (newDirection) => {
//     direction = newDirection;
//   }
// });