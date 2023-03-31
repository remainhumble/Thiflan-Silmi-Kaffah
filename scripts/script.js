document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

// Get all needed elements from the DOM
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementsByClassName("button");
const nameInput = document.getElementById("user_name");
const emailInput = document.getElementById("user_email");
const messageInput = document.getElementById("message");

// Get needed data from Email JS
const publicKey = "IU6uYeBu4OkdpftJ_";
const serviceID = "service_sd86wii";
const templateID = "template_i4070xt";

// Initialize email JS with publicKey
emailjs.init(publicKey);

// Add submit event to the form
contactForm.addEventListener("submit", e => {
  // Prevent form default behaviour
  e.preventDefault();
  // Change submit button text
  submitBtn.innerText = "Just a Moment...";
  // Get all input field values
  const inputFields = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
  }
  /* Send the email
  (Add service, template ID, and input field values) */
  emailjs.send(serviceID, templateID, inputFields)
    .then(() => {
// Change submit button text
submitBtn.innerText = "Message Sent Successfully";
// Clear out all input fields
nameInput.value = "";
emailInput.value = "";
messageInput.value = "";
    }, (error) => {
      // Log the error
      console.log(error);
      // Change submit button text
      submitBtn.innerText = "Something went wrong";
    });
});
