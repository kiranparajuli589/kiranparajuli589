import{m as f,a as y,b as k,h as b,u as C,c as P,d as S}from"./VImg-CtEcD79h.js";import{p as R,m as I,ax as V,a as z,b as F,g as T,r as B,c as w,t as u,x,i as E,j as a,ay as H,e as L,f as N,k as j,az as O,w as U}from"./index-BkHCyfUK.js";const p=R({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...f(),...I(),...y(),...V(),...k(),...z({tag:"footer"}),...F()},"VFooter"),D=T()({name:"VFooter",props:p(),setup(e,r){let{slots:n}=r;const o=B(),{themeClasses:c}=w(e),{backgroundColorClasses:i,backgroundColorStyles:m}=b(u(e,"color")),{borderClasses:d}=C(e),{elevationClasses:g}=P(e),{roundedClasses:h}=S(e),s=x(32),{resizeRef:v}=E(t=>{t.length&&(s.value=t[0].target.clientHeight)}),l=a(()=>e.height==="auto"?s.value:parseInt(e.height,10));return H(()=>e.app,()=>{const t=O({id:e.name,order:a(()=>parseInt(e.order,10)),position:a(()=>"bottom"),layoutSize:l,elementSize:a(()=>e.height==="auto"?void 0:l.value),active:a(()=>e.app),absolute:u(e,"absolute")});U(()=>{o.value=t.layoutItemStyles.value})}),L(()=>N(e.tag,{ref:v,class:["v-footer",c.value,i.value,d.value,g.value,h.value,e.class],style:[m.value,e.app?o.value:{height:j(e.height)},e.style]},n)),{}}});export{D as V};