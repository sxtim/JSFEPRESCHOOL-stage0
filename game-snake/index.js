let canvas = document.querySelector('.game__canvas');
let ctx = canvas.getContext('2d'); // получаем 2d апи сanvas
let scoreBlock = document.querySelector('.score .score-count');
let score = 0;
/*STARTING VALUES*/
const config = {
    step: 0, // для пропуска игрового цикла
    maxStep: 12, // для пропуска игрового цикла
    cellSize: 16, // размер ячейки
    barrySize: 16 / 4 // размер ягоды
}

const snake = {
    x: 16, // координата x
    y: 16, // координата y
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

function gameLoop() {
    requestAnimationFrame(gameLoop); // безконечено вызываем игровой цикл
    if (++config.step < config.maxStep) { // пропускаем цикл (контроль скорости отрисовки на экране)
        return;
    }
    config.step = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // каждый кадр очищаем canvas
    snakeDraw(); //отрисовываем змейку
    berryDraw(); // отрисовываем ягоду
}

requestAnimationFrame(gameLoop);

function snakeDraw() {
    snake.x += snake.dx; //начальное движение змейки
    snake.y += snake.dy;
    snake.tails.unshift({x: snake.x, y: snake.y});

    collisionBorderGameField ();

    if (snake.tails.length > snake.tailsMax) {
        snake.tails.pop();
    }

    snake.tails.forEach(function (e, index) {// рисуем змейку
        if (index === 0) {
            ctx.fillStyle = '#ff7b00';
        } else {
            ctx.fillStyle = '#ff9b05';
        }
        const circle = new Path2D();
        circle.arc(e.x - config.cellSize / 2, e.y - config.cellSize / 2, config.cellSize / 2, 0, 2 * Math.PI);
        ctx.fill(circle);
        // ctx.fillRect(e.x, e.y, config.cellSize, config.cellSize);

        if (e.x === berry.x && e.y === berry.y) {
            snake.tailsMax++;
            counterScore();
            randomPositionBerry();
        }

        for (let i = index + 1; i < snake.tails.length; i++) {
            if (e.x === snake.tails[i].x && e.y === snake.tails[i].y) {
                restartGame();
            }
        }
    })
}

function collisionBorderGameField () {
    if (snake.x < 0) {
        snake.x = canvas.width + 15;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height + 15;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
}


function randomPositionBerry() {
    // todo
}

function restartGame() {
    //todo
}

function berryDraw() {
    //todo
}


function counterScore() { // счетчик очков
    score++;
    drawScore();
}

function drawScore() { // отрисовка очков
    scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) { // получаем рандомное число в заданном диапазоне
    return Math.floor(Math.random() * (max - min) + min);
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
