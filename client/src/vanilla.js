/* Pure frontend birthday experience: no React, no backend, just HTML, CSS, and JavaScript. */
const app = document.querySelector('#app');
import MUSIC from '../assets/happybirthdayAndy.mp3';
import PORTRAIT from '../assets/1000156805.jpg';
import COUPLE from '../assets/1000156843.jpg';
import CELEBRATION from '../assets/rosewater-celebration.png';
import SEAL from '../assets/heart-seal.png';
import photo0 from '../assets/1000156805.jpg';
import photo1 from '../assets/1000156804.jpg';
import photo2 from '../assets/1000156803.jpg';
import photo3 from '../assets/1000156802.jpg';
import photo4 from '../assets/1000156801.jpg';
import photo5 from '../assets/1000156800.jpg';
import photo6 from '../assets/1000156799.jpg';
import photo7 from '../assets/1000156798.jpg';
import photo8 from '../assets/1000156797.jpg';
import photo9 from '../assets/1000156796.jpg';

const photos = [
  photo0, photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9
];
const labels = ['your beautiful smile', 'a little moment of you', 'my favorite face', 'the sweetest memory', 'you being you', 'one for the scrapbook'];
const rotations = [-3, 2, -1, 3, -2, 1];
let step = 'lock';
let loadingTimer;
let musicPlaying = false;
let wishMade = false;
let balloonsShown = false;
let leaving = false;

const audio = new Audio(MUSIC);
audio.loop = true;
audio.volume = 0;
const MUSIC_VOLUME = 0.34;

function shell(content, controls = '') {
  return `<main class="love-site step-${step}${leaving ? ' is-leaving' : ''}">
    <div class="paper-grain" aria-hidden="true"></div><div class="ambient-decor" aria-hidden="true">${Array.from({length: 18}, (_, i) => `<span class="ambient-heart" style="--x:${(i * 29) % 100}%;--y:${(i * 41) % 100}%;--delay:${(i % 7) * .8}s;--size:${10 + (i % 4) * 5}px">♥</span>`).join('')}${Array.from({length: 16}, (_, i) => `<span class="ambient-sparkle" style="--x:${(i * 47) % 100}%;--y:${(i * 31) % 100}%;--delay:${(i % 6) * .7}s">✦</span>`).join('')}</div>
    <header class="site-mark"><div class="mark-lockup"><img src="${SEAL}" alt=""><span>for my favorite person</span></div><span class="issue">18 · 08 · ∞</span></header>
    ${controls}
    <div class="page-wrap">${content}</div>
    <footer class="site-footer">made with too much love <span>♥</span></footer>
  </main>`;
}

function postcard(inner, extra = '') { return `<section class="postcard page-enter ${extra}">${inner}</section>`; }
function button(text, action, cls = 'primary-button', icon = '→') { return `<button class="${cls}" data-action="${action}">${text} <span>${icon}</span></button>`; }

function render() {
  const musicControl = MUSIC && step !== 'lock' ? `<button class="music-toggle${musicPlaying ? ' is-playing' : ''}" data-action="music" aria-label="${musicPlaying ? 'Pause' : 'Play'} background music">${musicPlaying ? 'Ⅱ' : '▶'} <span>♫</span><b>${musicPlaying ? 'playing softly' : 'music'}</b></button>` : '';
  let content = '';
  if (step === 'lock') content = postcard(`<div class="birthday-opening">Happy Birthday, My Love</div><div class="margin-note note-top">open gently · keep forever</div><div class="stamp">▣ private</div><img class="postcard-seal" src="${SEAL}" alt="Rose-petal heart seal"><p class="eyebrow">a little secret, sealed with love</p><h1>There is something<br><em>special</em> for you.</h1><div class="card-divider"><span>♥</span></div><p class="lede">A tiny birthday world made for one very loved girl.</p>${button('open this little page', 'open')}<p class="fine-print">please open with your softest smile</p><div class="margin-note note-bottom">for you, and only you</div>`, 'lock-card');
  if (step === 'loading') content = postcard(`<div class="loading-art"><img src="${CELEBRATION}" alt="A ribbon and flowers on a birthday postcard"></div><p class="eyebrow">untying the ribbon</p><h2>Loading something<br><em>special…</em></h2><div class="progress-shell"><div class="progress-fill" id="progress-fill"></div></div><div class="progress-meta"><span>just for you, bby</span><span id="progress-label">0%</span></div>`, 'loading-card');
  if (step === 'reveal') content = postcard(`<div class="corner-star">✦</div><p class="eyebrow">a birthday note, from me to you</p><h1>It’s your<br><em>special day, bby.</em></h1><img class="portrait" src="${PORTRAIT}" alt="Her portrait"><p class="lede">I made something special for you,<br>because you are my favorite person.</p>${button('start, hun', 'memories', 'primary-button', '♥')}<p class="photo-note">a little photo of my favorite girl</p>`, 'reveal-card');
  if (step === 'memories') {
    const cards = photos.map((src, i) => `<figure class="memory-card" style="transform:rotate(${rotations[i % rotations.length]}deg)"><div class="memory-image"><img src="${src}" alt="Memory ${i + 1}" loading="lazy"></div><figcaption><span>0${(i % 9) + 1}</span>${labels[i % labels.length]}</figcaption></figure>`).join('');
    content = `<section class="wide-section page-enter"><div class="section-seal"><img src="${SEAL}" alt=""> <span>printed with love</span></div><div class="section-heading"><div><p class="eyebrow">chapter one · the good stuff</p><h2>Special <em>memories</em></h2></div><span class="chapter-number">01 / 03</span></div><p class="section-intro">A little film strip of you — ten photos I never want to forget, turned into a page just for us.</p><div class="memory-rail" tabindex="0">${cards}</div><div class="rail-hint">‹ drag or swipe to wander through us ›</div><div class="below-rail"><div><p class="eyebrow">chapter two · in my own words</p><h3>Special letter<br><em>for you.</em></h3></div>${button('click, hun', 'letter')}</div></section>`;
  }
  if (step === 'letter') content = postcard(`<div class="stamp stamp-small">18 · 08</div><div class="letter-seal"><img src="${SEAL}" alt=""></div><p class="eyebrow">chapter two · a letter</p><h2>Happy birthday,<br><em>my love.</em></h2><div class="letter-copy"><p>Happy birthday to the girl who makes ordinary days feel like something worth keeping.</p><p>Thank you for every laugh, every little check-in, and every moment that makes the distance feel smaller. You are such a beautiful part of my life, and I hope today reminds you how deeply loved you are.</p><p>Take all the love in this little page and keep it close. I’m cheering for you today, tomorrow, and always.</p><p class="signature">all my love,<br><strong>your hun</strong> ♥</p></div>${!balloonsShown ? `<p class="timer-note">✦ one more little surprise is waiting…</p>${button('let’s dive more', 'balloons')}` : `<div class="balloon-field" aria-hidden="true">${Array.from({length: 24}, (_, i) => `<span class="balloon" style="--x:${(i * 37) % 100}%;--delay:${(i % 8) * .3}s;--hue:${i * 19}"><i></i></span>`).join('')}</div><div class="letter-actions">${button('restart', 'restart', 'secondary-button', '↻')}${button('continue', 'couple')}</div>`}`, 'letter-card');
  if (step === 'couple') content = postcard(`<div class="couple-reveal-hearts" aria-hidden="true">${Array.from({length: 14}, (_, i) => `<span style="--i:${i};--x:${(i * 41) % 100}%;--delay:${(i % 7) * .12}s">♥</span>`).join('')}</div><p class="eyebrow">chapter three · always us</p><div class="couple-frame reveal-couple"><img src="${COUPLE}" alt="Our couple photo"><span>our favorite kind of forever</span></div><h2>I will always<br><em>love you forever.</em></h2><p class="couple-copy">No matter how far, no matter what it is — it’s you, always, bby. From now to infinity. I can’t wait for us to meet soon. Love you so much, and take care.</p>${button('click, continue', 'final')}`, 'couple-card');
  if (step === 'final') content = postcard(`<img class="final-seal" src="${SEAL}" alt=""><p class="eyebrow">the last little note</p><h1>Take care,<br><em>hun.</em></h1><div class="card-divider"><span>♥</span></div><p class="lede">Keep this page whenever you need a reminder that someone is always thinking of you.</p>${!wishMade ? button('make a wish', 'wish') : `<div class="hidden-wish page-enter" role="status"><span class="wish-star">✦</span><p>My wish is with you — today, tomorrow, and in every beautiful moment still waiting for us.</p><strong>you are my forever wish.</strong></div>`}${button('read it again', 'restart', 'secondary-button', '↻')}`, 'final-card');
  app.innerHTML = shell(content, musicControl);
  bindActions();
  if (step === 'loading') startLoading();
}

function bindActions() { document.querySelectorAll('[data-action]').forEach((el) => el.addEventListener('click', () => handle(el.dataset.action))); }
function handle(action) {
  if (action === 'music') { if (audio.paused) { startMusic(); } else { fadeMusicOut(); } return; }
  if (action === 'open') { startMusic(); go('loading'); return; }
  if (action === 'balloons') { balloonsShown = true; render(); return; }
  if (action === 'wish') { wishMade = true; render(); return; }
  if (action === 'restart') { balloonsShown = false; wishMade = false; go('lock'); return; }
  go(action);
}
function startMusic() { audio.play().then(() => { let volume = audio.volume; const timer = setInterval(() => { volume = Math.min(MUSIC_VOLUME, volume + .025); audio.volume = volume; if (volume >= MUSIC_VOLUME) clearInterval(timer); }, 70); musicPlaying = true; render(); }).catch(() => { musicPlaying = false; render(); }); }
function fadeMusicOut() { const timer = setInterval(() => { audio.volume = Math.max(0, audio.volume - .04); if (audio.volume <= 0) { clearInterval(timer); audio.pause(); musicPlaying = false; render(); } }, 60); }
function go(next) { if (leaving || next === step) return; leaving = true; render(); window.setTimeout(() => { step = next; leaving = false; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 620); }
function startLoading() { clearInterval(loadingTimer); let progress = 0; loadingTimer = setInterval(() => { progress = Math.min(100, progress + 2); const fill = document.querySelector('#progress-fill'); const label = document.querySelector('#progress-label'); if (fill) fill.style.width = `${progress}%`; if (label) label.textContent = `${progress}%`; if (progress >= 100) { clearInterval(loadingTimer); setTimeout(() => go('reveal'), 380); } }, 56); }

import './vanilla.css';
render();
