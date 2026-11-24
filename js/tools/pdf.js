// PDF maker
$("pd-go").onclick=()=>{const go=img=>{const rows=$("pd-tb").value.trim().split("\n").filter(Boolean).map(r=>"<tr>"+r.split(/[,،\t]/).map(c=>`<td>${esc(c.trim())}</td>`).join("")+"</tr>").join("");
printHtml(`<h1>${esc($("pd-t").value)}</h1><p style="white-space:pre-wrap">${esc($("pd-b").value)}</p>${rows?`<table>${rows}</table>`:""}${img?`<img src="${img}">`:""}`)};
const f=$("pd-i").files[0];if(f){const r=new FileReader();r.onload=()=>go(r.result);r.readAsDataURL(f)}else go("")};
