// Image compressor
$("fc-q").oninput=e=>$("fc-qv").textContent=e.target.value;
$("fc-in").onchange=async e=>{const out=$("fc-out");out.innerHTML="";const q=+$("fc-q").value/100,mw=+$("fc-w").value,kb=n=>(n/1024).toFixed(1)+" KB";
for(const f of e.target.files){const d=document.createElement("div");d.className="out";out.append(d);
if(!f.type.startsWith("image/")){d.textContent=f.name+" — فعلاً فقط عکس پشتیبانی می‌شود";continue}
try{const im=await createImageBitmap(f);let w=im.width,h=im.height;if(mw&&w>mw){h=Math.round(h*mw/w);w=mw}
const cv=document.createElement("canvas");cv.width=w;cv.height=h;const x=cv.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(im,0,0,w,h);
const b=await new Promise(r=>cv.toBlob(r,"image/jpeg",q));const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=f.name.replace(/\.\w+$/,"")+"-min.jpg";a.textContent="دانلود";a.style.color="var(--ac)";
d.innerHTML=`${esc(f.name)}: ${kb(f.size)} ← ${kb(b.size)} (${Math.round((1-b.size/f.size)*100)}٪ کمتر) · `;d.append(a)}catch(err){d.textContent=f.name+" — خطا در پردازش"}}};
