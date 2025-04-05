import{a as m,S as d,i as n}from"./assets/vendor-BH9GyP-n.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const f="49617866-877f488ac6d2fa69158bf0643",p="https://pixabay.com/api/";async function y(o){return(await m.get(p,{params:{key:f,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}const c=document.querySelector(".gallery");function g(o){const r=o.map(({webformatURL:a,largeImageURL:i,tags:e,likes:t,views:s,comments:l,downloads:u})=>`
    <li class="gallery-item">
      <a href="${i}">
        <img src="${a}" alt="${e}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${s}</p>
        <p><b>Comments:</b> ${l}</p>
        <p><b>Downloads:</b> ${u}</p>
      </div>
    </li>
  `).join("");c.innerHTML=r}function h(){c.innerHTML=""}function b(){document.querySelector(".loader").classList.remove("hidden")}function L(){document.querySelector(".loader").classList.add("hidden")}const S=new d(".gallery a",{captionSelector:"img",captionsData:"alt",captionPosition:"bottom",captionDelay:250}),w=document.querySelector(".form");w.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(!r){n.error({message:"Please enter a search term!"});return}h(),b();try{const a=await y(r);a.length===0?n.warning({message:"Sorry, there are no images matching your search query. Please try again!"}):(g(a),S.refresh())}catch{n.error({message:"Something went wrong. Please try again later."})}finally{L(),o.target.reset()}});
//# sourceMappingURL=index.js.map
