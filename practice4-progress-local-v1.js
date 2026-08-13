(()=>{
  if(window.__practice4ProgressLocalV1)return;
  window.__practice4ProgressLocalV1=true;
  const KEY='sportsFiestaHubProgress_v1';
  function save(){
    const results=document.getElementById('results');
    if(!results||!results.classList.contains('active'))return;
    try{
      const gm=Number(typeof mode!=='undefined'?mode:1)||1;
      const total=Number(typeof TOTAL!=='undefined'?TOTAL:10)||10;
      const a=Number(typeof scores!=='undefined'&&Array.isArray(scores)?scores[0]:0)||0;
      const b=Number(typeof scores!=='undefined'&&Array.isArray(scores)?scores[1]:0)||0;
      const perfect=gm===1&&a===total;
      const winner=gm===2?(a===b?0:(a>b?1:2)):null;
      let data={}; try{data=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(_){data={}}
      const old=data[4]||{};
      data[4]={...old,completed:true,pieceEarned:!!old.pieceEarned||gm===1,perfectSingle:!!old.perfectSingle||perfect,verified:true,source:'game-v5',updatedAt:new Date().toISOString(),lastMode:gm,lastWinner:winner};
      localStorage.setItem(KEY,JSON.stringify(data));
    }catch(e){console.warn('Practice 4 progress save failed',e)}
  }
  function install(){
    const results=document.getElementById('results'); if(!results)return;
    new MutationObserver(save).observe(results,{attributes:true,attributeFilter:['class']});
    save();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
