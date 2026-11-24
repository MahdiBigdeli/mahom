const $=id=>document.getElementById(id);
{const f=document.createElement("link");f.rel="stylesheet";f.href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;800&display=swap";document.head.appendChild(f)}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ld=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const P={logo:'<path d="M3 9h18v11H3zM9 9V6h6v3M3 14h18"/>',
notepad:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
compress:'<path d="M4 4l6 6M10 5v5H5M20 20l-6-6M14 19v-5h5"/>',
pdf:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
distance:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8 17c6 0 2-9 8-9"/>',
invoice:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
wheel:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7M12 14v7M3 12h7M14 12h7"/>',
checklist:'<path d="M4 6l2 2 3-3M4 14l2 2 3-3M12 7h8M12 15h8"/>'};
const ICONS={};
const svg=(k,s=26)=>ICONS[k]?`<img src="${ICONS[k]}" width="${s}" height="${s}" alt="">`:`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg>`;
document.querySelectorAll("[data-i]").forEach(e=>e.innerHTML=svg(e.dataset.i));
const TOOLS=[["notepad","دفترچه یادداشت","یادداشت‌های سریع با ذخیره‌سازی آفلاین در مرورگر","یادداشت متن"],
["timer","تایمر","معکوس، کرنومتر با ثبت دور و پومودورو با هشدار صوتی","تایمر کرنومتر پومودورو زمان"],
["compress","کاهش حجم عکس","حجم عکس‌ها را از یک‌جا کم کنید","فشرده سازی عکس حجم تصویر"],
["pdf","پی‌دی‌اف‌ساز","ساخت PDF از متن، جدول و عکس با فونت فارسی","pdf پی دی اف"],
["distance","فاصله‌یاب شهرها","فاصله تقریبی جاده‌ای و زمان رانندگی بین شهرهای ایران","فاصله شهر مسافت"],
["invoice","ساخت فاکتور","فاکتور، پیش‌فاکتور و رسید آماده‌ی چاپ با مالیات و تخفیف","فاکتور رسید مالیات"],
["wheel","گردونه شانس","انتخاب تصادفی، قرعه‌کشی و تصمیم‌گیری","قرعه کشی شانس تصادفی"],
["checklist","چک‌لیست","مدیریت وظایف و کارهای روزانه با ذخیره‌سازی آفلاین","وظایف کار لیست"]];
const nz=s=>s.toLowerCase().replace(/ي/g,"ی").replace(/ك/g,"ک").replace(/[\u200c\u064b-\u065f]/g,"").replace(/\s+/g," ").trim();
const grid=$("grid");
function flip(fn){const cs=[...grid.querySelectorAll(".card")],a=new Map(cs.map(c=>[c,c.getBoundingClientRect()]));fn();cs.forEach(c=>{if(c.style.display=="none")return;const r=c.getBoundingClientRect(),o=a.get(c);if(!o.width){c.animate([{opacity:0,transform:"scale(.9)"},{opacity:1,transform:"none"}],{duration:300});return}const dx=o.left-r.left,dy=o.top-r.top;if(dx||dy)c.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}],{duration:300,easing:"ease"})})}
TOOLS.forEach(t=>{const a=document.createElement("a");a.className="card";a.href="#"+t[0];a.dataset.k=nz(t[1]+" "+t[2]+" "+t[3]);
a.innerHTML=`<span class="ic">${svg(t[0])}</span><h3>${t[1]}</h3><p>${t[2]}</p>`;grid.appendChild(a)});
$("q").oninput=e=>{const w=nz(e.target.value).split(" ").filter(Boolean),on=w.length>0;let n=0;flip(()=>grid.querySelectorAll(".card").forEach(c=>{const s=w.every(x=>c.dataset.k.includes(x));c.style.display=s?"":"none";if(s)n++}));
$("sec-t").textContent=on?"نتایج جستجو":"خدمات";$("bn").classList.toggle("off",on);$("empty").style.display=n?"none":"block";popDraw()};
const POP_MIN=20;let uses=ld("uses",{});
function hit(id){uses[id]=(uses[id]||0)+1;sv("uses",uses)}
function popDraw(){const best=TOOLS.filter(t=>(uses[t[0]]||0)>=POP_MIN).sort((a,b)=>uses[b[0]]-uses[a[0]]).slice(0,4);$("pop").style.display=best.length?"block":"none";$("pop").classList.toggle("off",!!$("q").value.trim());$("popg").innerHTML=best.map(t=>`<a class="card" href="#${t[0]}"><span class="ic">${svg(t[0])}</span><h3>${t[1]}</h3><p>${t[2]}</p></a>`).join("")}
function route(){const sec=$("t-"+location.hash.slice(1));if(sec)hit(location.hash.slice(1));popDraw();document.querySelectorAll(".tool").forEach(s=>s.style.display="none");$("home").style.display=sec?"none":"block";if(sec)sec.style.display="block";scrollTo(0,0)}
addEventListener("hashchange",route);route();
document.querySelectorAll("[data-home]").forEach(b=>b.onclick=()=>{location.hash="";route()});

const printHtml=h=>{$("pa").innerHTML=h;window.print()};
const fa=n=>Math.round(n).toLocaleString("fa-IR");
const dg=s=>String(s).replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/\D/g,"");
function money(el){const pos=el.selectionStart,right=dg(el.value.slice(pos)).length,n=+dg(el.value)||0;el.value=n?fa(n):"";let i=el.value.length,c=0;while(i>0&&c<right){i--;if(dg(el.value[i]))c++}el.setSelectionRange(i,i);return n}
function words(n){if(!n)return"صفر";const u=["","یک","دو","سه","چهار","پنج","شش","هفت","هشت","نه","ده","یازده","دوازده","سیزده","چهارده","پانزده","شانزده","هفده","هجده","نوزده"],t=["","","بیست","سی","چهل","پنجاه","شصت","هفتاد","هشتاد","نود"],h=["","صد","دویست","سیصد","چهارصد","پانصد","ششصد","هفتصد","هشتصد","نهصد"],g=["","هزار","میلیون","میلیارد","تریلیون"];
const tri=x=>{const a=[];if(x>=100)a.push(h[Math.floor(x/100)]);x%=100;if(x>=20){a.push(t[Math.floor(x/10)]);if(x%10)a.push(u[x%10])}else if(x)a.push(u[x]);return a.join(" و ")};
const p=[];let i=0;while(n>0){const x=n%1000;if(x)p.unshift(tri(x)+(g[i]?" "+g[i]:""));n=Math.floor(n/1000);i++}return p.join(" و ")}
async function saveFile(name,data){let d=null;try{d=window.claude&&await claude.use("downloads")}catch(e){}
if(d){try{await d.save({filename:name,data})}catch(e){}return}
const a=document.createElement("a");a.href=URL.createObjectURL(data instanceof Blob?data:new Blob([data]));a.download=name;document.body.appendChild(a);a.click();a.remove()}
