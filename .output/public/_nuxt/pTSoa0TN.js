import{R as a}from"./DoBXfxnK.js";function E(){const h=()=>{const n=a.personalInfo,c=a.experiences,r=a.education,s=a.skills,i=a.leadershipHighlights,l=a.selectedProjects,$=a.extras;let e="";return e+=`${n.name.toUpperCase()}
`,e+=`${n.role}

`,e+=`CONTACT INFORMATION
`,e+=`${"=".repeat(20)}
`,n.email&&(e+=`Email: ${n.email}
`),n.phone&&(e+=`Phone: ${n.phone}
`),n.website&&(e+=`Website: ${n.website}
`),n.linkedin&&(e+=`LinkedIn: ${n.linkedin}
`),n.github&&(e+=`GitHub: ${n.github}
`),e+=`Location: ${n.municipality}, ${n.country}, ${n.postalCode}

`,n.summary&&(e+=`SUMMARY
`,e+=`${"=".repeat(20)}
`,e+=`${n.summary}

`),i&&i.length>0&&(e+=`LEADERSHIP HIGHLIGHTS
`,e+=`${"=".repeat(20)}
`,i.forEach(t=>{e+=`• ${t}
`}),e+=`
`),s&&s.length>0&&(e+=`SKILLS
`,e+=`${"=".repeat(20)}
`,s.forEach(t=>{e+=`${t.title}:
`,t.items.forEach(o=>{e+=`  • ${o}
`})}),e+=`
`),e+=`EXPERIENCE
`,e+=`${"=".repeat(20)}
`,c.forEach(t=>{e+=`${t.company}
`,t.companyUrl&&(e+=`Website: ${t.companyUrl}
`),e+=`${t.roles.join(", ")} | ${t.startDate} - ${t.endDate}
`,t.description&&(e+=`${t.description}
`),t.achievements&&t.achievements.length>0&&(e+=`Achievements:
`,t.achievements.forEach(o=>{e+=`  • ${o}
`})),e+=`
`}),l&&l.length>0&&(e+=`SELECTED PROJECTS
`,e+=`${"=".repeat(20)}
`,l.forEach(t=>{e+=`${t.title}
`,t.description&&(e+=`${t.description}
`),t.impact&&(e+=`Impact: ${t.impact}
`),t.stack&&t.stack.length>0&&(e+=`Stack: ${t.stack.join(", ")}
`),t.links&&Object.entries(t.links).forEach(([o,m])=>{e+=`${o.charAt(0).toUpperCase()+o.slice(1)}: ${m}
`}),e+=`
`})),e+=`EDUCATION
`,e+=`${"=".repeat(20)}
`,r.forEach(t=>{e+=`${t.degree} in ${t.name}
`,e+=`${t.major}
`,e+=`${t.startDate} - ${t.endDate}

`}),$&&$.length>0&&(e+=`ADDITIONAL INFORMATION
`,e+=`${"=".repeat(20)}
`,$.forEach(t=>{e+=`• ${t}
`})),e};return{exportAsPlainText:h,downloadAsPlainText:(n="resume.txt")=>{const c=h(),r=new Blob([c],{type:"text/plain"}),s=URL.createObjectURL(r),i=document.createElement("a");i.href=s,i.download=n,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)}}}export{E as useResumeExport};
