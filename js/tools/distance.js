const C="تهران,35.69,51.39;مشهد,36.30,59.60;اصفهان,32.65,51.67;شیراز,29.59,52.58;تبریز,38.08,46.29;اهواز,31.32,48.67;کرج,35.83,50.99;قم,34.64,50.88;کرمانشاه,34.31,47.07;ارومیه,37.55,45.07;رشت,37.28,49.58;زاهدان,29.50,60.86;کرمان,30.28,57.08;یزد,31.90,54.37;همدان,34.80,48.51;اراک,34.09,49.69;بندرعباس,27.18,56.27;ساری,36.56,53.06;گرگان,36.84,54.43;سنندج,35.31,47.00;زنجان,36.68,48.48;قزوین,36.27,50.00;اردبیل,38.25,48.30;بوشهر,28.92,50.84;خرم‌آباد,33.49,48.35;بیرجند,32.87,59.22;ایلام,33.64,46.42;یاسوج,30.67,51.59;شهرکرد,32.33,50.86;سمنان,35.58,53.39;بجنورد,37.47,57.33".split(";").map(s=>{const a=s.split(",");return{n:a[0],la:+a[1],lo:+a[2]}});
C.forEach((c,i)=>{$("d-a").add(new Option(c.n,i));$("d-b").add(new Option(c.n,i))});$("d-b").value=1;
function dist(){const a=C[$("d-a").value],b=C[$("d-b").value],R=Math.PI/180,rt=$("d-rt").checked?2:1;
const h=Math.sin((b.la-a.la)*R/2)**2+Math.cos(a.la*R)*Math.cos(b.la*R)*Math.sin((b.lo-a.lo)*R/2)**2;
const km=Math.round(2*6371*Math.asin(Math.sqrt(h))*1.28)*rt;if(!km){$("d-r").textContent="مبدأ و مقصد یکی است.";return}
const sp=+$("d-sp").value||75,m=Math.round(km/sp*60),L=km*(+$("d-c").value||0)/100,pr=+dg($("d-pr").value)||0;
$("d-r").innerHTML=`فاصله جاده‌ای تقریبی: <b>${fa(km)} کیلومتر</b>${rt>1?" (رفت و برگشت)":""}<br>زمان رانندگی: <b>${Math.floor(m/60)} ساعت و ${m%60} دقیقه</b><br>مصرف سوخت: <b>${L.toFixed(1)} لیتر</b>`+(pr?`<br>هزینه‌ی سوخت: <b>${fa(L*pr)} تومان</b>`:"")}
$("d-sw").onclick=()=>{const t=$("d-a").value;$("d-a").value=$("d-b").value;$("d-b").value=t;dist()};
["d-a","d-b","d-rt","d-sp","d-c"].forEach(i=>["input","change"].forEach(v=>$(i).addEventListener(v,dist)));$("d-pr").oninput=()=>{money($("d-pr"));dist()};dist();
