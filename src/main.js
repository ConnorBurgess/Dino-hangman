import $ from 'jquery';
import DinoService from './dino-service.js'
import './css/styles.css';

function clearFields() {
  $('#paragraphs').val("");
  $('#words').val("");
}
String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
$(document).ready(function () {
  let lives = 6;
  document.getElementById("lives").innerHTML = lives;

  var generatedDinos = "";
  var generatedDinosHidden = "";
  var guessedLetter = "";

  function wordChecker(letter) {
    let correctGuesses = 0;
    guessedLetter = letter;
    console.log(generatedDinos);
    console.log(generatedDinosHidden);
    for (let i = 0; i < generatedDinos.length; i++) {
      console.log(generatedDinos[i]);
      console.log(guessedLetter);
      if (generatedDinos[i] === guessedLetter) {
        generatedDinosHidden = generatedDinosHidden.replaceAt(i, guessedLetter);
        correctGuesses = correctGuesses + 1;
        console.log(generatedDinosHidden);
        console.log("Correct guess!")
        $('.showText').text(`${generatedDinosHidden}`);
      }
      else {
        console.log("Not the right character");
      }
    }
  }

  $('#getText').click(function () {
    let paragraphs = $('#paragraphs').val();
    let words = $('#words').val();
    clearFields();
    let promise = DinoService.getDinos(paragraphs, words);
    promise.then(function (response) {
      const body = JSON.parse(response);
      generatedDinos = body.join(",").replace(/[,]/g, " ");
      generatedDinosHidden = ""
      for (let i = 0; i < generatedDinos.length; i++) {
        generatedDinos[i] !== " " ? generatedDinosHidden += "_" : generatedDinosHidden += " "
      }
      // console.log(generatedDinos.length);
      // console.log(generatedDinosHidden.length);
      // console.log(generatedDinos);
      $('.showText').text(`${generatedDinosHidden}`);
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });

  $('#subGuess').click(function () {
    let guessedLetter = document.getElementById("guess").value;
    console.log(guessedLetter);
    wordChecker(guessedLetter);
    document.getElementById("guess").value = ""
  });
});



// Function to check if user input exists in generatedDinos
      // let correctGuesses = 0
      // for loop on generatedDinos
         // generatedDinos.charAt[i] === guessedLetter ? generatedDinosHidden.charAt[i] = generatedDinos.charAt[i] && correctGuessses + 1 : generatedDinosHidden[i];

      // If conditional
      //  if (correctGuesses === 0) {
      // lives -= 1 }
      // else 
      //  console.log(`You had ${correctGuesses} characters found.)


// If it doesn't exist then subtract from user lives
// if it does exist then replace at corrresponding index in generatedDinosHiddden