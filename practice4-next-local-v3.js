(()=>{
  if(window.__practice4NextLocalV3)return;
  window.__practice4NextLocalV3=true;

  document.addEventListener('click',function(e){
    const btn=e.target && e.target.closest ? e.target.closest('#nextBtn') : null;
    if(!btn)return;
    if(btn.classList.contains('hidden') || btn.disabled)return;

    // Take full ownership of this click so no stale/duplicate handler can interfere.
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    try{
      if(typeof answered!=='undefined' && !answered)return;
      btn.disabled=true;

      // Advance using Practice 4's own game state.
      round++;
      if(round>=TOTAL){
        finish();
        return;
      }
      if(mode===2) currentPlayer=currentPlayer===0?1:0;
      renderQuestion();
    }catch(err){
      console.error('Practice 4 Next v3 failed',err);
      btn.disabled=false;
    }
  },true);
})();
