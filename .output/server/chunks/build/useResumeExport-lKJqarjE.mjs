import { R as Resume } from './resume-CN0FSVbL.mjs';

function useResumeExport() {
  const exportAsPlainText = () => {
    const personalInfo = Resume.personalInfo;
    const experiences = Resume.experiences;
    const education = Resume.education;
    const skills = Resume.skills;
    const leadershipHighlights = Resume.leadershipHighlights;
    const selectedProjects = Resume.selectedProjects;
    const extras = Resume.extras;
    let text = "";
    text += `${personalInfo.name.toUpperCase()}
`;
    text += `${personalInfo.role}

`;
    text += "CONTACT INFORMATION\n";
    text += `${"=".repeat(20)}
`;
    if (personalInfo.email) text += `Email: ${personalInfo.email}
`;
    if (personalInfo.phone) text += `Phone: ${personalInfo.phone}
`;
    if (personalInfo.website) text += `Website: ${personalInfo.website}
`;
    if (personalInfo.linkedin) text += `LinkedIn: ${personalInfo.linkedin}
`;
    if (personalInfo.github) text += `GitHub: ${personalInfo.github}
`;
    text += `Location: ${personalInfo.municipality}, ${personalInfo.country}, ${personalInfo.postalCode}

`;
    if (personalInfo.summary) {
      text += "SUMMARY\n";
      text += `${"=".repeat(20)}
`;
      text += `${personalInfo.summary}

`;
    }
    if (leadershipHighlights && leadershipHighlights.length > 0) {
      text += "LEADERSHIP HIGHLIGHTS\n";
      text += `${"=".repeat(20)}
`;
      leadershipHighlights.forEach((highlight) => {
        text += `• ${highlight}
`;
      });
      text += "\n";
    }
    if (skills && skills.length > 0) {
      text += "SKILLS\n";
      text += `${"=".repeat(20)}
`;
      skills.forEach((skill) => {
        text += `${skill.title}:
`;
        skill.items.forEach((item) => {
          text += `  • ${item}
`;
        });
      });
      text += "\n";
    }
    text += "EXPERIENCE\n";
    text += `${"=".repeat(20)}
`;
    experiences.forEach((exp) => {
      text += `${exp.company}
`;
      if (exp.companyUrl) text += `Website: ${exp.companyUrl}
`;
      text += `${exp.roles.join(", ")} | ${exp.startDate} - ${exp.endDate}
`;
      if (exp.description) {
        text += `${exp.description}
`;
      }
      if (exp.achievements && exp.achievements.length > 0) {
        text += "Achievements:\n";
        exp.achievements.forEach((achievement) => {
          text += `  • ${achievement}
`;
        });
      }
      text += "\n";
    });
    if (selectedProjects && selectedProjects.length > 0) {
      text += "SELECTED PROJECTS\n";
      text += `${"=".repeat(20)}
`;
      selectedProjects.forEach((project) => {
        text += `${project.title}
`;
        if (project.description) {
          text += `${project.description}
`;
        }
        if (project.impact) {
          text += `Impact: ${project.impact}
`;
        }
        if (project.stack && project.stack.length > 0) {
          text += `Stack: ${project.stack.join(", ")}
`;
        }
        if (project.links) {
          Object.entries(project.links).forEach(([key, value]) => {
            text += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}
`;
          });
        }
        text += "\n";
      });
    }
    text += "EDUCATION\n";
    text += `${"=".repeat(20)}
`;
    education.forEach((edu) => {
      text += `${edu.degree} in ${edu.name}
`;
      text += `${edu.major}
`;
      text += `${edu.startDate} - ${edu.endDate}

`;
    });
    if (extras && extras.length > 0) {
      text += "ADDITIONAL INFORMATION\n";
      text += `${"=".repeat(20)}
`;
      extras.forEach((extra) => {
        text += `• ${extra}
`;
      });
    }
    return text;
  };
  const downloadAsPlainText = (filename = "resume.txt") => {
    const text = exportAsPlainText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = (void 0).createElement("a");
    link.href = url;
    link.download = filename;
    (void 0).body.appendChild(link);
    link.click();
    (void 0).body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return {
    exportAsPlainText,
    downloadAsPlainText
  };
}

export { useResumeExport };
//# sourceMappingURL=useResumeExport-lKJqarjE.mjs.map
