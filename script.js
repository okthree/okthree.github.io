const levels = [
    {
        title: "Level 0",
        description: "What is my full name and date of birth (Format X X X X X, XX/XX/XX)?",
        answer: btoa("Godlove Theo Wognoin Kounou, 03/03/03"), // Encoded answer
        hints: [
            "Hint 1: 4 names, capitalize the first letter, order matters",
            "Hint 2: Really nigga"
        ]
    },
    {
        title: "Level 1",
        description: "Find the missing number: 1, 4, 9, 16, 25, ?. Each number follows a hidden operation based on its index.",
        answer: btoa("144"), // Encoded answer
        hints: ["Hint 1: Think about squares.", "Hint 2: Multiply the square by the previous square."]
    },
    {
        title: "Level 2",
        description: "Input 'START' to receive a cipher key. Use it to encrypt 'THE END' and find the hidden message.",
        answer: btoa("HIDDEN"), // Encoded answer
        hints: ["Hint 1: Substitute letters dynamically.", "Hint 2: Reverse-engineer the encryption."]
    },
    {
        title: "Level 3",
        description: "What comes next? The symbols follow a pattern that changes with the current hour.",
        answer: btoa("🔺"), // Encoded answer
        hints: ["Hint 1: Look at the current hour.", "Hint 2: Match symbols to their alternating order."]
    },
    {
        title: "Level 4",
        description: "Decode this nested cryptographic challenge: U29sdmUgdGhpcyBlbmNvZGU=",
        answer: btoa("SUCCESS"), // Encoded answer
        hints: ["Hint 1: Use Base64 decoding first.", "Hint 2: Apply Caesar cipher after decoding."]
    },
    {
        title: "Level 5",
        description: "From the secrets of these levels, a truth is revealed. Combine the numbers, patterns, and meanings you've learned so far to find me. What am I?",
        answer: btoa("SECRET144🔺"), // Encoded answer
        hints: [
            "Hint 1: Add the numeric answer from Level 1.",
            "Hint 2: Include the symbolic answer from Level 3 and the keyword from Level 2."
        ]
    }
];

let currentLevel = 0;
const masterKey = "UltimateKey2024";

document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("intro-screen").classList.remove("active");
    document.getElementById("game-screen").classList.add("active");
    loadLevel();
});

document.getElementById("submit-button").addEventListener("click", () => {
    const userInput = document.getElementById("answer-input").value.trim();
    const feedback = document.getElementById("feedback");

    // Decode the answer for comparison
    const decodedAnswer = atob(levels[currentLevel].answer);

    if (userInput === masterKey) {
        showEndScreen();
    } else if (userInput === decodedAnswer) {
        currentLevel++;
        if (currentLevel < levels.length) {
            loadLevel();
        } else {
            showEndScreen();
        }
    } else {
        feedback.textContent = "Incorrect, try again.";
        feedback.classList.remove("hidden");
    }
});

document.getElementById("hint-button").addEventListener("click", () => {
    const hint = document.getElementById("hint");
    hint.textContent = levels[currentLevel].hints.shift() || "No more hints available.";
    hint.classList.remove("hidden");
});

document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});

function loadLevel() {
    const level = levels[currentLevel];
    document.getElementById("level-title").textContent = level.title;

    if (currentLevel === 3) {
        // Dynamically generate the pattern for Level 3
        const currentHour = new Date().getHours();
        const pattern = generatePattern(currentHour);
        document.getElementById("level-description").textContent = `${level.description} Pattern: ${pattern}`;
    } else {
        // For other levels, display the default description
        document.getElementById("level-description").textContent = level.description;
    }

    document.getElementById("answer-input").value = "";
    document.getElementById("feedback").classList.add("hidden");
    document.getElementById("hint").classList.add("hidden");
}

function generatePattern(hour) {
    // Use the hour to determine the alternating symbols
    const symbols = ['🔺', '🔷', '🟢', '🔶'];
    let pattern = '';
    for (let i = 0; i < 4; i++) {
        pattern += symbols[(hour + i) % symbols.length]; // Rotate symbols based on the hour
    }
    return pattern;
}

function showEndScreen() {
    document.getElementById("game-screen").classList.remove("active");
    document.getElementById("end-screen").classList.add("active");
    document.getElementById("bible-verse").textContent = "1 John 4:8 (Look up the verse)";
}