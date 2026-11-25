// Image compressor
let fcFiles=[],fcRes=[];const kb=n=>n>=1048576?(n/1048576).toFixed(2)+" MB":(n/1024).toFixed(1)+" KB";
const loadJS=u=>new Promise((res,rej)=>{if(document.querySelector('script[src="'+u+'"]'))return res();const e=document.createElement("script");e.src=u;e.onload=res;e.onerror=()=>rej(new Error("load"));document.head.appendChild(e)});
async function decode(f){if(self.createImageBitmap){try{return await createImageBitmap(f)}catch(e){}}return await new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=URL.createObjectURL(f)})}
async function pdfSmall(f,q,cb){const CD="https://cdnjs.cloudflare.com/ajax/libs/";await loadJS(CD+"pdf.js/3.11.174/pdf.min.js");await loadJS(CD+"pdf.js/3.11.174/pdf.worker.min.js");await loadJS(CD+"jspdf/2.5.1/jspdf.umd.min.js");
pdfjsLib.GlobalWorkerOptions.workerSrc=CD+"pdf.js/3.11.174/pdf.worker.min.js";
const doc=await pdfjsLib.getDocument({data:new Uint8Array(await f.arrayBuffer())}).promise;let out=null;
for(let n=1;n<=doc.numPages;n++){cb(n,doc.numPages);const pg=await doc.getPage(n),v1=pg.getViewport({scale:1}),v=pg.getViewport({scale:.8+q*1.2});
const cv=document.createElement("canvas");cv.width=v.width;cv.height=v.height;const cx=cv.getContext("2d");cx.fillStyle="#fff";cx.fillRect(0,0,cv.width,cv.height);await pg.render({canvasContext:cx,viewport:v}).promise;
const o=v1.width>v1.height?"l":"p";if(!out)out=new jspdf.jsPDF({orientation:o,unit:"pt",format:[v1.width,v1.height]});else out.addPage([v1.width,v1.height],o);
out.addImage(cv.toDataURL("image/jpeg",q),"JPEG",0,0,v1.width,v1.height,undefined,"FAST");cv.width=cv.height=0}
return out.output("blob")}
$("fc-q").oninput=e=>$("fc-qv").textContent=e.target.value;
async function fcRun(files){fcFiles=[...files];const out=$("fc-out"),q=+$("fc-q").value/100,mw=+$("fc-w").value,ty=$("fc-f").value;out.innerHTML="";fcRes=[];let o=0,c=0;
for(const [i,f] of fcFiles.entries()){const d=document.createElement("div");d.className="out row";out.append(d);const isPdf=f.type=="application/pdf"||/\.pdf$/i.test(f.name);
try{let b,ext,thumb="";
if(isPdf){$("fc-sum").textContent="در حال فشرده‌سازی PDF… (بارگذاری کتابخانه‌ها نیازمند اینترنت است)";b=await pdfSmall(f,q,(n,t)=>{$("fc-sum").textContent="PDF: صفحه "+n+" از "+t+"…"});ext="pdf";
if(b.size>=f.size){d.innerHTML=esc(f.name)+"<br><small>حجم این PDF با این کیفیت کمتر نشد؛ کیفیت را پایین‌تر بیاورید.</small>";continue}}
else{const im=await decode(f);let w=im.width||im.naturalWidth,h=im.height||im.naturalHeight;if(mw&&w>mw){h=Math.round(h*mw/w);w=mw}
const cv=document.createElement("canvas");cv.width=w;cv.height=h;const x=cv.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(im,0,0,w,h);
b=await new Promise(r=>cv.toBlob(r,ty,q));ext={"image/jpeg":"jpg","image/webp":"webp","image/png":"png"}[b.type]||"jpg";thumb='<img src="'+URL.createObjectURL(b)+'" alt="" style="flex:0 0 52px;width:52px;height:52px;object-fit:cover;border-radius:8px">'}
if(!isPdf&&b.size>=f.size){d.innerHTML=thumb+esc(f.name)+"<br><small>حجم کمتر نشد (فایل از قبل بهینه است)؛ کیفیت را پایین‌تر بیاورید یا عرض را کم کنید.</small>";continue}
fcRes[i]={b,n:f.name.replace(/\.\w+$/,"")+"-min."+ext};o+=f.size;c+=b.size;
d.innerHTML=thumb+`<span style="flex:3 1 160px">${esc(f.name)}<br><small>${kb(f.size)} ← ${kb(b.size)} (${Math.round((1-b.size/f.size)*100)}٪ کمتر)</small></span><button class="ghost" data-k="${i}" style="flex:0 0 auto">دانلود</button>`}
catch(err){d.textContent=f.name+(isPdf?" — فشرده‌سازی PDF به اینترنت (بارگذاری کتابخانه) نیاز دارد یا فایل خراب است":" — خطا در پردازش")}}
$("fc-sum").textContent=o?`مجموع: ${kb(o)} ← ${kb(c)} (${Math.round((1-c/o)*100)}٪ صرفه‌جویی)`:""}
$("fc-out").onclick=e=>{const k=e.target.dataset.k;if(k!=null&&fcRes[k])saveFile(fcRes[k].n,fcRes[k].b)};
const dz=$("fc-dz");dz.ondragover=e=>{e.preventDefault();dz.style.borderColor="var(--ac)"};dz.ondragleave=()=>dz.style.borderColor="";dz.ondrop=e=>{e.preventDefault();dz.style.borderColor="";fcRun(e.dataTransfer.files)};
$("fc-in").onchange=e=>{const fl=[...e.target.files];e.target.value="";if(fl.length)fcRun(fl)};["fc-q","fc-w","fc-f"].forEach(k=>$(k).onchange=()=>fcFiles.length&&fcRun(fcFiles));
