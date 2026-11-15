# 🔬 Science Quest

A gamified science quiz that runs in the browser. Answer questions to earn XP, keep your streak alive, level up from **Rookie** to **Genius**, and try not to lose all three lives.

![Science Quest screenshot](<img width="391" height="398" alt="Screenshot 2026-11-16 024510" src="https://github.com/user-attachments/assets/3aa1de11-ad33-49ef-b15e-aaa584f60b1a" />
)

**▶ Play it live:** https://himeshmartha06.github.io/science-quest/

## Features

- Multiple-choice science questions, shuffled every round
- XP bar that fills as you score
- Four levels: Rookie → Explorer → Scientist → Genius
- 🔥 Streak bonus: 3 correct answers in a row doubles your XP
- ❤️ Three lives, and a wrong answer costs one
- Instant feedback: the correct answer is highlighted, and the card shakes on a wrong answer
- High score saved in your browser, so it's still there when you come back
- Sound effects for correct answers, wrong answers and reaching Genius

## Built with

- HTML for the structure
- CSS for the dark game-style design
- Vanilla JavaScript for the game logic, with no frameworks or libraries

## How to run it locally

1. Clone the repository:
   ```
   git clone https://github.com/himeshmartha06/science-quest.git
   cd science-quest
   ```
2. Open `index.html` in your browser. For auto-refresh while editing, use the **Live Server** extension in VS Code (right-click `index.html` → *Open with Live Server*).

No installs or build steps are needed.

## How to play

1. Read the question and click an answer.
2. Correct answers give **+10 XP**, or **+20 XP** once your streak reaches 3.
3. Wrong answers reset your streak and cost one life.
4. The game ends when you run out of lives or questions.
5. Beat your best score!

## Project structure

```
science-quest/
├── index.html     # page structure
├── style.css      # styling and animations
├── script.js      # question bank and game logic
├── sounds/        # sound effects
└── README.md
```

## Adding your own questions

Questions live in the `questions` array at the top of `script.js`. Each one has the question text, a list of options, and the index of the correct option (counting from 0):

```js
{ q: 'Which planet has the most known moons?', options: ['Mars', 'Saturn', 'Venus', 'Earth'], answer: 1 }
```

## Ideas for the future

- A timer for each question
- Categories such as Space, Biology and Physics
- Loading questions from a JSON file
- Harder questions that give more XP
- A level-up animation and a mute button

## About

Built as my first web development project while learning HTML, CSS, JavaScript, Git and GitHub Pages.
