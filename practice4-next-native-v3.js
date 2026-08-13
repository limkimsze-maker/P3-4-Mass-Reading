(()=>{
  if(window.__practice4NextNativeV3)return;
  window.__practice4NextNativeV3=true;

  function install(){
    const btn=document.getElementById('nextBtn');
    if(!btn)return;

    // Keep the original button and the game's own native nextQuestion().
    // This avoids maintaining a second copy of round/turn logic.
    btn.removeAttribute('disabled');
    btn.disabled=false;

    // Remove the inline handler so only one click path exists.
    btn.removeAttribute('onclick');

    btn.addEventListener('click',function(ev){
      if(btn.classList.contains('hidden'))return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      if(btn.dataset.sfAdvancing==='1')return;
      btn.dataset.sfAdvancing='1';
      try{
        const fn=window.nextQuestion;
        if(typeof fn!=='function') throw new Error('native nextQuestion() is unavailable');
        fn();
      }catch(err){
        console.error('Practice 4 Next v3 error',err);
        btn.disabled=false;
        btn.classList.remove('hidden');
      }finally{
        setTimeout(()=>{delete btn.dataset.sfAdvancing},150);
      }
    },true);

    // If another script disables the visible Next button, immediately restore it.
    new MutationObserver(()=>{
      if(!btn.classList.contains('hidden') && btn.disabled){
        btn.disabled=false;
        btn.removeAttribute('disabled');
      }
    }).observe(btn,{attributes:true,attributeFilter:['class','disabled']});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
