let fcFiles=[],fcRes=[];const kb=n=>(n/1024).toFixed(1)+" KB";
$("fc-q").oninput=e=>$("fc-qv").textContent=e.target.value;
async function fcRun(files){fcFiles=[...files];const out=$("fc-out");out.innerHTML="";fcRes=[];const q=+$("fc-q").value/100,mw=+$("fc-w").value,ty=$("fc-f").value;let o=0,c=0;
for(const [i,f] of fcFiles.entries()){const d=document.createElement("div");d.className="out row";out.append(d);
if(!f.type.startsWith("image/")){d.textContent=f.name+" — فقط عکس پشتیبانی می‌شود";continue}
try{const im=await createImageBitmap(f);let w=im.width,h=im.height;if(mw&&w>mw){h=Math.round(h*mw/w);w=mw}
const cv=document.createElement("canvas");cv.width=w;cv.height=h;const x=cv.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(im,0,0,w,h);
const b=await new Promise(r=>cv.toBlob(r,ty,q)),ext={"image/jpeg":"jpg","image/webp":"webp","image/png":"png"}[b.type]||"jpg";
fcRes[i]={b,n:f.name.replace(/\.\w+$/,"")+"-min."+ext};o+=f.size;c+=b.size;
d.innerHTML=`<img src="${URL.createObjectURL(b)}" alt="" style="flex:0 0 52px;width:52px;height:52px;object-fit:cover;border-radius:8px"><span style="flex:3 1 180px">${esc(f.name)}<br><small>${kb(f.size)} ← ${kb(b.size)} (${Math.round((1-b.size/f.size)*100)}٪ کمتر)</small></span><button class="ghost" data-k="${i}" style="flex:0 0 auto">دانلود</button>`}catch(err){d.textContent=f.name+" — خطا در پردازش"}}
$("fc-sum").textContent=o?`مجموع: ${kb(o)} ← ${kb(c)} (${Math.round((1-c/o)*100)}٪ صرفه‌جویی)`:""}
$("fc-out").onclick=e=>{const k=e.target.dataset.k;if(k!=null&&fcRes[k])saveFile(fcRes[k].n,fcRes[k].b)};
const dz=$("fc-dz");dz.onclick=()=>$("fc-in").click();dz.ondragover=e=>{e.preventDefault();dz.style.borderColor="var(--ac)"};dz.ondragleave=()=>dz.style.borderColor="";dz.ondrop=e=>{e.preventDefault();dz.style.borderColor="";fcRun(e.dataTransfer.files)};
$("fc-in").onchange=e=>fcRun(e.target.files);["fc-q","fc-w","fc-f"].forEach(i=>$(i).onchange=()=>fcFiles.length&&fcRun(fcFiles));
