// Invoice
let inv=Object.assign({type:"فاکتور فروش",no:"1",date:new Date().toLocaleDateString("fa-IR"),seller:"",buyer:"",disc:0,tax:9,items:[{n:"",q:1,p:0}]},ld("inv",{}));
const fa=n=>Math.round(n).toLocaleString("fa-IR");
function ivTot(){const s=inv.items.reduce((a,x)=>a+x.q*x.p,0),d=s*inv.disc/100,t=(s-d)*inv.tax/100;return{s,d,t,g:s-d+t}}
function ivShow(){const x=ivTot();$("iv-t").innerHTML=`جمع: ${fa(x.s)} · تخفیف: ${fa(x.d)} · مالیات: ${fa(x.t)}<br>مبلغ نهایی: ${fa(x.g)} تومان`}
function ivRows(){$("iv-rows").innerHTML=inv.items.map((x,i)=>`<div class="row" data-r="${i}"><input type="text" value="${esc(x.n)}" data-f="n" placeholder="شرح" style="flex:3 1 150px"><input type="number" value="${x.q}" data-f="q" min="0"><input type="text" inputmode="numeric" value="${x.p?fa(x.p):""}" data-f="p" placeholder="قیمت"><button class="ghost" data-x style="flex:0 0 auto">✕</button></div>`).join("");ivShow()}
document.querySelectorAll("[data-k]").forEach(e=>{e.value=inv[e.dataset.k];e.oninput=()=>{inv[e.dataset.k]=e.type=="number"?+e.value:e.value;sv("inv",inv);ivShow()}});
const dg=s=>String(s).replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/\D/g,"");
function money(el){const pos=el.selectionStart,right=dg(el.value.slice(pos)).length,n=+dg(el.value)||0;el.value=n?fa(n):"";let i=el.value.length,c=0;while(i>0&&c<right){i--;if(dg(el.value[i]))c++}el.setSelectionRange(i,i);return n}
$("iv-rows").oninput=e=>{const r=e.target.closest("[data-r]"),f=e.target.dataset.f;if(!r||!f)return;inv.items[r.dataset.r][f]=f=="n"?e.target.value:f=="p"?money(e.target):+e.target.value;sv("inv",inv);ivShow()};
$("iv-rows").onclick=e=>{const r=e.target.closest("[data-r]");if(r&&e.target.closest("[data-x]")&&inv.items.length>1){inv.items.splice(r.dataset.r,1);sv("inv",inv);ivRows()}};
$("iv-add").onclick=()=>{inv.items.push({n:"",q:1,p:0});sv("inv",inv);ivRows()};
$("iv-go").onclick=()=>{const x=ivTot();printHtml(`<h1>${esc(inv.type)} شماره ${esc(inv.no)}</h1><p>تاریخ: ${esc(inv.date)}<br>فروشنده: ${esc(inv.seller)}<br>خریدار: ${esc(inv.buyer)}</p><table><tr><th>شرح</th><th>تعداد</th><th>قیمت واحد</th><th>مبلغ</th></tr>${inv.items.map(i=>`<tr><td>${esc(i.n)}</td><td>${fa(i.q)}</td><td>${fa(i.p)}</td><td>${fa(i.q*i.p)}</td></tr>`).join("")}</table><p>جمع: ${fa(x.s)}<br>تخفیف (${inv.disc}٪): ${fa(x.d)}<br>مالیات (${inv.tax}٪): ${fa(x.t)}<br><b>مبلغ نهایی: ${fa(x.g)} تومان</b></p>`)};ivRows();
