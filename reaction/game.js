// Global variables
let startButton = document.querySelector('#start-button');
let redButton = document.querySelector('#red-button');
let timer;
let timethen
let time = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
console.log(time)
console.log(new Date().getTime())
// Start button click event
startButton.addEventListener('click', function() {
  // Disable start button
  startButton.setAttribute('disabled', true);
  // Start timer for a random amount of time between 1 and 5 seconds
  timer = setTimeout(function() {
      redButton.style.display = 'block';
      timethen = new Date().getTime()
  }, time);
});

// Red button click event
redButton.addEventListener('click', function() {
  // Calculate reaction time
  timenow=new Date().getTime()
  let reactionTime = timenow - timethen;
  alert(`Your reaction time is ${reactionTime} miliseconds`);

  // Hide red button and enable start button
  redButton.style.display = 'none';
  startButton.removeAttribute('disabled');
});
