let canvas = document.querySelector('.game__canvas');
let ctx = canvas.getContext('2d'); // получаем 2d апи сanvas
const scoreBlock = document.querySelector('.score .score-count');
const levelBlock = document.querySelector('.level-count');
const restart = document.querySelector('.restart');
let gameId = [];
let maxScore = window.localStorage.getItem("maxScore") || undefined;
let isGameOver = false;
let score = 0;
let level = 1;

/*STARTING VALUES*/
const config = {
    step: 0, // для пропуска игрового цикла
    maxStep: 18, // для пропуска игрового цикла
    cellSize: 16, // размер ячейки
    barrySize: 16 / 4 // размер ягоды
}

const snake = {
    x: 160, // координата x
    y: 176, // координата y
    dx: config.cellSize, // начальная скорость x
    dy: 0, // начальная скорость y
    tails: [], // массив для новых частей змейки
    tailsMax: 3 // начальная длинна змейки
}

let berry = {
    x: 0,
    y: 0
}
/*GAME LOOP*/
drawScore(); // отрисовываем score
drawLevel();
randomPositionBerry();

function gameLoop() {
    if (!isGameOver) {
        requestAnimationFrame(gameLoop);// безконечено вызываем игровой цикл
        if (++config.step < config.maxStep) { // пропускаем цикл (контроль скорости отрисовки на экране)
            return;
        }
        config.step = 0;

        clear() // каждый кадр очищаем canvas
        snakeDraw(); //отрисовываем змейку
        berryDraw(); // отрисовываем ягоду
    } else {
        clear();
        gameOver();
    }
}

requestAnimationFrame(gameLoop);

function snakeDraw() {
    snake.x += snake.dx; //начальное движение змейки
    snake.y += snake.dy;


    collisionBorderGameField();

    snake.tails.unshift({x: snake.x, y: snake.y});

    if (snake.tails.length > snake.tailsMax) {
        snake.tails.pop();
    }

    snake.tails.forEach(function (e, index) {// рисуем змейку
        if (index === 0) {
            ctx.fillStyle = '#e06c00';
        } else {
            ctx.fillStyle = '#ff9b05';
        }
        // const circle = new Path2D();
        // circle.arc(e.x/* - config.cellSize / 2*/, e.y /*- config.cellSize / 2*/, config.cellSize / 2, 0, 2 * Math.PI);
        // ctx.fill(circle);
        ctx.fillRect(e.x, e.y, config.cellSize, config.cellSize);
        if (e.x === berry.x && e.y === berry.y) {
            snake.tailsMax++;
            levelIncrease();
            counterScore();
            randomPositionBerry();
        }

        for (let i = index + 1; i < snake.tails.length; i++) {
            if (e.x === snake.tails[i].x && e.y === snake.tails[i].y) {
                // restartGame();
                gameOver();
                clear();
            }
        }
    })
}

function collisionBorderGameField() {
    if (snake.x < 0) {
        snake.x = canvas.width - config.cellSize;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - config.cellSize;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
}

function berryDraw() {
    ctx.beginPath();
    ctx.fillStyle = '#ff9b05';
    ctx.arc(berry.x + (config.cellSize / 2), berry.y + (config.cellSize / 2), config.barrySize, 0, 2 * Math.PI);
    ctx.fill();
}

function randomPositionBerry() {
    berry.x = getRandomInt(0, canvas.width / config.cellSize) * config.cellSize;
    berry.y = getRandomInt(0, canvas.height / config.cellSize) * config.cellSize;

}

// function restartGame() {
//     //todo
//     score = 0;
//     drawScore();
//     level = 1;
//     drawLevel();
//     snake.x = 160;
//     snake.y = 176;
//     snake.tails = [];
//     config.maxStep = 18;
//     snake.tailsMax = 3;
//     snake.dx = config.cellSize;
//     snake.dy = 0;
//     // isGameOver = true;
//     randomPositionBerry();
//     gameLoop();
// }

function levelIncrease() {
    if (snake.tailsMax > 4) {
        level = 2;
        config.maxStep = 16;
        drawLevel();
    }

    if (snake.tailsMax > 7) {
        level = 3;
        config.maxStep = 12;
        drawLevel();
    }

    if (snake.tailsMax > 10) {
        level = 4;
        config.maxStep = 8;
        drawLevel();
    }

    if (snake.tailsMax > 15) {
        level = 5;
        config.maxStep = 4;
        drawLevel();
    }

    if (snake.tailsMax > 20) {
        level = 6;
        config.maxStep = 3;
        drawLevel();
    }
}

function drawLevel() {
    levelBlock.innerHTML = level;
}

function counterScore() { // счетчик очков
    score += level;
    drawScore();
}

function drawScore() { // отрисовка очков
    scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) { // получаем рандомное число в заданном диапазоне
    return Math.floor(Math.random() * (max - min) + min);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameOver() {
    // maxScore ? (maxScore = score) : null;
    // score > maxScore ? (maxScore = score) : null;
    if (score > maxScore) {
        maxScore = score;
        window.localStorage.setItem("maxScore", score);
    }
    gameId++;
    // score = maxScore;
    isGameOver = true;
    ctx.fillStyle = "#ff9b05";
    ctx.textAlign = "center";
    ctx.font = "bold 30px Poppins, sans-serif";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = "18px Poppins, sans-serif";
    ctx.fillText(`SCORE   ${score}`, canvas.width / 2, canvas.height / 2 + 30);
    ctx.fillText(`MAXSCORE   ${maxScore}`, canvas.width / 2, canvas.height / 2 + 50);
}

/*CONTROLS*/
document.addEventListener('keydown', e => {
        if (e.code === 'KeyW') {
            snake.dy = -config.cellSize;
            snake.dx = 0;
        } else if (e.code === 'KeyA') {
            snake.dx = -config.cellSize;
            snake.dy = 0;
        } else if (e.code === 'KeyS') {
            snake.dy = config.cellSize;
            snake.dx = 0;
        } else if (e.code === 'KeyD') {
            snake.dx = config.cellSize;
            snake.dy = 0;
        }
    }
)

restart.addEventListener('click', () => location.reload());
