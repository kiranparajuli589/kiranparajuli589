import{p as b,a5 as I,a6 as P,a7 as w,a8 as T,t as S,j as x,a9 as C,l as F,aa as k,a2 as q,ab as O,ac as U,$ as z,ad as H,ae as M,F as N,g as _,af as B,ag as E,ah as V,ai as W}from"./index-CyXR1VA0.js";const D=b({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),Q=b({value:null,disabled:Boolean,selectedClass:String},"group-item");function Y(o,u){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;const e=I("useGroupItem");if(!e)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");const n=P();w(Symbol.for(`${u.description}:id`),n);const a=T(u,null);if(!a){if(!r)return a;throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${u.description}`)}const t=S(o,"value"),i=x(()=>!!(a.disabled.value||o.disabled));a.register({id:n,value:t,disabled:i},e),C(()=>{a.unregister(n)});const f=x(()=>a.isSelected(n)),p=x(()=>a.items.value[0].id===n),h=x(()=>a.items.value[a.items.value.length-1].id===n),v=x(()=>f.value&&[a.selectedClass.value,o.selectedClass]);return F(f,s=>{e.emit("group:selected",{value:s})},{flush:"sync"}),{id:n,isSelected:f,isFirst:p,isLast:h,toggle:()=>a.select(n,!f.value),select:s=>a.select(n,s),selectedClass:v,value:t,disabled:i,group:a}}function Z(o,u){let r=!1;const e=k([]),n=q(o,"modelValue",[],s=>s==null?[]:A(e,H(s)),s=>{const l=R(e,s);return o.multiple?l:l[0]}),a=I("useGroup");function t(s,l){const c=s,d=Symbol.for(`${u.description}:id`),y=M(d,a==null?void 0:a.vnode).indexOf(l);N(c.value)==null&&(c.value=y,c.useIndexAsValue=!0),y>-1?e.splice(y,0,c):e.push(c)}function i(s){if(r)return;f();const l=e.findIndex(c=>c.id===s);e.splice(l,1)}function f(){const s=e.find(l=>!l.disabled);s&&o.mandatory==="force"&&!n.value.length&&(n.value=[s.id])}O(()=>{f()}),C(()=>{r=!0}),U(()=>{for(let s=0;s<e.length;s++)e[s].useIndexAsValue&&(e[s].value=s)});function p(s,l){const c=e.find(d=>d.id===s);if(!(l&&(c!=null&&c.disabled)))if(o.multiple){const d=n.value.slice(),m=d.findIndex(G=>G===s),y=~m;if(l=l??!y,y&&o.mandatory&&d.length<=1||!y&&o.max!=null&&d.length+1>o.max)return;m<0&&l?d.push(s):m>=0&&!l&&d.splice(m,1),n.value=d}else{const d=n.value.includes(s);if(o.mandatory&&d)return;n.value=l??!d?[s]:[]}}function h(s){if(o.multiple,n.value.length){const l=n.value[0],c=e.findIndex(y=>y.id===l);let d=(c+s)%e.length,m=e[d];for(;m.disabled&&d!==c;)d=(d+s)%e.length,m=e[d];if(m.disabled)return;n.value=[e[d].id]}else{const l=e.find(c=>!c.disabled);l&&(n.value=[l.id])}}const v={register:t,unregister:i,selected:n,select:p,disabled:S(o,"disabled"),prev:()=>h(e.length-1),next:()=>h(1),isSelected:s=>n.value.includes(s),selectedClass:x(()=>o.selectedClass),items:x(()=>e),getItemIndex:s=>J(e,s)};return w(u,v),v}function J(o,u){const r=A(o,[u]);return r.length?o.findIndex(e=>e.id===r[0]):-1}function A(o,u){const r=[];return u.forEach(e=>{const n=o.find(t=>z(e,t.value)),a=o[e];(n==null?void 0:n.value)!=null?r.push(n.id):a!=null&&r.push(a.id)}),r}function R(o,u){const r=[];return u.forEach(e=>{const n=o.findIndex(a=>a.id===e);if(~n){const a=o[n];r.push(a.value!=null?a.value:n)}}),r}const X=b({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function g(o,u,r){return _()({name:o,props:X({mode:r,origin:u}),setup(e,n){let{slots:a}=n;const t={onBeforeEnter(i){e.origin&&(i.style.transformOrigin=e.origin)},onLeave(i){if(e.leaveAbsolute){const{offsetTop:f,offsetLeft:p,offsetWidth:h,offsetHeight:v}=i;i._transitionInitialStyles={position:i.style.position,top:i.style.top,left:i.style.left,width:i.style.width,height:i.style.height},i.style.position="absolute",i.style.top=`${f}px`,i.style.left=`${p}px`,i.style.width=`${h}px`,i.style.height=`${v}px`}e.hideOnLeave&&i.style.setProperty("display","none","important")},onAfterLeave(i){if(e.leaveAbsolute&&(i!=null&&i._transitionInitialStyles)){const{position:f,top:p,left:h,width:v,height:s}=i._transitionInitialStyles;delete i._transitionInitialStyles,i.style.position=f||"",i.style.top=p||"",i.style.left=h||"",i.style.width=v||"",i.style.height=s||""}}};return()=>{const i=e.group?B:E;return V(i,{name:e.disabled?"":o,css:!e.disabled,...e.group?void 0:{mode:e.mode},...e.disabled?{}:t},a.default)}}})}function L(o,u){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return _()({name:o,props:{mode:{type:String,default:r},disabled:Boolean,group:Boolean},setup(e,n){let{slots:a}=n;const t=e.group?B:E;return()=>V(t,{name:e.disabled?"":o,css:!e.disabled,...e.disabled?{}:u},a.default)}})}function $(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const r=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",e=W(`offset-${r}`);return{onBeforeEnter(t){t._parent=t.parentNode,t._initialStyle={transition:t.style.transition,overflow:t.style.overflow,[r]:t.style[r]}},onEnter(t){const i=t._initialStyle;t.style.setProperty("transition","none","important"),t.style.overflow="hidden";const f=`${t[e]}px`;t.style[r]="0",t.offsetHeight,t.style.transition=i.transition,o&&t._parent&&t._parent.classList.add(o),requestAnimationFrame(()=>{t.style[r]=f})},onAfterEnter:a,onEnterCancelled:a,onLeave(t){t._initialStyle={transition:"",overflow:t.style.overflow,[r]:t.style[r]},t.style.overflow="hidden",t.style[r]=`${t[e]}px`,t.offsetHeight,requestAnimationFrame(()=>t.style[r]="0")},onAfterLeave:n,onLeaveCancelled:n};function n(t){o&&t._parent&&t._parent.classList.remove(o),a(t)}function a(t){const i=t._initialStyle[r];t.style.overflow=t._initialStyle.overflow,i!=null&&(t.style[r]=i),delete t._initialStyle}}g("fab-transition","center center","out-in");g("dialog-bottom-transition");g("dialog-top-transition");const K=g("fade-transition");g("scale-transition");g("scroll-x-transition");g("scroll-x-reverse-transition");g("scroll-y-transition");g("scroll-y-reverse-transition");g("slide-x-transition");g("slide-x-reverse-transition");g("slide-y-transition");g("slide-y-reverse-transition");const ee=L("expand-transition",$()),te=L("expand-x-transition",$("",!0));export{ee as V,Q as a,Y as b,K as c,te as d,D as m,Z as u};