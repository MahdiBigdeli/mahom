let notes=ld("nb",[]),cur=null,dc=0;
function nList(){const q=nz($("n-s").value);$("n-list").innerHTML=notes.filter(n=>!q||nz(n.t+" "+n.b).includes(q)).map(n=>`<button class="ghost${n.id==cur?" on":""}" data-id="${n.id}">${esc(n.t||"بدون عنوان")}</button>`).join("")||'<small style="color:var(--mut)">یادداشتی پیدا نشد</small>'}
function nInfo(){const n=notes.find(x=>x.id==cur);if(n)$("n-i").textContent=`${(n.b.trim().match(/\S+/g)||[]).length} کلمه · ${n.b.length} کاراکتر · ذخیره‌شده ${new Date(n.u||n.id).toLocaleTimeString("fa-IR",{hour:"2-digit",minute:"2-digit"})}`}
function nOpen(id){cur=id;const n=notes.find(x=>x.id==id);$("n-ed").style.display=n?"block":"none";if(n){$("n-t").value=n.t;$("n-b").value=n.b;nInfo()}nList()}
const nTxt=n=>(n.t?n.t+"\n\n":"")+n.b,nCur=()=>notes.find(x=>x.id==cur);
$("n-new").onclick=()=>{const n={id:Date.now(),t:"",b:"",u:Date.now()};notes.unshift(n);sv("nb",notes);nOpen(n.id);$("n-t").focus()};
$("n-list").onclick=e=>{const b=e.target.closest("[data-id]");if(b)nOpen(b.dataset.id)};
const nUp=()=>{const n=nCur();if(n){n.t=$("n-t").value;n.b=$("n-b").value;n.u=Date.now();sv("nb",notes);nList();nInfo()}};
$("n-t").oninput=nUp;$("n-b").oninput=nUp;$("n-s").oninput=nList;
$("n-cp").onclick=async()=>{const n=nCur();if(!n)return;try{await navigator.clipboard.writeText(nTxt(n));$("n-cp").textContent="کپی شد";setTimeout(()=>$("n-cp").textContent="کپی",1200)}catch(e){}};
$("n-dl").onclick=()=>{const n=nCur();if(n)saveFile((n.t||"note").replace(/[\\/:*?"<>|]/g,"")+".txt",nTxt(n))};
$("n-del").onclick=()=>{if(!dc){dc=1;$("n-del").textContent="تأیید حذف";setTimeout(()=>{dc=0;$("n-del").textContent="حذف"},3000);return}
notes=notes.filter(x=>x.id!=cur);sv("nb",notes);dc=0;$("n-del").textContent="حذف";nOpen(null)};nList();
