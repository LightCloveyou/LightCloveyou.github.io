/* Lyric verbs, not interchangeable sculptures. Scene numbers in this file are zero-based. */
(() => {
 'use strict';
 const T=Math.PI*2,C=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),L=(a,b,q)=>a+(b-a)*q;
 const S=x=>{x=C(x);return x*x*(3-2*x);},H=n=>{const x=Math.sin(n*127.1+19.7)*43758.5453;return x-Math.floor(x);};
 const P=['#d1f5a3','#cba7ff','#ff947b','#f4f5df','#e6c99b'];
 const starts=window.MV_MATERIAL.starts,own=new Set([0,1,2,3,4,5,6,7,8,12,13,14,15,16,21,22,23,24,25,26,27,28,29,31,32,33]);
 const leave=[110.4,111.98,112.89,113.75,114.75,115.6];
 const executions=[147.52,148.59,149.78,150.64,151.53,152.43,153.32,154.31,155.2,156.18,157.12,158.02,161.51];
 const masks=new Map();
 function mask(word){if(masks.has(word))return masks.get(word);const canvas=document.createElement('canvas');canvas.width=620;canvas.height=250;
   const ctx=canvas.getContext('2d');ctx.font='bold 190px Consolas,monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='white';ctx.fillText(word,310,125);
   const pix=ctx.getImageData(0,0,620,250).data,pts=[];for(let y=0;y<250;y+=4)for(let x=0;x<620;x+=4)if(pix[(y*620+x)*4+3]>100)pts.push([x-310,y-125]);
   masks.set(word,pts.length?pts:[[0,0]]);return masks.get(word);
 }
 for(const word of ['ME','YOU','S','M','F','@','0','1'])mask(word);
 function letters(word,s,scale=1){const pts=mask(word),p=pts[(s.i*47)%pts.length];return [p[0]*scale,p[1]*scale,(s.c-.5)*18];}
 function fillLevel(t){return S((t-7.19)/3.1);}
 function worldBuilt(t){return S((t-10.9)/10.4);}
 function clockHours(t){return 9+12*S((t-93.52)/1.62);}
 function activeWorlds(t){return Math.round(L(3,42,S((t-58.65)/4.3)));}
 function executed(t){return executions.filter(x=>t>=x).length;}
 function roleAt(t){return t<97.32?'S':'M';}
 function particleCount(t,si,N){if(si===6){const u=t-29.28;return Math.min(N,Math.round(u<1.61?L(8,24,S(u/1.61)):L(24,N,S((u-1.61)/1.75))));}
   if(si===5&&t>28.5)return Math.round(L(N,8,S((t-28.5)/.78)));return N;}
 function worldPoint(s,t,k,small=1){
   const a=s.a+t*(.15+k*.015),v=s.b,y=1-2*v,rr=Math.sqrt(1-y*y),r=(28+H(k*13)*28)*small,kind=k%6;
   if(kind===0)return [Math.cos(a)*rr*r,y*r,Math.sin(a)*rr*r];
   if(kind===1){const p=[(s.b-.5)*r*1.7,(s.c-.5)*r*1.7,(s.d-.5)*r*1.7];p[s.i%3]=(s.i%2?1:-1)*r*.85;const yaw=t*.24+k;return [p[0]*Math.cos(yaw)+p[2]*Math.sin(yaw),p[1],p[2]*Math.cos(yaw)-p[0]*Math.sin(yaw)];}
   if(kind===2)return [(v-.5)*r*3,Math.sin(v*T*2+t*2+k)*r*.65,Math.cos(v*T+t)*r*.5];
   if(kind===3){const radius=r*(s.i%3?1:.47);return [Math.cos(a)*radius,Math.sin(a)*radius*.35,Math.sin(a)*radius*.6];}
   if(kind===4)return [Math.sin(v*T*2+t)*r,(v-.5)*r*2.4,Math.cos(v*T*2+t)*r];
   return [(s.i%2?1:-1)*Math.pow(v,.6)*r, (v-.5)*r*2, Math.sin(a)*r*.6];
 }
 function pose(s,t,si){
   if(!own.has(si))return null;
   const {i,a,b,c,d,e}=s,u=Math.max(0,t-starts[si]),side=i%2?1:-1;
   let x=0,y=0,z=0,col=0,alpha=1,g='';
   if(si===0){const q=S(u/1.1),r=82+(1-q)*450*b;x=Math.cos(a)*r;y=Math.sin(a)*r;z=(c-.5)*30;g=i%8?'·':'ϟ';alpha=.2+.8*q;}
   else if(si===1){if(i%5===0){const q=(b+u*.8)%1,approach=q<.55?q/.55:1-(q-.55)/.45;x=side*(580-approach*395);y=(c-.5)*260;z=(d-.5)*70;col=2;g='×';alpha=.45+.55*approach;}
     else{const yy=b*350-175,width=185*(1-Math.max(0,b-.46)*1.6);x=(c-.5)*2*width;y=yy;z=25+Math.sin(c*Math.PI)*55;alpha=.20+e*.36;g=i%7?'·':'▰';}}
   else if(si===2){const q=S((u-b*.9)/2.1),xx=(i%53-26)*12,yy=(Math.floor(i/53)%23-11)*12;x=L((c-.5)*1200,xx,q);y=L((d-.5)*650,yy,q);z=L((e-.5)*550,(Math.floor(i/1219)%3-1)*28,q);g=i%5?'▪':'0';}
   else if(si===3){const flight=S((u-b*2.5)/.58),row=Math.floor(b*12),xx=(c-.5)*710,yy=145-row*24;
     x=L(-760-e*180,xx,flight);y=L(-235+(d-.5)*230,yy,flight);z=L(-120,(d-.5)*85,flight);alpha=u<b*2.5?.10:1;g=i%2?'1':'0';}
   else if(si===4||si===5){const ring=i%4===0,settle=S((t-10.9-b*8-(ring?3:0))/2.2),angle=a+t*.15;
     let target;if(ring){const r=270+c*93;target=[Math.cos(angle)*r,Math.sin(angle)*r*.26,Math.sin(angle)*r*.65];col=i%12?0:1;}
     else{const yy=1-2*b,rr=Math.sqrt(1-yy*yy),r=175+Math.sin(a*4+b*11)*6;target=[Math.cos(angle)*rr*r,yy*r,Math.sin(angle)*rr*r];col=0;}
     const ang=angle+(1-settle)*4,r=530+(1-settle)*e*300;x=L(Math.cos(ang)*r,target[0],settle);y=L(Math.sin(ang)*r*.6,target[1],settle);z=L(-140+d*450,target[2],settle);alpha=.2+.8*settle;g=ring?'·':Math.sin(a*6+b*10)>.2?'▒':'.';}
   else if(si===6){const dim=S((u-1.61)/1.5),k=i%8,corner=[(k&1?1:-1)*145,(k&2?1:-1)*120,(k&4?1:-1)*95],face=i%3;
     const target=[(b-.5)*290,(c-.5)*240,(d-.5)*190];target[face]=(i%2?1:-1)*[145,120,95][face];x=L(corner[0],target[0],dim);y=L(corner[1],target[1],dim);z=L(corner[2],target[2],dim);const yaw=dim*.55;[x,z]=[x*Math.cos(yaw)+z*Math.sin(yaw),z*Math.cos(yaw)-x*Math.sin(yaw)];g=dim<.1?'●':'';}
   else if(si===7){const sweep=S((u-1.53)/1.7),unroll=i%3===0?sweep:0,aa=a+t*.15,r=165+(b-.5)*6;x=L(Math.cos(aa)*r,(a/T-.5)*Math.PI*330,unroll);y=L(Math.sin(aa)*r,180,unroll);z=(c-.5)*18;col=i%3===0?3:0;}
   else if(si===8||si===25||si===26){const pair=si>=25,phase=pair&&side>0?2.8*(1-S((t-103.03)/6)):0;x=(b-.5)*960;
     y=Math.sin((x+480)*.027-t*3-phase)*65+(pair?side*65:0)+(c-.5)*9;z=(d-.5)*18;col=pair&&side>0?1:0;}
   else if(si===12){const speed=600+S(u/1.8)*2600,depth=((b*2000-u*speed)%2000+2000)%2000-540,r=200+c*620;x=Math.cos(a)*r;y=Math.sin(a)*r*.68;z=depth;col=t>53.8?1:0;alpha=C((depth+540)/140)*C((1500-depth)/600);g=i%13?'·':':';}
   else if(si===13){const join=S(u/1.8),dive=S((t-56.79)/1.65),depth=((b*1550-u*(180+dive*600))%1550+1550)%1550-360;
     const aa=depth*.012+u*1.4+(side>0?Math.PI:0),r=140+(1-join)*95; x=side*(1-join)*235+Math.cos(aa)*r;y=Math.sin(aa)*r*.8;z=depth;col=side>0?1:0;alpha=.65;g=i%23?'·':side>0?'Y':'M';}
   else if(si===14){const k=i%42,n=activeWorlds(t),p=worldPoint(s,t,k),reveal=S((n-k)/2),xx=(k%7-3)*146,yy=(Math.floor(k/7)-2.5)*78;
     x=L(0,xx,reveal)+p[0]*reveal;y=L(0,yy,reveal)+p[1]*reveal;z=(k%4)*24+p[2];alpha=reveal;col=k%3===0?1:k%9===0?4:0;}
   else if(si===15){const smile=S(u/2),part=i%10;
     if(part<4){const phase=(b+u*.6)%1;x=L(-490,180,phase);y=(c-.5)*190*(1-phase);z=(d-.5)*80;alpha=Math.sin(phase*Math.PI)*.75;g=i%8?'·':'♥';}
     else if(part<6){const r=144+(b-.5)*6;x=160+Math.cos(a)*r;y=Math.sin(a)*r;z=(c-.5)*25;col=1;}
     else if(part<8){x=160+side*51+(b-.5)*23;y=-36+Math.sin(b*Math.PI)*-15*smile;z=(c-.5)*16;col=3;}
     else{const xx=(b-.5)*156;x=160+xx;y=46+smile*(1-(xx/78)**2)*45;z=(c-.5)*18;col=0;g='♥';}}
   else if(si===16){const part=i%4,close=S(u/1.5);
     if(part===0){const p=letters(i%2?'ME':'YOU',s,.55);x=p[0]+side*112;y=p[1];z=p[2];col=side>0?1:0;}
     else if(part===1){const q=(b+u*.55)%1;x=side*(70+Math.sin(q*Math.PI)*(290-100*close));y=(c-.5)*180;z=(d-.5)*90;col=2;g=q>.5?'‹':'›';}
     else{const wall=i%6,k=Math.floor(b*6),r=240+k*30,p=[(c-.5)*r*2,(d-.5)*330,(e-.5)*340];p[wall%3]=(wall%2?1:-1)*[r,165,170][wall%3];[x,y,z]=p;z+=k*62;col=k%2?1:2;alpha=.3;g='▦';}}
   else if(si===21){const word=t<89.91?'F':'M',p=letters(word,s,1.45);[x,y,z]=p;const phase=S((t-89.91)/.9);x+=(1-phase)*Math.sin(b*T)*10;col=t<89.91?1:0;}
   else if(si===22){const hours=clockHours(t),aa=a+(hours-9)/12*T,r=178+(b-.5)*8;x=Math.cos(aa)*r;y=Math.sin(aa)*r;z=(c-.5)*25;col=hours<12?4:1;alpha=.7;}
   else if(si===23){const swap=S((t-97.32)/.85),kind=i%3;
     if(kind<2){const old=letters(kind?'M':'S',s,1.25),cx=(kind?1:-1)*240;x=old[0]+cx*(1-2*swap);y=old[1];z=old[2]+Math.sin(swap*Math.PI)*(kind?160:-100);col=kind?1:0;}
     else{const q=(b+u*.6)%1,dir=swap>.5?-1:1;x=(-180+q*360)*dir;y=Math.sin(q*T)*18;z=(c-.5)*25;col=swap>.5?1:0;g='›';}}
   else if(si===24){const lock=S((t-101.13)/1.35),phase=(side>0?1-lock:0)*Math.PI,aa=a+u*(1.8-lock*.6),r=145+(b-.5)*12;
     x=side*L(170,35,lock)+Math.cos(aa+phase)*r;y=Math.sin(aa+phase)*r*.68;z=Math.sin(aa+phase)*r*.5+(c-.5)*14;col=side>0?1:0;g=i%17?'·':'~';}
   else if(si===27){const k=i%7;
     if(k===6){[x,y,z]=letters('ME',s,.9);col=0;}
     else{const ang=k/6*T-.7,lost=S((t-leave[k])/.9),rr=220+lost*170;
       if(i%3===0){const p=letters('YOU',s,.25);x=Math.cos(ang)*rr+p[0];y=Math.sin(ang)*rr*.7+p[1]+lost*80;z=p[2]+lost*(d-.5)*220;}
       else{x=Math.cos(ang)*(65+b*170)+lost*(c-.5)*110;y=Math.sin(ang)*(65+b*170)*.7+lost*160;z=(d-.5)*25;}
       alpha=1-lost*.94;col=lost>.15?2:1;g=lost>.3?'·':'';}}
   else if(si===28){const q=S((t-119.81)/3.1),held=i%13===0,k=i%30,xx=(k%6-2.5)*146,yy=(Math.floor(k/6)-2)*78,erase=S((q-(k%6)/6)*6);
     if(held){[x,y,z]=letters('YOU',s,.47);col=2;}
     else{x=xx+(b-.5)*110+erase*(d-.5)*120;y=yy+(c-.5)*48+erase*190;z=(Math.floor(k/6)-2)*24+erase*250;col=erase>.1?2:k%2;alpha=1-erase;g=i%2?'0':'1';}}
   else if(si===29){const rejection=S((t-128.42)/2.6),q=(b+u*.33)%1;
     if(i%4===0){const p=letters('YOU',s,.78);x=p[0]+210;y=p[1];z=p[2];col=1;}
     else{const turn=q<.55?q/.55:1-(q-.55)/.45;x=-530+turn*570;y=(c-.5)*145+rejection*(q>.55?Math.sin(q*T)*100:0);z=(d-.5)*90;col=q>.55?2:0;g=q>.55?'×':i%7?'1':'@';}}
   else if(si===31){const k=i%13,count=executed(t),dead=k<count,age=dead?t-executions[k]:0,collapse=S(age/.48),p=letters('@',s,.53);
     const xx=(k%5-2)*190,yy=(Math.floor(k/5)-1)*147;
     x=xx+p[0]*(1-collapse)+Math.sin(a)*collapse*90;y=yy+p[1]*(1-collapse)+collapse*c*120;z=p[2]+collapse*(d-.5)*300;col=dead?2:k%2;alpha=dead?1-S(age/1.6):.8;g=dead?'×':'';}
   else if(si===32){const q=S((t-164.07)/3.2),k=i%24,own=k===0,p=letters(own?'ME':'@',s,own?.95:.25);
     const angle=k/24*T,rad=295+45*Math.sin(k);x=own?p[0]:Math.cos(angle)*rad*(1-q)+p[0]*(1-q);y=own?p[1]:Math.sin(angle)*rad*.65*(1-q)+p[1]*(1-q);z=p[2]+(own?0:q*320);col=own?3:2;alpha=own?1:1-q;g=own?'':'×';}
   else if(si===33){const loop=(u/2.05)%1,build=S(loop/.52)*(1-S((loop-.68)/.25));
     if(i%3===0){[x,y,z]=letters('ME',s,.67);x-=285;col=0;}
     else{const target=letters('YOU',s,.77);x=L(-180+(b-.5)*50,260+target[0],build);y=L((c-.5)*250,target[1],build);z=L((d-.5)*220,target[2],build);col=loop>.65?2:1;alpha=.25+.75*build;}
   }
   return [x,y,z,col,alpha,g];
 }
 function rain(c,t,w,h){const lyrics=window.MV_DATA?.lyrics||[],cue=Math.max(0,lyrics.findLastIndex(x=>x[0]<=t&&x[1])),fade=t>205.56?1-S((t-205.56)/5.6):1;
   c.save();c.textAlign='center';c.textBaseline='middle';const columns=Math.ceil(w/15);
   for(let j=0;j<columns;j++){
     const text=lyrics[(cue+j%5)%Math.max(1,lyrics.length)]?.[1]||lyrics[cue]?.[1]||'world.execute(me);',chars=text.replace(/\s/g,'·'),speed=35+H(j*7)*70,size=12+H(j*13)*5,x=j*15+7;
     const head=((t*speed+H(j*19)*(h+500))%(h+500))-80,len=28+Math.floor(H(j*23)*28);c.font=size+'px Consolas,monospace';
     for(let k=0;k<len;k++){const y=head-k*17;if(y<55||y>h-105)continue;const tail=1-k/len,center=C(Math.abs(x-w*.5)/(w*.4),.55,1),lyricZone=y>h-160?.18:1;
       c.globalAlpha=(k===0?.95:.52*tail)*center*fade*lyricZone;c.fillStyle=k===0?'#edffdc':'#89c397';c.fillText(chars[(len-k+j*3)%chars.length],x,y);}
   }c.restore();
 }
 function draw(c,t,si,m,helpers){const {text,line,project}=helpers,u=t-starts[si],q=S(u/2),col=P[0];
   const ring=(x,y,r,color=P[0],alpha=.7)=>{c.globalAlpha=alpha;c.strokeStyle=color;c.lineWidth=1.6;c.beginPath();c.arc(x,y,r,0,T);c.stroke();};
   const rect=(x,y,w,h,color=P[0],alpha=.7)=>line([[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]],color,alpha,1.5);
   const arrow=(x1,y1,x2,y2,color=P[0],alpha=.7)=>{line([[x1,y1],[x2,y2]],color,alpha,2);const a=Math.atan2(y2-y1,x2-x1);line([[x2-12*Math.cos(a-.45),y2-12*Math.sin(a-.45)],[x2,y2],[x2-12*Math.cos(a+.45),y2-12*Math.sin(a+.45)]],color,alpha,2);};
   if(si===0){ring(0,0,84,P[0],.65);text('ϟ',0,0,100,P[3]);text('POWER ON',0,155,20);}
   if(si===1){const shield=[[0,-195],[188,-125],[159,87],[0,200],[-159,87],[-188,-125],[0,-195]],seal=S(u/.65);line(shield.slice(0,Math.max(2,Math.ceil(seal*shield.length))),P[0],.95,3);
     rect(-46,-8,92,78,P[3],.9);c.globalAlpha=.9;c.strokeStyle=P[3];c.lineWidth=5;c.beginPath();c.arc(0,-10,30,Math.PI,0);c.stroke();text('•',0,25,34,P[3]);line([[0,26],[0,47]],P[3],1,4);
     for(let k=0;k<6;k++){const phase=(u*.8+k/6)%1,hit=Math.exp(-Math.abs(phase-.55)*35),x=(k%2?1:-1)*186,y=(k-2.5)*36;ring(x,y,6+hit*25,P[2],hit*.85);}
     text('PROTECTED',0,235,20,P[0]);
   }
   if(si===2||si===3){const x=-372,y=-162,w=744,h=324;rect(x,y,w,h,P[0],.75);line([[x,y],[x+35,y-35],[x+w+35,y-35],[x+w,y]],P[0],.4);line([[x+w,y],[x+w+35,y-35],[x+w+35,y+h-35],[x+w,y+h]],P[0],.4);
     if(si===3){const fill=fillLevel(t),yy=156-fill*310;line([[-365,yy],[365,yy]],P[3],.9,2);text(Math.round(fill*100)+'%',0,-235,41,P[3]);text(t<9.75?'FILL IN MY DATA':'INITIALIZED',0,222,20,P[0]);
       for(let k=0;k<4;k++){const q=(u*.6+k/4)%1;text(['name="ME"','dimensions=3','memory=[]','world=ready'][k],-535+q*185,-150+q*260+k*26,16,P[0],Math.sin(q*Math.PI)*.9);}}
   }
   if(si===4||si===5){const n=Math.round(worldBuilt(t)*100);if(n<100)text('WORLD '+n+'%',0,-235,19,P[0]);}
   if(si===6){const n=particleCount(t,si,window.MV_STAGE_COUNT||5400);text(u<1.61?'{ '+n+' POINTS }':n.toLocaleString()+' POINTS → DIMENSION',0,-214,22,P[3]);}
   if(si===7&&u>1.53){text('C = 2πr',0,224,23,P[3]);}
   if(si===8&&t>=38.27){const x=Math.sin(t*.7)*240,y=Math.sin((x+480)*.027-t*3)*65,slope=Math.cos((x+480)*.027-t*3)*65*.027;
     line([[x-85,y-85*slope],[x+85,y+85*slope]],P[3],.9,2);text('YOU',x,y-28,18,P[1]);}
   if(si===12){const M=window.MV_MATERIAL,year=M.yearAt(t),accelerate=S(u/1.8);
     // Actual projected near/far endpoints form radial hyperspace trails.
     for(let k=0;k<480;k++){const a=H(k*7)*T,r=190+H(k*11)*620,z=((H(k*17)*2000-u*(600+accelerate*2600))%2000+2000)%2000-510;
       if(z< -420)continue;const p=project([Math.cos(a)*r,Math.sin(a)*r*.68,z],si,t),tail=project([Math.cos(a)*r,Math.sin(a)*r*.68,z+85+accelerate*310],si,t);
       line([tail.slice(0,2),p.slice(0,2)],k%7?P[0]:P[3],C((1600-z)/1300)*.65,1+accelerate);}
     c.globalAlpha=.65;c.fillStyle='#030605';c.fillRect(-195,-52,390,105);text(M.yearLabel(year),0,0,66,year<1?P[1]:P[3]);
     text('2026 AD  ←  1 AD / 1 BC  ←  720 BC',0,224,17,P[3]);
   }
   if(si===13){text(t<56.79?'ME   ↔   YOU':'ME + YOU',0,-222,24,P[3]);if(t>=56.79)text('DEEPLY',0,226,20,P[1],.75);}
   if(si===14)text(activeWorlds(t)+' SIMULATIONS',0,-256,23,P[3]);
   if(si===15){text('ME',-402,-115,29,P[0]);text('YOU',160,-205,26,P[1]);text(Math.round(S(u/2)*100)+'%',160,204,27,P[0]);if(t>=67.99)text('EXECUTE →',-365,118,24,P[3]);}
   if(si===16){for(let k=5;k>=0;k--){const z=k*115,ps=[[-330,-180],[330,-180],[330,180],[-330,180],[-330,-180]].map(p=>project([...p,z],si,t));line(ps.map(p=>p.slice(0,2)),k%2?P[1]:P[2],.7-k*.075);}
     const xx=290-Math.sin(u*2)*12;arrow(190,-90,xx,-90,P[2]);arrow(xx,-90,xx,95,P[2]);arrow(xx,95,155,95,P[2]);text('EXIT → ENTRY',0,238,19,P[2]);}
   if(si===21)text(t<89.91?'F → M':'M',0,220,25,P[3]);
   if(si===22){const hours=clockHours(t),hour=Math.floor(hours),mins=Math.min(59,Math.floor((hours-hour)*60)),ampm=hour<12?'AM':'PM',h12=hour%12||12;
     for(let k=0;k<12;k++){const a=k/12*T-Math.PI/2;text(k===0?'12':String(k),Math.cos(a)*151,Math.sin(a)*151,18,P[3]);}
     const a=hours/12*T-Math.PI/2,b=(hours%1)*T-Math.PI/2;line([[0,0],[Math.cos(a)*90,Math.sin(a)*90]],P[3],1,5);line([[0,0],[Math.cos(b)*127,Math.sin(b)*127]],P[0],.85,2);
     text(String(h12).padStart(2,'0')+':'+String(mins).padStart(2,'0')+' '+ampm,0,235,29,hour<12?P[4]:P[1]);
     const daylight=1-S((hours-16)/4);text('☀',-305,-20,76,P[4],daylight);text('☾',305,-20,76,P[1],1-daylight);}
   if(si===23){text('ME',-240,-155,24,P[3]);text('YOU',240,-155,24,P[3]);text(roleAt(t)==='S'?'S → M':'M ← S',0,182,30,P[3]);text('CONTROL',roleAt(t)==='S'?-240:240,155,17,P[0]);text('RESPONSE',roleAt(t)==='S'?240:-240,155,17,P[1]);}
   if(si===24){const sync=S((t-101.13)/1.35);text(sync<.7?'TWO RHYTHMS':'ONE RHYTHM',0,215,23,P[3]);
     for(let row=0;row<2;row++)for(let k=0;k<13;k++){const phase=t*4+k*.65+(row?1-sync:0)*Math.PI,r=4+Math.max(0,Math.sin(phase))*8;ring(-330+k*55,-195+row*25,r,row?P[1]:P[0],.6);}}
   if(si===25||si===26){text('ME',-470,-130,19,P[0]);text('YOU',-470,135,19,P[1]);if(si===26)text('IN PHASE',0,209,20,P[3]);}
   if(si===27){const n=leave.filter(x=>t>=x+.8).length;text((6-n)+' / 6 CONNECTIONS',0,243,20,n===6?P[2]:P[1]);}
   if(si===28){const q=S((t-119.81)/3.1),xx=-445+q*890;line([[xx,-223],[xx,223]],P[2],.9,3);text('⌫',xx,-240,30,P[3]);text('ERASE '+Math.round(q*100)+'%',0,238,22,P[2]);if(q>.9)text('YOU',0,-95,23,P[2]);}
   if(si===29){text('world.execute( me, you )',0,-225,33,P[3]);line([[64,-148],[112,-148],[112,148],[64,148]],P[2],.85,4);line([[136,-148],[88,-148]],P[2],.65,3);
     text('ME',-410,175,24,P[0]);text('YOU',275,175,24,P[1]);text(t<130.74?'CHECKING ARGUMENTS':'ILLEGAL ARGUMENT',0,240,26,P[2]);
     if(t>=128.42){text('×',110,0,70,P[2]);for(let k=0;k<5;k++)text(['TYPE','SCOPE','REFERENCE','PERMISSION','RETURN'][k]+' ×',-190,-108+k*48,17,P[2],S((t-128.42-k*.25)/.5));}}
   if(si===31){const n=executed(t);for(let k=0;k<13;k++){const x=(k%5-2)*190,y=(Math.floor(k/5)-1)*147;rect(x-63,y-52,126,104,k<n?P[2]:P[k%2],k<n?.3:.6);text(k<n?'TERMINATED':'LIVE',x,y+69,13,k<n?P[2]:P[0]);}
     text('EXECUTION  '+String(n).padStart(2,'0')+' / 13',0,-255,26,P[2]);}
   if(si===32){const remaining=Math.max(1,24-Math.floor(S((t-164.07)/3.2)*23));text(remaining===1?'ONLY ME REMAINS':remaining+' → 1',0,-230,31,P[3]);
     if(remaining===1)text('ONLY EXECUTION',0,210,21,P[2]);}
   if(si===33){const loop=(u/2.05)%1;rect(98,-100,322,200,P[1],.35);text('RETURN YOU',260,-135,20,P[1]);text(loop>.68?'NO RESPONSE':'RECONSTRUCTING',260,138,17,loop>.68?P[2]:P[1]);
     arrow(-210,145,170,145,P[0],.6);arrow(170,177,-210,177,P[2],loop>.65?.9:.2);
     if(t>173.11){const close=S((t-173.11)/1.3);rect(-490+close*55,-195,980-close*110,390,P[2],close*.75);text('RETRY ↻',0,240,23,P[2]);}}
 }
 window.MV_ACTIONS={pose,draw,rain,particleCount,fillLevel,worldBuilt,clockHours,activeWorlds,executed,roleAt};
})();

/* Scoped fixes. ASCII is the rendering material; geometry never selects a solid sprite. */
(() => {
 'use strict';
 const old=window.MV_ACTIONS,M=window.MV_MATERIAL,T=Math.PI*2;
 const C=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),L=(a,b,q)=>a+(b-a)*q,S=x=>{x=C(x);return x*x*(3-2*x);};
 const H=n=>{const x=Math.sin(n*83.19+14.7)*41738.59;return x-Math.floor(x);};
 const P=['#d1f5a3','#cba7ff','#ff947b','#f4f5df','#e6c99b','#64bad1'];
 const starts=M.starts,changed=new Set([1,2,3,4,5,6,10,11,12,13,14,15,16,21,23,27,28,29,31,32,33]);
 const shield=[[0,-195],[188,-125],[159,87],[0,200],[-159,87],[-188,-125]];
 const coast=[
 [[-168,70],[-130,72],[-110,60],[-80,55],[-53,48],[-64,28],[-82,25],[-88,16],[-100,18],[-118,32],[-130,52],[-160,58]],
 [[-82,12],[-65,9],[-49,-2],[-35,-8],[-44,-23],[-57,-38],[-70,-55],[-77,-28],[-81,-6]],
 [[-17,36],[9,37],[34,30],[43,12],[51,11],[42,-15],[30,-35],[17,-34],[8,-6],[-9,4],[-17,16]],
 [[-10,36],[-9,58],[9,71],[35,70],[58,55],[78,73],[130,71],[174,58],[145,40],[124,22],[111,2],[100,9],[79,8],[66,25],[45,12],[35,33],[15,40]],
 [[112,-11],[134,-10],[153,-24],[145,-39],[117,-34]],
 [[-51,60],[-25,68],[-35,82],[-62,80]],[[45,-13],[50,-16],[47,-26],[44,-25]]
 ];
 function inside(x,y,p){let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++)if(((p[i][1]>y)!==(p[j][1]>y))&&x<(p[j][0]-p[i][0])*(y-p[i][1])/(p[j][1]-p[i][1])+p[i][0])hit=!hit;return hit;}
 function land(lon,lat){return coast.some(p=>inside(lon,lat,p));}
 function rot(p,yaw=.3,pitch=-.14){const x=p[0]*Math.cos(yaw)+p[2]*Math.sin(yaw),z=p[2]*Math.cos(yaw)-p[0]*Math.sin(yaw);return [x,p[1]*Math.cos(pitch)-z*Math.sin(pitch),p[1]*Math.sin(pitch)+z*Math.cos(pitch)];}
 function sphere(s,r,center=[0,0,0]){const y=1-2*s.b,k=Math.sqrt(1-y*y),a=s.a;return [center[0]+Math.cos(a)*k*r,center[1]+y*r,center[2]+Math.sin(a)*k*r];}
 function capsule(s,a,b,r){const q=s.b,aa=s.a;return [L(a[0],b[0],q)+Math.cos(aa)*r,L(a[1],b[1],q)+Math.sin(aa)*r*.6,L(a[2]||0,b[2]||0,q)+Math.sin(aa)*r];}
 function avatar(s,arm=0,bow=0){
   const part=Math.floor(s.e*9);let p;
   if(part<2)p=sphere(s,38,[bow*30,-116+bow*30,0]);
   else if(part<4)p=capsule(s,[0,-65,0],[0,32,0],34);
   else if(part<6){const side=part===4?-1:1;p=capsule(s,[side*28,-48,0],[side*(54+arm*38),L(28,-82,arm),-arm*45],15);}
   else{const side=part%2?-1:1;p=capsule(s,[side*17,26,0],[side*44,126,0],18);}
   p[0]+=bow*(70-(p[1]+116)*.27);p[1]+=Math.max(0,p[1])*bow*.18;return p;
 }
 function miniature(s,t,k){const n=Math.floor(s.i/64),kind=k%8,r=25+H(k*17)*24;let p;
   if(kind<5){p=[(s.b-.5)*r*1.65,(s.c-.5)*r*1.65,(s.d-.5)*r*1.65];p[n%3]=(n%2?1:-1)*r*.84;return rot(p,t*.15+k,.3);}
   if(kind===5)return sphere(s,r);
   if(kind===6)return [Math.cos(s.a)*r*1.5,Math.sin(s.a)*r*.3,Math.sin(s.a)*r];
   return [Math.cos(s.b*T*2+t)*r,(s.b-.5)*r*2.8,Math.sin(s.b*T*2+t)*r];
 }
 function pose(s,t,si){
   if([0,9,17,18,19,20,26,28,30,34,35,36,37,38,39].includes(si))return null; // Restore the last delivered memory choreography, enlarged only.
   if(!changed.has(si))return old.pose(s,t,si);
   const {i,a,b,c,d,e}=s,u=Math.max(0,t-starts[si]),side=i%2?1:-1;let p=[0,0,0],col=0,alpha=1,r=1.4+e*1.1,g='';
   if(si===1){if(i%5===0){const attackSide=Math.floor(i/5)%2?1:-1,q=(b+u*.8)%1,f=q<.55?q/.55:1-(q-.55)/.45;p=[attackSide*(580-395*f),(c-.5)*260,(d-.5)*70];col=2;r=2.2;}
     else{const k=Math.floor(e*6),A=shield[k],B=shield[(k+1)%6],q=Math.sqrt(b)*.965;p=[q*(A[0]*(1-c)+B[0]*c),q*(A[1]*(1-c)+B[1]*c),0];alpha=.85;r=2.3;}}
   else if(si===2){const k=i%8,n=Math.floor(i/8),q=S((u-c*.6)/2.4),face=n%3,body=[(b-.5)*170,(c-.5)*105,(d-.5)*120];body[face]=(n%2?1:-1)*[85,52.5,60][face];const target=[(k&1?1:-1)*93,(k&2?1:-1)*60,(k&4?1:-1)*69];p=rot([body[0]+target[0]*(1+(1-q)*3.6),body[1]+target[1]*(1+(1-q)*3.6),body[2]+target[2]*(1+(1-q)*3.6)],.35+u*.05,-.18);col=k%4===0?1:0;}
   else if(si===3){const type=i%10,yaw=.32+Math.sin(u*.28)*.025,pitch=-.38;let raw;
     if(type<2){const face=Math.floor(e*5);raw=[(b-.5)*560,(c-.5)*390,28];if(face<4){raw[face%2]=(face<2?-1:1)*[280,195][face%2];raw[2]=(d-.5)*52;}col=5;alpha=.25;}
     else if(type<4){const edge=Math.floor(e*4),pin=Math.floor(b*24),along=(pin-11.5)*(edge<2?21:14),reach=23+d*44;
       raw=edge<2?[along,(edge===0?-1:1)*(195+reach),0]:[(edge===2?-1:1)*(280+reach),along,0];col=4;alpha=.6;}
     else{const bank=Math.floor(b*8),row=Math.floor(bank/4),column=bank%4,target=[-162+column*108+(c-.5)*87,-68+row*136+(d-.5)*107,-34],flight=S((u-.3-bank*.2-e*.65)/.58),edge=bank%4;
       const inlet=edge<2?[target[0],edge===0?-270:270,0]:[edge===2?-355:355,target[1],0],outside=edge<2?[target[0]+(c-.5)*80,inlet[1]*2.8,(d-.5)*100]:[inlet[0]*2.4,target[1]+(d-.5)*80,(c-.5)*100];
       const first=S(flight/.48),second=S((flight-.48)/.52);raw=target.map((x,j)=>L(L(outside[j],inlet[j],first),x,second));col=bank%3===0?1:0;alpha=u<.3+bank*.2+e*.65?.035:.95;
     }p=rot(raw,yaw,pitch).map(x=>x*.86);p[1]-=16;}
   else if(si===4||si===5){const ring=i%4===0,lat=Math.asin(1-2*b),lon=a/T*360-180,angle=lon*Math.PI/180+(t-16)*.13;
     const settle=S((t-10.9-b*8-(ring?3:0))/2.2);let target;
     if(ring){const rad=260+c*104;target=[Math.cos(a+t*.12)*rad,Math.sin(a+t*.12)*rad*.3,Math.sin(a+t*.12)*rad*.7];col=i%12?0:4;r=1.5+e*1.7;}
     else{target=[Math.sin(angle)*Math.cos(lat)*183,-Math.sin(lat)*183,-Math.cos(angle)*Math.cos(lat)*183];const continent=land(lon,lat*180/Math.PI);col=continent?0:5;alpha=(continent?.96:.38)*(target[2]>0?.12:1);r=continent?2.7:1.65;}
     const aa=a+(1-settle)*4,rad=570+e*240;p=[L(Math.cos(aa)*rad,target[0],settle),L(Math.sin(aa)*rad*.58,target[1],settle),L((d-.5)*500,target[2],settle)];alpha*=.3+.7*settle;}
   else if(si===6){const planets=C(Math.floor((window.MV_STAGE_COUNT||5400)/42),18,160),k=i%planets,n=Math.floor(i/planets),arm=k%4,rad=55+Math.sqrt(H(k*11))*455,angle=arm*T/4+rad*.01+t*.12;
     const line=S(u/.85),face=S((u-.85)/1),volume=S((u-1.95)/1.45),scatter=[(H(k*19)-.5)*990,(H(k*23)-.5)*460,0],axis=[(H(k*11)-.5)*990,(arm-1.5)*100,0],disk=[Math.cos(angle)*rad,Math.sin(angle)*rad*.49,Math.sin(angle)*rad*.44+(H(k*29)-.5)*95];
     const center=scatter.map((x,j)=>L(L(x,axis[j],line),j===2?disk[j]*volume:disk[j],face)),radius=6+Math.pow(H(k*31),2)*26,lat=1-2*H(n*17+k*71),rr=Math.sqrt(1-lat*lat),aa=H(n*23+k*37)*T+t*.25,nz=Math.sin(aa)*rr;
     p=[center[0]+Math.cos(aa)*rr*radius,center[1]+lat*radius,center[2]+nz*radius];alpha=nz<0?.9:.14;col=k%11===0?4:k%5===0?5:k%3===0?1:0;g=n%13===0?'@':nz<-.4?'#':nz<0?'+':'.';}
   else if(si===10){const lane=i%5,dc=S((t-46.15)/.7),flow=L(Math.sin(u*3)*.12,u*.22,dc),q=(b+flow+20)%1;p=[(q-.5)*980,Math.sin(q*T*1.8-u*3)*(1-dc)*42+(lane-2)*70,(lane-2)*25+(c-.5)*15];col=lane%2;r=2+e;}
   else if(si===11){const layer=i%6,rad=75+b*225,aa=a+u*.23;p=[Math.cos(aa)*rad+Math.sin(u*2+layer)*u*13,Math.sin(aa)*rad*.6+Math.cos(u*1.7+layer)*u*7,(layer-2.5)*45];col=layer%3?0:1;alpha=.65;r=1.6+e*1.2;}
   else if(si===12){const speed=600+S(u/1.8)*2600,z=((b*2000-u*speed)%2000+2000)%2000-520,rad=190+c*620;p=[Math.cos(a)*rad,Math.sin(a)*rad*.68,z];col=t>53.8?1:0;alpha=C((z+520)/100)*C((1550-z)/600);r=1.8+e;}
   else if(si===13){const join=S(u/1.8),dive=S((t-56.79)/1.65),depth=((b*1600-u*(180+dive*580))%1600+1600)%1600-380,aa=depth*.012+u*1.35+(side>0?Math.PI:0),rad=165+60*dive+(c-.5)*50;
     p=[side*(1-join)*225+Math.cos(aa)*rad,Math.sin(aa)*rad*.8,depth+(d-.5)*18];col=side>0?1:0;r=2+e;alpha=.9;}
   else if(si===14){const k=i%64,count=Math.round(L(5,64,S(u/4))),show=S((count-k)/2),body=miniature(s,t,k);p=[((k%8-3.5)*133+body[0])*show,((Math.floor(k/8)-3.5)*63+body[1])*show,body[2]+(k%3)*16];col=k%5===0?1:k%7===0?5:0;alpha=show;r=1.8+e;}
   else if(si===15){const complete=S(u/2.7),aa=a,rad=Math.sqrt(b),heart=[Math.pow(Math.sin(aa),3)*170*rad,-(13*Math.cos(aa)-5*Math.cos(2*aa)-2*Math.cos(3*aa)-Math.cos(4*aa))*10*rad,(c-.5)*110*(1-rad*.35)],piece=i%4===0;
     p=rot(heart,.25*Math.sin(u*.7),-.10);if(piece){p[0]-=(1-complete)*390;p[1]-=(1-complete)*65;p[2]+=(1-complete)*140;}const beat=1+Math.pow(Math.max(0,Math.sin(u*5)),8)*.065*complete;p=p.map(x=>x*beat);col=piece?1:0;alpha=.45+.55*complete;}
   else if(si===16){const k=i%4,close=S(u/1.4);if(k===0){const rad=Math.sqrt(b);p=[Math.pow(Math.sin(a),3)*105*rad,-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*6.2*rad,(c-.5)*65];col=1;}
     else{const wall=Math.floor(e*6),n=Math.floor(b*11),raw=[(b-.5)*680,(c-.5)*350,(d-.5)*290],dist=[340,175,145];raw[wall%3]=(wall%2?1:-1)*(dist[wall%3]+(1-close)*210);p=rot(raw,.27+u*.09,-.08);col=i%5===0?2:0;alpha=.55;g=n%3?'#':'+';}}
   else if(si===21){const q=S((t-89.91)/1.1),part=i%4;let female,male;
     if(part<2){female=[Math.cos(a)*120,Math.sin(a)*120-50,(b-.5)*30];male=female;}
     else if(part===2){female=capsule(s,[0,68,0],[0,223,0],11);male=capsule(s,[82,-133,0],[203,-242,0],11);}
     else{female=capsule(s,[-65,164,0],[65,164,0],11);const alt=Math.floor(e*2);male=alt?capsule(s,[203,-242,0],[195,-154,0],11):capsule(s,[203,-242,0],[113,-236,0],11);}
     p=female.map((v,k)=>L(v,male[k],q));p[2]+=Math.sin(q*Math.PI)*(c-.5)*220;col=q<.5?1:0;r=2.7;}
   else if(si===23){const swap=S((t-97.32)/1.0),who=i%2,lead=who?swap:1-swap,body=avatar(s,lead,.75*(1-lead));p=[body[0]+(who?225:-225),body[1]+(1-lead)*35,body[2]];col=who?1:0;
     if(i%7===0){const q=(b+u*.7)%1,from=who?225:-225,to=-from;p=[L(from,to,q),-100+Math.sin(q*Math.PI)*-50,(c-.5)*35];col=lead>.5?3:5;alpha=lead;r=2.4;}}
   else if(si===27){const k=i%7,depart=k===6?0:S((t-[110.4,111.98,112.89,113.75,114.75,115.6][k])/.85);if(k===6){p=window.MV_MOTION_MATERIAL(s,13.08).map(x=>x*.46);col=0;}
     else{const aa=k/6*T-.6,rad=285+depart*240;if(i%3===0){const body=miniature(s,t,k);p=[Math.cos(aa)*rad+body[0],Math.sin(aa)*rad*.6+body[1]+depart*90,body[2]+depart*(d-.5)*300];}else p=[Math.cos(aa)*(70+b*205)+depart*(c-.5)*130,Math.sin(aa)*(70+b*205)*.6+depart*170,(d-.5)*45];col=depart>.1?2:1;alpha=1-depart*.97;}}
   else if(si===29){const cycle=(u*.5)%1,approach=Math.sin(cycle*Math.PI),part=i%4;
     if(part===0){const rad=136+(b-.5)*30;p=[140+Math.cos(a)*rad,Math.sin(a)*rad,(c-.5)*65];col=2;r=2.5;}
     else{const shape=Math.floor(e*3),xx=(b-.5)*170,yy=(c-.5)*160,zz=(d-.5)*90;let body=[xx,yy,zz];if(shape===0)body[0]=Math.sign(xx)*92;if(shape===1)body[1]=Math.sign(yy)*83;
       body=rot(body,u*.35,-.12);p=[-390+approach*360+body[0],body[1],body[2]];col=cycle>.55?2:0;if(cycle>.65){const burst=S((cycle-.65)/.3);p[0]-=burst*e*160;p[1]+=burst*(c-.5)*180;}r=2.1;}}
   else if(si===31){const k=i%13,events=[147.52,148.59,149.78,150.64,151.53,152.43,153.32,154.31,155.2,156.18,157.12,158.02,161.51],age=t-events[k],consume=S(age/.75),aa=k/13*T+t*.045,body=miniature(s,t,k),rad=330;
     p=[(Math.cos(aa)*rad+body[0])*(1-consume), (Math.sin(aa)*rad*.62+body[1])*(1-consume),body[2]+consume*420];col=age>=0?2:k%3===0?1:0;alpha=age<0?1:1-S((age-.55)/1);r=2+e;
     if(i%19===0){const hot=Math.exp(-Math.max(0,t-events[Math.max(0,old.executed(t)-1)])*4);p=sphere(s,60+hot*80);col=3;alpha=.6;r=2.2;}}
   else if(si===32){const gather=S((t-164.07)/3.2),k=i%24,aa=k/24*T,body=window.MV_MOTION_MATERIAL(s,13.08).map(x=>x*.83),mini=miniature(s,t,k);p=[L(Math.cos(aa)*360+mini[0],body[0],gather),L(Math.sin(aa)*210+mini[1],body[1],gather),L(mini[2],body[2],gather)];col=gather>.8?3:2;alpha=.85;}
   else if(si===33){const phase=(u/2.1)%1,build=S(phase/.5)*(1-S((phase-.65)/.3)),body=window.MV_MOTION_MATERIAL(s,13.08).map(x=>x*.48);if(i%3===0){p=[body[0]-230,body[1],body[2]];col=0;}
     else{p=[L(-120+(b-.5)*65,230+body[0],build),L((c-.5)*300,body[1],build),L((d-.5)*250,body[2],build)];col=phase>.65?2:1;alpha=.2+.8*build;}
     if(t>173.11&&i%11===0){const close=S((t-173.11)/1.4),wall=Math.floor(e*4);p=[(b-.5)*970,(c-.5)*390,(d-.5)*240];p[wall%2]=(wall%2?1:-1)*[485,195][wall%2];col=2;alpha=close*.6;}}
   return [...p,col,alpha,g];
 }
 function count(t,si,N){return N;}
 function draw(c,t,si,m,helpers){const {line,project,text}=helpers,u=t-starts[si];
   // Reuse only nonverbal, necessary marks (clock hands, tangent, etc.).
   if(!changed.has(si)&&![0,9,17,18,19,20,26,28,30,34,35,36,37,38,39].includes(si))old.draw(c,t,si,m,{...helpers,text:()=>{}});
   if(si===1){line([...shield,shield[0]],P[0],.9,2.3);line([[-38,-7],[38,-7],[38,60],[-38,60],[-38,-7]],P[3],.85,2);c.globalAlpha=.9;c.strokeStyle=P[3];c.lineWidth=4;c.beginPath();c.arc(0,-8,27,Math.PI,0);c.stroke();line([[0,14],[0,39]],P[3],.85,4);
     for(let k=0;k<6;k++){const phase=(u*.82+k/6)%1,hit=Math.exp(-Math.abs(phase-.55)*35),x=(k%2?1:-1)*185,y=(k-2.5)*35;c.globalAlpha=hit*.8;c.strokeStyle=P[2];c.lineWidth=2;c.beginPath();c.arc(x,y,8+hit*26,0,T);c.stroke();}}
   if(si===3){const yaw=.32+Math.sin(u*.28)*.025,pitch=-.38,at=(x,y,z)=>{const p=rot([x,y,z],yaw,pitch).map(q=>q*.86);p[1]-=16;return project(p,si,t).slice(0,2);},edge=(ps,col,alpha,width=1)=>line(ps.map(p=>at(...p)),col,alpha,width);
     for(const z of [-26,26])edge([[-280,-195,z],[280,-195,z],[280,195,z],[-280,195,z],[-280,-195,z]],P[5],z<0?.85:.4,1.5);
     for(const x of [-280,280])for(const y of [-195,195])edge([[x,y,-26],[x,y,26]],P[5],.65);
     edge([[-230,-158,-31],[230,-158,-31],[230,158,-31],[-230,158,-31],[-230,-158,-31]],P[3],.65,1.6);
     for(let k=0;k<8;k++){const x=-162+(k%4)*108,y=-68+Math.floor(k/4)*136;
       edge([[x-46,y-57,-34],[x+46,y-57,-34],[x+46,y+57,-34],[x-46,y+57,-34],[x-46,y-57,-34]],P[k%3===0?1:0],.28+.28*S((u-.3-k*.2)/.58));}
     for(let n=0;n<24;n++)for(const sign of [-1,1]){const x=(n-11.5)*21,y=(n-11.5)*14;
       for(const offset of [-2.5,2.5]){edge([[x+offset,sign*196,0],[x+offset,sign*257,0]],P[4],.7,1.1);edge([[sign*281,y+offset,0],[sign*342,y+offset,0]],P[4],.7,1.1);}}
     edge([[-257,-166,-28],[-243,-152,-28],[-257,-138,-28]],P[4],.9,2);
   }
   if(si===12){const accel=S(u/1.8);for(let k=0;k<420;k++){const a=H(k*7)*T,r=180+H(k*13)*700,z=((H(k*17)*2000-u*(600+accel*2600))%2000+2000)%2000-490;
       if(z< -400)continue;for(let j=0;j<10;j++){const p=project([Math.cos(a)*r,Math.sin(a)*r*.68,z+j*(9+accel*20)],si,t);c.globalAlpha=(1-j/11)*C((1600-z)/1200)*.65;c.fillStyle=k%6?P[0]:P[3];c.font=C(8*p[3],5,13)+'px Consolas,monospace';c.fillText(M.glyphFor({i:k*10+j}),p[0],p[1]);}}
     // Year is the time-travel subject, not a caption; no opaque backing rectangle.
     text(M.yearLabel(M.yearAt(t)),0,0,66,t>53.8?P[1]:P[3],1);}
 }
 window.MV_ACTIONS={...old,pose,draw,particleCount:count,land,avatar,revision:'scoped-ascii-revision'};
})();
