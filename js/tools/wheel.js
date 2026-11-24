// Wheel
let rot=0,spin=0;
function wDraw(){const o=$("wh-o").value.split("\n").map(s=>s.trim()).filter(Boolean),n=o.length,s=360/n,R=Math.PI/180;let h="";
o.forEach((t,i)=>{const a0=(i*s-90)*R,a1=((i+1)*s-90)*R,col=`hsl(${i*360/n},65%,52%)`;
h+=(n==1?`<circle cx="150" cy="150" r="140" fill="${col}"/>`:`<path d="M150 150L${150+140*Math.cos(a0)} ${150+140*Math.sin(a0)}A140 140 0 ${s>180?1:0} 1 ${150+140*Math.cos(a1)} ${150+140*Math.sin(a1)}Z" fill="${col}" stroke="#fff" stroke-width="2"/>`)+`<text x="225" y="154" text-anchor="middle" font-size="13" fill="#fff" transform="rotate(${(i+.5)*s-90} 150 150)">${esc(t.slice(0,14))}</text>`});
$("wg").innerHTML=h;return o}
$("wh-o").oninput=wDraw;wDraw();
$("wh-go").onclick=()=>{if(spin)return;const o=wDraw();if(!o.length)return;spin=1;$("wh-r").textContent="";const n=o.length,s=360/n,r=Math.floor(Math.random()*n);
rot+=360*5+((360-(r+.5)*s-(rot%360))%360+360)%360;$("wg").style.transform=`rotate(${rot}deg)`;
setTimeout(()=>{$("wh-r").textContent="🎉 "+o[r];spin=0},4100)};
