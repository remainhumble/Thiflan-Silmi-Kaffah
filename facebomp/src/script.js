// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get necessary DOM elements
  const startButton = document.getElementById("startButton");
  const gameBoard = document.getElementById("gameBoard");
  const holes = gameBoard.querySelectorAll(".hole");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const finalMessage = document.getElementById("finalMessage");
  const timerDisplay = document.getElementById("timerDisplay");
  const bompSound = document.getElementById("bomp");
  const successSound = document.getElementById("success");
  const gameOver = document.getElementById("game-over");

  let score = 0; // Initialize score
  let timer; // Variable to hold timer
  let timeLeft; // Variable to hold time left
  let timeoutID; // Variable to hold the ID of the timeout for image disappearance

  // Function to start the game
  function startGame() {
    // Change the start button text to "Playing..."
    startButton.textContent = "Playing...";

    // Reset score and timer
    score = 0;
    updateScoreDisplay();
    clearInterval(timer); // Clear any existing timers

    // Set up countdown timer for 30 seconds
    timeLeft = 30;
    updateTimerDisplay();

    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft === 0) {
        endGame();
      }
    }, 1000);

    // Start showing images at random intervals
    showRandomImage();
  }

  // Function to update score display
  function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
  }

  // Function to update timer display
  function updateTimerDisplay() {
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`; // Update time display
  }

  // Function to randomly show images. it should disappear when clicked:
  function showRandomImage() {
    // Generate a random hole index
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];

    // Select the image inside the hole
    const image = hole.querySelector("img");

    // Make the image visible
    image.style.transform = "translate(-50%, -50%) scale(1)";
    image.classList.add("visible");

    // Add click event listener to the image
    image.addEventListener("click", handleClick);

    // Set a timeout to make the image disappear after a random interval
    const randomTime = Math.random() * 1000 + 500; // Random time between 0.5 and 1.5 seconds
    timeoutID = setTimeout(() => {
      image.style.transform = "translate(-50%, -50%) scale(0)";
      image.classList.remove("visible");
      image.removeEventListener("click", handleClick);
      showRandomImage(); // Show another random image
    }, 800);
  }

  // Function to handle click on an image
  function handleClick() {
    // Increase score
    score += 5;
    // Update score display
    updateScoreDisplay();

    // Hide the image immediately
    this.style.transform = "translate(-50%, -50%) scale(0)";
    this.classList.remove("visible");
    this.removeEventListener("click", handleClick);

    // Add red border class to the clicked image
    this.classList.add("redBorder");

    // Play the click sound
    bompSound.currentTime = 0; // Reset the audio to the beginning
    bompSound.play();

    // Set a timeout to remove the red border class after a short delay
    const clickedImage = this;
    setTimeout(function () {
      clickedImage.classList.remove("redBorder");
    }, 100);
  }

  // Function to end the game
  function endGame() {
    clearInterval(timer); // Clear timer
    clearTimeout(timeoutID); // Clear timeout for image disappearance
    timerDisplay.textContent = getFinalMessage(); // Display final message
    finalMessage.style.display = "block"; // Show final message
    score > 50 ? successSound.play() : gameOver.play();
    startButton.textContent = "Start Game"; // Change start button text back to "Start Game"
  }

  // Function to get final message based on the score
  function getFinalMessage() {
    if (score <= 50) {
      return "Oops! Better luck next time!";
    } else if (score <= 80) {
      return "Not bad, but you can do better!";
    } else if (score <= 100) {
      return "Great job! You're getting the hang of it!";
    } else {
      return "Wow! You're a Facebomp master!";
    }
  }

  // Add click event listener to the start button to start the game
  startButton.addEventListener("click", function () {
    // Start the game
    startGame();
  });
});
