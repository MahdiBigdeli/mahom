// AI image prompts
const PR=[{t:"پرتره‌ی استودیویی",c:"پرتره",p:"Studio portrait of a young woman, soft key light, 85mm lens, shallow depth of field, neutral gray background, detailed skin texture, photorealistic"},
{t:"طلوع در کوهستان",c:"طبیعت",p:"Misty mountain valley at sunrise, golden light through pine trees, cinematic wide shot, volumetric fog, ultra-detailed, 8k"},
{t:"لوگوی مینیمال",c:"لوگو",p:"Minimal flat vector logo of a toolbox, orange and white, geometric shapes, clean lines, centered on a white background"},
{t:"شهر آینده‌نگر",c:"علمی‌تخیلی",p:"Futuristic city skyline at night, neon reflections on wet streets, flying cars, cyberpunk mood, cinematic lighting"},
{t:"عکس محصول",c:"محصول",p:"Product photo of a smartwatch on a marble surface, soft shadows, studio lighting, subtle reflections, commercial photography, high detail"},
{t:"تصویرسازی کودکانه",c:"تصویرسازی",p:"Cute watercolor illustration of a fox reading a book under a tree, pastel colors, children's book style, soft textures"},
{t:"غذای ایرانی",c:"غذا",p:"Overhead shot of a rustic table with Persian saffron rice and kebab, steam rising, warm natural light, food photography"},
{t:"فضای داخلی اسکاندیناوی",c:"معماری",p:"Scandinavian living room interior, natural wood, large window, soft morning light, cozy minimalist style, architectural photography"}];
// برای عکس نمونه: به هر مورد بالا img:"data:image/..." یا مسیر فایل اضافه کنید.
let prC="all";
async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch(e){const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();let ok=false;try{ok=document.execCommand("copy")}catch(e2){}a.remove();return ok}}
function prDraw(){$("pr-f").innerHTML=["all",...new Set(PR.map(x=>x.c))].map(c=>`<button class="ghost${c==prC?" on":""}" data-c="${c}">${c=="all"?"همه":c}</button>`).join("");
$("pr-g").innerHTML=PR.map((x,i)=>({x,i})).filter(({x})=>prC=="all"||x.c==prC).map(({x,i})=>`<div class="card" style="cursor:default"><div class="pimg" style="background:${x.img?"url("+x.img+") center/cover":"linear-gradient(135deg,hsl("+i*47+",80%,60%),hsl("+(i*47+60)+",80%,42%))"}">${x.img?"":"<span>"+esc(x.c)+"</span>"}</div><h3>${esc(x.t)}</h3><p dir="ltr" style="text-align:left">${esc(x.p)}</p><button class="btn" data-p="${i}" style="margin-top:10px">کپی پرامپت</button></div>`).join("")}
$("pr-f").onclick=e=>{const c=e.target.dataset.c;if(c){prC=c;prDraw()}};
$("pr-g").onclick=async e=>{const b=e.target.closest("[data-p]");if(!b)return;b.textContent=(await copyText(PR[b.dataset.p].p))?"کپی شد":"کپی نشد؛ متن را دستی انتخاب کنید";setTimeout(()=>b.textContent="کپی پرامپت",1600)};prDraw();
