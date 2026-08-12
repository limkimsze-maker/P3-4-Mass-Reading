(()=>{
  if(window.__practice4NextNativeV2)return;
  window.__practice4NextNativeV2=true;

  function install(){
    const oldBtn=document.getElementById('nextBtn');
    if(!oldBtn)return;

    // Replace the node to remove all earlier inline/capture/bubble handlers.
    const btn=oldBtn.cloneNode(true);
    btn.removeAttribute('onclick');
    btn.disabled=false;
    btn.removeAttribute('disabled');
    oldBtn.replaceWith(btn);

    const keepEnabled=new MutationObserver(()=>{
      if(!btn.classList.contains('hidden')){
        btn.disabled=false;
        btn.removeAttribute('disabled');
      }
    });
    keepEnabled.observe(btn,{attributes:true,attributeFilter:['class','style','disabled']});

    btn.addEventListener('click',function(ev){
      if(btn.classList.contains('hidden'))return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      if(btn.dataset.advancing==='1')return;
      btn.dataset.advancing='1';
      try{
        // Use the game's own state and render path.
        if(typeof answered!=='undefined' && !answered)return;
        btn.disabled=true;
        btn.classList.add('hidden');
        round++;
        if(round>=TOTAL){ finish(); return; }
        if(mode===2) currentPlayer=currentPlayer===0?1:0;
        renderQuestion();
      }catch(err){
        console.error('Practice 4 native Next v2 error',err);
        btn.disabled=false;
        btn.classList.remove('hidden');
      }finally{
        setTimeout(()=>{delete btn.dataset.advancing},120);
      }
    },true);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
