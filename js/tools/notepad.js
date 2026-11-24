// Notepad
let notes=ld("nb",[]),cur=null;
function nList(){$("n-list").innerHTML=notes.map(n=>`<button class="ghost${n.id==cur?" on":""}" data-id="${n.id}">${esc(n.t||"بدون عنوان")}</button>`).join("")||'<small style="color:var(--mut)">هنوز یادداشتی نیست</small>'}
function nOpen(id){cur=id;const n=notes.find(x=>x.id==id);$("n-ed").style.display=n?"block":"none";if(n){$("n-t").value=n.t;$("n-b").value=n.b}nList()}
$("n-new").onclick=()=>{const n={id:Date.now(),t:"",b:""};notes.unshift(n);sv("nb",notes);nOpen(n.id)};
$("n-list").onclick=e=>{const b=e.target.closest("[data-id]");if(b)nOpen(b.dataset.id)};
const nUp=()=>{const n=notes.find(x=>x.id==cur);if(n){n.t=$("n-t").value;n.b=$("n-b").value;sv("nb",notes);nList()}};
$("n-t").oninput=nUp;$("n-b").oninput=nUp;
$("n-del").onclick=()=>{notes=notes.filter(x=>x.id!=cur);sv("nb",notes);nOpen(null)};nList();
