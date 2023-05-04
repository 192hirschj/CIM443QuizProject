//Used my Professor's template and changed it up to work with my quiz application.

// Select all <button> elements from my page
let buttons = document.querySelectorAll("button");

// Select all <div class="question"> elements
let questions = document.querySelectorAll(".question");

// Select <p class="result"> element from page
let result = document.querySelector(".result");

// Get total number of questions
let total = questions.length;

// Keeps track of how many questions have been answered
let answered = 0;

// Initialize score
let score = 0;

// Disable all buttons on inside a question element
function disableButtons(question) {
  // Select all <button> elements inside my question
  let buttons = question.querySelectorAll("button");

  // Loop through those buttons
  for (let button of buttons) {
    // Add disabled attribute
    button.disabled = true;
  }
}

// Defines function to check answer
function checkAnswer() {
  // Increment number of questions answered
  answered++;

  // Store the element that was clicked
  let button = this;

  // Store true/false value depending on class name
  let isCorrect = button.classList.contains("correctA") || button.classList.contains("correctB") || button.classList.contains("correctC");

  //refresh button to restart the quiz
  let refresh = button.classList.contains("refresh")

  if (refresh){
    //refresh the page
    button.style.background = "Blue";
    location.reload();
  }
  // If buttons is the correct one:
  else if (isCorrect) {
    // Paint it green
    button.style.background = "Turquoise";

    // Add 1 point to the score
    score++;
  }
  // Otherwise:
  else {
    // Paint it red
    button.style.background = "Tomato";
  }

  // Get the <div class="question"> element
  let question = button.parentElement;

  // Disable its buttons after one of them was clicked
  disableButtons(question);

  // Check if quiz is done
  if (answered === total) {
    // Show score on page
    displayScore();

    // Store score on Google Sheet
    write();
  }
}

// Defines function to display score on page
function displayScore() {
  // Create text to be shown (using template literals)
  let text = `
    You got ${score}
    out of ${total} correct.
  `;

  // Add it inside the result element
  result.textContent = text;
}

// Define function that sends my score to a Google Sheet
function write() {
  // Put user’s score inside of an array
  let row = [score];

  // Begin creating URL
  let api = "";

  // Concatenate all parts of the URL
  api += "https://sheets.vsueiro.com/api/write";
  api += "?";
  api += "id=1Hn5dNRxkyITR_DqyvANTLoIPqITKJts0s3_Ba7xPRjI";
  api += "&";
  api += "range=Jacqueline";
  api += "&";
  api += "row=";

  // Encodes array as a JSON string
  api += JSON.stringify(row);

  // Make the request and, once it’s done, thank user
  fetch(api).then(thank);
}

// Define function that thanks user
function thank() {
  // Show an ugly pop-up
  alert("Thanks for taking the symmetry groups quiz. Press the refresh button to try again and check out your score at the bottom of the page!");
}

// For each button on my page
for (let button of buttons) {
  // When button is clicked, call checkAnswer function
  button.onclick = checkAnswer;
}
