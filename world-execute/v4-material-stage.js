/* One cast of persistent glyphs, forty lyric-driven actions. No independent HUDs.
   Coordinates and transitions are pure audio-time functions: scrubbing is reversible. */
(() => {
 'use strict';
 const TAU=Math.PI*2,C=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),L=(a,b,q)=>a+(b-a)*q;
 const S=x=>{x=C(x);return x*x*(3-2*x);},H=n=>{const x=Math.sin(n*127.1+21.1)*43758.5453;return x-Math.floor(x);};
 const starts=[0,1.33,3.58,7.19,10.9,16.04,29.28,33.01,36.77,40.36,44.04,47.27,50.95,54.74,58.65,64.29,70.02,73.53,77.16,80.93,84.6,88.34,91.44,95.28,98.93,103.03,108.69,110.4,117.95,125.33,134.38,147.52,162.23,169.61,176.96,184.33,187.97,190.24,193.46,205.56];
 const P=['#d1f5a3','#cba7ff','#ff947b','#f4f5df','#e6c99b','#64bad1'];
 const seeds=Array.from({length:12000},(_,i)=>({i,a:H(i*7)*TAU,b:H(i*11),c:H(i*13),d:H(i*17),e:H(i*19),f:H(i*23),g:H(i*29)}));
 const sizes=[1.18,1.18,1.1,1.1,1.35,1.35,1.3,1.3,.91,1.2,.91,1.3,1,1.24,1.05,1.1,1.2,1.25,1.25,1.25,1.25,1.2,1.25,1.2,1.25,.91,.91,1.12,1.12,1.12,1.1,1.1,1.15,1.1,1,1,1.2,1.2,1.2,1.2];
 const cat=[];
 for(let y=-171;y<148;y+=5)for(let x=-166;x<167;x+=5){
   const face=(x/146)**2+((y+5)/123)**2<1,ear=Math.abs(x)>66&&Math.abs(x)<144&&y<-66&&y>-185+Math.abs(Math.abs(x)-112)*2.9;
   if(face||ear)cat.push([x,y,Math.sqrt(Math.max(0,1-(x/160)**2-((y+5)/160)**2))*50]);
 }
 function yearAt(t){return L(2026,-720,S((t-52.65)/1.8));}
 function yearLabel(y){return y>=1?Math.round(y)+' AD':Math.max(1,Math.round(1-y))+' BC';}
 const learnedRoute=[2,1,3,2,0,2];
 function neuron(layer,n){return [-350+layer*140,(n-2)*73,Math.sin(layer*.7+n)*85];}
 // Calyx follows the exact fruit surface; stem root overlaps its pole.
 function fruitCrown(s,t,egg){
   const spin=t*.18,top=egg?-164:-140,cx=egg?top*.23:0;
   let x,y,z;
   if(Math.floor(s.i/12)%4===0){
     const q=s.b,r=6-3.5*q,curve=spin+.8,lean=(egg?24:13)*q*q;
     x=cx+Math.cos(curve)*lean+Math.cos(s.a+spin)*r;
     y=top+5-(egg?48:37)*q;
     z=-Math.sin(curve)*lean-Math.sin(s.a+spin)*r;
   }else{
     const q=s.b,v=Math.pow(q,.8)*(egg?.14:.08),petal=Math.floor(s.e*5);
     const aa=petal*TAU/5+spin+(s.c-.5)*.72*Math.sin(Math.PI*q);
     const yy=egg?L(-164,168,v):L(-140,148,v);
     const r=egg?Math.sin(Math.PI*v)**.66*(70+60*v):Math.sqrt(Math.max(0,1-((v-.5)*2)**2))*153;
     x=Math.cos(aa)*(r+1.5)+(egg?yy*.23:Math.sin(aa*5)*6);
     y=yy-2;z=-Math.sin(aa)*(r+1.5);
   }
   return [x,y,z,0,z>8?.2:.95,''];
 }
 function pose(s,t,si){
   const fix=window.MV_ACTIONS?.pose(s,t,si);if(fix)return fix;
   const {i,a,b,c,d,e}=s,u=Math.max(0,t-starts[si]),q=S(u/2.6),side=i%2?1:-1;
   let x=0,y=0,z=0,col=0,alpha=1,g='';
   const sphere=(r,spin=t*.15)=>{const yy=1-2*b,rr=Math.sqrt(1-yy*yy),ang=a+spin;return [Math.cos(ang)*rr*r,yy*r,Math.sin(ang)*rr*r];};
   if(si===0){const r=75+(1-S(u/1.25))*b*600;x=Math.cos(a)*r;y=Math.sin(a)*r;z=(c-.5)*80;alpha=.3+.7*S(u/.25);}
   else if(si===1){const r=82+Math.floor(b*3)*36;[x,y,z]=sphere(r);g=i%31?'':'@';}
   else if(si===2||si===3){const arrive=S((t-3.58-b*.8)/2.2),xx=(i%37-18)*10,yy=(Math.floor(i/37)%23-11)*10;
     x=L(Math.cos(a)*(550+b*250),xx,arrive);y=L(Math.sin(a)*350,yy,arrive);z=L((d-.5)*500,(Math.floor(i/851)%5-2)*14,arrive);g=i%7?'':String(Math.floor(c*2));
     if(si===3){z+=Math.sin(u*2+b*TAU)*12;col=(i%37)/36<S(u/3)?0:1;}}
   else if(si===4||si===5){const grow=S((t-10.9)/4),r=174;[x,y,z]=sphere(r);y*=grow;const land=Math.sin(a*4+b*2)+Math.sin(b*14-a*2)+Math.cos(a*9)*.4;alpha=land>.2?1:.3;g=land>.7?'▓':land>.2?'+':'.';}
   else if(si===6){const dim=S(u/2.6),axis=i%3,face=i%2?1:-1,v=[(b-.5)*240,(c-.5)*240*dim,(d-.5)*240*dim];v[axis]=120*face*(axis?dim:1);const yaw=u*.22;[x,y,z]=[v[0]*Math.cos(yaw)+v[2]*Math.sin(yaw),v[1],v[2]*Math.cos(yaw)-v[0]*Math.sin(yaw)];}
   else if(si===7){const aa=a+u*.7,r=162+(c-.5)*9;x=Math.cos(aa)*r;y=Math.sin(aa)*r;z=(b-.5)*38;alpha=(aa%TAU)<u*1.5?.95:.25;}
   else if([8,10,25,26].includes(si)){x=(b-.5)*950;const dc=si===10?S((u-1.5)/1.25):0,pair=si>=25,phase=pair&&side>0?2*(1-S((t-103.03)/6)):0;
     y=Math.sin((x+475)*.027-t*3-phase)*(si===26?42:65)*(1-dc)+(pair?side*65:0)+(c-.5)*10;z=(d-.5)*90;col=pair&&side>0?1:0;g=si===10&&dc>.8?'›':'';
   }else if(si===9){const aa=a+t*.4;x=Math.cos(aa)*240/(1+Math.sin(aa)**2);y=Math.sin(aa)*Math.cos(aa)*240/(1+Math.sin(aa)**2);z=(b-.5)*36;}
   else if(si===11){const r=45+b*155,drift=Math.sin(u*2+b*5)*u*6;x=Math.cos(a)*r+drift;y=Math.sin(a)*r*.65;z=(c-.5)*150;alpha=.4+c*.6;}
   else if(si===12){const travel=S(u/2),r=190+b*300,depth=((c*1500+u*530)%1700)-330;x=Math.cos(a)*r;y=Math.sin(a)*r*.6;z=depth;col=yearAt(t)<1?1:0;alpha=C((depth+330)/170)*C((1500-depth)/300);g=i%8?':':String(Math.floor(b*10));}
   else if(si===13){const dist=150-70*q,r=112+(b-.5)*10,aa=a+t*.5*side;x=side*dist+Math.cos(aa)*r;y=Math.sin(aa)*r;z=Math.sin(aa)*44*side+(c-.5)*22;col=side>0?1:0;}
   else if(si===14||si===15){const k=i%7,ang=k/7*TAU-.6,split=S((t-58.65)/2.8),selected=si===15?S(u/4):0;
     const r=165+40*Math.sin(k*1.7),cx=Math.cos(ang)*r,cy=Math.sin(ang)*r*.65,yy=1-2*b,rr=Math.sqrt(1-yy*yy)*35;
     x=L(cx,210,selected*(k===2?0:.85))*split+Math.cos(a+t*(.3+k*.05))*rr;y=cy*split*(1-selected*.75)+yy*35;z=Math.sin(a)*rr+(k-3)*20;
     col=k===2?3:k%2;alpha=si===15&&k!==2?1-selected*.85:1;g=i%17?'':'@';
   }else if(si===16){const aa=a+u*(1.2+q*1.8),r=146+(b-.5)*15;x=Math.cos(aa)*r;y=Math.sin(aa)*r*.68;z=Math.sin(aa)*56+(c-.5)*20;col=2;g=i%17?'›':'@';}
   else if(si===17||si===18){const egg=si===17;if(i%12===0)return fruitCrown(s,t,egg);const v=b,aa=a+t*.18,yy=egg?L(-164,168,v):L(-140,148,v),r=egg?Math.sin(Math.PI*v)**.66*(70+60*v):Math.sqrt(Math.max(0,1-((v-.5)*2)**2))*153;
     x=Math.cos(aa)*r+(egg?yy*.23:Math.sin(aa*5)*6);y=yy;z=-Math.sin(aa)*r;col=egg?1:2;alpha=z>0?.07:.45+.55*C(-z/130);}
   else if(si===19){[x,y,z]=cat[(i*37)%cat.length];z+=Math.sin(u*4)*2;col=4;const stripe=Math.sin(Math.abs(x)*.085-y*.043)>.48&&y<35;alpha=stripe?.28:.9;g=stripe?':':'';}
   else if(si===20){[x,y,z]=sphere(160);col=1;if(i%4===0){x*=1.7;y*=.25;z*=1.7;col=4;}}
   else if(si===21||si===23){x=(i%41-20)*10;y=(Math.floor(i/41)%25-12)*9;z=(b-.5)*65;const scan=(u*.4)%1,converted=(x+205)/410<scan;col=converted?1:0;g=converted?'1':'0';if(si===23){x+=Math.sin(q*Math.PI)*side*100;z+=side*Math.sin(q*Math.PI)*100;}}
   else if(si===22){const aa=a-u*.45,r=160+(b-.5)*12;x=Math.cos(aa)*r;y=Math.sin(aa)*r;z=(c-.5)*60;col=Math.sin(a-u*.45)>0?1:0;}
   else if(si===24){const r=30+b*165,aa=a+t*.2+b*TAU;x=Math.cos(aa)*r+Math.sin(t*.6+b*4)*18;y=Math.sin(aa)*r*.63;z=Math.sin(b*TAU+t)*80;col=1;}
   else if(si===27){const k=i%6,ang=k/6*TAU-.5,lost=C((u-k*.94)/.8),r=L(48,208,b)+lost*120;x=Math.cos(ang)*r;y=Math.sin(ang)*r*.65;z=(c-.5)*24+lost*(d-.5)*250;col=lost>.2?2:1;alpha=1-lost*.95;}
   else if(si===28){const alive=c>C(u/7.2),held=i%17===0;x=(b-.5)*540;y=(d-.5)*240;z=(e-.5)*120;
     if(held){const aa=a+t*.15;x=Math.cos(aa)*(35+c*8);y=Math.sin(aa)*(35+c*8);z=(b-.5)*20;col=2;g='@';}
     else{const fall=S((u/7.2-c)*3);y+=fall*220;z+=fall*200;alpha=alive?.8:1-fall;g=alive?(i%2?'1':'0'):'·';}}
   else if(si===29){const travel=(b+u*.5)%1;x=-155+Math.sin(travel*Math.PI)*148;y=(c-.5)*35;z=(d-.5)*35;col=travel>.5?2:0;if(i%4===0){x=160+Math.cos(a)*45;y=Math.sin(a)*45;col=1;}}
   else if(si===30&&window.MV_MOTION_MATERIAL){[x,y,z]=window.MV_MOTION_MATERIAL(s,C(u,0,13.13));col=u>9.2?2:i%7?0:1;g=u>10.3?'×':'';}
   else if(si===31){const call=(u/.96)%1,k=Math.floor(b*18),angle=a+t*.16,rad=90+(k/18)*180+S(call)*28,r=rad/Math.max(Math.abs(Math.cos(angle)),Math.abs(Math.sin(angle)));
     x=Math.cos(angle)*r;y=Math.sin(angle)*r*.65;z=(k-9)*30+call*30;col=2;g=i%29?'':'×';}
   else if(si===32){const shut=S(u/5),r=L(230,42,shut),aa=a+t*.2;x=Math.cos(aa)*r;y=Math.sin(aa)*r*.6;z=(b-.5)*160*(1-shut);col=2;alpha=i%7?1-shut*.94:1;g='@';}
   else if(si===33){const q2=(b+u*.28)%1;x=q2<.5?L(-200,200,q2*2):L(200,-200,(q2-.5)*2);y=(c-.5)*20+Math.sin(q2*TAU)*18;z=(d-.5)*55;col=q2<.5?0:2;g=q2<.5?'›':'‹';}
   else if(si===34||si===35){const learned=si===35||u>2.3,reverse=!learned&&u>1.5,k=i%5,phase=(b+(reverse?-u:u)*.52+100)%1,along=phase*5,layer=Math.min(4,Math.floor(along)),f=along-layer;
     const from=neuron(layer,learned&&k===2?learnedRoute[layer]:(k+layer)%5),to=neuron(layer+1,learned&&k===2?learnedRoute[layer+1]:(k+layer+1)%5);
     x=L(from[0],to[0],f);y=L(from[1],to[1],f)+(c-.5)*9;z=L(from[2],to[2],f)+(d-.5)*18;
     col=reverse?2:learned&&k===2?0:1;alpha=learned?(k===2?1:.18):.6;
     if(si===35&&i%3===0)y+=Math.sin(x*.018+t*1.8)*55;
   }else if(si>=36&&si<=38){const aa=a+t*.35,r=78+Math.floor(b*4)*18;x=-115+Math.cos(aa)*r;y=Math.sin(aa)*r;z=(c-.5)*35;col=0;
     if(si===36&&i%3===0){const away=S(u/3);x=120+away*400+Math.cos(a)*25;y=-away*130+Math.sin(a)*25;col=1;alpha=1-away;}
     if(si===38)alpha=1-S((u-4)/8)*.9;
   }else{const shrink=1-S(u/4.7);x=Math.cos(a)*36*shrink;y=Math.sin(a)*36*shrink;z=0;alpha=shrink;}
   return [x,y,z,col,alpha,g];
 }
 function point(s,t,si){const p=pose(s,t,si);if(si===0)return p;const q=S((t-starts[si])/(si===31?.45:1.05));if(q>=1)return p;
   const old=pose(s,starts[si],si-1),bend=Math.sin(q*Math.PI)*(s.c-.5)*90;
   return [L(old[0],p[0],q),L(old[1],p[1],q),L(old[2],p[2],q)+bend,q<.5?old[3]:p[3],L(old[4],p[4],q),q<.5?old[5]:p[5]];
 }
 function project(p,si,t){const depth=C(p[2],si===12||si===13?-520:-180,1800),perspective=760/(760+depth);return [p[0]*perspective,p[1]*perspective,depth,perspective];}
 function scaleAt(si,t){return L(sizes[Math.max(0,si-1)]*(si===29?1.4:1),sizes[si]*(si===28?1.4:1),S((t-starts[si])/1.05));}
 // Full printable ASCII, assigned once per persistent particle ID.
 // Depth changes size/opacity, not the letter: no random text flicker.
 const ASCII_LETTERS='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 const ASCII_MARKS=Array.from({length:94},(_,i)=>String.fromCharCode(i+33)).filter(x=>!ASCII_LETTERS.includes(x)).join('');
 function glyphFor(seed){const pool=seed.i%10<6?ASCII_LETTERS:ASCII_MARKS;return pool[Math.floor(H(seed.i*43+7)*pool.length)];}
 function draw(c,t,si,m){
   const N=C(Math.round(window.MV_STAGE_COUNT||5400),800,12000),points=[];
   for(let i=0;i<N;i++){const s=seeds[i],p=point(s,t,si);points.push({s,p,v:project(p,si,t)});}
   points.sort((a,b)=>b.v[2]-a.v[2]);
   c.save();c.textAlign='center';c.textBaseline='middle';let drawn=0;
   for(const {s,p,v} of points){if(p[4]<.015||Math.abs(v[0])>800||Math.abs(v[1])>450)continue;
     const lum=C(.75-v[2]/650,.2,1),size=C(9*v[3],5.5,15),char=glyphFor(s);
     c.globalAlpha=C(p[4]*(.32+lum*.65));c.fillStyle=s.i%29===0?P[3]:P[p[3]];c.font=size+'px Consolas,monospace';c.fillText(char,v[0],v[1]);drawn++;
     if(s.i%31===0&&t>.07){const before=project(point(s,t-.065,si),si,t-.065),speed=Math.hypot(v[0]-before[0],v[1]-before[1]);if(speed>2&&Math.abs(v[2]-before[2])<180&&![6,12,13].includes(si)){c.globalAlpha=C(speed/95,.1,.45)*p[4];c.strokeStyle=P[p[3]];c.lineWidth=.8;c.beginPath();c.moveTo(before[0],before[1]);c.lineTo(v[0],v[1]);c.stroke();}}
   }
   // Meaningful structural guides share the same material and framing, not side widgets.
   const rawText=(s,x,y,size=17,col=P[3],alpha=1)=>{c.globalAlpha=alpha;c.fillStyle=col;c.font=size+'px Consolas,monospace';c.fillText(s,x,y);};
   const text=()=>{};
   const line=(p,col=P[0],alpha=.5,width=1)=>{c.globalAlpha=alpha;c.strokeStyle=col;c.lineWidth=width;c.beginPath();p.forEach((v,i)=>i?c.lineTo(...v):c.moveTo(...v));c.stroke();};
   // Outgoing material is the lyric's action: nutrients, antioxidants, then sound.
   if(si>=17&&si<=19){const u=t-starts[si],col=si===17?P[1]:si===18?P[2]:P[4];
     for(let lane=0;lane<7;lane++){
       const side=lane%2?1:-1,yy=(lane-3)*45,pts=[];
       for(let k=0;k<=65;k++){const q=k/65;pts.push([side*(125+q*600),yy+Math.sin(q*4+t*2+lane)*q*22]);}
       line(pts,col,.13*S(u/.8));
       for(let n=0;n<16;n++){const q=(u*.24+n/16+lane*.09)%1,xx=side*(125+q*600),y=yy+Math.sin(q*4+t*2+lane)*q*22;
         rawText(n%8?'.':si===19?'~':'+',xx,y,n%8?10:14,col,Math.sin(q*Math.PI)*.65*S(u/.8));}
     }
   }
   if(si===10){const dc=S((t-45.54)/1.25);text('AC',-280,-135,35,P[0],1-dc*.6);text('DC',280,-135,35,P[3],.3+dc*.7);text(dc>.5?'→ → →':'↔ ↔ ↔',0,150,22);}
   if(si===30){const u=t-starts[si],stages=['ASSEMBLE','TRANSFER','MULTIPLY','RECURSE','BREAK','RETURN ?'],k=u<3.25?0:u<5.7?1:u<8.25?2:u<10.3?3:u<11.7?4:5;text(stages[k],0,245,18,u>9?P[2]:P[0]);}
   if(si===34||si===35){const u=t-starts[si],learned=si===35||u>2.3,step=(u%2.3)/2.3;
     for(let l=0;l<6;l++)for(let n=0;n<5;n++){const p=project(neuron(l,n),si,t),x=p[0],y=p[1],active=n===learnedRoute[l]&&learned;
       if(l<5)for(let k=0;k<5;k++){const chosen=active&&k===learnedRoute[l+1],dest=project(neuron(l+1,k),si,t);line([[x,y],dest.slice(0,2)],chosen?P[0]:P[1],chosen?.85:.18,chosen?2.3:.7);}
       c.globalAlpha=active?1:.7;c.fillStyle=active?P[0]:P[1];c.beginPath();c.arc(x,y,(active?5:3)*p[3],0,TAU);c.fill();}
     text(si===35?'f(me, you(t)) = ?':learned?'SAME INPUT · NEW CHOICE':'TRIAL 01 · ERROR',0,-202,si===35?29:19,learned?P[0]:P[2]);
     text(si===35?'YOU(t) ≠ TRAINING DATA':learned?'feedback → changed path':'choice → feedback',0,204,16,P[1]);
   }
   window.MV_ACTIONS?.draw(c,t,si,m,{text:rawText,line,project});
   c.restore();
   return drawn;
 }
 window.MV_STAGE_COUNT=5400;
 window.MV_MATERIAL={draw,point,pose,fruitCrown,glyphFor,scaleAt,yearAt,yearLabel,starts,seeds};
 const slider=document.getElementById('stageParticles'),value=document.getElementById('stageCount');
 if(slider)slider.addEventListener('input',()=>{window.MV_STAGE_COUNT=Number(slider.value);value.textContent=window.MV_STAGE_COUNT.toLocaleString();window.dispatchEvent(new Event('stagechange'));});
})();
