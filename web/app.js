(() => {
 'use strict';
 const versions={nani:'https://jerryyang2.github.io/nani-grade-six-mondrian/',kangxuan:'https://jerryyang2.github.io/kangxuan-chinese-arena/',hanlin:'https://hanlin-language-arena-123.asterina-co.chatgpt.site/'};
 const key='chinese-game-hub-preferences',labels=['','一','二','三','四','五','六'];
 const validGrade=value=>/^[1-6]$/.test(String(value));
 let saved={};try{saved=JSON.parse(localStorage.getItem(key))||{};}catch{}
 const params=new URLSearchParams(location.search);
 let grade=validGrade(params.get('grade'))?Number(params.get('grade')):validGrade(saved.grade)?Number(saved.grade):1;
 let semester=['upper','lower'].includes(params.get('semester'))?params.get('semester'):['upper','lower'].includes(saved.semester)?saved.semester:'upper';
 function update(){
  const label=`${labels[grade]}年級${semester==='upper'?'上':'下'}學期`;
  document.querySelectorAll('[data-grade]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.grade)===grade)));
  document.querySelectorAll('[data-semester]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.semester===semester)));
  document.querySelector('#course-summary').textContent=`目前選擇：${label} · 點選下方版本，直接進入這一冊。`;
  document.querySelectorAll('[data-version]').forEach(link=>{const target=new URL(versions[link.dataset.version]);target.searchParams.set('grade',String(grade));target.searchParams.set('semester',semester);link.href=target.href;link.querySelector('[data-course]').textContent=label;});
  try{localStorage.setItem(key,JSON.stringify({grade,semester}));}catch{}
  const current=new URL(location.href);current.searchParams.set('grade',String(grade));current.searchParams.set('semester',semester);try{history.replaceState(null,'',current);}catch{}
  document.querySelector('#share-status').textContent='';document.querySelector('#copy-fallback').hidden=true;
 }
 document.querySelectorAll('[data-grade]').forEach(b=>b.addEventListener('click',()=>{grade=Number(b.dataset.grade);update();}));
 document.querySelectorAll('[data-semester]').forEach(b=>b.addEventListener('click',()=>{semester=b.dataset.semester;update();}));
 document.querySelector('#share').addEventListener('click',async()=>{
  const url=new URL(location.href);url.hash='';
  try{await navigator.clipboard.writeText(url.href);document.querySelector('#share-status').textContent='已複製入口網址，包含目前選擇的年級與學期。';}
  catch{document.querySelector('#copy-fallback').hidden=false;const input=document.querySelector('#share-url');input.value=url.href;input.focus();input.select();document.querySelector('#share-status').textContent='請長按或選取下方網址複製。';}
 });
 // Keep the original recommended post as the only editorial source.
 let postText=null,postPromise=null;
 function loadPost(){return postPromise??=(async()=>{
  const response=await fetch('./social/chinese-game-hub-post.txt');
  if(!response.ok)throw new Error('post-unavailable');
  const text=await response.text();if(!text.trim())throw new Error('empty-post');
  postText=text;return text;
 })().catch(error=>{postPromise=null;throw error;});}
 loadPost().catch(()=>{});
 const copyPost=document.querySelector('#copy-post'),postStatus=document.querySelector('#post-status'),postFallback=document.querySelector('#post-fallback'),postArea=document.querySelector('#post-text');
 copyPost.addEventListener('click',async()=>{
  copyPost.disabled=true;copyPost.setAttribute('aria-busy','true');postStatus.textContent='正在準備推薦貼文…';postFallback.hidden=true;
  try{
   const text=postText??await loadPost();
   try{await navigator.clipboard.writeText(text);postStatus.textContent='已複製完整推薦貼文，包含集合站網址。可以貼到社群後自行調整。';}
   catch{postFallback.hidden=false;postArea.value=text;postArea.focus();postArea.select();postStatus.textContent='請長按或選取下方完整貼文複製。';}
  }catch{postStatus.textContent='貼文暫時無法讀取，請再試一次，或開啟上方貼文文字檔。';}
  finally{copyPost.disabled=false;copyPost.removeAttribute('aria-busy');}
 });
 document.querySelectorAll('[download]').forEach(link=>link.addEventListener('click',()=>{postStatus.textContent='已開始下載高解析宣傳圖；若瀏覽器顯示圖片，可長按或另存圖片。';}));
 update();
})();
