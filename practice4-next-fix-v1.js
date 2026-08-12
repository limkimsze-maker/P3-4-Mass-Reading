(()=>{
  if(window.__practice4NextFixV1)return;
  window.__practice4NextFixV1=true;

  function install(){
    const btn=document.getElementById('nextBtn');
    if(!btn)return;

    btn.disabled=false;
    btn.removeAttribute('disabled');
    btn.onclick=null;

    btn.addEventListener('click',function(ev){
      if(btn.classList.contains('hidden'))return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      try{
        round++;
        if(round>=TOTAL){finish();return;}
        if(mode===2)currentPlayer=currentPlayer===0?1:0;
        renderQuestion();
      }catch(err){
        console.error('Practice 4 Next button error',err);
      }
    },true);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
