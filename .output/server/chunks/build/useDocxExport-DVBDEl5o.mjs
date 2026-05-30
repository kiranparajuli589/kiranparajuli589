function useDocxExport() {
  const exportCoverLetterAsDocx = async (content, companyName, position) => {
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');
      const lines = content.split("\n").filter((line) => line.trim());
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: lines.map((line) => {
              if (line.length < 60 && !line.match(/[.!?]$/) && line.match(/^[A-Z]/)) {
                return new Paragraph({
                  text: line,
                  heading: HeadingLevel.HEADING_2,
                  spacing: { after: 200 }
                });
              }
              return new Paragraph({
                children: [
                  new TextRun({
                    text: line
                  })
                ],
                spacing: { after: 100 }
              });
            })
          }
        ]
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = (void 0).createElement("a");
      link.href = url;
      link.download = `${companyName}_${position}_CoverLetter.docx`.replace(
        /\s+/g,
        "_"
      );
      (void 0).body.appendChild(link);
      link.click();
      (void 0).body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting to DOCX:", error);
      throw new Error(
        "DOCX export requires the 'docx' package. Please install it: pnpm add docx"
      );
    }
  };
  const exportResumeAsDocx = async () => {
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');
      const { useResumeExport } = await import('./useResumeExport-lKJqarjE.mjs');
      const { exportAsPlainText } = useResumeExport();
      const text = exportAsPlainText();
      const sections = text.split(/\n(?=[A-Z][A-Z\s]+\n={20})/);
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: sections.flatMap((section) => {
              const lines = section.split("\n").filter((l) => l.trim());
              const result = [];
              lines.forEach((line, index) => {
                if (line.match(/^={20}$/)) {
                  return;
                }
                if (index === 0 && line.length < 60 && line.match(/^[A-Z][A-Z\s]+$/)) {
                  result.push(
                    new Paragraph({
                      text: line,
                      heading: HeadingLevel.HEADING_1,
                      spacing: { after: 300, before: 200 }
                    })
                  );
                } else if (line.startsWith("•")) {
                  result.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: line
                        })
                      ],
                      bullet: {
                        level: 0
                      },
                      spacing: { after: 100 }
                    })
                  );
                } else {
                  result.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: line
                        })
                      ],
                      spacing: { after: 100 }
                    })
                  );
                }
              });
              return result;
            })
          }
        ]
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = (void 0).createElement("a");
      link.href = url;
      link.download = "Resume.docx";
      (void 0).body.appendChild(link);
      link.click();
      (void 0).body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting resume to DOCX:", error);
      throw new Error(
        "DOCX export requires the 'docx' package. Please install it: pnpm add docx"
      );
    }
  };
  return {
    exportCoverLetterAsDocx,
    exportResumeAsDocx
  };
}

export { useDocxExport };
//# sourceMappingURL=useDocxExport-DVBDEl5o.mjs.map
