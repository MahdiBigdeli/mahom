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
checklist:'<path d="M4 6l2 2 3-3M4 14l2 2 3-3M12 7h8M12 15h8"/>',
translate:'<path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 3-3 6-6 8M13 21l4-10 4 10M14.5 18h5"/>',
learn:'<path d="M3 8l9-4 9 4-9 4zM7 10.5V15c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5M21 8v6"/>',
prompts:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>'};
const ICONS={logo:"assets/logo.webp"};
const svg=(k,s=26)=>ICONS[k]?`<img src="${ICONS[k]}" width="${s}" height="${s}" alt="">`:`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg>`;
document.querySelectorAll("[data-i]").forEach(e=>e.innerHTML=svg(e.dataset.i));
const TOOLS=[["notepad","دفترچه یادداشت","یادداشت‌های سریع با ذخیره‌سازی آفلاین در مرورگر","یادداشت متن note","Quick notes saved offline in your browser"],
["timer","تایمر","معکوس، کرنومتر با ثبت دور و پومودورو با هشدار صوتی","تایمر کرنومتر پومودورو زمان","Countdown, stopwatch with laps and Pomodoro"],
["compress","کاهش حجم عکس و PDF","حجم عکس‌ها و فایل‌های PDF را از یک‌جا کم کنید","فشرده سازی عکس حجم تصویر pdf","Shrink images and PDF files in one place"],
["pdf","پی‌دی‌اف‌ساز","ساخت PDF از متن، جدول و عکس با فونت فارسی","pdf پی دی اف","Build a PDF from text, tables and images"],
["distance","فاصله‌یاب شهرها","فاصله تقریبی جاده‌ای و زمان رانندگی بین شهرهای ایران","فاصله شهر مسافت","Approximate road distance and drive time between Iranian cities"],
["invoice","ساخت فاکتور","فاکتور، پیش‌فاکتور و رسید آماده‌ی چاپ با مالیات و تخفیف","فاکتور رسید مالیات","Print-ready invoices, quotes and receipts"],
["wheel","گردونه شانس","انتخاب تصادفی، قرعه‌کشی و تصمیم‌گیری","قرعه کشی شانس تصادفی","Random picks, draws and decisions"],
["checklist","چک‌لیست","مدیریت وظایف و کارهای روزانه با ذخیره‌سازی آفلاین","وظایف کار لیست todo","Manage daily tasks with offline storage"],
["translate","مترجم آفلاین","ترجمه‌ی متن با مترجم داخلی مرورگر؛ پس از دانلود مدل بدون اینترنت","ترجمه مترجم translate","Translate text with the browser's on-device translator"],
["learn","آموزش زبان","آزمون تعیین سطح و درس‌های انگلیسی با برنامه‌ی روزانه یا هفتگی","آموزش زبان انگلیسی درس سطح learn","English placement test and a daily or weekly study plan"],
["prompts","پرامپت ساخت عکس","پرامپت‌های آماده برای ساخت عکس با هوش مصنوعی؛ کپی و استفاده","پرامپت هوش مصنوعی عکس prompt ai","Ready-made prompts for AI image generation"]];
let lang=ld("lang","fa");const RTL=["fa","ar"];
const I18N={fa:{ph:"جستجوی ابزار… (مثلاً تایمر، فاکتور، فاصله)",all:"همه‌ی ابزارها",svc:"خدمات",pop:"پرکاربردترین‌ها",res:"نتایج جستجو",back:"بازگشت",none:"ابزاری پیدا نشد.",up:"بازگشت به بالا",brand:"جعبه ابزار",foot:"مجموعه‌ای از ابزارهای آنلاین کاربردی که همه‌چیز را روی دستگاه شما اجرا می‌کنند.",tools:"ابزارها",about:"درباره",a1:"رایگان و بدون نیاز به ثبت‌نام",a2:"داده‌ها فقط در مرورگر شما ذخیره می‌شوند",a3:"مناسب موبایل و دسکتاپ"},
en:{ph:"Search tools… (e.g. timer, invoice, distance)",all:"All tools",svc:"Services",pop:"Most used",res:"Search results",back:"Back",none:"No tool found.",up:"Back to top",brand:"Toolbox",foot:"A set of handy online tools that run entirely on your device.",tools:"Tools",about:"About",a1:"Free, no sign-up needed",a2:"Your data stays in your browser",a3:"Works on mobile and desktop"},
tr:{ph:"Araç ara… (ör. zamanlayıcı, fatura, mesafe)",all:"Tüm araçlar",svc:"Hizmetler",pop:"En çok kullanılanlar",res:"Arama sonuçları",back:"Geri",none:"Araç bulunamadı.",up:"Başa dön",brand:"Araç Kutusu",foot:"Tamamen cihazınızda çalışan pratik çevrimiçi araçlar.",tools:"Araçlar",about:"Hakkında",a1:"Ücretsiz, kayıt gerekmez",a2:"Verileriniz tarayıcınızda kalır",a3:"Mobil ve masaüstüyle uyumlu"},
ar:{ph:"ابحث عن أداة… (مثل المؤقت، الفاتورة، المسافة)",all:"كل الأدوات",svc:"الخدمات",pop:"الأكثر استخدامًا",res:"نتائج البحث",back:"رجوع",none:"لم يتم العثور على أداة.",up:"العودة للأعلى",brand:"صندوق الأدوات",foot:"مجموعة أدوات عملية عبر الإنترنت تعمل بالكامل على جهازك.",tools:"الأدوات",about:"حول",a1:"مجاني دون حاجة للتسجيل",a2:"بياناتك تبقى في متصفحك",a3:"مناسب للجوال وسطح المكتب"},
az:{ph:"Alət axtar… (məs. taymer, faktura, məsafə)",all:"Bütün alətlər",svc:"Xidmətlər",pop:"Ən çox istifadə olunanlar",res:"Axtarış nəticələri",back:"Geri",none:"Alət tapılmadı.",up:"Yuxarı qayıt",brand:"Alət qutusu",foot:"Tamamilə cihazınızda işləyən faydalı onlayn alətlər.",tools:"Alətlər",about:"Haqqında",a1:"Pulsuz, qeydiyyat tələb olunmur",a2:"Məlumatlarınız brauzerinizdə qalır",a3:"Mobil və kompüter üçün uyğundur"}};
const NAMES={en:["Notepad","Timer","Image & PDF compressor","PDF maker","City distance","Invoice maker","Wheel of fortune","Checklist","Offline translator","Language learning","AI image prompts"],
tr:["Not defteri","Zamanlayıcı","Görsel ve PDF küçültme","PDF oluşturucu","Şehir mesafesi","Fatura oluşturucu","Şans çarkı","Yapılacaklar listesi","Çevrimdışı çevirmen","Dil öğrenme","Yapay zekâ görsel promptları"],
ar:["المفكرة","المؤقت","ضغط الصور وPDF","منشئ PDF","المسافة بين المدن","إنشاء فاتورة","عجلة الحظ","قائمة المهام","المترجم دون اتصال","تعلّم اللغة","أوامر صور الذكاء الاصطناعي"],
az:["Qeyd dəftəri","Taymer","Şəkil və PDF sıxma","PDF yaradıcı","Şəhərlər arası məsafə","Faktura yaradıcı","Şans çarxı","Tapşırıq siyahısı","Oflayn tərcüməçi","Dil öyrənmə","Süni intellekt şəkil promptları"]};
const tt=k=>(I18N[lang]||I18N.fa)[k]||I18N.fa[k];
const tix=id=>TOOLS.findIndex(t=>t[0]==id),nm=id=>(NAMES[lang]||[])[tix(id)]||TOOLS[tix(id)][1],ds=id=>lang=="fa"?TOOLS[tix(id)][2]:TOOLS[tix(id)][4];
function applyLang(){const rtl=RTL.includes(lang),h=document.documentElement;h.lang=lang;h.dir=rtl?"rtl":"ltr";
document.querySelectorAll("[data-t]").forEach(e=>e.textContent=tt(e.dataset.t));$("q").placeholder=tt("ph");
grid.querySelectorAll(".card").forEach(c=>{c.querySelector("h3").textContent=nm(c.dataset.id);c.querySelector("p").textContent=ds(c.dataset.id)});
document.querySelectorAll(".tool").forEach(t=>{const x=t.querySelector("h2 span");if(x)x.textContent=nm(t.id.slice(2))});
document.querySelectorAll("[data-home]").forEach(b=>b.textContent=(rtl?"→ ":"← ")+tt("back"));
$("ft-tools").innerHTML=TOOLS.map(t=>`<a href="#${t[0]}">${nm(t[0])}</a>`).join("");$("up").textContent=tt("up")+" ↑";
$("sec-t").textContent=tt($("q").value.trim()?"res":"svc");$("lang").value=lang;document.title=tt("brand");popDraw();if(typeof calDraw=="function"){calDraw();$("yr").textContent=pf({year:"numeric"},new Date())}}
const nz=s=>s.toLowerCase().replace(/ي/g,"ی").replace(/ك/g,"ک").replace(/[\u200c\u064b-\u065f]/g,"").replace(/\s+/g," ").trim();
const grid=$("grid");
function flip(fn){const cs=[...grid.querySelectorAll(".card")],a=new Map(cs.map(c=>[c,c.getBoundingClientRect()]));fn();cs.forEach(c=>{if(c.style.display=="none")return;const r=c.getBoundingClientRect(),o=a.get(c);if(!o.width){c.animate([{opacity:0,transform:"scale(.9)"},{opacity:1,transform:"none"}],{duration:300});return}const dx=o.left-r.left,dy=o.top-r.top;if(dx||dy)c.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}],{duration:300,easing:"ease"})})}
TOOLS.forEach((t,ix)=>{const a=document.createElement("a");a.className="card";a.href="#"+t[0];a.dataset.k=nz(t[1]+" "+t[2]+" "+t[3]+" "+Object.values(NAMES).map(a=>a[ix]).join(" "));a.dataset.id=t[0];
a.innerHTML=`<span class="ic">${svg(t[0])}</span><h3>${nm(t[0])}</h3><p>${ds(t[0])}</p>`;grid.appendChild(a)});
$("q").oninput=e=>{const w=nz(e.target.value).split(" ").filter(Boolean),on=w.length>0;let n=0;flip(()=>grid.querySelectorAll(".card").forEach(c=>{const s=w.every(x=>c.dataset.k.includes(x));c.style.display=s?"":"none";if(s)n++}));
$("sec-t").textContent=tt(on?"res":"svc");$("bn").classList.toggle("off",on);$("empty").style.display=n?"none":"block";popDraw()};
const POP_MIN=20;let uses=ld("uses",{});
function hit(id){uses[id]=(uses[id]||0)+1;sv("uses",uses)}
function popDraw(){const best=TOOLS.filter(t=>(uses[t[0]]||0)>=POP_MIN).sort((a,b)=>uses[b[0]]-uses[a[0]]).slice(0,4);$("pop").style.display=best.length?"block":"none";$("pop").classList.toggle("off",!!$("q").value.trim());$("popg").innerHTML=best.map(t=>`<a class="card" href="#${t[0]}"><span class="ic">${svg(t[0])}</span><h3>${nm(t[0])}</h3><p>${ds(t[0])}</p></a>`).join("")}
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
