export const effectsCss = `<style>
/* Variação animada: mesma copy e mesma paleta da página original, só movimento */
.hero{position:relative}
.hero:before{content:"";position:absolute;left:50%;top:-120px;width:140%;height:620px;transform:translateX(-50%);background:radial-gradient(ellipse at 50% 0,rgba(201,168,106,.20),rgba(201,168,106,0) 62%);pointer-events:none;animation:beam 9s ease-in-out infinite alternate}
@keyframes beam{from{opacity:.55;transform:translateX(-54%) rotate(-3deg)}to{opacity:1;transform:translateX(-46%) rotate(3deg)}}
.hero>.gp{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.hero .ph,.hero>div{z-index:1}
.gp i{position:absolute;bottom:-10px;width:3px;height:3px;border-radius:50%;background:var(--gold2);opacity:0;animation:rise linear infinite}
@keyframes rise{0%{opacity:0;transform:translateY(0)}15%{opacity:.7}100%{opacity:0;transform:translateY(-640px)}}
h1.ln{overflow:hidden}
.rv{opacity:0;transform:translateY(24px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1);transition-delay:var(--d,0ms)}
.rv.in{opacity:1;transform:none}
.cards li,.depo figure,.gal figure{transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease}
.cards li:hover,.depo figure:hover{box-shadow:0 18px 50px rgba(201,168,106,.14);border-color:rgba(201,168,106,.5)}
.tilt{transform-style:preserve-3d;will-change:transform}
.gal img{transition:transform 6s ease-out}
.gal figure.in img{transform:scale(1.06)}
.gal figure{overflow:hidden}
.days{position:relative}
.days:before{content:"";position:absolute;left:0;top:0;height:2px;width:calc(var(--p,0)*100%);background:linear-gradient(90deg,var(--gold),var(--gold2));box-shadow:0 0 14px rgba(201,168,106,.6);transition:width .15s linear}
.cta{position:relative;overflow:hidden}
.cta,.nav a.mini{border-radius:999px}
.cta{background:linear-gradient(135deg,#f0dca8 0%,#e3cb95 28%,#c9a86a 62%,#a98543 100%);box-shadow:0 10px 30px rgba(201,168,106,.28),inset 0 1px 0 rgba(255,255,255,.45);transition:transform .25s ease,box-shadow .25s ease,filter .25s ease}
.cta:hover{transform:translateY(-2px);filter:brightness(1.05);box-shadow:0 16px 42px rgba(201,168,106,.4),inset 0 1px 0 rgba(255,255,255,.5)}
.nav a.mini{background:linear-gradient(135deg,rgba(201,168,106,.16),rgba(201,168,106,.04))}
.cta:after{content:"";position:absolute;top:0;left:-70%;width:45%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.32),transparent);transform:skewX(-20deg);transition:left .8s ease}
.cta:hover:after{left:130%}
.sticky .cta{animation:pulse 2.8s ease-in-out infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,106,.0)}50%{box-shadow:0 0 0 9px rgba(201,168,106,.18)}}
details{transition:background .3s ease}
details[open]{background:rgba(201,168,106,.05)}
details[open] p{animation:fd .5s ease}
@keyframes fd{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.chk .bx{transition:transform .25s ease,background .25s ease,box-shadow .25s ease}
.chk input:checked+.bx{transform:scale(1.12);box-shadow:0 0 14px rgba(201,168,106,.5)}
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.hero:before,.gp i,.sticky .cta{animation:none}.gal img{transition:none}.cta:after{display:none}}
.hero .cta,.final-t .cta,.chkres .cta{display:flex;align-items:center;justify-content:center;width:100%;max-width:520px;min-height:64px;margin-inline:auto;padding:18px 32px;font-size:15px;text-align:center}
.hero>div:first-child{text-align:left}
.hero .cta{margin-block:8px 28px}
.final-t{text-align:center}
.final-t .cta,.chkres .cta{margin-top:20px}
.cta .cta-long,.cta .cta-short{text-align:center}
.sticky .cta{width:100%;max-width:520px;margin-inline:auto;min-height:56px}
</style>`;

export function initEffects(variant = 'v2'): () => void {
  if (variant === 'v3') return initV3();
  if (variant === 'v4') return initV4();
  if (['v5','v6','v7','v8','v9','v10'].includes(variant)) return initRef(variant);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups: Array<() => void> = [];
  const q = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));
  const hero = document.querySelector<HTMLElement>('.hero');
  if (hero && !reduce) {
    const gp = document.createElement('div'); gp.className = 'gp';
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('i');
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${9 + Math.random() * 9}s`;
      p.style.animationDelay = `${-Math.random() * 12}s`;
      gp.appendChild(p);
    }
    hero.prepend(gp);
  }
  const targets = q<HTMLElement>('.eyebrow, h1, h2, .hero .date, .hero p, .cols > div, .cards li, .day, .nums > div, .depo figure, .gal figure, .chk li, section > p, .final-t > *, details, .facts');
  targets.forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', `${(i % 4) * 90}ms`); });
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.matches('.nums > div')) countUp(e.target as HTMLElement); } }), { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
  function countUp(el: HTMLElement) {
    const s = el.querySelector('strong'); if (!s || reduce) return;
    const m = s.textContent?.match(/^(\+)(\d+)( mil)$/); if (!m) return;
    const end = Number(m[2]); const t0 = performance.now();
    const step = (t: number) => { const k = Math.min(1, (t - t0) / 1400); s.textContent = `${m[1]}${Math.round(end * (1 - Math.pow(1 - k, 3)))}${m[3]}`; if (k < 1) requestAnimationFrame(step); };
    s.textContent = `${m[1]}0${m[3]}`; requestAnimationFrame(step);
  }
  const days = document.querySelector<HTMLElement>('.days');
  const onScroll = () => {
    if (days) { const r = days.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (window.innerHeight * 0.8 - r.top) / (r.height + window.innerHeight * 0.3))); days.style.setProperty('--p', String(p)); }
  };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); cleanups.push(() => window.removeEventListener('scroll', onScroll));
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    q<HTMLElement>('.cards li, .depo figure').forEach((el) => {
      el.classList.add('tilt');
      const mv = (e: MouseEvent) => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-3px)`; };
      const lv = () => { el.style.transform = ''; };
      el.addEventListener('mousemove', mv); el.addEventListener('mouseleave', lv);
      cleanups.push(() => { el.removeEventListener('mousemove', mv); el.removeEventListener('mouseleave', lv); });
    });
  }
  return () => cleanups.forEach((f) => f());
}

/* v3: direção frontend-design. Um único momento orquestrado (abertura do hero), resto contido; movimento só em resposta a ação ou na linha do tempo dos 3 dias, que é uma sequência real. */
export const cssV3 = `<style>
.cta,.nav a.mini{border-radius:999px}
.cta{background:linear-gradient(135deg,#f0dca8 0%,#e3cb95 28%,#c9a86a 62%,#a98543 100%);box-shadow:0 10px 30px rgba(201,168,106,.25),inset 0 1px 0 rgba(255,255,255,.4);transition:transform .25s ease,box-shadow .25s ease}
.cta:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(201,168,106,.38),inset 0 1px 0 rgba(255,255,255,.5)}
.nav a.mini{background:rgba(201,168,106,.08)}
h1{letter-spacing:-.02em}
h2{letter-spacing:-.01em;max-width:18ch}
p,.lead{max-width:62ch}
section{padding-block:clamp(48px,9vw,104px)}
.cards li{border-radius:14px;transition:border-color .3s ease,background .3s ease}
.cards li:hover{border-color:rgba(201,168,106,.55);background:rgba(201,168,106,.05)}
.depo figure,.gal figure{border-radius:10px;overflow:hidden}
.gal img{transition:transform .9s ease}
.gal figure:hover img{transform:scale(1.04)}
.hero{position:relative}
.hero:before{content:"";position:absolute;left:-10%;top:-60px;width:60%;height:140%;background:linear-gradient(100deg,rgba(201,168,106,0) 30%,rgba(227,203,149,.14) 50%,rgba(201,168,106,0) 70%);transform:translateX(-120%) skewX(-12deg);pointer-events:none;animation:sweep 2.6s .6s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes sweep{to{transform:translateX(260%) skewX(-12deg)}}
.o1{opacity:0;transform:translateY(18px);animation:up .9s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:var(--t,0s)}
@keyframes up{to{opacity:1;transform:none}}
.hero .ph img{clip-path:inset(0 0 100% 0);animation:wipe 1.3s .35s cubic-bezier(.7,0,.2,1) forwards}
@keyframes wipe{to{clip-path:inset(0)}}
.days{position:relative}
.days:before{content:"";position:absolute;left:0;top:0;height:2px;width:calc(var(--p,0)*100%);background:linear-gradient(90deg,#c9a86a,#e3cb95)}
.day{opacity:calc(.35 + var(--a,0)*.65);transition:opacity .4s ease}
details{transition:background .3s ease}
details[open]{background:rgba(201,168,106,.05)}
details[open] p{animation:up .45s ease forwards}
.chk .bx{transition:transform .25s ease,box-shadow .25s ease}
.chk input:checked+.bx{transform:scale(1.1);box-shadow:0 0 12px rgba(201,168,106,.45)}
:focus-visible{outline:2px solid #e3cb95;outline-offset:3px}
@media (prefers-reduced-motion:reduce){.hero:before{display:none}.o1{opacity:1;transform:none;animation:none}.hero .ph img{clip-path:none;animation:none}.day{opacity:1}}
.hero .cta,.final-t .cta,.chkres .cta{display:flex;align-items:center;justify-content:center;width:100%;max-width:520px;min-height:64px;margin-inline:auto;padding:18px 32px;font-size:15px;text-align:center}
.hero>div:first-child{text-align:left}
.hero .cta{margin-block:8px 28px}
.final-t{text-align:center}
.final-t .cta,.chkres .cta{margin-top:20px}
.cta .cta-long,.cta .cta-short{text-align:center}
.sticky .cta{width:100%;max-width:520px;margin-inline:auto;min-height:56px}
</style>`;
function initV3(): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cl: Array<() => void> = [];
  if (!reduce) {
    const hs = Array.from(document.querySelectorAll<HTMLElement>('.hero .eyebrow, .hero h1, .hero .date, .hero > div > p, .hero .cta, .hero .facts'));
    hs.forEach((el, i) => { el.classList.add('o1'); el.style.setProperty('--t', `${0.15 + i * 0.12}s`); });
  }
  const days = document.querySelector<HTMLElement>('.days');
  const dd = Array.from(document.querySelectorAll<HTMLElement>('.day'));
  const onScroll = () => {
    if (!days) return;
    const r = days.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (window.innerHeight * 0.8 - r.top) / (r.height + window.innerHeight * 0.3)));
    days.style.setProperty('--p', String(p));
    dd.forEach((d, i) => d.style.setProperty('--a', String(p * dd.length > i + 0.2 ? 1 : 0)));
  };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); cl.push(() => window.removeEventListener('scroll', onScroll));
  return () => cl.forEach((f) => f());
}

/* v4: direção ui-ux-pro-max. Acessibilidade e toque em primeiro lugar, movimento curto (150 a 300 ms), progresso de leitura, foco visível, alvos de 44px. */
export const cssV4 = `<style>
.cta,.nav a.mini,.sticky .cta{border-radius:999px;min-height:48px;display:inline-flex;align-items:center;justify-content:center}
.cta{background:linear-gradient(135deg,#f0dca8 0%,#e3cb95 30%,#c9a86a 65%,#a98543 100%);box-shadow:0 8px 24px rgba(201,168,106,.25),inset 0 1px 0 rgba(255,255,255,.4);transition:transform .2s ease,box-shadow .2s ease}
.cta:hover{transform:translateY(-1px);box-shadow:0 12px 32px rgba(201,168,106,.38)}
.cta:active{transform:scale(.98)}
.nav a.mini{min-height:44px}
summary{min-height:48px;display:flex;align-items:center;cursor:pointer}
.chk label{min-height:48px}
:focus-visible{outline:3px solid #e3cb95;outline-offset:3px;border-radius:6px}
.pg{position:fixed;left:0;top:0;height:3px;width:calc(var(--sp,0)*100%);background:linear-gradient(90deg,#c9a86a,#e3cb95);z-index:50;pointer-events:none}
.rv{opacity:0;transform:translateY(14px);transition:opacity .35s ease-out,transform .35s ease-out;transition-delay:var(--d,0ms)}
.rv.in{opacity:1;transform:none}
.cards li,.depo figure{transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}
.cards li:hover,.depo figure:hover{border-color:rgba(201,168,106,.5);box-shadow:0 10px 30px rgba(201,168,106,.12)}
.gal img{transition:transform .6s ease}
.gal figure:hover img{transform:scale(1.04)}
details[open] p{animation:fd .25s ease}
@keyframes fd{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.chk input:checked+.bx{transform:scale(1.1);box-shadow:0 0 12px rgba(201,168,106,.5)}
.chk .bx{transition:transform .2s ease,box-shadow .2s ease}
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.pg{display:none}}
.hero .cta,.final-t .cta,.chkres .cta{display:flex;align-items:center;justify-content:center;width:100%;max-width:520px;min-height:64px;margin-inline:auto;padding:18px 32px;font-size:15px;text-align:center}
.hero>div:first-child{text-align:left}
.hero .cta{margin-block:8px 28px}
.final-t{text-align:center}
.final-t .cta,.chkres .cta{margin-top:20px}
.cta .cta-long,.cta .cta-short{text-align:center}
.sticky .cta{width:100%;max-width:520px;margin-inline:auto;min-height:56px}
</style>`;
function initV4(): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cl: Array<() => void> = [];
  const bar = document.createElement('div'); bar.className = 'pg'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar); cl.push(() => bar.remove());
  const onScroll = () => { const h = document.documentElement.scrollHeight - window.innerHeight; bar.style.setProperty('--sp', String(h > 0 ? window.scrollY / h : 0)); };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); cl.push(() => window.removeEventListener('scroll', onScroll));
  if (!reduce) {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.cards li, .day, .depo figure, .nums > div, .chk li'));
    targets.forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', `${(i % 4) * 60}ms`); });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
    targets.forEach((el) => io.observe(el)); cl.push(() => io.disconnect());
  }
  return () => cl.forEach((f) => f());
}

/* v5, v6, v7: padrões de estrutura inspirados em templates de referência (Cruip, ixartz/Next.js, galerias tipo Land-book e Lapa Ninja), com a mesma copy e a mesma paleta do Dr. Ritchie. */
const base = `.cta,.nav a.mini{border-radius:999px}
.cta{background:linear-gradient(135deg,#f0dca8 0%,#e3cb95 28%,#c9a86a 62%,#a98543 100%);box-shadow:0 10px 30px rgba(201,168,106,.25),inset 0 1px 0 rgba(255,255,255,.4);transition:transform .25s ease,box-shadow .25s ease}
.cta:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(201,168,106,.38)}
.hero .cta,.final-t .cta,.chkres .cta{display:flex;align-items:center;justify-content:center;width:100%;max-width:520px;min-height:64px;margin-inline:auto;padding:18px 32px;font-size:15px}
.sticky .cta{width:100%;max-width:520px;margin-inline:auto;min-height:56px}
:focus-visible{outline:2px solid #e3cb95;outline-offset:3px}
.pstrip{display:flex;gap:28px;justify-content:center;flex-wrap:wrap;margin:8px 0 26px}
.pstrip div{text-align:center}
.pstrip strong{display:block;font-family:var(--serif);font-size:clamp(28px,5vw,40px);color:var(--gold2);font-weight:500;line-height:1}
.pstrip span{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}
`;
export const cssV5 = `<style>${base}
/* V5, padrão Cruip: topo translúcido fixo, hero centralizado com prova ao lado do botão, foto em faixa larga, blocos em grade */
.nav{position:sticky;top:0}
.hero{display:block;text-align:center;padding-block:40px 24px}
.hero>div:first-child{max-width:860px;margin-inline:auto}
.hero .eyebrow{justify-content:center}
.hero .eyebrow:before{display:none}
.hero .date,.hero p{margin-inline:auto}
.hero .facts{display:grid;grid-template-columns:1fr 1fr;gap:14px;text-align:left;margin-top:8px}
.hero .ph{margin:36px 0 0;order:0}
.hero .ph img{aspect-ratio:21/9;border-radius:18px;object-position:50% 22%;width:100%}
.cards{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.cards li{border-radius:16px}
@media(max-width:720px){.hero .facts{grid-template-columns:1fr}.cards{grid-template-columns:1fr}.hero .ph img{aspect-ratio:4/3}}
</style>`;
export const cssV6 = `<style>${base}
/* V6, padrão Next.js/Tailwind SaaS: hero à esquerda com prova abaixo do botão, bento grid, FAQ em duas colunas */
.hero{align-items:center}
.hero .pstrip{justify-content:flex-start;margin-top:18px}
.hero .cta{margin-inline:0}
.cards{display:grid;grid-template-columns:repeat(2,1fr);grid-auto-rows:minmax(150px,auto);gap:14px}
.cards li:first-child{grid-column:span 2;background:linear-gradient(135deg,rgba(201,168,106,.14),rgba(201,168,106,.03))}
.cards li{border-radius:20px;padding:24px}
.days{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.day{border-radius:20px}
.faqw{display:grid;grid-template-columns:1fr 1fr;gap:12px 28px;align-items:start;max-width:none!important}
details{border-radius:14px}
@media(max-width:820px){.cards,.days,.faqw{grid-template-columns:1fr}.cards li:first-child{grid-column:auto}.hero .cta{margin-inline:auto}.hero .pstrip{justify-content:center}}
</style>`;
export const cssV7 = `<style>${base}
/* V7, padrão editorial de galerias (Land-book, Lapa Ninja): hero com foto em tela cheia e texto sobreposto, galeria em faixa horizontal, depoimentos grandes */
.hero{position:relative;display:block;min-height:min(86vh,760px);padding:0;margin-inline:-20px;border-radius:0;overflow:hidden}
.hero .ph{position:absolute;inset:0;margin:0}
.hero .ph img{width:100%;height:100%;aspect-ratio:auto;object-fit:cover;object-position:85% 20%;border-radius:0}
.hero .ph:before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(9,9,9,.97) 0%,rgba(9,9,9,.9) 38%,rgba(9,9,9,.45) 62%,rgba(9,9,9,.1) 100%),linear-gradient(0deg,#090909 0%,rgba(9,9,9,0) 30%)}
.hero>div:first-child{position:relative;z-index:2;max-width:620px;padding:clamp(32px,7vw,88px) 20px}
.hero .pstrip{justify-content:flex-start}
.hero .cta{margin-inline:0}
.gal{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:14px}
.gal figure{flex:0 0 min(78vw,460px);scroll-snap-align:start;margin:0;border-radius:14px;overflow:hidden}
.gal figure img{height:100%;max-height:520px;object-fit:cover}
.depo{display:grid;gap:20px}
.depo figure{border-radius:16px;overflow:hidden}
.depo blockquote{font-family:var(--serif);font-size:clamp(22px,3.4vw,30px);line-height:1.25}
@media(max-width:820px){.hero{min-height:auto;margin-inline:-20px}.hero .ph:before{background:linear-gradient(0deg,rgba(9,9,9,.95) 40%,rgba(9,9,9,.35) 100%)}.hero>div:first-child{padding-top:46vh}.hero .pstrip{justify-content:center}.hero .cta{margin-inline:auto}}
</style>`;
function initRef(v: string): () => void {
  const hero = document.querySelector<HTMLElement>('.hero');
  const nums = document.querySelector<HTMLElement>('.nums');
  const cta = document.querySelector<HTMLElement>('.hero .cta');
  if (nums && cta) {
    const strip = document.createElement('div'); strip.className = 'pstrip'; strip.innerHTML = nums.innerHTML;
    cta.insertAdjacentElement('afterend', strip);
  }
  if (v === 'v6') {
    const wrap = Array.from(document.querySelectorAll<HTMLElement>('details')).map((d) => d.parentElement).find(Boolean);
    wrap?.classList.add('faqw');
  }
  if (v === 'v5' && hero) hero.querySelector('.facts')?.classList.add('facts5');
  return () => {};
}

/* V8, regras da claude-design-skill: direção editorial, sem cartões de borda lateral, sem gradiente decorativo, um elemento memorável (foto em arco) e hierarquia por tipografia. */
export const cssV8 = `<style>${base}
.hero{align-items:end}
.hero .ph{margin-inline:0}
.hero .ph img{border-radius:999px 999px 8px 8px;aspect-ratio:3/4;object-position:50% 18%}
h1{font-size:clamp(56px,11vw,132px);letter-spacing:-.03em}
.hero .pstrip{justify-content:flex-start;border-top:1px solid var(--line);padding-top:18px}
.hero .cta{margin-inline:0}
section{border-top:1px solid var(--line)}
.mark{opacity:.5}
.cards{display:block;border-top:1px solid var(--line)}
.cards li{display:grid;grid-template-columns:90px 1fr;gap:6px 24px;border:0;border-bottom:1px solid var(--line);border-radius:0;background:none;padding:26px 0}
.cards li i{font-family:var(--serif);font-size:44px;color:var(--gold);font-style:normal;grid-row:span 2}
.day{border:0;border-top:1px solid var(--line);background:none;border-radius:0}
.day .d{font-family:var(--serif);font-size:clamp(30px,5vw,48px)}
.depo{display:block}
.depo figure{display:grid;grid-template-columns:minmax(180px,34%) 1fr;gap:28px;align-items:center;margin:0 0 34px;border:0;background:none}
.depo blockquote{font-family:var(--serif);font-size:clamp(22px,3.2vw,32px);line-height:1.25;border:0;padding:0}
.depo blockquote:before{content:"\\201C";display:block;font-size:64px;color:var(--gold);line-height:.6}
@media(max-width:820px){.hero .ph img{border-radius:999px 999px 8px 8px}.depo figure{grid-template-columns:1fr}.cards li{grid-template-columns:60px 1fr}}
</style>`;
/* V9, regras da frontend-design: plano antes do código, um único elemento memorável (título gigante sobre a foto) e o resto contido. */
export const cssV9 = `<style>${base}
.hero{display:block;position:relative;padding:0 0 40px}
.hero .ph{position:relative;margin:0}
.hero .ph img{aspect-ratio:16/9;max-height:78vh;width:100%;border-radius:6px;object-position:80% 22%}
.hero>div:first-child{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:clamp(18px,4vw,48px);background:linear-gradient(0deg,#090909 8%,rgba(9,9,9,.0) 100%)}
.hero .ph:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(9,9,9,.95) 0%,rgba(9,9,9,.4) 55%,rgba(9,9,9,.05) 100%);pointer-events:none}
h1{font-size:clamp(56px,9.5vw,124px);line-height:.92;letter-spacing:-.035em}
.hero .date{font-size:clamp(20px,3vw,32px)}
.hero .facts{display:none}
.hero .cta{margin-inline:0}
.hero .pstrip{justify-content:flex-start}
h2{font-size:clamp(38px,7vw,78px);letter-spacing:-.02em;max-width:16ch}
section{padding-block:clamp(60px,10vw,120px)}
.mark{font-size:clamp(70px,16vw,200px);opacity:.35}
@media(max-width:820px){.hero>div:first-child{position:relative;background:none;padding:20px 0}.hero .ph img{aspect-ratio:4/5}.hero .ph:before{display:none}.hero .facts{display:grid}.hero .pstrip{justify-content:center}.hero .cta{margin-inline:auto}}
</style>`;
/* V10, ui-ux-pro-max: sistema de design primeiro (vidro escuro, bordas finas douradas, hierarquia clara, alvos grandes). */
export const cssV10 = `<style>${base}
.hero .ph img{border-radius:22px;box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 0 1px rgba(201,168,106,.25)}
.hero .facts>div,.cards li,.day,.depo figure,details,.chkres,.price,.bx{background:rgba(255,255,255,.035);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(201,168,106,.22);border-radius:18px}
.cards{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.cards li{padding:24px}
.cards li:hover,.depo figure:hover{border-color:rgba(201,168,106,.55);background:rgba(201,168,106,.06)}
.days{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.day{padding:22px}
details{padding:6px 18px;margin-bottom:10px}
summary{min-height:52px;display:flex;align-items:center;cursor:pointer}
.hero .pstrip{justify-content:flex-start}
.hero .cta{margin-inline:0}
body:before{content:"";position:fixed;inset:0;z-index:-1;background:radial-gradient(900px 500px at 80% -10%,rgba(201,168,106,.14),transparent 60%),radial-gradient(700px 500px at 0% 40%,rgba(201,168,106,.07),transparent 60%)}
@media(max-width:820px){.cards,.days{grid-template-columns:1fr}.hero .cta{margin-inline:auto}.hero .pstrip{justify-content:center}}
</style>`;

/* V11: sóbria e editorial. Sem brilho, sem partículas, sem efeitos; botão reto; foto sangrando; assimetria. */
export const cssV11 = `<style>
.cta,.nav a.mini{border-radius:2px;box-shadow:none;background:#c9a86a;color:#090909;font-weight:600;letter-spacing:.16em;transition:background .2s}
.cta:hover{background:#e3cb95;transform:none;box-shadow:none}
.hero{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:clamp(28px,5vw,72px);align-items:end;padding-block:clamp(28px,5vw,64px) clamp(48px,8vw,96px)}
.hero>div:first-child{order:1;padding-bottom:12px}
.hero .ph{order:2;position:relative;margin:0}
.hero .ph img{width:100%;aspect-ratio:4/5;max-height:86vh;object-fit:cover;object-position:85% 20%;border-radius:0;box-shadow:none}
.hero .ph:after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.14;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
h1{font-size:clamp(52px,7.2vw,104px);line-height:.95;letter-spacing:-.03em;margin-bottom:28px}
.hero .date{font-size:clamp(20px,2.4vw,28px);border-left:1px solid #c9a86a;padding-left:16px;margin-bottom:22px}
.hero .cta{display:inline-flex;width:auto;max-width:none;min-height:56px;padding:18px 28px;margin:8px 0 0}
.hero .facts{margin-top:32px;border-top:1px solid var(--line);padding-top:18px;display:grid;gap:10px}
.hero .facts>div{border:0;background:none;padding:0;border-radius:0}
h2{font-size:clamp(38px,6vw,72px);letter-spacing:-.02em;line-height:1;max-width:18ch}
section{padding-block:clamp(64px,10vw,128px)}
.cards li,.day,details,.depo figure,.price,.chkres,.bx{border-radius:2px;background:none;box-shadow:none}
@media(max-width:820px){.hero{grid-template-columns:1fr}.hero .ph{order:0;margin:0 -20px}.hero .ph img{aspect-ratio:4/4.6}.hero>div:first-child{order:1}.hero .cta{display:flex;width:100%}}
</style>`;
