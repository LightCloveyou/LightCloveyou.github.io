/* V4 rescued edition. Native audio is the sole clock. */
(() => {
  'use strict';
  const D=window.MV_DATA,B=window.MV_BEAT,$=id=>document.getElementById(id);
  const audio=$('audio'),canvas=$('screen'),ctx=canvas.getContext('2d',{alpha:false});
  if(!D||!B||!ctx||!window.MV_DIRECTOR)throw new Error('Missing MV rendering dependency');
  const SHOTS = [
    [0,'POWER SUPPLY','POST / 01'],[1.33,'MEMORY PROTECTION','POST / 02'],[3.58,'HARDWARE BUS','POST / 03'],[7.19,'OBJECT ALLOCATION','POST / 04'],[10.9,'GPU WORLD','RENDER / 01'],[16.04,'SANDBOX RENDER','RENDER / 02'],
    [29.28,'VERTEX BUFFER','GEOMETRY / 01'],[33.01,'RASTER ENGINE','GEOMETRY / 02'],[36.77,'DSP / SINE','GEOMETRY / 03'],[40.36,'ITERATION LIMIT','GEOMETRY / 04'],
    [44.04,'RECTIFIER','POWER / 02'],[47.27,'VISION SENSOR','INPUT / 01'],[50.95,'SYSTEM CLOCK','CLOCK / 01'],[54.74,'NETWORK HANDSHAKE','NET / 01'],
    [58.65,'SIMULATION FARM','FORK / 01'],[64.29,'REWARD FUNCTION','FORK / 02'],[70.02,'SANDBOX LOCK','FORK / 03'],
    [73.53,'FORM RENDERER','GPU / FORM 01'],[77.16,'FORM RENDERER','GPU / FORM 02'],[80.93,'SOUND CARD','GPU / FORM 03'],[84.6,'ROOT / PROOF','SYSTEM / 01'],
    [88.34,'CONFIGURATION BITS','CONFIG / 01'],[91.44,'RTC CLOCK','CONFIG / 02'],[95.28,'ROLE SWITCH','CONFIG / 03'],[98.93,'SCHEDULER DRIFT','CONFIG / 04'],
    [103.03,'INPUT TRANSDUCER','ADC / 01'],[108.69,'PHASE LOCK','ADC / 02'],[110.4,'NETWORK LOSS','NET / 02'],[117.95,'GARBAGE COLLECTOR','MEM / 01'],[125.33,'KERNEL ARGUMENTS','KERNEL / 01'],
    [134.38,'FORK BOMB','SYS / 01'],[147.52,'EXECUTION','SYS / 02'],[162.23,'PROCESS TABLE','SYS / 03'],[169.61,'RETURN PACKET','NET / 03'],
    [176.96,'MODEL TRAINING','ML / 01'],[184.33,'ALGEBRA ENGINE','ML / 02'],[187.97,'EXTERNAL PROCESS','NET / 04'],[190.24,'WAIT STATE','SYS / 04'],[193.46,'IDLE LOOP','SYS / 05'],[205.56,'FINAL SYSCALL','SYS / 06']
  ];
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const pad=n=>String(Math.floor(n)).padStart(2,'0');
  const time=t=>pad(t/60)+':'+pad(t%60);
  function which(list,t){let lo=0,hi=list.length;while(lo<hi){const m=(lo+hi)>>1;if(list[m][0]<=t)lo=m+1;else hi=m;}return Math.max(0,lo-1);}
  function musicAt(t){
    const f=clamp(t*B.fps,0,B.level.length-1),i=Math.floor(f),k=f-i,j=Math.min(i+1,B.level.length-1);
    const get=a=>(a[i]*(1-k)+a[j]*k)/255;
    const onset=B.onsets[which(B.onsets,f)],age=t-onset[0]/B.fps,strength=onset[1]/255;
    return {level:get(B.level),bass:get(B.bass),treble:get(B.treble),snap:get(B.snap),hit:age>=0?strength*Math.exp(-age*8.4):0,age,strength};
  }
  let started=false,field='black',dirty=true,lastT=-1,lastPaint=-1,chapterIndex=-1,lyricIndex=-1,idleTimer;
  let w=innerWidth,h=innerHeight,dpr=1,raf=0;
  const chapterTimes=[0,29.28,44.04,58.65,73.53,88.34,103.03,110.4,134.38,176.96];
  function resize(){w=innerWidth;h=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);dirty=true;}
  addEventListener('resize',resize);addEventListener('stagechange',()=>{dirty=true;});resize();
  function render(t){
    const si=which(SHOTS,t),li=which(D.lyrics,t),chapter=window.MV_DIRECTION.chapter(si);
    window.MV_DIRECTOR(ctx,started?t:20,started?si:5,musicAt(started?t:20),null,{w,h,field},started?SHOTS[si][0]:16.04,D.lyrics[li][0]);
    if(chapter!==chapterIndex){chapterIndex=chapter;$('subsystem').textContent=window.MV_DIRECTION.chapters[chapter];$('chapters').value=String(chapter);}
    $('shotNumber').textContent=pad(si+1)+' / 40';
    $('systemState').textContent=audio.paused?'PAUSED':'PLAYING';
    if(li!==lyricIndex){lyricIndex=li;$('lyricText').textContent=D.lyrics[li][1];$('lyricNumber').textContent=String(li+1).padStart(3,'0');}
    $('timeNow').textContent=time(t);$('seek').value=t;$('seek').style.setProperty('--progress',(t/(audio.duration||212.35)*100)+'%');
    canvas.dataset.shot=String(si);canvas.dataset.time=t.toFixed(3);
  }
  function clock(now){
    const t=Number.isFinite(audio.currentTime)?audio.currentTime:0;
    if(dirty||(t!==lastT&&now-lastPaint>1000/60)){render(t);lastT=t;lastPaint=now;dirty=false;}
    raf=requestAnimationFrame(clock);
  }
  function wake(){
    document.body.classList.remove('chrome-hidden');clearTimeout(idleTimer);
    if(started&&!audio.paused)idleTimer=setTimeout(()=>{if(!document.querySelector('.transport:focus-within, .head:focus-within'))document.body.classList.add('chrome-hidden');},2800);
  }
  function setPlaying(){
    $('play').textContent=audio.paused?'▶':'Ⅱ';$('play').setAttribute('aria-label',audio.paused?'Play':'Pause');
    document.body.classList.toggle('is-playing',!audio.paused);dirty=true;wake();
  }
  async function play(){
    if(!audio.paused){audio.pause();return;}
    try{await audio.play();started=true;$('start').classList.add('hidden');$('start').inert=true;document.body.classList.add('has-started');$('startStatus').textContent='';dirty=true;setPlaying();}
    catch(e){$('startStatus').textContent='音频启动失败：'+e.message;$('startStatus').classList.add('error');}
  }
  function seek(t){audio.currentTime=clamp(t,0,Number.isFinite(audio.duration)?audio.duration:212.35);dirty=true;wake();}
  function syncMute(){const muted=audio.muted||audio.volume===0;$('mute').textContent=muted?'×':'♪';$('mute').setAttribute('aria-label',muted?'Unmute':'Mute');}
  $('startButton').addEventListener('click',play);$('play').addEventListener('click',play);
  $('restart').addEventListener('click',()=>{seek(0);if(audio.paused)play();});
  $('mute').addEventListener('click',()=>{if(audio.volume===0){audio.volume=.85;$('volume').value=.85;audio.muted=false;}else audio.muted=!audio.muted;syncMute();});
  $('volume').addEventListener('input',()=>{audio.volume=Number($('volume').value);audio.muted=false;syncMute();});
  $('seek').addEventListener('input',()=>seek(Number($('seek').value)));
  $('chapters').addEventListener('change',()=>seek(chapterTimes[Number($('chapters').value)]));
  $('theme').addEventListener('change',()=>{field=$('theme').value;dirty=true;});
  $('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('app').requestFullscreen?.();}catch(e){$('systemState').textContent='FULLSCREEN UNAVAILABLE';}});
  audio.addEventListener('loadedmetadata',()=>{$('seek').max=audio.duration||212.35;$('timeEnd').textContent=time(audio.duration||212.35);dirty=true;});
  audio.addEventListener('error',()=>{$('startStatus').textContent='音频加载失败，请检查同目录的 soundtrack.mp3';$('startStatus').classList.add('error');});
  for(const name of ['play','pause','ended'])audio.addEventListener(name,setPlaying);
  audio.addEventListener('seeked',()=>dirty=true);
  document.addEventListener('keydown',e=>{
    if(['INPUT','SELECT','BUTTON'].includes(e.target.tagName))return;
    if(e.code==='Space'||(e.code==='Enter'&&!started)){e.preventDefault();play();}
    if(e.code==='ArrowRight'){e.preventDefault();seek(audio.currentTime+5);}
    if(e.code==='ArrowLeft'){e.preventDefault();seek(audio.currentTime-5);}
    if(e.code==='KeyM')$('mute').click();
    wake();
  });
  document.addEventListener('pointermove',wake,{passive:true});document.addEventListener('pointerdown',wake,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);}else{dirty=true;raf=requestAnimationFrame(clock);}});
  audio.volume=.85;requestAnimationFrame(clock);
})();
