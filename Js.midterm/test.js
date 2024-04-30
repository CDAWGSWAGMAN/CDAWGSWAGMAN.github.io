
let count = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);


function random(min, max) {
    return Math.random() * (max - min) + min; 
}


function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor(x, y, velX, velY, color, size, text) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.text = text;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x, this.y);
    }

    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball) {
                const dx = ball.x - this.x;
                const dy = ball.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.size + ball.size) {
                    
    
                    
                    const tempText = this.text;
                    this.text = ball.text;
                    ball.text = tempText;
    
                    
                    const tempColor = this.color;
                    this.color = ball.color;
                    ball.color = tempColor;
    
                    
                    const changeSpeed = 0.0001; 
                    this.velX *= (1 + changeSpeed);
                    this.velY *= (1 + changeSpeed);
                    ball.velX *= (1 + changeSpeed);
                    ball.velY *= (1 + changeSpeed);
    
                    
                    const thisSpeed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
                    const ballSpeed = Math.sqrt(ball.velX * ball.velX + ball.velY * ball.velY);
                    const totalSpeed = thisSpeed + ballSpeed;
    
                    
                    const maxSpeed = 7; 
    
                    
                    if (totalSpeed > maxSpeed) {
                        const scale = maxSpeed / totalSpeed;
                        this.velX *= scale;
                        this.velY *= scale;
                        ball.velX *= scale;
                        ball.velY *= scale;
                    }
    
                    
                    const angle = Math.atan2(dy, dx);
                    const thisVelX = this.velX * Math.cos(angle) + this.velY * Math.sin(angle);
                    const thisVelY = this.velY * Math.cos(angle) - this.velX * Math.sin(angle);
                    const ballVelX = ball.velX * Math.cos(angle) + ball.velY * Math.sin(angle);
                    const ballVelY = ball.velY * Math.cos(angle) - ball.velX * Math.sin(angle);
    
                    this.velX = ballVelX;
                    this.velY = ballVelY;
                    ball.velX = thisVelX;
                    ball.velY = thisVelY;
    
                    const overlap = this.size + ball.size - distance;
                    const moveX = overlap * Math.cos(angle);
                    const moveY = overlap * Math.sin(angle);
                    this.x -= moveX / 2;
                    this.y -= moveY / 2;
                    ball.x += moveX / 2;
                    ball.y += moveY / 2;
                }
            }
        }
    }

    update() {
        if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
            this.velX = -this.velX;
        }
    
        if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
            this.velY = -this.velY;
        }
    
        this.x += this.velX;
        this.y += this.velY;
    }
}


canvas.addEventListener('click', function(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (const ball of balls) {
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= ball.size) {
            if (ball.text === "+1" || ball.text === "+2" || ball.text === "+3") {
                count += parseInt(ball.text);
            } else if (ball.text === "-1" || ball.text === "-2" || ball.text === "-3") {
                if (count > 0) {
                    count += parseInt(ball.text);
                }
            }
            console.log("Count:", count);
        }
    }
});

function drawCount() {
    ctx.fillStyle = 'darkorange';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`Volume: ${count}`, 1450, 35); 
}

const numberOfBalls = 50; 
const balls = [];

// Define the number of balls for each direction
const numberOfBallsLeft = Math.floor(numberOfBalls / 2);
const numberOfBallsRight = numberOfBalls - numberOfBallsLeft;

while (balls.length < numberOfBalls) {
    const size = random(30, 50);
    let text;
    const randomNumber = Math.random();

    // Divide the balls into two groups based on their index
    const initialVelX = balls.length < numberOfBallsLeft ? random(-5, 0) : random(0, 5); 
    
    if (randomNumber < 0.2) { 
        text = "+1";
    } else if (randomNumber < 0.4) { 
        text = "-1";
    } else if (randomNumber < 0.6) { 
        text = "+2";
    } else if (randomNumber < 0.8) { 
        text = "-2";
    } else { 
        text = random(0, 1) === 0 ? "+3" : "-3"; 
    }

    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        initialVelX,
        random(-1, 1),
        randomRGB(),
        size,
        text
    );
    balls.push(ball);
}



const backgroundImage = new Image();
backgroundImage.src = 'background.webp'; 

backgroundImage.onload = function() {
    loop();
};

function loop() {
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    drawCount();
    requestAnimationFrame(loop);
}
