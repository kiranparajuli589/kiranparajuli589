// DOCX Export functionality
// Note: This requires the 'docx' package to be installed
// Run: pnpm add docx

export function useDocxExport() {
	const exportCoverLetterAsDocx = async (
		content: string,
		companyName: string,
		position: string,
	): Promise<void> => {
		try {
			// Dynamic import to avoid bundle size if not used
			const { Document, Packer, Paragraph, TextRun, HeadingLevel } =
				await import("docx");

			// Split content into paragraphs
			const lines = content.split("\n").filter((line) => line.trim());

			const doc = new Document({
				sections: [
					{
						properties: {},
						children: lines.map((line) => {
							// Detect headings (lines that are short and don't end with punctuation)
							if (
								line.length < 60 &&
								!line.match(/[.!?]$/) &&
								line.match(/^[A-Z]/)
							) {
								return new Paragraph({
									text: line,
									heading: HeadingLevel.HEADING_2,
									spacing: { after: 200 },
								});
							}
							// Regular paragraph
							return new Paragraph({
								children: [
									new TextRun({
										text: line,
									}),
								],
								spacing: { after: 100 },
							});
						}),
					},
				],
			});

			const blob = await Packer.toBlob(doc);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `${companyName}_${position}_CoverLetter.docx`.replace(
				/\s+/g,
				"_",
			);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error exporting to DOCX:", error);
			throw new Error(
				"DOCX export requires the 'docx' package. Please install it: pnpm add docx",
			);
		}
	};

	const exportResumeAsDocx = async (): Promise<void> => {
		try {
			const { Document, Packer, Paragraph, TextRun, HeadingLevel } =
				await import("docx");
			const { useResumeExport } = await import("./useResumeExport");

			const { exportAsPlainText } = useResumeExport();
			const text = exportAsPlainText();

			// Split into sections
			const sections = text.split(/\n(?=[A-Z][A-Z\s]+\n={20})/);

			const doc = new Document({
				sections: [
					{
						properties: {},
						children: sections.flatMap((section) => {
							const lines = section.split("\n").filter((l) => l.trim());
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							const result: any[] = [];

							lines.forEach((line, index) => {
								if (line.match(/^={20}$/)) {
									// Skip separator lines
									return;
								}
								if (
									index === 0 &&
									line.length < 60 &&
									line.match(/^[A-Z][A-Z\s]+$/)
								) {
									// Section heading
									result.push(
										new Paragraph({
											text: line,
											heading: HeadingLevel.HEADING_1,
											spacing: { after: 300, before: 200 },
										}),
									);
								} else if (line.startsWith("•")) {
									// Bullet point
									result.push(
										new Paragraph({
											children: [
												new TextRun({
													text: line,
												}),
											],
											bullet: {
												level: 0,
											},
											spacing: { after: 100 },
										}),
									);
								} else {
									// Regular paragraph
									result.push(
										new Paragraph({
											children: [
												new TextRun({
													text: line,
												}),
											],
											spacing: { after: 100 },
										}),
									);
								}
							});

							return result;
						}),
					},
				],
			});

			const blob = await Packer.toBlob(doc);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "Resume.docx";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error exporting resume to DOCX:", error);
			throw new Error(
				"DOCX export requires the 'docx' package. Please install it: pnpm add docx",
			);
		}
	};

	return {
		exportCoverLetterAsDocx,
		exportResumeAsDocx,
	};
}
