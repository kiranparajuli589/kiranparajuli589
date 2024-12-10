import{p as C,an as T,j as m,aA as k,aB as H,aC as W,aD as ne,aE as ae,aF as se,am as re,k as _,I as le,m as V,a as oe,b as ie,g as N,r as L,c as ue,aG as ce,t as M,e as $,aH as de,aI as ve,f as i,o as ge,q as fe,ah as me,h as G,af as be,ag as Se,ap as J,a5 as he,x as I,l as R,ak as ye,n as Ce,a9 as _e,s as q,a3 as ke,L as ze,a4 as Ie}from "./index-BJJQ-uwK.js";const De=C({border:[Boolean,Number,String]},"border");function We(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:T();return{borderClasses:m(()=>{const t=k(e)?e.value:e.border,r=[];if(t===!0||t==="")r.push(`${n}--border`);else if(typeof t=="string"||t===0)for(const u of String(t).split(" "))r.push(`border-${u}`);return r})}}const qe=C({elevation:{type:[Number,String],validator(e){const n=parseInt(e);return!isNaN(n)&&n>=0&&n<=24}}},"elevation");function Ae(e){return{elevationClasses:m(()=>{const a=k(e)?e.value:e.elevation,t=[];return a==null||t.push(`elevation-${a}`),t})}}const xe=C({rounded:{type:[Boolean,Number,String],default:void 0},tile:Boolean},"rounded");function Pe(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:T();return{roundedClasses:m(()=>{const t=k(e)?e.value:e.rounded,r=k(e)?e.value:e.tile,u=[];if(t===!0||t==="")u.push(`${n}--rounded`);else if(typeof t=="string"||t===0)for(const f of String(t).split(" "))u.push(`rounded-${f}`);else(r||t===!1)&&u.push("rounded-0");return u})}}function K(e){return H(()=>{const n=[],a={};if(e.value.background)if(W(e.value.background)){if(a.backgroundColor=e.value.background,!e.value.text&&ne(e.value.background)){const t=ae(e.value.background);if(t.a==null||t.a===1){const r=se(t);a.color=r,a.caretColor=r}}}else n.push(`bg-${e.value.background}`);return e.value.text&&(W(e.value.text)?(a.color=e.value.text,a.caretColor=e.value.text):n.push(`text-${e.value.text}`)),{colorClasses:n,colorStyles:a}})}function Be(e,n){const a=m(()=>({text:k(e)?e.value:n?e[n]:null})),{colorClasses:t,colorStyles:r}=K(a);return{textColorClasses:t,textColorStyles:r}}function Re(e,n){const a=m(()=>({background:k(e)?e.value:n?e[n]:null})),{colorClasses:t,colorStyles:r}=K(a);return{backgroundColorClasses:t,backgroundColorStyles:r}}const Te=["x-small","small","default","large","x-large"],Ve=C({size:{type:[String,Number],default:"default"}},"size");function Ne(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:T();return H(()=>{let a,t;return re(Te,e.size)?a=`${n}--size-${e.size}`:e.size&&(t={width:_(e.size),height:_(e.size)}),{sizeClasses:a,sizeStyles:t}})}const $e=C({color:String,disabled:Boolean,start:Boolean,end:Boolean,icon:le,...V(),...Ve(),...oe({tag:"i"}),...ie()},"VIcon"),He=N()({name:"VIcon",props:$e(),setup(e,n){let{attrs:a,slots:t}=n;const r=L(),{themeClasses:u}=ue(e),{iconData:f}=ce(m(()=>r.value||e.icon)),{sizeClasses:g}=Ne(e),{textColorClasses:h,textColorStyles:o}=Be(M(e,"color"));return $(()=>{var b,d;const l=(b=t.default)==null?void 0:b.call(t);l&&(r.value=(d=de(l).filter(S=>S.type===ve&&S.children&&typeof S.children=="string")[0])==null?void 0:d.children);const c=!!(a.onClick||a.onClickOnce);return i(f.value.component,{tag:e.tag,icon:f.value.icon,class:["v-icon","notranslate",u.value,g.value,h.value,{"v-icon--clickable":c,"v-icon--disabled":e.disabled,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[g.value?void 0:{fontSize:_(e.size),height:_(e.size),width:_(e.size)},o.value,e.style],role:c?"button":void 0,"aria-hidden":!c,tabindex:c?e.disabled?-1:0:void 0},{default:()=>[l]})}),{}}});function je(e){return{aspectStyles:m(()=>{const n=Number(e.aspectRatio);return n?{paddingBottom:String(1/n*100)+"%"}:void 0})}}const Q=C({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...V(),...ge()},"VResponsive"),A=N()({name:"VResponsive",props:Q(),setup(e,n){let{slots:a}=n;const{aspectStyles:t}=je(e),{dimensionStyles:r}=fe(e);return $(()=>{var u;return i("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[r.value,e.style]},[i("div",{class:"v-responsive__sizer",style:t.value},null),(u=a.additional)==null?void 0:u.call(a),a.default&&i("div",{class:["v-responsive__content",e.contentClass]},[a.default()])])}),{}}}),we=C({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),x=(e,n)=>{let{slots:a}=n;const{transition:t,disabled:r,group:u,...f}=e,{component:g=u?be:Se,...h}=typeof t=="object"?t:{};return me(g,G(typeof t=="string"?{name:r?"":t}:h,typeof t=="string"?{}:Object.fromEntries(Object.entries({disabled:r,group:u}).filter(o=>{let[l,c]=o;return c!==void 0})),f),a)};function Oe(e,n){if(!J)return;const a=n.modifiers||{},t=n.value,{handler:r,options:u}=typeof t=="object"?t:{handler:t,options:{}},f=new IntersectionObserver(function(){var c;let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],h=arguments.length>1?arguments[1]:void 0;const o=(c=e._observe)==null?void 0:c[n.instance.$.uid];if(!o)return;const l=g.some(b=>b.isIntersecting);r&&(!a.quiet||o.init)&&(!a.once||l||o.init)&&r(l,g,h),l&&a.once?X(e,n):o.init=!0},u);e._observe=Object(e._observe),e._observe[n.instance.$.uid]={init:!1,observer:f},f.observe(e)}function X(e,n){var t;const a=(t=e._observe)==null?void 0:t[n.instance.$.uid];a&&(a.observer.unobserve(e),delete e._observe[n.instance.$.uid])}const Ee={mounted:Oe,unmounted:X},Fe=C({absolute:Boolean,alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...Q(),...V(),...xe(),...we()},"VImg"),Le=N()({name:"VImg",directives:{intersect:Ee},props:Fe(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,n){let{emit:a,slots:t}=n;const{backgroundColorClasses:r,backgroundColorStyles:u}=Re(M(e,"color")),{roundedClasses:f}=Pe(e),g=he("VImg"),h=I(""),o=L(),l=I(e.eager?"loading":"idle"),c=I(),b=I(),d=m(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),S=m(()=>d.value.aspect||c.value/b.value||0);R(()=>e.src,()=>{P(l.value!=="idle")}),R(S,(s,v)=>{!s&&v&&o.value&&z(o.value)}),ye(()=>P());function P(s){if(!(e.eager&&s)&&!(J&&!s&&!e.eager)){if(l.value="loading",d.value.lazySrc){const v=new Image;v.src=d.value.lazySrc,z(v,null)}d.value.src&&Ce(()=>{var v;a("loadstart",((v=o.value)==null?void 0:v.currentSrc)||d.value.src),setTimeout(()=>{var y;if(!g.isUnmounted)if((y=o.value)!=null&&y.complete){if(o.value.naturalWidth||w(),l.value==="error")return;S.value||z(o.value,null),l.value==="loading"&&j()}else S.value||z(o.value),O()})})}}function j(){var s;g.isUnmounted||(O(),z(o.value),l.value="loaded",a("load",((s=o.value)==null?void 0:s.currentSrc)||d.value.src))}function w(){var s;g.isUnmounted||(l.value="error",a("error",((s=o.value)==null?void 0:s.currentSrc)||d.value.src))}function O(){const s=o.value;s&&(h.value=s.currentSrc||s.src)}let B=-1;_e(()=>{clearTimeout(B)});function z(s){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const y=()=>{if(clearTimeout(B),g.isUnmounted)return;const{naturalHeight:U,naturalWidth:D}=s;U||D?(c.value=D,b.value=U):!s.complete&&l.value==="loading"&&v!=null?B=window.setTimeout(y,v):(s.currentSrc.endsWith(".svg")||s.currentSrc.startsWith("data:image/svg+xml"))&&(c.value=1,b.value=1)};y()}const E=m(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),Y=()=>{var y;if(!d.value.src||l.value==="idle")return null;const s=i("img",{class:["v-img__img",E.value],style:{objectPosition:e.position},src:d.value.src,srcset:d.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:o,onLoad:j,onError:w},null),v=(y=t.sources)==null?void 0:y.call(t);return i(x,{transition:e.transition,appear:!0},{default:()=>[q(v?i("picture",{class:"v-img__picture"},[v,s]):s,[[Ie,l.value==="loaded"]])]})},Z=()=>i(x,{transition:e.transition},{default:()=>[d.value.lazySrc&&l.value!=="loaded"&&i("img",{class:["v-img__img","v-img__img--preload",E.value],style:{objectPosition:e.position},src:d.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),p=()=>t.placeholder?i(x,{transition:e.transition,appear:!0},{default:()=>[(l.value==="loading"||l.value==="error"&&!t.error)&&i("div",{class:"v-img__placeholder"},[t.placeholder()])]}):null,ee=()=>t.error?i(x,{transition:e.transition,appear:!0},{default:()=>[l.value==="error"&&i("div",{class:"v-img__error"},[t.error()])]}):null,te=()=>e.gradient?i("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,F=I(!1);{const s=R(S,v=>{v&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{F.value=!0})}),s())})}return $(()=>{const s=A.filterProps(e);return q(i(A,G({class:["v-img",{"v-img--absolute":e.absolute,"v-img--booting":!F.value},r.value,f.value,e.class],style:[{width:_(e.width==="auto"?c.value:e.width)},u.value,e.style]},s,{aspectRatio:S.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>i(ze,null,[i(Y,null,null),i(Z,null,null),i(te,null,null),i(p,null,null),i(ee,null,null)]),default:t.default}),[[ke("intersect"),{handler:P,options:e.options},null,{once:!0}]])}),{currentSrc:h,image:o,state:l,naturalWidth:c,naturalHeight:b}}});export{He as V,qe as a,xe as b,Ae as c,Pe as d,Ve as e,Ne as f,Be as g,Re as h,Le as i,K as j,De as m,We as u};
