import{o as i,c as u,a as o,r as m,t as _,b as p,F as f,p as h,d as v,e as c,u as g,f as y}from"./vendor.83019a47.js";const b=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}};b();var x="./assets/logo.03d6d6da.png";const V={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},k=o("path",{d:"M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",fill:"currentColor"},null,-1),S=[k];function H(r,n){return i(),u("svg",V,S)}var I={name:"mdi-account-box",render:H};var N=(r,n)=>{const a=r.__vccOpts||r;for(const[s,e]of n)a[s]=e;return a};const d=r=>(h("data-v-5d10c571"),r=r(),v(),r),$=d(()=>o("p",null,[c(" Recommended IDE setup: "),o("a",{href:"https://code.visualstudio.com/",target:"_blank"},"VSCode"),c(" + "),o("a",{href:"https://github.com/johnsoncodehk/volar",target:"_blank"},"Volar")],-1)),L=d(()=>o("p",null,[o("a",{href:"https://vitejs.dev/guide/features.html",target:"_blank"}," Vite Documentation "),c(" | "),o("a",{href:"https://v3.vuejs.org/",target:"_blank"},"Vue 3 Documentation")],-1)),M=d(()=>o("p",null,[c(" Edit "),o("code",null,"components/HelloWorld.vue"),c(" to test hot module replacement. ")],-1)),O={props:{msg:{type:String,default:""}},setup(r){const n=m(0);return(a,s)=>{const e=I;return i(),u(f,null,[o("h1",null,_(r.msg),1),p(e,{style:{"font-size":"2em",color:"red"}}),$,L,o("button",{type:"button",onClick:s[0]||(s[0]=t=>n.value++)}," count is: "+_(n.value),1),M],64)}}};var j=N(O,[["__scopeId","data-v-5d10c571"]]);const w=o("img",{alt:"Vue logo",src:x},null,-1),A={setup(r){return(n,a)=>(i(),u("div",null,[w,p(g(j),{msg:"Hello Vue 3 + Vite"})]))}};y(A).mount("#app");
