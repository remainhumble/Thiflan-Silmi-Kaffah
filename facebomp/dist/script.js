// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get necessary DOM elements
    const startButton = document.getElementById('startButton');
    const gameBoard = document.getElementById('gameBoard');
    const holes = gameBoard.querySelectorAll('.hole');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timerDisplay = document.getElementById('timerDisplay');
    const finalMessage = document.getElementById('finalMessage');
    const timeDisplay = document.getElementById('time'); // Added for time display

    let score = 0; // Initialize score
    let timer; // Variable to hold timer
    let timeLeft; // Variable to hold time left
    let timeoutID; // Variable to hold the ID of the timeout for image disappearance

    // Function to start the game
    function startGame() {
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
        timeDisplay.textContent = timeLeft; // Update time display
    }

    // Function to randomly show images
    function showRandomImage() {
        // Generate a random hole index
        const randomIndex = Math.floor(Math.random() * holes.length);
        const hole = holes[randomIndex];

        // Select the image inside the hole
        const image = hole.querySelector('img');

        // Make the image visible
        image.style.transform = 'translate(-50%, -50%) scale(1)';
        image.classList.add('visible');

        // Add click event listener to the image
        image.addEventListener('click', handleClick);

        // Set a timeout to make the image disappear after a random interval
        const randomTime = Math.random() * 2000 + 1000; // Random time between 1 and 3 seconds
        timeoutID = setTimeout(() => {
            image.style.transform = 'translate(-50%, -50%) scale(0)';
            image.classList.remove('visible');
            image.removeEventListener('click', handleClick);
            showRandomImage(); // Show another random image
        }, randomTime);
    }

    // Function to handle click on an image
    function handleClick() {
        score++; // Increase score
        updateScoreDisplay(); // Update score display
    }

    // Function to end the game
    function endGame() {
        clearInterval(timer); // Clear timer
        clearTimeout(timeoutID); // Clear timeout for image disappearance
        finalMessage.textContent = getFinalMessage(); // Display final message
        finalMessage.style.display = 'block'; // Show final message
    }

    // Function to get final message based on the score
    function getFinalMessage() {
        if (score === 0) {
            return "Oops! Better luck next time!";
        } else if (score < 5) {
            return "Not bad, but you can do better!";
        } else if (score < 10) {
            return "Great job! You're getting the hang of it!";
        } else {
            return "Wow! You're a Facebomp master!";
        }
    }

    // Add click event listener to the start button to start the game
   startButton.addEventListener('click', function() {
    // Hide the final message
    finalMessage.style.display = 'none';
    // Start the game
    startGame();
});
});