function pageSetup(sz,or,fs){let st=$("pgs");if(!st){st=document.createElement("style");st.id="pgs";document.head.appendChild(st)}st.textContent=`@page{size:${sz} ${or};margin:15mm}`;$("pa").style.fontSize=fs+"px"}
$("pd-go").onclick=()=>{const go=img=>{pageSetup($("pd-sz").value,$("pd-or").value,+$("pd-fs").value||14);const rows=$("pd-tb").value.trim().split("\n").filter(Boolean).map(r=>"<tr>"+r.split(/[,،\t]/).map(c=>`<td>${esc(c.trim())}</td>`).join("")+"</tr>").join("");
printHtml(`<h1>${esc($("pd-t").value)}</h1><p style="white-space:pre-wrap;text-align:${$("pd-al").value}">${esc($("pd-b").value)}</p>${rows?`<table>${rows}</table>`:""}${img?`<img src="${img}">`:""}`)};
const f=$("pd-i").files[0];if(f){const r=new FileReader();r.onload=()=>go(r.result);r.readAsDataURL(f)}else go("")};
