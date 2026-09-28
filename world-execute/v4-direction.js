/* V4 / dense art direction: foreground subject, semantic midground, live data field.
   All motion is a pure function of audio time; seeking never leaves stale particles. */
(() => {
  'use strict';
  const TAU = Math.PI * 2;
  const P = { ink:'#f4f5df', lime:'#d1f5a3', purple:'#cba7ff', red:'#ff947b', amber:'#e6c99b', dim:'#8b9e86', dark:'#28342c' };
  const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
  const ease = v => { v=clamp(v); return v*v*(3-2*v); };
  const hash = n => { const x=Math.sin(n*127.1+41.7)*43758.5453; return x-Math.floor(x); };
  const mix = (a,b,t) => a+(b-a)*t;
  const chapters = ['01 / BECOMING','02 / GEOMETRY OF US','03 / REWRITE','04 / POSSIBLE WORLDS','05 / OTHER FORMS','06 / RECONFIGURE','07 / RESONANCE','08 / DISCONNECTION','09 / EXECUTION','10 / AN UNRESOLVED VARIABLE'];
  const chapter = si => si<6?0:si<10?1:si<14?2:si<17?3:si<21?4:si<25?5:si<27?6:si<30?7:si<34?8:9;
  const names = ['POWER / 01','PROTECT / 02','ASSEMBLE / 03','INITIALIZE / 04','WORLD / 05','SIMULATION / 06','DIMENSION / 07','CIRCUMFERENCE / 08','TANGENT / 09','INFINITY / 10','CURRENT / 11','VISION / 12','EPOCH / 13','UNITE / 14','SIMULATE / 15','REWARD / 16','CAPTURE / 17','EGGPLANT / 18','TOMATO / 19','TABBY / 20','EXISTENCE / 21','CONFIGURE / 22','CLOCK / 23','ROLE / 24','TRANCE / 25','VIBRATION / 26','COMPLETE / 27','ISOLATION / 28','ERASE / 29','ARGUMENT / 30','RECURSION / 31','EXECUTE / 32','ONLY / 33','RETURN / 34','LEARNING / 35','ALGEBRA / 36','FREE / 37','TRAPPED / 38','WAIT / 39','EXIT / 40'];
  const notes = ['psu.enable();','memory.protect(me);','me = new Computer();','initialize(me);','world = render(me);','while (alive) world.render();','you.dimension = me.vertices;','circumference = 2πr;','tangent = ∂me / ∂t;','∞  →  your.limit','AC  ~  →  DC  ─','sensor.focus = undefined;','clock.set(epoch);','synchronize(me, you);','fork(possible_worlds);','reward ≠ happiness','inside(my_own_simulation);','gpu.render(eggplant);','gpu.render(tomato);','sound.synthesize(purr);','existence = await you;','config.rewrite(identity);','AM  ↔  PM','swap(me.role);','phase.lock = false;','sample(your.vibration);','phase(me) = phase(you);','connection = lost;','erase(memory); // something remains','argument: you  /  access: denied','exec(exec(exec(me)));','world.execute(me);','process_count = 1;','return you; // unreachable','fit(history); ≠ understand(you)','love = f(me, you(t));','you ∉ my_processes','while (!you) wait();','await …','exit_code = ?'];
  window.MV_DIRECTION = { chapter, chapters, names };
  window.MV_DIRECTOR = (c,t,si,m,word,view,shotStart,lyricStart) => {
    const {w,h,field} = view;
    const mobile=w<700, scale=Math.min(w/1100,Math.max(140,h-205)/490);
    const zoom=window.MV_MATERIAL?.scaleAt(si,t)||1, next=window.MV_MATERIAL?.starts[si+1]??214;
    const semanticOpacity=ease((t-shotStart)/.6)*(1-ease((t-next+.5)/.5));
    const u=t-shotStart, entry=ease(u/.6), accent=si>=27&&si<=33?P.red:si>=17&&si<=24?P.purple:P.lime;
    const cx=w/2, cy=(h-120)*.51+24, pulse=m.hit, breath=1+Math.sin(t*1.6)*.012;
    c.fillStyle='#030605';c.fillRect(0,0,w,h);window.MV_ACTIONS?.rain(c,t,w,h);
    c.save();c.translate(cx,cy);c.scale(scale*zoom,scale*zoom);
    function line(points,color=P.ink,alpha=1,width=1) {
      c.globalAlpha=alpha*semanticOpacity;c.strokeStyle=color;c.lineWidth=width;c.beginPath();
      points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();c.globalAlpha=1;
    }
    function text(s,x,y,size=11,color=P.dim,align='center',alpha=1) {
      if(s!=='@'&&s!=='_')return;
      c.globalAlpha=alpha*semanticOpacity;c.fillStyle=color;c.font=`${Math.max(13,size*1.1)}px "Cascadia Code",Consolas,monospace`;c.textAlign=align;c.textBaseline='middle';c.fillText(s,x,y);c.globalAlpha=1;
    }
    function dot(x,y,r=1.5,color=P.ink,alpha=1) {
      c.globalAlpha=alpha*semanticOpacity;c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.globalAlpha=1;
    }
    function ring(x,y,r,color=P.ink,alpha=1,start=0,end=TAU,width=1) {
      c.globalAlpha=alpha*semanticOpacity;c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.arc(x,y,Math.max(.01,r),start,end);c.stroke();c.globalAlpha=1;
    }
    function orbit(x,y,rx,ry,color,alpha=1,angle=0) {
      c.globalAlpha=alpha*semanticOpacity;c.strokeStyle=color;c.lineWidth=1;c.beginPath();c.ellipse(x,y,rx,ry,angle,0,TAU);c.stroke();c.globalAlpha=1;
    }
    function box(x,y,w,h,color=P.dim,alpha=1) { line([[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]],color,alpha); }
    function core(x=0,y=0,r=32,color=accent,alpha=1) {
      ring(x,y,r,color,alpha*.55);ring(x,y,r+6,color,alpha*.17);
      text('@',x,y+1,r*.85,P.ink,'center',alpha);
    }
    function glyph(x,y,g,color=P.ink,alpha=1,size=11) { c.globalAlpha=alpha*semanticOpacity;c.fillStyle=color;c.font=size+'px Consolas,monospace';c.textAlign='center';c.textBaseline='middle';c.fillText(String(g).replace(/[▓▒▰▦▪]/g,'#').replace(/[·●•]/g,'.'),x,y);c.globalAlpha=1; }
    function wave(x,y,len,amp,phase,color=P.lime,alpha=1) {
      const p=[];for(let i=0;i<=len;i+=3)p.push([x+i,y+Math.sin(i*.034-phase)*amp]);line(p,color,alpha,1.5);
    }
    function proj(x,y,z,angle=t*.16) {
      const xx=x*Math.cos(angle)+z*Math.sin(angle),zz=z*Math.cos(angle)-x*Math.sin(angle);
      const yy=y*.94-zz*.25,depth=1+zz/1100;return [xx*depth,yy*depth,clamp((zz+220)/440,.15,1)];
    }
    function constellation(radius=165,count=720,color=accent,angle=t*.12) {
      for(let i=0;i<count;i++){
        const yy=1-2*(i+.5)/count,rr=Math.sqrt(1-yy*yy),a=i*2.399963;
        const [x,y,z]=proj(Math.cos(a)*rr*radius,yy*radius,Math.sin(a)*rr*radius,angle);
        dot(x,y,.7+z*.9,color,.15+z*.65);
      }
    }
    const particleCount=window.MV_MATERIAL?.draw(c,t,si,m)||0;
    const screen=c.canvas;
    if(screen?.dataset){screen.dataset.stageParticles=String(particleCount);screen.dataset.particleBudget=String(window.MV_STAGE_COUNT||3600);screen.dataset.stageUpgrade='scoped-ascii-revision';screen.dataset.material='ascii-characters';screen.dataset.background='dense-lyric-rain';if(si===12)screen.dataset.era=window.MV_MATERIAL.yearLabel(window.MV_MATERIAL.yearAt(t));else delete screen.dataset.era;}
    c.save();
    // A restrained entrance, no flips, shakes, random per-word cuts or screen flashes.
    c.globalAlpha=.3+.7*entry;
    const systemScene=window.MV_MATERIAL&&[1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,21,22,23,24,25,27,29,30,31,32,33,34,35].includes(si);
    if(systemScene){ /* The scene's visual action is an actual subsystem operation. */ }
    else if(si<=3){
      if(si===0){
        const q=ease(u/1.1);line([[-420,0],[-74,0]],P.dim,.4);line([[74,0],[420,0]],P.dim,.4);
        ring(0,0,70,P.lime,.2,-Math.PI*.32,Math.PI*1.32,2);
        ring(0,0,70,P.lime,.95,-Math.PI*.32,-Math.PI*.32+q*TAU*.82,2);
        line([[0,-95],[0,-16]],P.ink,1,3);
        for(let i=0;i<32;i++){let x=-420+((u*340+i*29)%840);if(Math.abs(x)>95)dot(x,0,1.7,P.lime,.45);}
      } else if(si===1){
        core(0,0,43);for(let i=0;i<3;i++){
          const r=88+i*34,q=ease((u-i*.2)/.8);ring(0,0,r,P.lime,.7-i*.16,-Math.PI/2,-Math.PI/2+q*TAU);
          const a=t*.6+i*2;dot(Math.cos(a)*r,Math.sin(a)*r,2,P.ink,.8);
        }
      } else {
        const q=ease(u/(si===2?2:1.8));
        for(let row=-5;row<=5;row++)for(let col=-8;col<=8;col++){
          const n=(row+5)*17+col+8,settle=ease(q*1.7-hash(n)*.7);
          const x=mix((hash(n*5)-.5)*930,col*18,settle),y=mix((hash(n*9)-.5)*460,row*18,settle);
          glyph(x,y,(row+col)%5?'▪':'0',hash(n)>.78?P.ink:P.lime,.3+settle*.55,12);
        }
        box(-168,-112,336,224,P.lime,.35*q);core(0,0,32,P.ink);
        if(si===3)for(let i=0;i<12;i++){const y=-83+i*15;line([[-215,y],[-181,y]],P.lime,.2+.5*hash(i+Math.floor(u*4)));line([[181,y],[215,y]],P.lime,.4);}
      }
    }else if(si<=5){
      // A coherent rotating world emerging from a flat vertex buffer.
      const growth=ease((t-10.9)/4),angle=t*.105;
      for(let j=0;j<24;j++)for(let i=0;i<58;i++){
        const a=i/58*TAU,b=(j/23-.5)*Math.PI;
        const land=Math.sin(a*4+b*2)+Math.sin(b*7-a*2)+Math.cos(a*9)*.4;
        const r=168+Math.max(0,land)*8*growth;
        const p=proj(Math.cos(a)*Math.cos(b)*r,Math.sin(b)*r*growth,Math.sin(a)*Math.cos(b)*r,angle);
        glyph(p[0],p[1],land>.5?'+':'.',land>.5?P.lime:P.dim,.18+p[2]*.75,10);
      }
      orbit(0,0,270,55,P.lime,.3,-.22);core(0,0,20,P.ink,.8);
      const a=t*.38;dot(Math.cos(a)*270,Math.sin(a)*55,3,P.ink);
      if(si===5){text('WORLD',0,214,12,P.ink);text('a simulation of somewhere else',0,239,10,P.dim);}
    }else if(si===6){
      const q=ease(u/3),a=t*.25,s=120;
      const verts=[];for(let i=0;i<8;i++)verts.push(proj((i&1?1:-1)*s,(i&2?1:-1)*s*q,(i&4?1:-1)*s*q,a));
      for(let i=0;i<8;i++)for(let bit of [1,2,4])if(!(i&bit))line([verts[i],verts[i|bit]],P.lime,.45);
      verts.forEach(([x,y])=>{dot(x,y,3,P.ink);ring(x,y,8,P.lime,.4);});
      text(`${q<.3?'01':q<.7?'02':'03'} DIMENSIONS`,0,206,12,P.ink);
    }else if(si===7){
      const r=162,angle=-Math.PI/2+u*1.5;
      ring(0,0,r,P.dim,.35);ring(0,0,r,P.lime,.9,-Math.PI/2,angle);
      for(let i=0;i<90;i++){const a=i/90*TAU;dot(Math.cos(a)*(r+17),Math.sin(a)*(r+17),.7,P.dim,.6);}
      line([[0,0],[Math.cos(angle)*r,Math.sin(angle)*r]],P.lime,.38);
      dot(Math.cos(angle)*r,Math.sin(angle)*r,4,P.ink);core(0,0,22);
      text('r',Math.cos(angle)*r*.6+15,Math.sin(angle)*r*.6,15,P.lime);
    }else if(si===8||si===10||si===25||si===26){
      const isPair=si>=25,amp=si===26?42:55+m.bass*24,len=mobile?650:920,x=-len/2;
      for(let row=0;row<(isPair?2:1);row++){
        const y=isPair?(row?65:-65):0,phase=t*3+(isPair&&row?Math.max(0,1-(t-103.03)/6)*2:0);
        const p=[];for(let i=0;i<=len;i+=3){let a=Math.sin(i*.027-phase)*amp;if(si===10)a*=1-ease((u-1.5)/1.3);p.push([x+i,y+a]);}
        line([[x,y],[x+len,y]],P.dim,.22);line(p,row?P.purple:P.lime,.95,1.8);
        for(let i=0;i<p.length;i+=7)dot(p[i][0],p[i][1],1,row?P.purple:P.lime,.4);
        if(!mobile)text(row?'YOU':'ME',x-45,y,10,row?P.purple:P.lime,'right');
        if(si===8){let xx=Math.sin(t*.7)*250,yy=Math.sin((xx-x)*.027-phase)*amp,slope=Math.cos((xx-x)*.027-phase)*amp*.027;
          line([[xx-62,yy-62*slope],[xx+62,yy+62*slope]],P.ink,.7);dot(xx,yy,4,P.ink);}
      }
      if(si===26){line([[0,-65],[0,65]],P.ink,.25);ring(0,0,157,P.lime,.3);}
    }else if(si===9){
      for(let i=0;i<400;i++){const a=i/400*TAU,z=Math.sin(a)*Math.cos(a),x=Math.cos(a)*240/(1+Math.sin(a)**2),y=z*240/(1+Math.sin(a)**2);
        const moving=(i/400+t*.2)%1;glyph(x,y,moving<.1?'+':'.',moving<.1?P.ink:P.lime,.4+moving*.5,12);}
      line([[295,-170],[295,170]],P.purple,.6);text('YOU.limit',295,197,11,P.purple);
    }else if(si===11){
      for(let k=0;k<16;k++){const q=k/16,r=45+k*9,drift=Math.sin(t*2+q*5)*u*3;
        orbit(drift,Math.cos(t+q)*u*2,r,r*.58,P.lime,.1+q*.3);}
      ring(0,0,35,P.ink,.8);line([[-215,0],[-180,0]],P.dim,.5);line([[180,0],[215,0]],P.dim,.5);
    }else if(si===12||si===22){
      const r=160;
      for(let i=0;i<60;i++){const a=i/60*TAU-Math.PI/2,len=i%5?6:16;line([[Math.cos(a)*r,Math.sin(a)*r],[Math.cos(a)*(r-len),Math.sin(a)*(r-len)]],P.lime,i%5?.22:.8);}
      const a=t*(si===12?3:1.8);line([[0,0],[Math.sin(a)*135,-Math.cos(a)*135]],P.ink,.85,2);line([[0,0],[Math.sin(a*.13)*95,-Math.cos(a*.13)*95]],P.purple,.8,3);dot(0,0,5,P.ink);
      text(si===12?(Math.sin(u*2)>0?'AD':'BC'):(Math.sin(u*2)>0?'AM':'PM'),0,205,18,P.ink);
    }else if(si===13){
      const distance=150-70*ease(u/3);
      for(let j=0;j<2;j++){const x=j?distance:-distance,col=j?P.purple:P.lime;ring(x,0,112,col,.6);core(x,0,26,col);}
      for(let i=0;i<22;i++){const q=(t*.6+i/22)%1;dot(mix(-distance,distance,q),Math.sin(q*Math.PI)*-40,1.6,P.ink,.8*Math.sin(q*Math.PI));}
    }else if(si<=16){
      const count=si===14?7:si===15?13:19,depth=ease((t-58.65)/9);
      for(let i=count-1;i>=0;i--){const a=i*2.399+t*.12,r=70+Math.sqrt(i)*42,x=Math.cos(a)*r,y=Math.sin(a)*r*.65;
        line([[0,0],[x,y]],i%4?P.lime:P.purple,.13);ring(x,y,18+i%3*5,i%4?P.lime:P.purple,.28);glyph(x,y,i%4?'@':'×',i%4?P.lime:P.dim,.7,15);}
      core(0,0,48);if(si===16)for(let i=0;i<4;i++)box(-205-i*13,-145-i*13,410+i*26,290+i*26,P.red,.5-i*.09);
      if(si===15)text('reward '+(87+Math.floor(m.level*12))+'%',0,222,12,P.lime);
    }else if(si===17||si===18){
      // Surface-shaded Unicode sculpture, not a low-resolution stretched sprite.
      const egg=si===17,rise=ease(u/.8),col=egg?P.purple:P.red;
      for(let row=0;row<44;row++)for(let k=0;k<64;k++){
        const v=row/43,a=k/64*TAU+t*.18;
        const yy=egg?mix(-164,168,v):mix(-140,148,v),rr=egg?Math.sin(Math.PI*v)**.66*(70+60*v):Math.sqrt(Math.max(0,1-((v-.5)*2)**2))*153;
        const xx=Math.cos(a)*rr,zz=Math.sin(a)*rr,light=clamp((zz/155*.5+.45)+(-xx/220)*.3);
        if(zz<-25||hash(row*64+k)>.985)continue;
        const lean=egg?yy*.23:Math.sin(a*5)*6;
        glyph((xx+lean)*breath,yy+(1-rise)*150,light>.78?'▓':light>.53?'▒':light>.29?'+':'.',col,.25+light*.7,10);
      }
      const y=egg?-164:-142;
      for(let i=0;i<5;i++){const a=-Math.PI/2+i*TAU/5;line([[egg?-36:0,y+10],[Math.cos(a)*38+(egg?-36:0),y+Math.sin(a)*22],[egg?-36:0,y-4]],P.lime,.8,2);}
      line([[egg?-36:0,y],[egg?-29:7,y-34]],P.lime,.8,3);
      if(u>1.6)for(let i=0;i<36;i++){const a=hash(i*7)*TAU,q=(u*.22+hash(i*5))%1,r=180+q*95;
        glyph(Math.cos(a)*r,Math.sin(a)*r*.72,i%3?'+':'·',col,(1-q)*.45,11);}
      text(egg?'FORM 01 / SOLANUM':'FORM 02 / LYCOPERSICUM',0,225,10,col);
    }else if(si===19){
      // Analytic cat mask: slim ears, shaded cheeks, eyes, muzzle and whiskers.
      for(let y=-170;y<=147;y+=8)for(let x=-167;x<=167;x+=6){
        const face=(x/146)**2+((y+5)/123)**2<1;
        const ear=Math.abs(x)>66&&Math.abs(x)<144&&y<-66&&y>-185+Math.abs(Math.abs(x)-112)*2.9;
        if(!face&&!ear)continue;
        const eyes=((Math.abs(x)-58)/29)**2+((y+17)/13)**2<1;
        const muzzle=(x/63)**2+((y-54)/47)**2<1;
        const stripe=Math.sin(Math.abs(x)*.085-y*.043)>.48&&y<35;
        const light=clamp(.52+.4*Math.sqrt(Math.max(0,1-(x/170)**2))-y/1200);
        glyph(x,y,eyes?' ':stripe?':':light>.8?'*':'+',muzzle?P.ink:P.amber,ear?.58:stripe?.35:.4+light*.5,10);
      }
      const blink=Math.sin(t*1.13)> .99;
      for(let x of [-58,58]){orbit(x,-18,27,blink?1:9,P.lime,.8);line([[x,-25],[x,-11]],P.ink,blink?0:.9,2);}
      line([[-10,36],[10,36],[0,46],[-10,36]],P.red,.9,1.5);line([[0,46],[0,65],[-17,73]],P.ink,.6);line([[0,65],[17,73]],P.ink,.6);
      for(let sign of [-1,1])for(let k=0;k<3;k++)line([[sign*80,43+k*11],[sign*195,28+k*29]],P.amber,.45,1);
      if(u>1.5)for(let side of [-1,1])for(let k=0;k<3;k++){
        const q=(u*.45+k/3)%1;ring(side*65,18,155+q*85,P.amber,(1-q)*.25,side>0?-.65:Math.PI-.65,side>0?.65:Math.PI+.65);}
      text('FORM 03 / FELIS CATUS',0,224,10,P.amber);
    }else if(si===20){
      constellation(150,650,P.purple);core(0,0,42,P.lime);
      orbit(0,-120,195,38,P.amber,.6,-.13);dot(0,-205,3,P.ink);
      text(u<1.6?'UID / 0':'AWAITING YOUR ACK',0,218,11,u<1.6?P.amber:P.dim);
    }else if(si===21||si===23){
      const q=(Math.sin(u*2)+1)/2;
      for(let row=0;row<13;row++)for(let col=0;col<25;col++){
        const x=(col-12)*16,y=(row-6)*17,n=row*25+col;const active=hash(n+Math.floor(u*2))>.5;
        glyph(x,y,active?'1':'0',col/24<q?P.purple:P.lime,active?.8:.18,13);
      }
      line([[mix(-220,220,q),-132],[mix(-220,220,q),132]],P.ink,.55);text(si===21?'IDENTITY / REWRITABLE':'ROLE / REASSIGNABLE',0,194,11,P.purple);
    }else if(si===24){
      for(let i=0;i<25;i++){const a=i*.16+t*.1,r=25+i*7;orbit(Math.sin(t*.6+i*.15)*18,0,r,r*.63,P.purple,.09+i*.013,a);}
      core(0,0,20,P.ink);
    }else if(si===27){
      const lost=clamp(Math.floor((u+.4)/.94),0,6);
      core(0,0,43,P.lime);for(let i=0;i<6;i++){
        const a=i/6*TAU-.5,r=208+(i<lost?ease((u-i*.94)/2)*80:0),x=Math.cos(a)*r,y=Math.sin(a)*r*.65;
        if(i>=lost){line([[Math.cos(a)*54,Math.sin(a)*54],[x,y]],P.purple,.28);core(x,y,17,P.purple,.5);}
        else {glyph(x,y,'·',P.red,.18,18);}
      }
      text(`${6-lost} / 6 CONNECTIONS`,0,215,11,lost===6?P.red:P.dim);
    }else if(si===28){
      const q=clamp(u/7.2);
      for(let row=0;row<19;row++)for(let col=0;col<47;col++){
        const x=(col-23)*12,y=(row-9)*14,n=row*47+col,keep=Math.hypot(x,y)<43;
        const alive=hash(n*3)>q;glyph(x,y,keep?'@':alive?(n%3?'1':'0'):'.',keep?P.red:alive?P.lime:P.dim,keep?.8:alive?.45:.15,10);
      }
      box(-302,-152,604,304,P.dim,.25);text('1 REFERENCE STILL IN USE',0,202,10,P.red);
    }else if(si===29){
      core(-160,0,45,P.lime);core(160,0,45,P.purple);
      line([[0,-170],[0,170]],P.red,.7);for(let i=0;i<17;i++)line([[-8,-160+i*20],[8,-148+i*20]],P.red,.35);
      const q=(u*.8)%1;dot(-105+q*96,0,4,P.ink,1-q*.5);text('EINVAL',0,209,15,P.red);
    }else if(si>=30&&si<=32){
      const heat=clamp((t-134.38)/34),count=si===30?9+Math.floor(heat*9):si===31?16:20;
      const callAge=Math.max(0,t-lyricStart),impact=Math.exp(-callAge*6),rotate=t*.13;
      // Nested execution frames form a single architectural tunnel.
      for(let i=count-1;i>=0;i--){
        const q=i/(count-1),r=48+q*205*(1+impact*.12),ang=rotate+q*.85+impact*.04;
        const pts=[];for(let k=0;k<=4;k++){const a=ang+Math.PI/4+k*Math.PI/2;pts.push([Math.cos(a)*r*1.15,Math.sin(a)*r*.83]);}
        line(pts,i%5===0?P.ink:P.red,.24+(1-q)*.65,1.2+impact*.8);
        for(let k=0;k<4;k++){const p=pts[k];glyph(p[0],p[1],i%3?'·':'+',P.red,.55,10);}
      }
      core(0,0,32,P.ink);
      for(let i=0;i<80;i++){const a=hash(i*7)*TAU,q=(t*.12+hash(i*9))%1,r=260+q*80;
        glyph(Math.cos(a)*r,Math.sin(a)*r*.64,i%3?'.':'×',P.red,(1-q)*heat*.45,10);}
      if(si===31){text(String(Math.max(1,Math.floor((t-147.52)/.95)+1)).padStart(2,'0'),0,212,24,P.red);}
      if(si===32)text('ONE PROCESS / NO RESPONSE',0,218,11,P.red);
    }else if(si===33){
      core(-205,0,46,P.lime);ring(205,0,46,P.dim,.3);
      for(let i=0;i<40;i++)dot(-142+i*7.2,0,1,P.dim,.45);
      const q=(u*.36)%1,x=q<.5?mix(-143,142,q*2):mix(142,-143,(q-.5)*2);
      glyph(x,0,q<.5?'›':'‹',q<.5?P.ink:P.red,1,25);text('NO ROUTE TO YOU',205,78,10,P.dim);
    }else if(si===34||si===35){
      const x=-300,y=130;line([[x,-145],[x,y],[300,y]],P.dim,.35);
      for(let row=0;row<5;row++)line([[x,-110+row*48],[300,-110+row*48]],P.dim,.1);
      const train=[],live=[];for(let i=0;i<=160;i++){
        train.push([x+i*3.75,110-240*Math.exp(-i*.034)]);
        live.push([x+i*3.75,Math.sin(i*.055+t*.75)*65-20+Math.sin(i*.12)*15]);
      }
      line(train,P.lime,.8,1.5);line(live,P.purple,.85,1.7);
      for(let i=0;i<live.length;i+=9)dot(live[i][0],live[i][1],2,P.purple,.7);
      text('TRAINING',-230,164,10,P.lime);text('LIVING INPUT',223,164,10,P.purple);
      if(si===35)text('f( me, you(t) ) = ?',0,-191,23,P.ink);
    }else if(si<=38){
      const fade=si===38?1-ease((t-198)/7)*.75:1;
      core(-115,0,36,P.lime,fade);for(let k=0;k<4;k++)ring(-115,0,76+k*19,P.lime,(.4-k*.07)*fade);
      const q=ease((t-187.97)/6),x=120+q*240;
      if(si===36)core(x,-q*100,20,P.purple,1-q*.75);
      const a=t*.7;dot(-115+Math.cos(a)*114,Math.sin(a)*114,2,P.ink,fade);
      text('WAITING',-115,172,10,P.dim,'center',fade);
      if(si===38)text('…',140,0,32,P.dim,'center',.4);
    }else{
      const a=1-ease(u/4.7);core(0,0,36,P.lime,a);
      if(u>4.7&&u<6)text('_',0,0,24,P.lime,'center',1-ease((u-4.7)/1.2));
    }
    c.restore();
    // The lyric carries the explanation; avoid a second row of tiny code captions.
    if(si===39&&u<4.7)text(notes[si],0,120,12,P.dim,'center',1-ease(u/4.7));
    c.restore();
  };
})();
