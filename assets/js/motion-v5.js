(() => {
 'use strict';
 const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,mobile=matchMedia('(max-width:700px)').matches;
 const detail=$('.map-detail');
 $$('.map-pin').forEach(pin=>{const show=()=>{$$('.map-pin').forEach(p=>p.classList.toggle('is-selected',p===pin));$$('.brazil-state').forEach(p=>p.classList.toggle('is-active',p.dataset.uf===pin.dataset.uf));detail.replaceChildren();const title=document.createElement('strong'),text=document.createElement('span'),link=document.createElement('a');title.textContent=pin.dataset.name+(pin.classList.contains('map-pin--own')?' · Estrutura própria':' · Cobertura regional');text.textContent=pin.dataset.detail;link.className='map-consult';link.href='https://wa.me/557135995988?text='+encodeURIComponent('Olá! Gostaria de consultar atendimento VISA em '+pin.dataset.name+'.');link.textContent='Consultar atendimento nesta região ↗';detail.append(title,text,link)};pin.addEventListener('click',show);pin.addEventListener('focus',show);pin.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show()}})});
 const notes=['Entrega clínica imediata.','Prazo de até 2 dias úteis.','Prazo de até 5 dias.'];
 $$('.delivery-row').forEach((row,i)=>{row.tabIndex=0;row.setAttribute('aria-label',$('strong',row).textContent);const note=document.createElement('small');note.className='delivery-caption';note.textContent=notes[i];row.append(note);const activate=on=>{if(row.classList.contains('is-active')===on)return;row.classList.toggle('is-active',on);if(!reduce&&window.gsap)gsap.to($('.chart-track i',row),{scaleY:on?1.4:1,duration:.3,overwrite:'auto'})};row.addEventListener('pointerenter',()=>activate(true));row.addEventListener('pointerleave',()=>activate(false));row.addEventListener('focus',()=>activate(true));row.addEventListener('blur',()=>activate(false));row.addEventListener('click',()=>activate(!row.classList.contains('is-active')))});
 if(reduce||!window.gsap||!window.ScrollTrigger)return;
 const owned=new WeakSet(),animated=[];
 try{
  gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
  // One owner per target. Initial states are established once, then animated only with to().
  function own(el){if(!el||owned.has(el))return false;owned.add(el);animated.push(el);return true}
  function reveal(el,delay=0){if(!own(el))return;gsap.set(el,{opacity:0,y:mobile?24:34});let played=false;const play=()=>{if(played)return;played=true;gsap.to(el,{opacity:1,y:0,duration:.85,delay,ease:'power3.out',clearProps:'transform,opacity'})};ScrollTrigger.create({trigger:el,start:'top 96%',once:true,onEnter:play});}
  const groupSelectors='.services__grid,.steps__list,.layers,.features__col,.facility-bottom,.partner-types,.clients-strip,.impact-regions,.contact__links,.visa-portals,.acc,.brand-story-list';
  $$(groupSelectors).forEach(group=>{group.dataset.motionGroup='true';[...group.children].forEach((el,i)=>reveal(el,(i%(mobile?2:5))*.1))});
  $$('[data-split],.faq__title').forEach(el=>{
   if(!own(el))return;const words=[];const walk=node=>[...node.childNodes].forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.append(document.createTextNode(t));return}const span=document.createElement('span');span.className='motion-word';span.textContent=t;f.append(span);words.push(span);animated.push(span)});n.replaceWith(f)}else if(n.nodeType===1)walk(n)});walk(el);gsap.set(words,{opacity:0,y:22});let played=false;const play=()=>{if(played)return;played=true;gsap.to(words,{opacity:1,y:0,duration:.75,stagger:.055,ease:'power3.out',clearProps:'transform,opacity'})};
   if(el.closest('.hero')){if(document.documentElement.classList.contains('visa-ready'))play();else addEventListener('visa:ready',play,{once:true})}else ScrollTrigger.create({trigger:el,start:'top 96%',once:true,onEnter:play});
  });
  const singles='[data-reveal],.section-kicker,.visa-eyebrow,.facility-heading>p,.performance-layout>div>p,.partners-heading>p:last-child,.impact-copy>p:not(.section-kicker),.footer__brand,.footer__contacts>a,.footer__nav>a,.about__photo,.facility-photo,.hero__visual,.photo-label,.photo-note,.story-link';
  $$(singles).forEach(el=>{if(el.closest('[data-motion-group]')||el.matches('[data-split],.faq__title'))return;if(el.closest('.hero')){if(!own(el))return;gsap.set(el,{opacity:0,y:22});const play=()=>gsap.to(el,{opacity:1,y:0,duration:.9,delay:el.matches('.hero__visual')?.1:.16,ease:'power3.out',clearProps:'transform,opacity'});if(document.documentElement.classList.contains('visa-ready'))play();else addEventListener('visa:ready',play,{once:true});}else reveal(el)});
  // Metrics change only their text: no opacity reset or secondary entrance animation.
  $$('[data-count]').forEach(el=>{const end=Number(el.dataset.count),pre=el.dataset.prefix||'';el.textContent=pre+'0';let played=false;ScrollTrigger.create({trigger:el,start:'top 97%',once:true,onEnter:()=>{if(played)return;played=true;const value={n:0};gsap.to(value,{n:end,duration:1.6,ease:'power2.out',onUpdate:()=>el.textContent=pre+Math.round(value.n),onComplete:()=>el.textContent=pre+end})}})});
  $$('[data-brand-drift]').forEach(mark=>gsap.fromTo(mark,{y:mobile?30:85,rotate:-7},{y:mobile?-45:-110,rotate:7,ease:'none',scrollTrigger:{trigger:mark.parentElement,start:'top bottom',end:'bottom top',scrub:1.2}}));
  gsap.fromTo('.orbit-progress',{strokeDashoffset:100},{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:'.impact',start:'top 85%',end:'center 40%',scrub:1}});
  gsap.to('.orbit-dash',{rotation:60,transformOrigin:'50% 50%',ease:'none',scrollTrigger:{trigger:'.impact',start:'top bottom',end:'bottom top',scrub:1}});
  $$('.delivery-row').forEach((row,i)=>{reveal(row,i*.06);const bar=$('.chart-track i',row);gsap.set(bar,{scaleX:0,transformOrigin:'left center'});animated.push(bar);let played=false;ScrollTrigger.create({trigger:row,start:'top 95%',once:true,onEnter:()=>{if(played)return;played=true;gsap.to(bar,{scaleX:1,duration:1.35,delay:.15,ease:'power3.out'})}})});
  const travel=mobile?55:145;
  const assemble=(s,from)=>gsap.fromTo(s,from,{x:0,y:0,rotate:0,ease:'none',scrollTrigger:{trigger:'.brand-story',start:'top 90%',end:'center 48%',scrub:1.2}});
  assemble('.slice-a',{x:travel*.5,y:-travel,rotate:-5});assemble('.slice-b',{x:travel*.8,y:0,rotate:4});assemble('.slice-c',{x:-travel*.25,y:travel,rotate:-4});
  if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!mobile)$$('[data-tilt]').forEach(card=>{const rx=gsap.quickTo(card,'rotationX',{duration:.5}),ry=gsap.quickTo(card,'rotationY',{duration:.5});card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;rx((.5-y)*3);ry((x-.5)*4);card.style.setProperty('--mx',x*100+'%');card.style.setProperty('--my',y*100+'%')});card.addEventListener('pointerleave',()=>{rx(0);ry(0)})});
  // Images have fixed geometry. A single refresh after fonts avoids layout thrashing.
  document.fonts.ready.then(()=>ScrollTrigger.refresh());
 }catch(error){console.warn('Motion fallback: content restored.',error);gsap.set(animated,{clearProps:'opacity,transform'});}
})();
