// Initialize slide index to 1
let slideIndex = 1;

// Call showSlides function with initial slideIndex
showSlides(slideIndex);

// Function to move to next or previous slide
function plusSlides(n) {
  // Increment slideIndex by n and call showSlides
  showSlides((slideIndex += n));
}

// Function to move to a specific slide
function currentSlide(n) {
  // Set slideIndex to n and call showSlides
  showSlides((slideIndex = n));
}

// Main function to display slides
function showSlides(n) {
  let i;
  // Get all slide elements
  let slides = document.getElementsByClassName("mySlides");
  // Get all dot elements
  let dots = document.getElementsByClassName("dot");

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove active class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Check for slide index out of bounds
  if (n > slides.length) {
    slideIndex = 1; // Reset to first slide
  }
  if (n < 1) {
    slideIndex = slides.length; // Set to last slide
  }

  // Display current slide
  slides[slideIndex - 1].style.display = "block";

  // Set active class to current dot
  dots[slideIndex - 1].className += " active";
}

// Automatically switch to the next slide every 5 seconds
setInterval(function() {
  plusSlides(1); // Call plusSlides function with argument 1
}, 5000); // 5000 milliseconds = 5 seconds
