export const effectsCss = `<style>
/* Variação animada: mesma copy e mesma paleta da página original, só movimento */
.hero{position:relative}
.hero:before{content:"";position:absolute;left:50%;top:-120px;width:140%;height:620px;transform:translateX(-50%);background:radial-gradient(ellipse at 50% 0,rgba(201,168,106,.20),rgba(201,168,106,0) 62%);pointer-events:none;animation:beam 9s ease-in-out infinite alternate}
@keyframes beam{from{opacity:.55;transform:translateX(-54%) rotate(-3deg)}to{opacity:1;transform:translateX(-46%) rotate(3deg)}}
.gp{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.gp i{position:absolute;bottom:-10px;width:3px;height:3px;border-radius:50%;background:var(--gold2);opacity:0;animation:rise linear infinite}
@keyframes rise{0%{opacity:0;transform:translateY(0)}15%{opacity:.7}100%{opacity:0;transform:translateY(-640px)}}
.hero>*{position:relative;z-index:1}
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
</style>`;

export function initEffects(): () => void {
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
