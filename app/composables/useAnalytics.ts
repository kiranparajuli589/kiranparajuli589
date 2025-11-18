const ANALYTICS_KEY = "resume-analytics";

export interface AnalyticsData {
	pdfDownloads: number;
	coverLetterGenerations: number;
	plainTextDownloads: number;
	lastPdfDownload?: string;
	lastCoverLetterGeneration?: string;
	lastPlainTextDownload?: string;
}

const defaultAnalytics: AnalyticsData = {
	pdfDownloads: 0,
	coverLetterGenerations: 0,
	plainTextDownloads: 0,
};

export function useAnalytics() {
	const loadAnalytics = (): AnalyticsData => {
		if (typeof window === "undefined") return defaultAnalytics;

		try {
			const stored = localStorage.getItem(ANALYTICS_KEY);
			if (stored) {
				return { ...defaultAnalytics, ...JSON.parse(stored) };
			}
		} catch (error) {
			console.error("Error loading analytics:", error);
		}

		return defaultAnalytics;
	};

	const saveAnalytics = (data: AnalyticsData) => {
		if (typeof window === "undefined") return;

		try {
			localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
		} catch (error) {
			console.error("Error saving analytics:", error);
		}
	};

	const trackPdfDownload = () => {
		const analytics = loadAnalytics();
		analytics.pdfDownloads += 1;
		analytics.lastPdfDownload = new Date().toISOString();
		saveAnalytics(analytics);
	};

	const trackCoverLetterGeneration = () => {
		const analytics = loadAnalytics();
		analytics.coverLetterGenerations += 1;
		analytics.lastCoverLetterGeneration = new Date().toISOString();
		saveAnalytics(analytics);
	};

	const trackPlainTextDownload = () => {
		const analytics = loadAnalytics();
		analytics.plainTextDownloads += 1;
		analytics.lastPlainTextDownload = new Date().toISOString();
		saveAnalytics(analytics);
	};

	const getAnalytics = (): AnalyticsData => {
		return loadAnalytics();
	};

	const resetAnalytics = () => {
		saveAnalytics(defaultAnalytics);
	};

	return {
		trackPdfDownload,
		trackCoverLetterGeneration,
		trackPlainTextDownload,
		getAnalytics,
		resetAnalytics,
	};
}
