const questions = [
  { q: 'Which planet has the most known moons?', options: ['Mars', 'Saturn', 'Venus', 'Earth'], answer: 1 },
  { q: 'Which gas do plants absorb for photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Helium'], answer: 2 },
  { q: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], answer: 1 },
  { q: 'Roughly how fast does light travel?', options: ['3 × 10^5 m/s', '3 × 10^6 m/s', '3 × 10^8 m/s', '3 × 10^10 m/s'], answer: 2 },
  { q: 'Which is the closest star to Earth after the Sun?', options: ['Sirius', 'Proxima Centauri', 'Betelgeuse', 'Vega'], answer: 1 },
  { q: 'What is the hardest naturally occurring substance?', options: ['Quartz', 'Steel', 'Diamond', 'Granite'], answer: 2 },
];
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
    el.xpText.textContent='${state.xp} XP';
}


