import { ref, onMounted } from "vue";

export interface SavedCoverLetter {
	id: string;
	companyName: string;
	position: string;
	jobDescription: string;
	content: string;
	createdAt: string;
	timestamp: number;
}

const STORAGE_KEY = "cover-letter-recent";
const MAX_SAVED_LETTERS = 10;

export const useCoverLetterStorage = () => {
	const recentCoverLetters = ref<SavedCoverLetter[]>([]);

	const loadRecentCoverLetters = (): SavedCoverLetter[] => {
		try {
			if (typeof window !== "undefined") {
				const stored = localStorage.getItem(STORAGE_KEY);
				if (stored) {
					return JSON.parse(stored);
				}
			}
		} catch (error) {
			console.error("Failed to load recent cover letters:", error);
		}
		return [];
	};

	const saveCoverLetter = (
		companyName: string,
		position: string,
		jobDescription: string,
		content: string,
	) => {
		if (!content) return;

		const savedLetter: SavedCoverLetter = {
			id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			companyName,
			position,
			jobDescription,
			content,
			createdAt: new Date().toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			}),
			timestamp: Date.now(),
		};

		try {
			const existing = loadRecentCoverLetters();
			// Remove if already exists (update scenario)
			const filtered = existing.filter(
				(letter) =>
					letter.companyName !== savedLetter.companyName ||
					letter.position !== savedLetter.position,
			);
			// Add new one at the beginning
			const updated = [savedLetter, ...filtered].slice(0, MAX_SAVED_LETTERS);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
			recentCoverLetters.value = updated;
		} catch (error) {
			console.error("Failed to save cover letter:", error);
		}
	};

	const deleteCoverLetter = (id: string) => {
		try {
			const updated = recentCoverLetters.value.filter(
				(letter) => letter.id !== id,
			);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
			recentCoverLetters.value = updated;
			return true;
		} catch (error) {
			console.error("Failed to delete cover letter:", error);
			return false;
		}
	};

	const clearAllRecent = () => {
		try {
			localStorage.removeItem(STORAGE_KEY);
			recentCoverLetters.value = [];
			return true;
		} catch (error) {
			console.error("Failed to clear cover letters:", error);
			return false;
		}
	};

	// Load recent cover letters on mount
	onMounted(() => {
		if (typeof window !== "undefined") {
			recentCoverLetters.value = loadRecentCoverLetters();
		}
	});

	return {
		recentCoverLetters,
		saveCoverLetter,
		deleteCoverLetter,
		clearAllRecent,
		loadRecentCoverLetters,
	};
};
