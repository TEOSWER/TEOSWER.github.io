
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');


const GRAVITY = 0.5;
const FLAP_SPEED = -8;
const TERMINAL_VELOCITY = 12;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
let scoreboard = document.getElementById("score")

const bird = {
  x: 50,
  y: 250,
  width: BIRD_WIDTH,
  height: BIRD_HEIGHT,
  velocity: 0
};

const pipes = [
    {
      x: 300,
      y: 0,
      width: 50,
      height: 200,
      passed: false
    },
    {
      x: 600,
      y: 0,
      width: 50,
      height: 300,
      passed: false
    },
    {
      x: 900,
      y: 0,
      width: 50,
      height: 100,
      passed: false
    },
    {
      x: 1200,
      y: 0,
      width: 50,
      height: 400,
      passed: false
    }
  ];
  


function loop() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  bird.velocity += GRAVITY;
  bird.velocity = Math.min(bird.velocity, TERMINAL_VELOCITY);
  bird.y += bird.velocity;

  
  if (bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    bird.velocity = 0;
  }

  
  for (const pipe of pipes) {
    pipe.x -= 2;
    if (pipe.x+pipe.width < bird.x && !pipe.passed){
        scoreboard.innerHTML=parseInt(scoreboard.innerHTML)+1
        pipe.passed=true;
    }
    
    if (pipe.x + pipe.width < 0) {
      
      pipe.x += canvas.width + pipe.width;
      pipe.passed=false
    }
  }

  
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  
  ctx.fillStyle = 'green';
  for (const pipe of pipes) {
    ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    ctx.fillRect(pipe.x, pipe.y + pipe.height + 150, pipe.width, canvas.height - (pipe.y + pipe.height + 150));
  }
  
  
for (const pipe of pipes) {
    if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width &&
        !(bird.y > pipe.y + pipe.height && bird.y + bird.height < pipe.y + pipe.height + 150)) {
     
      alert('Game Over!');
      return;
    }
  }
  
  
  
  requestAnimationFrame(loop);
  }
  
  
  loop();
  
  
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      bird.velocity = FLAP_SPEED;
    }
  });
  
