const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
const nav=document.getElementById("site-nav"),menu=document.querySelector(".menu"),mobileNav=document.querySelector(".nav nav");
const closeMenu=()=>{mobileNav?.classList.remove("open");menu?.classList.remove("open");menu?.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open")};
menu?.addEventListener("click",()=>{const open=!mobileNav.classList.contains("open");mobileNav.classList.toggle("open",open);menu.classList.toggle("open",open);menu.setAttribute("aria-expanded",String(open));document.body.classList.toggle("menu-open",open)});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>{closeMenu()}));
const progress=document.querySelector(".progress");window.addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=max>0?((scrollY/max)*100)+"%":"0%";nav?.classList.toggle("scrolled",scrollY>30)},{passive:true});
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");reveal.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>reveal.observe(el));
const sections=[...document.querySelectorAll("main section[id]")],links=[...document.querySelectorAll("[data-nav]")];const active=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle("active",l.dataset.nav===e.target.id))}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(s=>active.observe(s));
const cursor=document.querySelector(".cursor"),dot=document.querySelector(".cursor-dot");window.addEventListener("pointermove",e=>{if(!cursor)return;cursor.classList.add("is-visible");cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px"});document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",()=>cursor?.classList.add("is-hover"));el.addEventListener("mouseleave",()=>cursor?.classList.remove("is-hover"))});
document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.transform="translate("+((e.clientX-r.left-r.width/2)*.08)+"px,"+((e.clientY-r.top-r.height/2)*.08)+"px)"});el.addEventListener("pointerleave",()=>el.style.transform="")});

// Responsive hero images are controlled by styles.css.

const reservationForm=document.getElementById("reservation-form");
const reservationDate=document.getElementById("reservation-date");
const localDate=new Intl.DateTimeFormat("en-CA",{timeZone:"Africa/Kampala",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
const datePart=type=>localDate.find(part=>part.type===type).value;
if(reservationDate)reservationDate.min=datePart("year")+"-"+datePart("month")+"-"+datePart("day");
reservationForm?.addEventListener("submit",event=>{
  event.preventDefault();
  if(!reservationForm.reportValidity())return;
  const details=new FormData(reservationForm);
  const message="Hi Street Club Entebbe! I'd like to request a reservation.\nSpace: "+details.get("space")+"\nDate: "+details.get("date")+"\nGuests: "+details.get("guests")+(String(details.get("note")||"").trim()?"\nNotes: "+String(details.get("note")).trim():"")+"\nPlease confirm availability.";
  window.location.assign("https://wa.me/256705447013?text="+encodeURIComponent(message));
});


// Avoid loading the third-party Google Maps iframe until the visitor requests it.
const loadMapButton=document.getElementById("load-map");
loadMapButton?.addEventListener("click",()=>{
  const preview=document.getElementById("map-preview");
  if(!preview)return;
  const iframe=document.createElement("iframe");
  iframe.title="Google Maps: Street Club Entebbe, Plot 105 Portal Road";
  iframe.src="https://www.google.com/maps?q=Street%20Club%20Entebbe%2C%20Plot%20105%20Portal%20Road%2C%20Entebbe%2C%20Uganda&output=embed";
  iframe.width="1200";iframe.height="450";
  iframe.referrerPolicy="no-referrer-when-downgrade";
  iframe.allowFullscreen=true;
  preview.replaceWith(iframe);
});
