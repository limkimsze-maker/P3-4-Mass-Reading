// Practice 4 Next v3 — direct click ownership, corrected re-enable behaviour
(()=>{
  if(window.__practice4NextLocalV3)return;
  window.__practice4NextLocalV3=true;

  document.addEventListener('click',function(e){
    const btn=e.target && e.target.closest ? e.target.closest('#nextBtn') : null;
    if(!btn)return;
    if(btn.classList.contains('hidden') || btn.disabled)return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    try{
      if(typeof answered!=='undefined' && !answered)return;
      btn.disabled=true;
      round++;
      if(round>=TOTAL){
        finish();
        return;
      }
      if(mode===2) currentPlayer=currentPlayer===0?1:0;
      renderQuestion();
      // Important: the same Next button is reused on the new question.
      // Re-enable it now; checkAnswer() will reveal it when the new answer is checked.
      btn.disabled=false;
      btn.removeAttribute('disabled');
    }catch(err){
      console.error('Practice 4 Next v3 failed',err);
      btn.disabled=false;
      btn.removeAttribute('disabled');
    }
  },true);
})();
