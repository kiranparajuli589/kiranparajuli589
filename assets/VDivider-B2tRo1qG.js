import{g as c}from "./VImg-BYZhnGTc.js";import{p as u,m,b as h,g,c as f,t as y,j as _,e as b,k as s,f as r}from "./index-BJJQ-uwK.js";const k=u({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...m(),...h()},"VDivider"),V=g()({name:"VDivider",props:k(),setup(e,o){let{attrs:i,slots:a}=o;const{themeClasses:l}=f(e),{textColorClasses:n,textColorStyles:d}=c(y(e,"color")),v=_(()=>{const t={};return e.length&&(t[e.vertical?"height":"width"]=s(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=s(e.thickness)),t});return b(()=>{const t=r("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},l.value,n.value,e.class],style:[v.value,d.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":!i.role||i.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${i.role||"separator"}`},null);return a.default?r("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[t,r("div",{class:"v-divider__content"},[a.default()]),t]):t}),{}}});export{V};
