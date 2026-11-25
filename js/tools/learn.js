// Language learning
const LV=["A1","A2","B1","B2"],DAYS=["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],ORD=[6,0,1,2,3,4,5];
const QZ=[["She ___ a student.",["is","are","am"],0],["What is the opposite of “big”?",["small","tall","long"],0],["I ___ coffee every morning.",["drink","drinks","drinking"],0],
["Yesterday we ___ to the park.",["go","went","gone"],1],["There aren't ___ eggs in the fridge.",["some","any","a"],1],["She is ___ than her sister.",["tall","taller","tallest"],1],
["If it rains tomorrow, we ___ at home.",["stay","will stay","stayed"],1],["I've lived here ___ 2019.",["for","since","from"],1],["The report ___ by the manager yesterday.",["was written","wrote","is writing"],0],
["Had I known, I ___ you.",["would tell","would have told","told"],1],["He insisted ___ paying for dinner.",["on","to","for"],0],["The meeting was called ___ due to the storm.",["off","out","down"],0]];
const LESS={A1:[["سلام و معرفی","hello=سلام|goodbye=خداحافظی|name=نام|friend=دوست|please=لطفاً"],["اعداد و رنگ‌ها","one=یک|two=دو|red=قرمز|blue=آبی|green=سبز"],["خانواده","mother=مادر|father=پدر|sister=خواهر|brother=برادر|child=کودک"],["غذا و نوشیدنی","water=آب|bread=نان|milk=شیر|apple=سیب|rice=برنج"]],
A2:[["سفر","ticket=بلیت|airport=فرودگاه|hotel=هتل|map=نقشه|luggage=چمدان"],["خرید","price=قیمت|cheap=ارزان|expensive=گران|discount=تخفیف|receipt=رسید"],["سلامت","doctor=پزشک|medicine=دارو|headache=سردرد|healthy=سالم|hospital=بیمارستان"],["کار","job=شغل|office=دفتر|meeting=جلسه|salary=حقوق|boss=رئیس"]],
B1:[["احساسات","nervous=مضطرب|proud=سربلند|disappointed=ناامید|relieved=آسوده‌خاطر|curious=کنجکاو"],["محیط‌زیست","pollution=آلودگی|recycle=بازیافت کردن|climate=اقلیم|resource=منبع|protect=محافظت کردن"],["فناوری","device=دستگاه|software=نرم‌افزار|upload=بارگذاری کردن|password=رمز عبور|network=شبکه"],["تحصیل","lecture=سخنرانی|assignment=تکلیف|deadline=مهلت|research=پژوهش|graduate=فارغ‌التحصیل شدن"]],
B2:[["بحث و استدلال","argue=بحث کردن|opinion=نظر|evidence=مدرک|conclude=نتیجه گرفتن|assume=فرض کردن"],["اقتصاد","inflation=تورم|invest=سرمایه‌گذاری کردن|profit=سود|budget=بودجه|debt=بدهی"],["جامعه","opportunity=فرصت|inequality=نابرابری|policy=سیاست|community=جامعه|influence=تأثیر"],["صفت‌های پیشرفته","reluctant=بی‌میل|inevitable=اجتناب‌ناپذیر|considerable=قابل‌توجه|ambiguous=مبهم|resilient=مقاوم"]]};
const ST=Object.assign({level:null,lesson:0,mode:"daily",days:[6,1,3],log:{}},ld("learn",{}));let lnQ=null;
const lnSave=()=>sv("learn",ST),lnDay=d=>d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),lnWords=(l,i)=>LESS[l][i][1].split("|").map(x=>x.split("="));
const lnStudy=d=>ST.mode=="daily"||(ST.mode=="weekly"?ST.days[0]==d.getDay():ST.days.includes(d.getDay()));
function lnNext(){for(let i=1;i<=7;i++){const d=new Date();d.setDate(d.getDate()+i);if(lnStudy(d))return DAYS[d.getDay()]}return"—"}
function lnView(){const b=$("ln-box");
if(lnQ){const q=lnQ.items[lnQ.i];b.innerHTML=`<div class="out"><b>${lnQ.kind=="place"?"آزمون تعیین سطح":"تمرین درس"} · سؤال ${lnQ.i+1} از ${lnQ.items.length}</b><div style="font-size:1.15rem;margin:10px 0;${q.ltr?"direction:ltr;text-align:left":""}">${esc(q.q)}</div>${q.o.map((o,k)=>`<button class="ghost" data-a="ans" data-k="${k}" style="display:block;width:100%;direction:ltr;text-align:left;margin:6px 0">${esc(o)}</button>`).join("")}</div>`;return}
if(!ST.level){b.innerHTML='<p>یک آزمون کوتاه ۱۲ سؤالی می‌دهید تا سطح انگلیسی‌تان (A1 تا B2) مشخص شود و درس‌ها از همان سطح شروع شوند.</p><button class="btn" data-a="place">شروع آزمون تعیین سطح</button>';return}
const td=new Date(),L=ST.level,ls=LESS[L],cur=ls[ST.lesson],study=lnStudy(td),done=ST.log[lnDay(td)];
let h=`<div class="out">سطح شما: <b>${L}</b> · درس ${ST.lesson+1} از ${ls.length} · روزهای تمرین‌شده: <b>${Object.keys(ST.log).length}</b></div><div class="row"><div><label>برنامه‌ی یادگیری</label><select id="ln-m"><option value="daily">روزانه</option><option value="days">روزهای مشخص هفته</option><option value="weekly">هفته‌ای یک بار</option></select></div>`;
h+=ST.mode=="days"?`<div style="flex:3 1 260px"><label>روزها</label>${ORD.map(d=>`<label style="display:inline-flex;gap:4px;margin-inline-end:10px;color:var(--fg)"><input type="checkbox" data-a="day" data-d="${d}" ${ST.days.includes(d)?"checked":""}>${DAYS[d]}</label>`).join("")}</div>`:ST.mode=="weekly"?`<div><label>روز هفته</label><select id="ln-d">${ORD.map(d=>`<option value="${d}" ${ST.days[0]==d?"selected":""}>${DAYS[d]}</option>`).join("")}</select></div>`:"";
h+="</div>";
h+=study&&!done?`<div class="out"><b>درس امروز: ${cur[0]}</b><ul>${lnWords(L,ST.lesson).map(([e,f])=>`<li><b dir="ltr">${e}</b><span>${f}</span></li>`).join("")}</ul><button class="btn" data-a="quiz">شروع تمرین (۵ سؤال)</button></div>`:`<div class="out">${done?"درس امروز را انجام داده‌اید. آفرین!":"امروز روز تمرین شما نیست."} جلسه‌ی بعدی: <b>${lnNext()}</b><br><button class="ghost" data-a="quiz" style="margin-top:8px">تمرین اضافه (درس ${ST.lesson+1})</button></div>`;
h+='<button class="ghost" data-a="place">آزمون تعیین سطح دوباره</button>';b.innerHTML=h;$("ln-m").value=ST.mode}
function lnEnd(){const q=lnQ,b=$("ln-box");lnQ=null;
if(q.kind=="place"){let lv=0;for(let i=0;i<4;i++){if(q.res.slice(i*3,i*3+3).filter(Boolean).length>=2)lv=i;else break}ST.level=LV[lv];ST.lesson=0;lnSave();
b.innerHTML=`<div class="out">سطح شما: <b>${LV[lv]}</b> (${q.score} پاسخ درست از ۱۲)<br>درس‌ها از همین سطح شروع می‌شوند.</div><button class="btn" data-a="home">انتخاب برنامه‌ی یادگیری و شروع</button>`;return}
let msg=`نتیجه: ${q.score} از ${q.items.length}. `;
if(q.score>=3){ST.log[lnDay(new Date())]=1;const ls=LESS[ST.level];if(ST.lesson<ls.length-1)ST.lesson++;else if(LV.indexOf(ST.level)<3){ST.level=LV[LV.indexOf(ST.level)+1];ST.lesson=0;msg+="این سطح را تمام کردید و سطح بعدی باز شد. "}else ST.lesson=0;lnSave();msg+="درس بعدی باز شد."}
else msg+="برای رفتن به درس بعد حداقل ۳ پاسخ درست لازم است؛ دوباره تلاش کنید.";
b.innerHTML=`<div class="out">${msg}</div><button class="btn" data-a="home">ادامه</button>`}
$("ln-box").onclick=e=>{const a=e.target.closest("[data-a]");if(!a)return;const k=a.dataset.a;
if(k=="place"){lnQ={kind:"place",i:0,score:0,res:[],items:QZ.map(([q,o,c])=>({q,o,c,ltr:1}))};lnView()}
else if(k=="quiz"){const pool=LV.flatMap(l=>LESS[l].flatMap((_,j)=>lnWords(l,j))).map(x=>x[0]),sh=x=>x.sort(()=>Math.random()-.5);
lnQ={kind:"lesson",i:0,score:0,res:[],items:lnWords(ST.level,ST.lesson).map(([en,fa])=>{const o=sh([en,...sh(pool.filter(x=>x!=en)).slice(0,2)]);return{q:"معنی «"+fa+"» کدام است؟",o,c:o.indexOf(en)}})};lnView()}
else if(k=="ans"){const q=lnQ.items[lnQ.i],ok=+a.dataset.k==q.c;lnQ.res.push(ok);if(ok)lnQ.score++;lnQ.i++;lnQ.i>=lnQ.items.length?lnEnd():lnView()}
else if(k=="home")lnView();
else if(k=="day"){const d=+a.dataset.d;ST.days=a.checked?[...new Set([...ST.days,d])]:ST.days.filter(x=>x!=d);lnSave();lnView()}};
$("ln-box").onchange=e=>{if(e.target.id=="ln-m"){ST.mode=e.target.value;if(ST.mode=="weekly")ST.days=[ST.days[0]==null?1:ST.days[0]];lnSave();lnView()}else if(e.target.id=="ln-d"){ST.days=[+e.target.value];lnSave();lnView()}};lnView();
