// Timer
let ac;function beep(){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();for(let i=0;i<3;i++){const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.value=880;g.gain.value=.2;o.start(ac.currentTime+i*.4);o.stop(ac.currentTime+i*.4+.2)}}catch(e){}}
const p2=n=>String(n).padStart(2,"0"),fmt=ms=>{const s=Math.max(0,Math.ceil(ms/1000));return p2(Math.floor(s/60))+":"+p2(s%60)},f2=ms=>p2(Math.floor(ms/60000))+":"+p2(Math.floor(ms/1000)%60)+"."+p2(Math.floor(ms/10)%100);
const T={cd:{run:0,left:0,end:0},sw:{run:0,el:0,st:0,laps:[]},pm:{run:0,left:1500000,end:0,w:1}};
const base=()=>(+$("cd-m").value*60+ +$("cd-s").value)*1000,pmLen=()=>(T.pm.w?25:5)*60000;
$("cd-go").onclick=()=>{const c=T.cd;if(c.run){c.left=c.end-Date.now();c.run=0}else{if(c.left<=0)c.left=base();if(c.left>0){c.end=Date.now()+c.left;c.run=1}}draw()};
$("cd-rs").onclick=()=>{T.cd={run:0,left:0,end:0};draw()};
$("sw-go").onclick=()=>{const s=T.sw;if(s.run){s.el+=Date.now()-s.st;s.run=0}else{s.st=Date.now();s.run=1}draw()};
$("sw-lap").onclick=()=>{const s=T.sw;if(s.run){s.laps.push(s.el+Date.now()-s.st);draw()}};
$("sw-rs").onclick=()=>{T.sw={run:0,el:0,st:0,laps:[]};draw()};
$("pm-go").onclick=()=>{const p=T.pm;if(p.run){p.left=p.end-Date.now();p.run=0}else{p.end=Date.now()+p.left;p.run=1}draw()};
$("pm-rs").onclick=()=>{T.pm={run:0,left:1500000,end:0,w:1};draw()};
function draw(){const c=T.cd;let l=c.run?c.end-Date.now():c.left;
if(c.run&&l<=0){c.run=0;c.left=-1;l=0;beep()}
$("cd-d").textContent=fmt(c.run?l:c.left<0?0:(c.left||base()));
const s=T.sw,ms=s.run?s.el+Date.now()-s.st:s.el;$("sw-d").textContent=f2(ms);
$("sw-l").innerHTML=s.laps.map((x,i)=>`<li><span>دور ${i+1}</span><b dir="ltr">${f2(x)}</b></li>`).reverse().join("");
const p=T.pm;let r=p.run?p.end-Date.now():p.left;
if(p.run&&r<=0){beep();p.w=!p.w;p.left=r=pmLen();p.end=Date.now()+r}
$("pm-d").textContent=fmt(r);$("pm-m").textContent=p.w?"زمان تمرکز":"استراحت"}
setInterval(draw,200);draw();
document.querySelectorAll("[data-tb]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-tb]").forEach(x=>x.classList.toggle("on",x==b));document.querySelectorAll(".tp").forEach(t=>t.style.display=t.id=="tp-"+b.dataset.tb?"block":"none")});
