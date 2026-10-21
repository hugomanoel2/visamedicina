/* Presentation controls, isolated from the original page. */
(() => {
  const style = document.createElement('style');
  style.textContent = '.demo-tools{position:fixed;bottom:14px;left:14px;z-index:99;display:flex;gap:8px;align-items:center;background:#031b29ed;border:1px solid #4ba77e66;border-radius:8px;padding:9px 12px;color:#fff;font:12px Arial,sans-serif}.demo-tools button{background:transparent;color:#8edab7;border:0;cursor:pointer;font:inherit}.demo-dialog{max-width:440px;width:calc(100% - 40px);border:1px solid #4ba77e;border-radius:12px;padding:30px;background:#031b29;color:#fff;font:17px/1.6 Arial,sans-serif}.demo-dialog::backdrop{background:#00121cd9;backdrop-filter:blur(6px)}.demo-dialog h2{font-size:24px;color:#8edab7;margin:0 0 12px}.demo-dialog button{margin-top:18px;padding:12px 20px;background:#4ba77e;border:0;cursor:pointer;color:#031b29;font-weight:bold}.demo-dialog small{display:block;opacity:.65}';
  document.head.append(style);
  const tools = document.createElement('div'); tools.className='demo-tools';
  tools.innerHTML='<span>DEMONSTRAÇÃO</span><button type="button">↻ Rever abertura</button><button type="button" aria-label="Ocultar controles">×</button>';
  document.body.append(tools);
  tools.querySelector('button').onclick=()=>{try{sessionStorage.removeItem('visa-intro-v2')}catch(e){}location.reload()};
  tools.querySelector('[aria-label]').onclick=()=>tools.remove();
  const dialog=document.createElement('dialog');dialog.className='demo-dialog';
  dialog.innerHTML='<h2>Vamos conversar?</h2><p>Na versão final, este botão conecta o visitante à equipe comercial com uma mensagem contextual sobre o serviço escolhido.</p><small>Ambiente demonstrativo para apresentação ao cliente. Nenhuma mensagem foi enviada.</small><button type="button">Continuar apresentação</button>';
  document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();
  document.addEventListener('click',event=>{const link=event.target.closest('a');if(!link)return;const href=link.getAttribute('href')||'';if(/wa\.me|instagram\.com|email-protection|^mailto:/.test(href)){event.preventDefault();dialog.showModal();}});
  document.querySelectorAll('.__cf_email__').forEach(el=>{el.textContent='comercial@visaocupacional.com.br'});
})();

