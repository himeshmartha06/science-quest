console.log('script loaded');
const questions = [
  { q: 'Which planet has the most known moons?', options: ['Mars', 'Saturn', 'Venus', 'Earth'], answer: 1 },
  { q: 'Which gas do plants absorb for photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Helium'], answer: 2 },
  { q: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], answer: 1 },
  { q: 'Roughly how fast does light travel?', options: ['3 × 10^5 m/s', '3 × 10^6 m/s', '3 × 10^8 m/s', '3 × 10^10 m/s'], answer: 2 },
  { q: 'Which is the closest star to Earth after the Sun?', options: ['Sirius', 'Proxima Centauri', 'Betelgeuse', 'Vega'], answer: 1 },
  { q: 'What is the hardest naturally occurring substance?', options: ['Quartz', 'Steel', 'Diamond', 'Granite'], answer: 2 },
];
const XP_PER_CORRECT = 10;
const maxXp = questions.length * XP_PER_CORRECT * 2;

const levels=[
    { name: 'Rookie', minXp:0},
    { name: 'Explorer', minXp:30},
    { name: 'Scientist', minXp:60},
    { name: 'Genius', minXp:90},
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

function getLevel(xp){
    let current=levels[0];
    for (const lvl of levels){
        if (xp>=lvl.minXp) current=lvl;
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
    state={xp:0, lives:3, streak:0, index:0, locked: false, deck:shuffle(questions)};
    el.endScreen.classList.add('hidden');
    el.quiz.classList.remove('hidden');
    updateHud();
    showQuestion();
}

el.nextBtn.addEventListener('click', nextQuestion);
el.restartBtn.addEventListener('click', startGame);

startGame();