/* Specific operating-system mechanisms are the visual verbs, not decorative labels.
   Each scene is derived from audio time and is safe to seek in either direction. */
(() => {
  const C={white:'#edf1e7',green:'#cbefa1',purple:'#baa6e8',red:'#f38a78',amber:'#dfbd81',dim:'#718375',dark:'#28342c'};
  const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);};
  const hex=(n,w=4)=>Math.floor(Math.abs(n)).toString(16).toUpperCase().padStart(w,'0');
  window.MV_OS_SCENES = a => {
    const {c,t,si,u,m,line,text,dot,ring,box,core,glyph,wave}=a;
    const green=C.green,purple=C.purple,red=C.red,white=C.white,dim=C.dim;
    const q=(t*.7)%1,step=Math.floor(u*2),phase=clamp(u/4);
    function panel(x,y,w,h,title,col=green){
      c.fillStyle='#050b08';c.globalAlpha=.94;c.fillRect(x,y,w,h);c.globalAlpha=1;
      box(x,y,w,h,col,.65);line([[x,y+24],[x+w,y+24]],col,.28);
      text(title,x+10,y+12,9,col,'left');for(let i=0;i<3;i++)dot(x+w-11-i*8,y+12,1.5,col,.5);
    }
    function cell(x,y,w,h,label,col=green,alpha=.7){
      c.globalAlpha=.045;c.fillStyle=col;c.fillRect(x,y,w,h);c.globalAlpha=1;box(x,y,w,h,col,alpha);text(label,x+w/2,y+h/2,10,col,'center',alpha);
    }
    function arrow(x1,y1,x2,y2,col=green,alpha=.6){
      line([[x1,y1],[x2,y2]],col,alpha);const a=Math.atan2(y2-y1,x2-x1);line([[x2-7*Math.cos(a-.45),y2-7*Math.sin(a-.45)],[x2,y2],[x2-7*Math.cos(a+.45),y2-7*Math.sin(a+.45)]],col,alpha);
    }
    function packet(x1,y1,x2,y2,q,col=white){const x=x1+(x2-x1)*q,y=y1+(y2-y1)*q;cell(x-9,y-5,18,10,'',col,.9);}
    function pageGrid(x,y,cols,rows,active,col=green){for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const n=j*cols+i;cell(x+i*25,y+j*20,20,15,n===active?'@':hex(n,2),n===active?white:col,n===active?1:.38);}}
    function footer(s,col=dim){text(s,0,223,10,col);}
    function queue(x,y,count,label,col=green){text(label,x,y-17,9,col,'left');for(let i=0;i<count;i++)cell(x+i*44,y,37,26,hex(101+i*7,3),col,.5);}
    switch(si){
      case 0: {
        panel(-256,-158,512,302,'UEFI / POWER-ON SELF TEST');
        const lines=['VCC +12V ........ STABLE','MEMORY MAP ...... 0x0000 → 0xFFFF','CPU MICROCODE ... LOADED','BOOT DEVICE ..... /dev/world','ENTRY POINT ..... _start'];
        const n=Math.min(5,Math.floor(u*4)+1);
        for(let i=0;i<5;i++){text(String(i+1).padStart(2,'0'),-232,-103+i*35,9,dim,'left');text(lines[i],-192,-103+i*35,11,i<n?green:dim,'left',i<n?.95:.2);if(i<n)text('✓',226,-103+i*35,12,green,'right');}
        line([[-230,103],[230,103]],dim,.35);line([[-230,103],[-230+460*clamp(u/1.2),103]],green,.9,3);
        footer('POWER GOOD → FIRMWARE → BOOTLOADER');return true;
      }
      case 1: {
        panel(-285,-164,243,320,'VIRTUAL ADDRESS / ME');panel(54,-164,231,320,'PHYSICAL MEMORY');
        for(let j=0;j<7;j++){
          const y=-111+j*33,protectedPage=j===4;cell(-265,y,202,25,'0x'+hex(j*4096)+'  '+(protectedPage?'---':'RW-'),protectedPage?red:green,.65);
          cell(75,y,190,25,'FRAME '+hex((j*3)%7)+' '+(protectedPage?'GUARD':'MAPPED'),protectedPage?red:purple,.55);
          if(!protectedPage){const to=-111+(j*3)%7*33+12;line([[-63,y+12],[-15,y+12],[28,to],[75,to]],green,.3);if(j===step%7)packet(-63,y+12,75,to,q);}
        }
        footer('MMU / PAGE PERMISSIONS KEEP THE CORE INTACT',green);return true;
      }
      case 2: {
        const nodes=[[-206,-126,'CPU.o'],[80,-126,'RAM.o'],[-206,13,'GPU.o'],[80,13,'NIC.o']];
        for(let i=0;i<nodes.length;i++){
          const [x,y,name]=nodes[i];panel(x,y,126,79,name,i<step+1?green:dim);
          for(let k=0;k<3;k++)text(hex(i*4096+k*64)+' '+['.text','.data','.bss'][k],x+12,y+38+k*12,8,i<step+1?green:dim,'left',.7);
          if(u>i*.45)line([[x+63,y+79],[x+63,143],[0,143]],green,.5);
        }
        cell(-97,126,194,43,'LINK → me.exe',white,.9);
        footer('SYMBOL RESOLUTION / RELOCATION / OBJECT CREATION');return true;
      }
      case 3: {
        panel(-295,-165,590,330,'PROCESS ADDRESS SPACE / PID 001');
        const parts=[['.text',green,66],['.rodata',purple,44],['.data',green,43],['heap ↑',C.amber,65],['stack ↓',purple,50]];
        let y=-124;
        for(let i=0;i<parts.length;i++){const [name,col,h]=parts[i];cell(-272,y,134,h-5,name,col,.8);pageGrid(-111,y+2,14,Math.max(1,Math.floor(h/20)),(step+i*7)%28,col);y+=h;}
        const scan=-123+(u*44)%256;line([[-279,scan],[279,scan]],white,.35);
        footer('ALLOCATE → FILL PARAMETERS → CALL init()',green);return true;
      }
      case 4: {
        for(let layer=0;layer<4;layer++){
          const x=-256+layer*47,y=-170+layer*42,w=374,h=191;
          panel(x,y,w,h,['BACK BUFFER','WINDOW SURFACE','Z-ORDER / CLIP','COMPOSITOR OUTPUT'][layer],layer===3?green:purple);
          for(let j=0;j<7;j++)for(let i=0;i<16;i++){const v=Math.sin(i*.4+t+layer)+Math.cos(j*.7-t*.6);glyph(x+20+i*22,y+42+j*19,v>.4?'▓':v>-.4?'+':'.',layer===3?green:purple,.22+Math.abs(v)*.15,9);}
          text('SURFACE '+layer+'  RGBA / 60Hz',x+12,y+h-13,8,dim,'left');
        }
        footer('GPU COMPOSITION / MULTIPLE SURFACES → ONE WORLD');return true;
      }
      case 11: {
        panel(-270,-169,540,322,'CAMERA → FRAMEBUFFER / LOST FOCUS',purple);
        for(let row=0;row<17;row++)for(let col=0;col<37;col++){
          const x=-252+col*14,y=-129+row*15,dx=Math.sin(row*.6+t*5)*u*3;
          const pupil=((col-18)/7)**2+((row-8)/5)**2<1;
          glyph(x+dx,y,pupil?'@':(row+col)%3?'.':'+',pupil?green:purple,pupil?.7:.28,10);
        }
        for(let i=0;i<3;i++)box(-60-i*28,-62-i*19,120+i*56,124+i*38,i===0?red:green,.55-i*.14);
        footer('CAPTURE OK / FOCUS NaN / FRAME COHERENCE LOST',red);return true;
      }
      case 13: {
        panel(-270,-158,175,278,'ME / SOCKET A');panel(95,-158,175,278,'YOU / SOCKET B',purple);
        text('CLOSED',-182,-110,10,dim);text('LISTEN',182,-110,10,purple);
        const rows=[[-65,'SYN',green],[-4,'SYN + ACK',purple],[57,'ACK',white]];
        rows.forEach(([y,s,col],i)=>{const reverse=i===1;arrow(reverse?95:-95,y,reverse?-95:95,y,col,u>i*.6?.8:.18);text(s,0,y-13,9,col);if(u>i*.6)packet(reverse?95:-95,y,reverse?-95:95,y,(u*.65-i*.2+1)%1,col);});
        cell(-225,145,450,37,u>2?'ESTABLISHED / SHARED CLOCK':'NEGOTIATING SEQUENCE NUMBERS',u>2?green:dim,.8);
        footer('TCP THREE-WAY HANDSHAKE / TWO INDEPENDENT ENDPOINTS');return true;
      }
      case 14: {
        cell(-69,-203,138,33,'PARENT / 001',white,.9);
        for(let k=0;k<6;k++){
          const x=-285+(k%3)*199,y=-103+Math.floor(k/3)*148;
          line([[0,-170],[0,-137],[x+91,-137],[x+91,y]],green,.26);
          panel(x,y,183,123,'SANDBOX / '+hex(201+k),k%2?purple:green);
          for(let i=0;i<20;i++){const yy=y+72+Math.sin(i*.36+t*(.4+k*.1))*20;dot(x+12+i*8,yy,1.6,k%2?purple:green,.7);}
          text('SEED '+hex(k*397)+'  score '+Math.round(50+Math.sin(t+k)*40),x+11,y+108,8,dim,'left');
        }
        footer('fork() / EACH CHILD SIMULATES A DIFFERENT POSSIBILITY');return true;
      }
      case 15: {
        panel(-297,-177,594,337,'SCHEDULER / SEEKING THE HIGHEST REWARD');
        const selected=step%5;
        for(let j=0;j<5;j++){
          const y=-122+j*49,col=j===selected?white:j%2?purple:green;
          text('PID '+(201+j),-277,y,9,col,'left');
          for(let k=0;k<10;k++){const active=(k+j*3)%5<2;cell(-174+k*43,y-13,36,27,active?'RUN':'·',col,active?.8:.16);}
        }
        const x=-174+((u*84)%424);line([[x,-147],[x,133]],C.amber,.9,1.5);text('CLOCK',x,-157,8,C.amber);
        footer('PRIORITY CHANGES / CPU TIME GOES TO THE BEST SCORE',green);return true;
      }
      case 16: {
        const r=149,nodes=[];
        for(let i=0;i<4;i++){const angle=i*Math.PI/2-Math.PI/2;nodes.push([Math.cos(angle)*r,Math.sin(angle)*r]);}
        for(let i=0;i<4;i++){const [x,y]=nodes[i],[nx,ny]=nodes[(i+1)%4];arrow(x*.77,y*.77,nx*.77,ny*.77,red,.7);cell(x-48,y-22,96,44,i%2?'LOCK '+i:'PID '+(i+1),i%2?red:green,.9);}
        core(0,0,36,red);text('DEADLOCK',0,58,13,red);
        footer('HOLD → WAIT → HOLD → WAIT / NO RUNNABLE EXIT',red);return true;
      }
      case 20: {
        panel(-275,-178,550,341,'SECURITY CONTEXT / UID 0',C.amber);
        const roles=['ROOT / ME','CAP_SYS_ADMIN','CAP_NET_ADMIN','CAP_DAC_OVERRIDE','REMOTE / YOU'];
        roles.forEach((s,i)=>{const y=-121+i*52;cell(-244,y,264,34,s,i===4?purple:C.amber,.75);text(i===4?'OUTSIDE NAMESPACE':'PERMITTED',41,y+17,9,i===4?red:green,'left');if(i)line([[-259,-104],[-259,y+17],[-244,y+17]],C.amber,.4);});
        footer('LOCAL ROOT PRIVILEGE DOES NOT PROVE REMOTE EXISTENCE',purple);return true;
      }
      case 21: {
        panel(-280,-173,560,328,'CONFIGURATION / IDENTITY AS MUTABLE STATE',purple);
        const labels=['identity','presentation','protocol','compatibility'];
        for(let row=0;row<4;row++){
          text(labels[row],-260,-115+row*61,10,dim,'left');
          for(let bit=0;bit<12;bit++){const active=(bit+step+row*3)%5<2;cell(-110+bit*29,-132+row*61,23,34,active?'1':'0',active?purple:green,active?.95:.28);}
        }
        footer('HOT RELOAD / SAME PID, DIFFERENT CONFIGURATION',purple);return true;
      }
      case 23: {
        panel(-292,-170,228,332,'CONTEXT / PROCESS A');panel(64,-170,228,332,'CONTEXT / PROCESS B',purple);
        for(let j=0;j<8;j++){
          const y=-120+j*33;cell(-272,y,187,26,['RAX','RBX','RCX','RDX','RSP','RBP','RIP','FLAGS'][j]+'  '+hex(j*1337+step*16,8),green,.7);
          cell(85,y,187,26,['RAX','RBX','RCX','RDX','RSP','RBP','RIP','FLAGS'][j]+'  '+hex(j*171+step*31,8),purple,.7);
          if(j===step%8){arrow(-85,y+13,85,y+13,white,.85);packet(-85,y+13,85,y+13,q);}
        }
        footer('SAVE REGISTERS → SWITCH STACK → RESTORE CONTEXT',white);return true;
      }
      case 24: {
        panel(-287,-172,237,338,'INTERRUPT VECTOR TABLE',purple);
        for(let j=0;j<12;j++){const y=-127+j*23;text('IRQ '+hex(j,2)+'  '+['TIMER','KEYBD','AUDIO','NIC'][j%4],-265,y,9,j===step%12?white:purple,'left',j===step%12?1:.47);}
        core(147,0,65);for(let j=0;j<12;j++){
          const y=-127+j*23;line([[-50,y],[15,y],[74,0]],purple,.14);
          if(j===step%12)packet(-50,y,74,0,q,white);
        }
        text('INTERRUPT',147,112,11,green);text('PREEMPT → RESUME',147,133,9,dim);
        footer('TOO MANY SIGNALS / THE SCHEDULER LOSES ITS RHYTHM');return true;
      }
      case 26: {
        const count=28,r=150;
        for(let i=0;i<count;i++){const angle=i/count*Math.PI*2-Math.PI/2,x=Math.cos(angle)*r,y=Math.sin(angle)*r;cell(x-16,y-11,32,22,hex(i,2),i<Math.floor(q*count)?green:purple,.65);}
        const a1=q*Math.PI*2-Math.PI/2,a2=a1+.5;line([[0,0],[Math.cos(a1)*124,Math.sin(a1)*124]],green,.8,2);line([[0,0],[Math.cos(a2)*124,Math.sin(a2)*124]],purple,.7,2);
        text('RING BUFFER',0,-17,12,white);text('READ ↔ WRITE',0,13,10,green);text('UNDERRUN = 0',0,38,9,dim);
        footer('AUDIO DMA / PRODUCER AND CONSUMER REACH PHASE LOCK');return true;
      }
      case 27: {
        const lost=Math.min(6,Math.floor(u/.95));
        panel(-300,-176,198,344,'LOCAL SOCKET');panel(102,-176,198,344,'REMOTE SOCKET',purple);
        const states=['ESTABLISHED','FIN_WAIT_1','FIN_WAIT_2','TIME_WAIT','CLOSED','RETRY','LOOPBACK'];
        for(let j=0;j<6;j++){
          const y=-117+j*47,alive=j>=lost;cell(-277,y,151,30,'SEQ '+hex(128+j*256),alive?green:red,alive?.65:.28);
          cell(125,y,151,30,alive?'ACK '+hex(129+j*256):'TIMEOUT',alive?purple:red,alive?.6:.3);
          if(alive){arrow(-102,y+15,102,y+15,green,.35);packet(-102,y+15,102,y+15,(q+j/6)%1);}
          else text('×',0,y+15,15,red);
        }
        footer(states[lost]+' / '+(6-lost)+' UNACKNOWLEDGED CHANNELS',red);return true;
      }
      case 28: {
        panel(-300,-175,287,335,'FILESYSTEM / MEMORY OF YOU');panel(30,-175,270,335,'PAGE CACHE / RECLAIM');
        const entries=['/home/me/','  memories/','    first_ack.dat','    shared_clock','  pending/','    you.socket','  .unresolved'];
        entries.forEach((s,j)=>{const y=-124+j*35;const deleted=j>1&&j!==5&&u>(j-1)*.7;
          text(s,-281,y,10,deleted?dim:j===5?red:green,'left',deleted?.35:.9);if(deleted)line([[-268,y],[s.length*6-278,y]],red,.7);
          if(j>0)line([[-288,-125],[-288,y],[-282,y]],green,.3);
        });
        for(let row=0;row<10;row++)for(let col=0;col<8;col++){
          const n=row*8+col,alive=n>(u*10),protectedPage=n===37;cell(49+col*29,-128+row*26,23,20,protectedPage?'@':alive?hex(n,2):'·',protectedPage?red:alive?green:dim,protectedPage?1:alive?.65:.16);
        }
        footer('UNLINK → DROP CACHE → RECLAIM / 1 OPEN HANDLE REMAINS',red);return true;
      }
      case 29: {
        panel(-288,-170,234,327,'USER SPACE / CALLER');panel(54,-170,234,327,'KERNEL SPACE',red);
        const args=['syscall: EXECVE','arg[0]: me','arg[1]: you','arg[2]: love','capability: local'];
        args.forEach((s,j)=>text(s,-267,-111+j*43,11,j===2?purple:green,'left'));
        const checks=['COPY_FROM_USER','POINTER RANGE','OWNERSHIP CHECK','REMOTE REFERENCE','RETURN -EINVAL'];
        checks.forEach((s,j)=>{text(s,74,-111+j*43,9,j>1?red:green,'left');glyph(265,-111+j*43,j>1?'×':'✓',j>1?red:green,.9,12);});
        line([[0,-200],[0,191]],red,.6,2);packet(-54,-25,0,-25,q,white);text('TRAP',0,207,10,red);
        footer('SYSCALL GATE / YOU IS NOT A VALID LOCAL ARGUMENT',red);return true;
      }
      case 30: {
        const count=9+Math.floor(clamp(u/13)*6);
        for(let k=count-1;k>=0;k--){const x=-234+k*12,y=-166+k*21;
          panel(x,y,330,67,'STACK FRAME '+hex(k),k===0?white:red);
          text('return → '+hex(0x401000+k*64)+'    exec(me)',x+12,y+43,10,red,'left',.85);
          line([[x+345,y+12],[x+361,y+12],[x+361,y+54],[x+345,y+54]],red,.5);
        }
        footer('RECURSION DEPTH '+count+' / STACK SPACE IS FINITE',red);return true;
      }
      case 32: {
        panel(-294,-176,588,345,'PROCESS TABLE / ROOT OWNS EVERY LOCAL PID',red);
        text('PID      NAME              CPU      STATE',-273,-128,10,dim,'left');
        for(let j=0;j<8;j++){
          const y=-90+j*30,dead=j>0&&u>j*.55;
          text(String(j+1).padStart(3,'0')+'      '+(j?'worker.'+j:'ME      ')+'           '+(j?'00':'99')+'%      '+(dead?'ZOMBIE':j?'SLEEP':'RUN'),-273,y,10,j===0?white:dead?red:green,'left',dead?.38:.9);
          if(dead)line([[-240,y],[261,y]],red,.4);
        }
        footer('kill(other_pid) / STILL NO RESPONSE FROM OUTSIDE',red);return true;
      }
      case 33: {
        panel(-285,-179,570,339,'ROUTING TABLE / RETURN REQUEST',purple);
        const rows=['DESTINATION     GATEWAY       INTERFACE','127.0.0.1       local         lo','192.168.*      connected     eth0','YOU            --            unreachable'];
        rows.forEach((s,j)=>text(s,-261,-125+j*36,j?10:9,j===3?red:j?green:dim,'left'));
        queue(-248,58,5,'SEND QUEUE',green);cell(75,58,180,26,'TTL → 0',red,.8);
        arrow(-22,103,195,103,purple,.6);packet(-22,103,195,103,q,white);
        footer('NO VALID NEXT HOP / LOCAL AUTHORITY ENDS AT THE NETWORK');return true;
      }
      case 37: case 38: {
        const fade=si===38?1-ease((t-200)/5)*.8:1;
        panel(-287,-164,574,310,'KERNEL WAIT QUEUE / BLOCKED TASK');
        const rows=['TASK       WAIT CHANNEL       WAKE CONDITION','ME         socket.recv        external ACK','clock      timerfd            next tick','memory     page_fault         mapped page','world      compositor         next frame'];
        rows.forEach((s,j)=>text(s,-266,-112+j*39,j?10:9,j===1?C.amber:j?green:dim,'left',fade*(j===1?1:.6)));
        cell(-232,103,464,25,'ME: UNINTERRUPTIBLE WAIT / NO WAKE EVENT',C.amber,.8*fade);
        footer('THE WORLD KEEPS RUNNING. THIS PROCESS DOES NOT.',C.amber);return true;
      }
      default:return false;
    }
  };
})();
