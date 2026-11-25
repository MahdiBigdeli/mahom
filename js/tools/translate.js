// Translator
const TL=[["fa","فارسی"],["en","English"],["tr","Türkçe"],["ar","العربية"],["ru","Русский"],["de","Deutsch"],["fr","Français"],["es","Español"]];
TL.forEach(([c,n])=>{$("tr-f").add(new Option(n,c));$("tr-t").add(new Option(n,c))});$("tr-t").value="en";
const PB=[["سلام","Hello"],["خداحافظ","Goodbye"],["ممنون","Thank you"],["لطفاً","Please"],["بله","Yes"],["نه","No"],["ببخشید","Excuse me"],["چقدر؟","How much?"],["کمک","Help"],["آب","Water"],["غذا","Food"],["دستشویی کجاست؟","Where is the restroom?"],["اسم شما چیست؟","What is your name?"],["من متوجه نمی‌شوم","I don't understand"],["صبح بخیر","Good morning"],["شب بخیر","Good night"],["دوستت دارم","I love you"],["فرودگاه","Airport"],["بیمارستان","Hospital"],["هتل","Hotel"]];
let trObj=null,trKey="";
async function trGo(){const f=$("tr-f").value,t=$("tr-t").value,x=$("tr-i").value.trim(),o=$("tr-o"),st=$("tr-s");st.textContent="";if(!x){o.textContent="";return}if(f==t){o.textContent=x;return}
const pb=PB.find(([a,b])=>f=="fa"&&t=="en"?nz(a)==nz(x):f=="en"&&t=="fa"?b.toLowerCase()==x.toLowerCase():0);
if(pb){o.textContent=f=="fa"?pb[1]:pb[0];st.textContent="از عبارات آماده‌ی آفلاین.";return}
if(self.Translator){try{const av=await Translator.availability({sourceLanguage:f,targetLanguage:t});
if(av!="unavailable"){st.textContent=av=="available"?"در حال ترجمه با مدل داخلی مرورگر…":"در حال دانلود مدل زبان (فقط بار اول، نیازمند اینترنت)…";const k=f+t;if(trKey!=k){trObj=await Promise.race([Translator.create({sourceLanguage:f,targetLanguage:t}),new Promise((_,r)=>setTimeout(()=>r(new Error("timeout")),25000))]);trKey=k}
o.textContent=await trObj.translate(x);st.textContent="ترجمه با مدل داخلی مرورگر؛ پس از دانلود مدل، بدون اینترنت هم کار می‌کند.";return}}catch(e){}}
o.textContent="مرورگر شما این جفت زبان را به‌صورت داخلی ترجمه نمی‌کند. در این حالت فقط عبارات آماده‌ی فارسی ↔ انگلیسی (مثل «سلام») بدون اینترنت ترجمه می‌شوند. برای ترجمه‌ی آزاد از نسخه‌ی جدید Chrome روی رایانه استفاده کنید."}
$("tr-go").onclick=trGo;$("tr-sw").onclick=()=>{const a=$("tr-f").value;$("tr-f").value=$("tr-t").value;$("tr-t").value=a;const o=$("tr-o").textContent;if(o&&!o.startsWith("مرورگر"))$("tr-i").value=o;trGo()};
$("tr-cp").onclick=async()=>{if(await copyText($("tr-o").textContent)){$("tr-cp").textContent="کپی شد";setTimeout(()=>$("tr-cp").textContent="کپی",1200)}};
