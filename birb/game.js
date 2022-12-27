// Get a reference to the canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set up some game constants
const GRAVITY = 0.5;
const FLAP_SPEED = -8;
const TERMINAL_VELOCITY = 12;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
let scoreboard = document.getElementById("score")
// Set up the bird object
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
  

// Set up the game loop
function loop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the bird's position and velocity
  bird.velocity += GRAVITY;
  bird.velocity = Math.min(bird.velocity, TERMINAL_VELOCITY);
  bird.y += bird.velocity;

  // Check if the bird is off the bottom of the screen
  if (bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    bird.velocity = 0;
  }

  // Update the position of the pipes
  for (const pipe of pipes) {
    pipe.x -= 2;
    if (pipe.x+pipe.width < bird.x && !pipe.passed){
        scoreboard.innerHTML=parseInt(scoreboard.innerHTML)+1
        pipe.passed=true;
    }
    // Check if the pipe is off the left side of the screen
    if (pipe.x + pipe.width < 0) {
      // Move the pipe to the right side of the screen
      pipe.x += canvas.width + pipe.width;
      pipe.passed=false
    }
  }

  // Draw the bird
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Draw the pipes
  ctx.fillStyle = 'green';
  for (const pipe of pipes) {
    ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    ctx.fillRect(pipe.x, pipe.y + pipe.height + 150, pipe.width, canvas.height - (pipe.y + pipe.height + 150));
  }
  
  // Check if the bird is colliding with a pipe
for (const pipe of pipes) {
    if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width &&
        !(bird.y > pipe.y + pipe.height && bird.y + bird.height < pipe.y + pipe.height + 150)) {
      // Game over!
      alert('Game Over!');
      return;
    }
  }
  
  
  // Schedule the next frame
  requestAnimationFrame(loop);
  }
  
  // Start the game loop
  loop();
  
  // Listen for space bar input to flap the bird
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      bird.velocity = FLAP_SPEED;
    }
  });
  
