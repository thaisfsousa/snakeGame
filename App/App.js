
let canvas = document.getElementById("snake"); 
let context = canvas.getContext("2d");
let box = 32;
let score = 0;
let start = 0;
let game = setInterval(startGame, 100);
let direction = "right";
let gameOver = 0;
var apple = document.getElementById("apple");
var circle = document.getElementById("circle");

document.addEventListener('keydown', update);
document.getElementById("again").onclick = reload;

let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box,
}
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

function reload(){
	window.location.reload();
}

function createBackground() {
	start = 1;
	context.fillStyle = "black";
	context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
	for (i=0; i < snake.length; i++) {
	context.drawImage(circle, snake[i].x, snake[i].y, 32, 32);
	}
}

function drawFood() {
	context.drawImage(apple, food.x, food.y, 30, 30);
}

function drawScore(){
	context.fillStyle = "white";
	context.font = "20px verderna";
	context.fillText("Score: " + score, canvas.clientWidth - 100, 30);
}

function update (event) {
	if(event.keyCode == 37 && direction != "right") direction = "left";
	if(event.keyCode == 38 && direction != "down") direction = "up";
	if(event.keyCode == 39 && direction != "left") direction = "right";
	if(event.keyCode == 40 && direction != "up") direction = "down";
}

function checkGame(){
	if (start == 1)
	if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
	if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
	if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
	if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
	for(i = 1; i < snake.length; i++) {
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
			checkGameOver();
	}
}

function checkGameOver(){
	start = 0;
	context.fillStyle="white";
	context.font="50px verdana";
	context.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2);
	document.getElementById("game").style.display = "none";
	document.getElementById("again").style.display = "block";
	clearInterval(game);
}
function startGame() {
	createBackground(); 
	createSnake();
	checkGame()
	drawFood();
	drawScore();
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	if(direction == "right") snakeX += box;
	if(direction == "left") snakeX -= box;
	if(direction == "up") snakeY -= box;
	if(direction == "down") snakeY += box;	
	if(snakeX != food.x || snakeY != food.y)
		snake.pop();
	else 
	{	
		food.x = Math.floor(Math.random() * 15 + 1) * box;
		food.y = Math.floor(Math.random() * 15 + 1) * box;
		score++;
	} 
	let newHead = 
	{
		x: snakeX,
		y: snakeY,
	}
	snake.unshift(newHead);
}
