/* Rosewater Postcard direction: intimate editorial keepsake, warm parchment, burgundy ink, postage-stamp details, gentle page-turn motion. */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, Heart, LockKeyhole, Pause, Play, RotateCcw, Sparkles, Stars, Volume2 } from "lucide-react";

import MUSIC from "@assets/happybirthdayAndy.mp3";
import PORTRAIT from "@assets/1000156805.jpg";
import COUPLE from "@assets/1000156843.jpg";
import CELEBRATION from "@assets/rosewater-celebration.png";
import SEAL from "@assets/heart-seal.png";
import photo0 from "@assets/1000156805.jpg";
import photo1 from "@assets/1000156804.jpg";
import photo2 from "@assets/1000156803.jpg";
import photo3 from "@assets/1000156802.jpg";
import photo4 from "@assets/1000156801.jpg";
import photo5 from "@assets/1000156800.jpg";
import photo6 from "@assets/1000156799.jpg";
import photo7 from "@assets/1000156798.jpg";
import photo8 from "@assets/1000156797.jpg";
import photo9 from "@assets/1000156796.jpg";

const memoryPhotos = [
  photo0, photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9
];

const memories = memoryPhotos.map((src, index) => ({
  src,
  label: ["your beautiful smile", "a little moment of you", "my favorite face", "the sweetest memory", "you being you", "one for the scrapbook"][index % 6],
  rotate: [-3, 2, -1, 3, -2, 1][index % 6],
}));

type Step = "lock" | "loading" | "reveal" | "memories" | "letter" | "couple" | "final";

export default function Home() {
  const [step, setStep] = useState<Step>("lock");
  const [progress, setProgress] = useState(0);
  const [balloons, setBalloons] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (step !== "loading") return;
    setProgress(0);
    const started = Date.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, ((Date.now() - started) / 2800) * 100);
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setStep("reveal"), 380);
      }
    }, 45);
    return () => window.clearInterval(timer);
  }, [step]);

  useEffect(() => {
    if (step === "letter") setBalloons(false);
  }, [step]);

  const restart = () => {
    setStep("lock");
    setProgress(0);
    setBalloons(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextStep = (next: Step) => {
    if (next === step || isLeaving) return;
    setIsLeaving(true);
    window.setTimeout(() => {
      setStep(next);
      setIsLeaving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 620);
  };

  const openKeepsake = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.34;
      audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    }
    nextStep("loading");
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  const progressLabel = useMemo(() => `${Math.round(progress)}%`, [progress]);

  return (
    <main className={`love-site step-${step}${isLeaving ? " is-leaving" : ""}`}>
      {MUSIC && <audio ref={audioRef} src={MUSIC} loop preload="auto" aria-label="Soft romantic background music" />}
      {MUSIC && step !== "lock" && <button className="music-toggle" onClick={toggleMusic} aria-label={musicPlaying ? "Pause background music" : "Play background music"} title={musicPlaying ? "Pause music" : "Play music"}>{musicPlaying ? <Pause size={14} /> : <Play size={14} />}<Volume2 size={14} /></button>}
      <div className="paper-grain" aria-hidden="true" />
      <header className="site-mark">
        <div className="mark-lockup"><img src={SEAL} alt="" /><span>for my favorite person</span></div>
        <span className="issue">18 · 08 · ∞</span>
      </header>

      <div className="page-wrap">
        {step === "lock" && (
          <section className="postcard lock-card page-enter" aria-labelledby="lock-title">
            <div className="margin-note note-top">open gently · keep forever</div>
            <div className="stamp"><LockKeyhole size={17} /><span>private</span></div>
            <img className="postcard-seal" src={SEAL} alt="Rose-petal heart seal" />
            <p className="eyebrow">a little secret, sealed with love</p>
            <h1 id="lock-title">There is something<br /><em>special</em> for you.</h1>
            <div className="card-divider"><span>♥</span></div>
            <p className="lede">A tiny birthday world made for one very loved girl.</p>
            <button className="primary-button" onClick={openKeepsake}>
              open this little page <ArrowRight size={17} />
            </button>
            <p className="fine-print">please open with your softest smile</p>
            <div className="margin-note note-bottom">for you, and only you</div>
          </section>
        )}

        {step === "loading" && (
          <section className="postcard loading-card page-enter" aria-live="polite">
            <div className="loading-art"><img src={CELEBRATION} alt="A ribbon and flowers on a birthday postcard" /></div>
            <p className="eyebrow">untying the ribbon</p>
            <h2>Loading something<br /><em>special…</em></h2>
            <div className="progress-shell" aria-label={`Loading ${progressLabel}`}><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <div className="progress-meta"><span>just for you, bby</span><span>{progressLabel}</span></div>
          </section>
        )}

        {step === "reveal" && (
          <section className="postcard reveal-card page-enter" aria-labelledby="reveal-title">
            <div className="corner-star"><Stars size={22} /></div>
            <p className="eyebrow">a birthday note, from me to you</p>
            <h1 id="reveal-title">It’s your<br /><em>special day, bby.</em></h1>
            <img className="portrait" src={PORTRAIT} alt="Portrait placeholder — replace with her photo" />
            <p className="lede">I made something special for you,<br />because you are my favorite person.</p>
            <button className="primary-button" onClick={() => nextStep("memories")}>start, hun <Heart size={17} fill="currentColor" /></button>
            <p className="photo-note">replace the portrait with her favorite photo</p>
          </section>
        )}

        {step === "memories" && (
          <section className="wide-section page-enter" aria-labelledby="memories-title">
            <div className="section-seal"><img src={SEAL} alt="" /><span>printed with love</span></div>
            <div className="section-heading">
              <div><p className="eyebrow">chapter one · the good stuff</p><h2 id="memories-title">Special <em>memories</em></h2></div>
              <span className="chapter-number">01 / 03</span>
            </div>
            <p className="section-intro">A little film strip of you — ten photos I never want to forget, turned into a page just for us.</p>
            <div className="memory-rail" tabIndex={0} aria-label="Horizontally scrolling memories">
              {memories.map((memory, index) => <figure className="memory-card" key={memory.src} style={{ transform: `rotate(${memory.rotate}deg)` }}><div className="memory-image"><img src={memory.src} alt={`Memory ${index + 1}`} loading="lazy" /></div><figcaption><span>0{(index % 9) + 1}</span>{memory.label}</figcaption></figure>)}
            </div>
            <div className="rail-hint"><ChevronLeft size={15} /> drag or swipe to wander through us <ArrowRight size={15} /></div>
            <div className="below-rail">
              <div><p className="eyebrow">chapter two · in my own words</p><h3>Special letter<br /><em>for you.</em></h3></div>
              <button className="primary-button" onClick={() => nextStep("letter")}>click, hun <ArrowRight size={17} /></button>
            </div>
          </section>
        )}

        {step === "letter" && (
          <section className="postcard letter-card page-enter" aria-labelledby="letter-title">
            <div className="stamp stamp-small">18 · 08</div>
            <div className="letter-seal"><img src={SEAL} alt="" /></div>
            <p className="eyebrow">chapter two · a letter</p>
            <h2 id="letter-title">Happy birthday,<br /><em>my love.</em></h2>
            <div className="letter-copy">
              <p>Happy birthday to the girl who makes ordinary days feel like something worth keeping.</p>
              <p>Thank you for every laugh, every little check-in, and every moment that makes the distance feel smaller. You are such a beautiful part of my life, and I hope today reminds you how deeply loved you are.</p>
              <p>Take all the love in this little page and keep it close. I’m cheering for you today, tomorrow, and always.</p>
              <p className="signature">all my love,<br /><strong>your hun</strong> <Heart size={14} fill="currentColor" /></p>
            </div>
            {!balloons && <>
              <p className="timer-note"><Sparkles size={14} /> one more little surprise is waiting…</p>
              <button className="primary-button dive-button" onClick={() => setBalloons(true)}>let’s dive more <ArrowRight size={17} /></button>
            </>}
            {balloons && <div className="balloon-field" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <span key={index} className="balloon" style={{ ["--x" as string]: `${(index * 37) % 100}%`, ["--delay" as string]: `${(index % 8) * 0.3}s`, ["--hue" as string]: `${index * 19}` }}><i /></span>)}</div>}
            {balloons && <div className="letter-actions"><button className="secondary-button" onClick={restart}><RotateCcw size={16} /> restart</button><button className="primary-button" onClick={() => nextStep("couple")}>continue <ArrowRight size={17} /></button></div>}
          </section>
        )}

        {step === "couple" && (
          <section className="postcard couple-card page-enter" aria-labelledby="couple-title">
            <p className="eyebrow">chapter three · always us</p>
            <div className="couple-frame"><img src={COUPLE} alt="Couple photo placeholder — replace with a photo of you together" /><span>our favorite kind of forever</span></div>
            <h2 id="couple-title">I will always<br /><em>love you forever.</em></h2>
            <p className="couple-copy">No matter how far, no matter what it is — it’s you, always, bby. From now to infinity. I can’t wait for us to meet soon. Love you so much, and take care.</p>
            <button className="primary-button" onClick={() => nextStep("final")}>click, continue <ArrowRight size={17} /></button>
          </section>
        )}

        {step === "final" && (
          <section className="postcard final-card page-enter" aria-labelledby="final-title">
            <img className="final-seal" src={SEAL} alt="" /><p className="eyebrow">the last little note</p>
            <h1 id="final-title">Take care,<br /><em>hun.</em></h1>
            <div className="card-divider"><span>♥</span></div>
            <p className="lede">Keep this page whenever you need a reminder that someone is always thinking of you.</p>
            {!wishMade && <button className="primary-button wish-button" onClick={() => setWishMade(true)}><Sparkles size={17} /> make a wish</button>}
            {wishMade && <div className="hidden-wish page-enter" role="status"><span className="wish-star">✦</span><p>My wish is simple: that every year ahead brings you closer to the happiness you deserve — and that somehow, I get to be there beside you for all of it.</p><strong>you are my forever wish.</strong></div>}
            <button className="secondary-button" onClick={restart}><RotateCcw size={16} /> read it again</button>
          </section>
        )}
      </div>
      <footer className="site-footer">made with too much love <span>♥</span></footer>
    </main>
  );
}
