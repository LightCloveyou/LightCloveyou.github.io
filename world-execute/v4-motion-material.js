/* Shared material sequence derived from v4-motion-preview, framed by the whole-film stage. */
(() => {
 const TAU=Math.PI*2,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),mix=(a,b,q)=>a+(b-a)*q;
 const smooth=x=>{x=clamp(x);return x*x*(3-2*x);},out=x=>1-Math.pow(1-clamp(x),3);
 const hash=n=>{const x=Math.sin(n*127.1+21.1)*43758.5453;return x-Math.floor(x);};
 const mask=document.createElement('canvas');mask.width=520;mask.height=520;
 const mc=mask.getContext('2d');mc.fillStyle='white';mc.font='bold 430px Consolas,monospace';mc.textAlign='center';mc.textBaseline='middle';mc.fillText('@',260,258);
 const pixels=mc.getImageData(0,0,520,520).data,targets=[];
 for(let y=0;y<520;y+=5)for(let x=0;x<520;x+=5)if(pixels[(y*520+x)*4+3]>150)targets.push([x-260,y-258,0]);
 function xyzMix(a,b,q){return [mix(a[0],b[0],q),mix(a[1],b[1],q),mix(a[2],b[2],q)];}
 function boardPoint(i){const col=i%64,row=Math.floor(i/64),x=(col-31.5)*7.8,y=(row-19.5)*7.8;const cpu=Math.abs(x)<98&&Math.abs(y)<77;return [x,y,cpu?58:((col%12<8&&row%9<5)?12:0)];}
 function projected(p,t){
   const yaw=-.45+.52*Math.sin(t*.38),pitch=.54+.21*Math.cos(t*.43);
   const xx=p[0]*Math.cos(yaw)+p[2]*Math.sin(yaw),zz=p[2]*Math.cos(yaw)-p[0]*Math.sin(yaw);
   const yy=p[1]*Math.cos(pitch)-zz*Math.sin(pitch),depth=p[1]*Math.sin(pitch)+zz*Math.cos(pitch);
   const perspective=820/Math.max(240,820-depth),cameraX=t<5?-84+84*smooth(t/5):Math.sin(t*.7)*26;
   return [xx*perspective+cameraX,yy*perspective,depth,perspective];
 }
 function streamPoint(i,t){const lane=Math.floor(i/320),n=i%320,q=n/319;return [-470+q*940,(lane-3.5)*43+Math.sin(q*TAU-t*4)*19,Math.cos(q*TAU-t*2+lane*.5)*52];}
 function forkPoint(i,t){
   const k=Math.floor(i/320),n=i%320,xx=(n%32-15.5)*5.4,yy=(Math.floor(n/32)-4.5)*7.7,a=k/8*TAU+(t-6)*.65;
   const radius=120+110*smooth((t-5.5)/2),z=Math.sin(a)*80;
   const tilt=(t-6)*.7+k*.3;
   return [Math.cos(a)*radius+xx*Math.cos(tilt),Math.sin(a)*radius*.68+yy,xx*Math.sin(tilt)+z];
 }
 function stackPoint(i,t){
   const k=Math.floor(i/160),n=i%160,angle=n/160*TAU+(t-8)*.21+k*.047;
   const radius=167+Math.sin(k*.3)*10,rect=radius/Math.max(Math.abs(Math.cos(angle)),Math.abs(Math.sin(angle)));
   return [Math.cos(angle)*rect,Math.sin(angle)*rect*.76,(k-7.5)*24+(t-8)*10];
 }
 function pointAt(seed,t){
   const {i,a,b,c,d,e}=seed,board=boardPoint(i);
   if(t<3.1){
     const progress=out((t-.15-b*.85)/1.95),r=720+c*730;
     const from=[Math.cos(a)*r,Math.sin(a)*r*.65,(d-.5)*850];
     const p=xyzMix(from,board,progress);p[2]+=Math.sin(progress*Math.PI)*(c-.5)*330;
     const settle=Math.sin(clamp((t-1.5)*5,0,10))*Math.exp(-Math.max(0,t-1.5)*3);p[0]+=settle*(1-progress)*70;
     return p;
   }
   if(t<5.7){
     const q=smooth((t-3.25-b*.4)/1.45),p=xyzMix(board,streamPoint(i,t),q);
     p[2]+=Math.sin(q*Math.PI)*160*(e-.3);return p;
   }
   if(t<8.25){
     const q=smooth((t-5.7)/1.4);return xyzMix(streamPoint(i,t),forkPoint(i,t),q);
   }
   if(t<10.3){
     const q=smooth((t-8.25)/1.1);return xyzMix(forkPoint(i,t),stackPoint(i,t),q);
   }
   const stack=stackPoint(i,10.3),q=clamp((t-10.3)/1.55),explosion=[stack[0]+Math.cos(a)*(210+b*600)*q*q,stack[1]+Math.sin(a)*(180+c*400)*q*q+q*q*99,stack[2]+(d-.5)*1000*q];
   if(t<11.7)return explosion;
   const target=targets[(i*37)%targets.length],collapse=smooth((t-11.7-e*.32)/1.55),p=xyzMix(explosion,target,collapse);
   p[2]+=Math.sin(collapse*Math.PI)*Math.sin(a)*290;
   if(t>13.42){const shrink=1-out((t-13.42)/.82);return [p[0]*shrink,p[1]*shrink,p[2]*shrink];}
   return p;
 }

 window.MV_MOTION_MATERIAL=(s,t)=>{
   const i=s.i%2560,seed={i,a:hash(i*7)*TAU,b:hash(i*11),c:hash(i*13),d:hash(i*17),e:hash(i*19)};
   const p=pointAt(seed,t),j=Math.floor(s.i/2560);
   if(j){const fade=1-smooth((t-13.42)/.82);p[0]+=(s.f-.5)*3*fade;p[1]+=(s.g-.5)*3*fade;}
   return p;
 };
 
})();
