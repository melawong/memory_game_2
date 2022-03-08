"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
const WIDTH = 5;
const HEIGHT = 2;

const CARDS = document.querySelectorAll("td");
let clickCount = 0;
let firstCard;
let secondCard;
let matchCount = 0

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  for (let i = 0; i < CARDS.length; i++) {
    CARDS[i].classList.add(colors[i]);
    CARDS[i].addEventListener("click", handleCardClick)
  }
}

/** Flip a card face-up. */

function flipCard(cardNum, cardColor) {
  let card;

  for(let j = 0; j < CARDS.length; j++){
    if(CARDS[j].classList[0] === cardNum){
      card = CARDS[j];
      clickCount +=1
    }
  }
  //flip the card to its secret color
  card.setAttribute("style", `background-color: ${cardColor}`);
  console.log(clickCount)

  if(clickCount === 1){
    //declare the first card
    firstCard = card
  } if(clickCount === 2){
    //declare the second card
    secondCard = card;
    noExtraClicks();
    //if they clicked the same card twice, no.
    if(secondCard.classList[0] === firstCard.classList[0]){
      clickCount = 1;
      secondCard = undefined;
      alert("Please Choose A Different Card!");
    } else {
      checkMatch();
    }
  }
}

function checkMatch(){
    clickCount = 0;
    if(firstCard.classList[1] === secondCard.classList[1]){
      matchCount += 1;
    } else {
      clickCount = 0;
      myTimeout();
    }
    for(let card of CARDS){
      setTimeout(function(){card.addEventListener("click", handleCardClick)}, 800)
  }
  updateCount();
  checkWinner();
}

function myTimeout(){
  setTimeout(unFlipCard, 1000);
}

function noExtraClicks(){
    for(let card of CARDS){
    card.removeEventListener("click", handleCardClick);
    }
}
/** Flip a card face-down. */

function unFlipCard() {
  firstCard.removeAttribute("style");
  secondCard.removeAttribute("style");
}
/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  let id = evt.target.classList;
  let cardColor = id[1];
  let cardNum = id[0];

  flipCard(cardNum, cardColor);
}

function checkWinner(){
  if(matchCount === 5){
    setTimeout(handleWin, 500);
  }
}

function handleWin(){
  alert("You Win!");
}

function newGame(){
  document.location.reload();
}

const btn = document.querySelector("#button");
btn.addEventListener("click", newGame);

function updateCount (){
  const matchDisplay = document.getElementById("match_count");
  matchDisplay.innerText = "match count: " + matchCount;
}

