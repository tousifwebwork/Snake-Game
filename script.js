const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let score = 0;

let snake = [{ x: 200, y: 200 }];
let food = { 
  x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize, 
  y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize 
};

let direction = "RIGHT";
let gameInterval;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#00FF00" : "#32CD32"; // Head and body colors
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
  });
}

function drawFood() {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "UP") head.y -= boxSize;
  if (direction === "DOWN") head.y += boxSize;
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    food = { 
      x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize, 
      y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize 
    };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function gameLoop() {
  if (checkCollision()) {
    alert(`Game Over! Your score is ${score}`);
    resetGame();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawFood();
  moveSnake();
  drawSnake();
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").textContent = `Score: ${score}`;
  food = { 
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize, 
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize 
  };
  clearInterval(gameInterval);
  document.getElementById("startBtn").style.display = "block"; // Show start button again
}

function startGame() {
  document.getElementById("startBtn").style.display = "none"; // Hide the start button
  gameInterval = setInterval(gameLoop, 150); // Slower speed for the game
}

// Attach start button event listener
document.getElementById("startBtn").addEventListener("click", startGame);
