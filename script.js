console.log('script loaded');
const questions = [
  { q: 'Which planet has the most known moons?', options: ['Mars', 'Saturn', 'Venus', 'Earth'], answer: 1 },
  { q: 'Which gas do plants absorb for photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Helium'], answer: 2 },
  { q: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], answer: 1 },
  { q: 'Roughly how fast does light travel?', options: ['3 × 10^5 m/s', '3 × 10^6 m/s', '3 × 10^8 m/s', '3 × 10^10 m/s'], answer: 2 },
  { q: 'Which is the closest star to Earth after the Sun?', options: ['Sirius', 'Proxima Centauri', 'Betelgeuse', 'Vega'], answer: 1 },
  { q: 'What is the hardest naturally occurring substance?', options: ['Quartz', 'Steel', 'Diamond', 'Granite'], answer: 2 },
  { q: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Gd', 'Go'], answer: 0 },
  { q: 'How many bones does an adult human body have?', options: ['156', '256', '306', '206'], answer: 3 },
  { q: 'Which planet is known as the Red Planet?', options: ['Mercury', 'Jupiter', 'Neptune', 'Mars'], answer: 3 },
  { q: 'Which gas makes up most of Earth\'s atmosphere?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], answer: 2 },
  { q: 'What is the SI unit of electrical resistance?', options: ['Ohm', 'Volt', 'Watt', 'Ampere'], answer: 0 },
  { q: 'Which blood cells carry oxygen around the body?', options: ['White blood cells', 'Platelets', 'Red blood cells', 'Plasma'], answer: 2 },
  { q: 'At sea level, at what temperature does water boil?', options: ['90 °C', '100 °C', '110 °C', '120 °C'], answer: 1 },
  { q: 'Who developed the theory of general relativity?', options: ['Newton', 'Galileo', 'Bohr', 'Einstein'], answer: 3 },
  { q: 'What is the largest organ of the human body?', options: ['Liver', 'Brain', 'Skin', 'Lungs'], answer: 2 },
  { q: 'Which subatomic particle has a negative charge?', options: ['Electron', 'Proton', 'Neutron', 'Photon'], answer: 0 },
  { q: 'What is the pH of pure water at 25 °C?', options: ['0', '7', '10', '14'], answer: 1 },
  { q: 'About how long does sunlight take to reach Earth?', options: ['8 seconds', '8 hours', '8 days', '8 minutes'], answer: 3 },
  { q: 'Which element has the atomic number 1?', options: ['Hydrogen', 'Helium', 'Lithium', 'Carbon'], answer: 0 },
  { q: 'Which force keeps the planets in orbit around the Sun?', options: ['Magnetism', 'Friction', 'Gravity', 'Nuclear force'], answer: 2 },
  { q: 'Which is the largest planet in our solar system?', options: ['Saturn', 'Neptune', 'Uranus', 'Jupiter'], answer: 3 },
  { q: 'What does DNA stand for?', options: ['Deoxyribonucleic acid', 'Dioxyribonucleic acid', 'Deoxyribose nucleic anhydride', 'Dinucleic acid'], answer: 0 },
  { q: 'Which layer of the Earth is made of liquid metal?', options: ['Crust', 'Mantle', 'Outer core', 'Inner core'], answer: 2 },
  { q: 'What kind of energy does a moving object have?', options: ['Kinetic', 'Potential', 'Thermal', 'Chemical'], answer: 0 },
  { q: 'Which vitamin does your skin make when exposed to sunlight?', options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'], answer: 2 },
  { q: 'Sound travels fastest through which of these?', options: ['Air', 'Water', 'Steel', 'A vacuum'], answer: 2 },
];
const ROUND_LENGTH = Math.min(10, questions.length);
const XP_PER_CORRECT = 10;
const maxXp = XP_PER_CORRECT * (2 * ROUND_LENGTH - 2); // first 2 answers earn 10, the rest earn 20

const levels = [
  { name: 'Rookie', minPct: 0 },
  { name: 'Explorer', minPct: 0.25 },
  { name: 'Scientist', minPct: 0.5 },
  { name: 'Genius', minPct: 0.8 },
];

let state ={};

const el ={
    game: document.querySelector('.game'),
    lives: document.getElementById('lives'),
    streak: document.getElementById('streak'),
    level: document.getElementById('level'),
    xpFill: document.getElementById('xp-fill'),
    xpText: document.getElementById('xp-text'),
    quiz: document.getElementById('quiz'),
    question: document.getElementById('question'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),
    nextBtn: document.getElementById('next-btn'),
    endScreen: document.getElementById('end-screen'),
    endTitle: document.getElementById('end-title'),
    endScore: document.getElementById('end-score'),
    bestScore: document.getElementById('best-score'),
    restartBtn: document.getElementById('restart-btn'),
};
const sounds = {
  correct: new Audio('sounds/ma-ka-bhosda-aag.mp3'),
  wrong: new Audio('sounds/angry-amitabh.mp3'),
  genius: new Audio('sounds/7-crore-amitabh-baccan.mp3'),
};

function playSound(name) {
  const s = sounds[name];
  s.currentTime = 0; // restart if it's still playing
  s.play().catch(() => {}); // ignore errors if the browser blocks it
}


function shuffle(arr){
    const copy =[...arr];
    for (let i=copy.length-1; i>0; i--){
        const j= Math.floor(Math.random()*(i+1));
        [copy[i], copy[j]]= [copy[j], copy[i]];
    }
    return copy;
}

function getLevel(xp) {
  let current = levels[0];
  for (const lvl of levels) {
    if (xp / maxXp >= lvl.minPct) current = lvl;
  }
  return current.name;
}

function updateHud(){
    el.lives.textContent=state.lives>0?'❤️'.repeat(state.lives):'💀';
    el.streak.textContent=`🔥 ${state.streak}`;
    el.level.textContent=getLevel(state.xp);
    el.xpFill.style.width=Math.min(100, (state.xp/maxXp)*100) +'%';
    el.xpText.textContent=`${state.xp} XP`;
}

function showQuestion(){
    state.locked=false;
    const current= state.deck[state.index];

    el.question.textContent= current.q;
    el.feedback.textContent='';
    el.nextBtn.classList.add('hidden');
    el.options.innerHTML='';
    
    current.options.forEach((text, i)=>{
        const btn =document.createElement('button');
        btn.className='option-btn';
        btn.textContent=text;
        btn.addEventListener('click', ()=> handleAnswer(i, btn));
        el.options.appendChild(btn);
    });
}

function handleAnswer(chosen, btn){
    if (state.locked) return;
    state.locked= true;

    const current= state.deck[state.index];
    const buttons= el.options.querySelectorAll('.option-btn');
    buttons.forEach((b)=>(b.disabled=true));

    if (chosen=== current.answer){
        state.streak++;
        const bonus =state.streak >=3? 2:1;
        const gained = XP_PER_CORRECT * bonus;
        state.xp += gained;
        btn.classList.add('correct');
        el.feedback.textContent=`✅ Correct! +${gained} XP`;
        playSound('correct');
    }else{
        state.streak=0;
        state.lives--;
        btn.classList.add('wrong');
        buttons[current.answer].classList.add('correct');
        el.feedback.textContent='❌ Not quite. You lost a life.';
        el.game.classList.add('shake');
        setTimeout(()=>el.game.classList.remove('shake'), 300);
        playSound('wrong');
    }

    updateHud();
    el.nextBtn.classList.remove('hidden');
}

function nextQuestion(){
    state.index++;
    if (state,lives ===0 || state.index >= state.deck.length){
        endGame();
    }else{
        showQuestion();
    }
}

function loadBest(){
    try { return Number(localStorage.getItem('scienceQuestBest')) ||0; }
    catch{ return 0; }
}

function saveBest(xp){
    try{ localStorage.setItem('scienceQuestBest', xp); }
    catch{/* storage unavailable, ignore */}
}

function endGame(){
    el.quiz.classList.add('hidden');
    el.endScreen.classList.remove('hidden');
    el.endTitle.textContent=state.lives===0 ? '💀 Game over' : '🏆 Quest complete!';
    el.endScore.textContent=`You earned ${state.xp} XP and reached ${getLevel(state.xp)} level.`;
    if (state.lives > 0 && getLevel(state.xp) === 'Genius') {
       playSound('genius');
    }

    const best = loadBest();
    if (state.xp >best){
        saveBest(state.xp);
        el.bestScore.textContent='🎉 New high score!';
    }else{
        el.bestScore.textContent=`Best score: ${best} XP`;
    }
}

function startGame(){
    state={xp:0, lives:3, streak:0, index:0, locked: false, deck:shuffle(questions).slice(0, ROUND_LENGTH)};
    el.endScreen.classList.add('hidden');
    el.quiz.classList.remove('hidden');
    updateHud();
    showQuestion();
}

el.nextBtn.addEventListener('click', nextQuestion);
el.restartBtn.addEventListener('click', startGame);

startGame();