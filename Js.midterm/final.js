// setup canvas

let count = 0;


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

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
      this.text = text
    }
  
  

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
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
        if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
        }
      
        if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
      
        if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
        }
      
        if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
      }
      
      

}
// Add event listener for mouse clicks on the canvas
canvas.addEventListener('click', function(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Loop through all balls to check if the click is inside any ball
    for (const ball of balls) {
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if click is inside the ball
        if (distance <= ball.size) {
            // If the ball's text is "+1", increment count; if "-1", decrement count
            if (ball.text === "+1") {
                count++;
            } else if (ball.text === "-1") {
                if (count > 0) {
                    count--;
                }
            }
            // Update the count display or perform any other action as needed
            console.log("Count:", count);
        }
    }
});

function drawCount() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Volume: ${count}`, 100, 50); // Adjust position as needed
}


const balls = [];

while (balls.length < 50) {
  const size = random(10, 20);
  const text = Math.random() < 0.5 ? "+1" : "-1";
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(0, 5),
    random(0, 5),
    randomRGB(),
    size,
    text
  );

  balls.push(ball);
}
function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);
  
    for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
    drawCount();
    requestAnimationFrame(loop);
  }

loop();