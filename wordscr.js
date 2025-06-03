let roundClear=false;
const words = [
    { word: "apple", hint: "A popular fruit that can be red, green, or yellow" },
    { word: "brave", hint: "Showing courage in difficult situations" },
    { word: "climb", hint: "To go up something, like a mountain or stairs" },
    { word: "globe", hint: "A spherical model representing Earth" },
    { word: "chair", hint: "A piece of furniture you sit on" },
    { word: "flute", hint: "A musical instrument you blow air into" },
    { word: "plant", hint: "A living organism that typically grows in soil" },
    { word: "shine", hint: "To emit a bright light" },
    { word: "river", hint: "A natural stream of flowing water" },
    { word: "storm", hint: "A strong weather event with rain, wind, or thunder" }
];
let currentIndex = 0;
let currentWord;

// Function to display the next word and hint
function displayNextWord() {
   
    if (currentIndex >=words.length) {
        endGame();
        return;
    }
    currentWord = words[currentIndex];
    const scrambledWord = scrambleWord(currentWord.word)
    document.getElementById("word").innerText = scrambledWord;
    document.getElementById("hint").innerText = `Hint: ${currentWord.hint}`;
    currentIndex++;
}

//function to scramble the word 
function scrambleWord(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
}

//Timer
let timeLeft = 10;
let currentTimer;
function countDown() {
    let timer = document.getElementById("timer");
    clearInterval(currentTimer);//clear any existing timer
    timeLeft = 10;
    timer.style.color = "black";
    timer.innerText = `Time Left:${timeLeft}s`;

    //start new timer
    currentTimer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            timer.style.color = "red";
            timer.innerText = "Times up";
            document.getElementById("player-word").disabled = true;
            disableCheck();
        }
        else {
            timer.innerText = `Time Left:${timeLeft}s`;
        }
        timeLeft -= 1;
    }, 1000);
}

displayNextWord();// Display the first word initially
countDown();//start initial count down

// New Word Button
document.getElementById("new-btn").addEventListener("click", () => {
    document.getElementById("message").innerHTML = "<br>";
    document.getElementById("player-word").value = "";
    document.getElementById("player-word").disabled = false;
    displayNextWord();
    roundClear=false;
    countDown();
});


// Check Word Button
let CurrentScore = 0;
let score = document.getElementById("score");

function checkWord() {
    if (roundClear){
        return;
    }
    let playerWord = document.getElementById("player-word").value.trim().toLowerCase();
    let correctWord = currentWord.word.toLowerCase();

    if (playerWord === "") {
        document.getElementById("message").style.color = "orange";
        document.getElementById("message").innerText = "Please enter a word!";
        return;
    } 
    if ((correctWord) === playerWord) {
        const messageElement = document.getElementById("message");
        messageElement.style.color = "#2E7D32";
        messageElement.innerText = "You are right!!";
        CurrentScore = CurrentScore + 1;
        score.innerText = `Score:${CurrentScore}`;
        roundClear=true;
    }
    else {
        const messageElement = document.getElementById("message");
        messageElement.style.color = "red";
        messageElement.innerText = "Oh no, that is a wrong response :(";
    }
    document.getElementById("player-word").disabled = true;
    clearInterval(currentTimer);
    
};

document.getElementById("player-word").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWord();
    }
});
document.getElementById("check-btn").addEventListener("click", checkWord);


function endGame() {
    // Hide game elements
    document.getElementById("game-container").style.display = "none";

    // Show "Game Over" message and restart button
    const endScreen = document.getElementById("end-screen");
    endScreen.style.display = "block";
    endScreen.innerHTML = `
        <h2>GAME OVER!</h2>
        <p>Final Score: ${CurrentScore}</p>
        <button id="restart-btn">Restart Game</button>
    `;
}
document.addEventListener("click", function (event) {
    if (event.target.id === "restart-btn") {
        // Reset game state
        currentIndex = 0;
        CurrentScore = 0;
        score.innerText = `Score: ${CurrentScore}`;
        document.getElementById("player-word").value = "";
        document.getElementById("message").innerHTML = "<br>";

        // Show game elements
        document.getElementById("game-container").style.display = "block";
        document.getElementById("end-screen").style.display = "none";

        // Start fresh
        displayNextWord();
        countDown();
    }
});
