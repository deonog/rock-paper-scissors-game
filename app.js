// Cache DOM
const options = document.querySelectorAll(".option");
const playerChoiceDOM = document.getElementById("player-choice");
const aiChoiceDOM = document.getElementById("ai-choice");
const playerWrap = document.querySelector(".player-choice-wrapper");
const aiWrap = document.querySelector(".ai-choice-wrapper");
const resultDOM = document.querySelector(".result");
const endResultDOM = document.getElementById("playerResult");
const playerScoreDOM = document.querySelector(".player-score");
const aiScoreDOM = document.querySelector(".ai-score");
const modal = document.querySelector(".modal");
const playAgainBtn = document.getElementById("play-again-btn");
let player;
let ai;
let playerScore = 0;
let aiScore = 0;
let result;
const endScore = 5;
const rpc = [
  {
    name: "rock",
    symbol: "✊🏽"
  },
  {
    name: "paper",
    symbol: "✋🏽"
  },
  {
    name: "scissors",
    symbol: "✌🏽"
  }
];

// Player chooses option
function chooseOption(e) {
  if (playerScore == endScore || aiScore == endScore) {
    return;
  } else {
    let playerChoice = e.target.dataset.name;

    // Get symbol from selected option
    rpc.forEach(function(x) {
      if (x.name == playerChoice) {
        addToHistory(x.symbol);
      }
    });

    setTimeout(aiOption, 300);

    player = playerChoice;
  }
}

// AI chooses option
function aiOption() {
  if (playerScore == endScore || aiScore == endScore) {
    return;
  } else {
    // Generate random choice
    let aiChoice = rpc[Math.floor(Math.random() * rpc.length)];

    ai = aiChoice.name;

    // Add ai choice to history
    const choice = document.createElement("span");
    choice.classList.add("ai-choice");
    choice.innerHTML = aiChoice.symbol;
    aiWrap.appendChild(choice);

    compareChoices();
  }
}

// Compare selected options
function compareChoices() {
  if (player == "rock") {
    if (ai == "rock") {
      result = "draw";
    } else if (ai == "paper") {
      result = "lost";
      aiScore++;
    } else if (ai == "scissors") {
      result = "win";
      playerScore++;
    }
  } else if (player == "paper") {
    if (ai == "rock") {
      result = "win";
      playerScore++;
    } else if (ai == "paper") {
      result = "draw";
    } else if (ai == "scissors") {
      result = "lost";
      aiScore++;
    }
  } else if (player == "scissors") {
    if (ai == "rock") {
      result = "lost";
      aiScore++;
    } else if (ai == "paper") {
      result = "win";
      playerScore++;
    } else if (ai == "scissors") {
      result = "draw";
    }
  }

  // Select result border for option
  options.forEach(function(option) {
    if (option.dataset.name == player) {
      if (result == "win") {
        option.classList.add("option-win");
      } else if (result == "lost") {
        option.classList.add("option-lost");
      } else if (result == "draw") {
        option.classList.add("option-draw");
      }

      setTimeout(function() {
        option.classList.remove("option-win");
        option.classList.remove("option-lost");
        option.classList.remove("option-draw");
      }, 300);
    }
  });

  updateScore();
}

// Update the score
function updateScore() {
  // Add result to history
  let resultEl = document.createElement("h1");
  resultEl.innerHTML = result;
  resultDOM.appendChild(resultEl);

  playerScoreDOM.innerHTML = playerScore;
  aiScoreDOM.innerHTML = aiScore;

  gameEnd();
}

function gameEnd() {
  // Open end screen modal
  if (playerScore == endScore || aiScore == endScore) {
    modal.classList.add("modal-open");
    modal.classList.remove("modal-close");
    if (playerScore == endScore) {
      endResultDOM.innerHTML = "win";
    } else {
      endResultDOM.innerHTML = "lost";
    }
  }
}

function reset() {
  // Close end screen modal
  modal.classList.add("modal-close");
  modal.classList.remove("modal-open");
  // Reset score
  playerScore = 0;
  aiScore = 0;
  playerScoreDOM.innerHTML = playerScore;
  aiScoreDOM.innerHTML = aiScore;
  removeOptions();
}

function removeOptions() {
  let playerWrapAll = document.querySelectorAll(".player-choice");
  let aiWrapAll = document.querySelectorAll(".ai-choice");
  let resultWrapAll = document.querySelectorAll(".result h1");

  playerWrapAll.forEach(function(el) {
    el.remove();
  });
  aiWrapAll.forEach(function(el) {
    el.remove();
  });
  resultWrapAll.forEach(function(el) {
    el.remove();
  });

  options.forEach(function(option) {
    option.classList.remove("option-win");
    option.classList.remove("option-lost");
    option.classList.remove("option-draw");
  });
}

// Add player symbol to history
function addToHistory(playerSymbol) {
  const choice = document.createElement("span");
  choice.classList.add("player-choice");
  choice.innerHTML = playerSymbol;
  playerWrap.appendChild(choice);
}

// Event Listener

playAgainBtn.addEventListener("click", reset);

options.forEach(option => {
  option.addEventListener("click", chooseOption);
});
