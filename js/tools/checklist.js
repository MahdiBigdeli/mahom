// Checklist
let todos=ld("todos",[]);
function ckDraw(){$("ck-l").innerHTML=todos.map((x,i)=>`<li><label><input type="checkbox" data-c="${i}" ${x.d?"checked":""}><span class="${x.d?"dn":""}">${esc(x.t)}</span></label><button class="ghost" data-x="${i}">✕</button></li>`).join("");
const d=todos.filter(x=>x.d).length;$("ck-p").textContent=todos.length?`${d} از ${todos.length} انجام شد`:"هنوز کاری اضافه نشده";$("ck-b").style.width=todos.length?d/todos.length*100+"%":"0"}
function ckAdd(){const v=$("ck-i").value.trim();if(!v)return;todos.push({t:v,d:0});$("ck-i").value="";sv("todos",todos);ckDraw()}
$("ck-add").onclick=ckAdd;$("ck-i").onkeydown=e=>{if(e.key=="Enter")ckAdd()};
$("ck-l").onclick=e=>{const c=e.target.dataset;if(c.c!=null)todos[c.c].d=e.target.checked?1:0;else if(c.x!=null)todos.splice(c.x,1);else return;sv("todos",todos);ckDraw()};ckDraw();
