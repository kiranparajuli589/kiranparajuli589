import type { Ref } from "vue";

export const useCoverLetterActions = (
	coverLetter: Ref<string>,
	companyName: Ref<string>,
	position: Ref<string>,
	showToast: (message: string, type?: "success" | "error") => void,
) => {
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(coverLetter.value);
			showToast("Cover letter copied to clipboard!");
		} catch (err) {
			console.error("Failed to copy:", err);
			showToast("Failed to copy to clipboard. Please try again.", "error");
		}
	};

	const downloadAsTxt = () => {
		try {
			const blob = new Blob([coverLetter.value], { type: "text/plain" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `cover-letter-${companyName.value.replace(/\s+/g, "-").toLowerCase()}-${position.value.replace(/\s+/g, "-").toLowerCase()}.txt`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			showToast("Cover letter downloaded as TXT!");
		} catch (err) {
			console.error("Failed to download:", err);
			showToast("Failed to download file. Please try again.", "error");
		}
	};

	const downloadAsPdf = () => {
		const printWindow = window.open("", "_blank");
		if (!printWindow) {
			alert("Please allow pop-ups to download PDF");
			return;
		}

		const htmlContent = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Cover Letter - ${companyName.value}</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			max-width: 800px;
			margin: 40px auto;
			padding: 20px;
			line-height: 1.6;
			color: #333;
		}
		.date {
			text-align: right;
			margin-bottom: 30px;
		}
		.content {
			white-space: pre-wrap;
		}
		@media print {
			body {
				margin: 0;
				padding: 20px;
			}
		}
	</style>
</head>
<body>
	<div class="content">${coverLetter.value.replace(/\n/g, "<br>")}</div>
</body>
</html>
		`;

		printWindow.document.write(htmlContent);
		printWindow.document.close();

		// Wait for content to load, then print
		setTimeout(() => {
			printWindow.print();
		}, 500);
	};

	const downloadAsDocx = async () => {
		try {
			const { useDocxExport } = await import("./useDocxExport");
			const { exportCoverLetterAsDocx } = useDocxExport();
			await exportCoverLetterAsDocx(
				coverLetter.value,
				companyName.value,
				position.value,
			);
			showToast("Cover letter downloaded as DOCX!");
		} catch (error: any) {
			console.error("Failed to download DOCX:", error);
			showToast(
				error.message || "Failed to export DOCX. Please try again.",
				"error",
			);
		}
	};

	return {
		copyToClipboard,
		downloadAsTxt,
		downloadAsPdf,
		downloadAsDocx,
	};
};
