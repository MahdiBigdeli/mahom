const BANNER_SRC="assets/banner.webp";
if(BANNER_SRC)$("bn").innerHTML=`<img src="${BANNER_SRC}" alt="">`;
const pf=(o,d)=>new Intl.DateTimeFormat("fa-IR-u-ca-persian",o).format(d);
const pj=d=>{const p=Object.fromEntries(new Intl.DateTimeFormat("en-u-ca-persian",{day:"numeric",month:"numeric",year:"numeric"}).formatToParts(d).map(x=>[x.type,x.value]));return{d:parseInt(p.day),m:parseInt(p.month)}};
function calDraw(){const n=new Date(),t=pj(n),f=new Date(n.getFullYear(),n.getMonth(),n.getDate()-(t.d-1),12);
let h=["ش","ی","د","س","چ","پ","ج"].map(x=>`<b>${x}</b>`).join("")+"<span></span>".repeat((f.getDay()+1)%7);
for(let k=0;k<31;k++){const d=new Date(f.getFullYear(),f.getMonth(),f.getDate()+k,12);if(pj(d).m!=t.m)break;h+=`<span${k+1==t.d?' class="td"':""}>${(k+1).toLocaleString("fa-IR")}</span>`}
$("cal").innerHTML=h;$("dt").textContent=pf({weekday:"long",day:"numeric",month:"long",year:"numeric"},n)}
let lastDay=-1;
function tick(){const n=new Date();$("clk").textContent=n.toLocaleTimeString("fa-IR",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});if(n.getDate()!=lastDay){lastDay=n.getDate();calDraw()}}
setInterval(tick,1000);tick();
$("ft-tools").innerHTML=TOOLS.map(t=>`<a href="#${t[0]}">${t[1]}</a>`).join("");$("yr").textContent=pf({year:"numeric"},new Date());
const goHome=id=>{try{history.replaceState(null,"",location.pathname+location.search)}catch(e){location.hash=""}route();if(id)setTimeout(()=>$(id).scrollIntoView({behavior:"smooth"}),0)};
$("n-cta").onclick=e=>{e.preventDefault();goHome("sec-t")};$("lg").onclick=()=>goHome();
$("q").addEventListener("focus",()=>{if(location.hash)goHome()});
addEventListener("keydown",e=>{if(e.key=="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();$("q").focus()}});
$("up").onclick=()=>scrollTo({top:0,behavior:"smooth"});
