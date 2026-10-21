(() => {
  'use strict';
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const root=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro=$('.intro'); let ended=false, introTimer;
  function finishIntro(){if(ended)return;ended=true;clearTimeout(introTimer);clearTimeout(window.visaFallback);root.classList.remove('is-intro');if(intro){intro.classList.add('is-done');intro.style.display='none';}root.classList.add('visa-ready');dispatchEvent(new Event('visa:ready'));}
  let seen=false;try{seen=sessionStorage.getItem('visa-intro-v2')==='1';sessionStorage.setItem('visa-intro-v2','1')}catch(e){}
  if(intro&&!seen&&!reduce){root.classList.add('is-intro');introTimer=setTimeout(finishIntro,1900);intro.addEventListener('click',finishIntro,{once:true});}else finishIntro();
  addEventListener('pageshow',e=>{if(e.persisted)finishIntro()});
  const burger=$('.header__burger'),menu=$('.menu-mobile');
  const toggleMenu=open=>{root.classList.toggle('menu-open',open);burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.setAttribute('aria-hidden',String(!open));menu.inert=!open;document.body.classList.toggle('mobile-menu-visible',open);if(!open&&menu.contains(document.activeElement))burger.focus({preventScroll:true});};
  menu.inert=true;
  const closeFAQ=()=>{$$('.acc__item').forEach(i=>{i.classList.remove('is-open');$('button',i).setAttribute('aria-expanded','false')})};closeFAQ();addEventListener('pageshow',closeFAQ);
  matchMedia('(min-width:1150px)').addEventListener('change',e=>{if(e.matches)toggleMenu(false)});
burger.addEventListener('click',()=>toggleMenu(!root.classList.contains('menu-open')));
  $$('a',menu).forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){toggleMenu(false);finishIntro()}if(e.key==='Tab'&&root.classList.contains('menu-open')){const items=[burger,...$$('a,button',menu)],first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  $$('.acc__item button').forEach(b=>b.addEventListener('click',()=>{const item=b.closest('.acc__item'),open=!item.classList.contains('is-open');$$('.acc__item').forEach(i=>{i.classList.remove('is-open');$('button',i).setAttribute('aria-expanded','false')});item.classList.toggle('is-open',open);b.setAttribute('aria-expanded',String(open));}));
  $$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
  let queued=false;function scrollUI(){queued=false;const y=scrollY,max=root.scrollHeight-innerHeight;$('.header').classList.toggle('is-scrolled',y>30);$('.progress span').style.transform=`scaleX(${max>0?y/max:0})`;$('.wa-float').classList.toggle('is-visible',y>500);}
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scrollUI)}},{passive:true});scrollUI();
  const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)$$('[data-nav]').forEach(a=>a.classList.toggle('is-active',a.dataset.nav===e.target.id))}),{rootMargin:'-25% 0px -55% 0px'});$$('section[id]').forEach(e=>navObserver.observe(e));
  const states=$$('.brazil-state'),detail=$('.map-detail');
  function showState(s){states.forEach(p=>p.classList.toggle('is-active',p===s));detail.replaceChildren();const title=document.createElement('strong'),text=document.createElement('span');title.textContent=s.dataset.name+' · '+s.dataset.uf;text.textContent='Atendimento VISA disponível. Consulte a equipe para planejar sua demanda.';detail.append(title,text);}
  states.forEach((s,i)=>{s.style.setProperty('--state-delay',Math.min(i*24,600)+'ms');s.addEventListener('mouseenter',()=>showState(s));s.addEventListener('focus',()=>showState(s));s.addEventListener('click',()=>showState(s));s.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showState(s)}})});
  const map=$('.visa-map');if(map){const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting){map.classList.add('map-visible');observer.disconnect()}},{threshold:.15});observer.observe(map);}
  if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){$$('[data-magnetic]').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.045}px,${(e.clientY-r.top-r.height/2)*.07}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});}
})();
