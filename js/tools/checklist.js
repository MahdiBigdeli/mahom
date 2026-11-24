let todos=ld("todos",[]),flt="all";
function ckDraw(){const d=todos.filter(x=>x.d).length;
$("ck-l").innerHTML=todos.map((x,i)=>({x,i})).filter(({x})=>flt=="all"||(flt=="done")==!!x.d).map(({x,i})=>`<li><label><input type="checkbox" data-c="${i}" ${x.d?"checked":""}><span data-e="${i}" class="${x.d?"dn":""}">${esc(x.t)}</span></label><button class="ghost" data-x="${i}">✕</button></li>`).join("")||'<li style="color:var(--mut)">موردی نیست</li>';
$("ck-p").textContent=todos.length?`${d} از ${todos.length} انجام شد`:"هنوز کاری اضافه نشده";$("ck-b").style.width=todos.length?d/todos.length*100+"%":"0";
document.querySelectorAll("[data-fl]").forEach(b=>b.classList.toggle("on",b.dataset.fl==flt))}
function ckAdd(){const v=$("ck-i").value.trim();if(!v)return;todos.push({t:v,d:0});$("ck-i").value="";sv("todos",todos);ckDraw()}
$("ck-add").onclick=ckAdd;$("ck-i").onkeydown=e=>{if(e.key=="Enter")ckAdd()};
document.querySelectorAll("[data-fl]").forEach(b=>b.onclick=()=>{flt=b.dataset.fl;ckDraw()});
$("ck-clr").onclick=()=>{todos=todos.filter(x=>!x.d);sv("todos",todos);ckDraw()};
$("ck-l").onclick=e=>{const c=e.target.dataset;if(c.c!=null)todos[c.c].d=e.target.checked?1:0;else if(c.x!=null)todos.splice(c.x,1);else return;sv("todos",todos);ckDraw()};
$("ck-l").ondblclick=e=>{const sp=e.target.closest("span[data-e]");if(!sp)return;const i=+sp.dataset.e,inp=document.createElement("input");inp.type="text";inp.value=todos[i].t;sp.replaceWith(inp);inp.focus();
inp.onblur=()=>{if(inp.value.trim())todos[i].t=inp.value.trim();sv("todos",todos);ckDraw()};inp.onkeydown=ev=>{if(ev.key=="Enter")inp.blur()}};ckDraw();
