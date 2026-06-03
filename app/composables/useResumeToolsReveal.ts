const STORAGE_KEY = "resume-tools-unlocked";
const HOLD_MS = 3000;

export function useResumeToolsReveal() {
	const toolsUnlocked = ref(false);
	const toast = useToast();
	let holdTimer: ReturnType<typeof setTimeout> | null = null;

	const unlock = () => {
		if (toolsUnlocked.value) return;
		toolsUnlocked.value = true;
		sessionStorage.setItem(STORAGE_KEY, "1");
		toast.add({
			title: "Resume tools unlocked",
			description:
				"Download and cover letter options are visible for this session.",
			color: "success",
			icon: "i-heroicons-check-circle",
		});
	};

	onMounted(() => {
		if (sessionStorage.getItem(STORAGE_KEY) === "1") {
			toolsUnlocked.value = true;
		}
	});

	const clearHoldTimer = () => {
		if (holdTimer) {
			clearTimeout(holdTimer);
			holdTimer = null;
		}
	};

	const startHoldTimer = () => {
		clearHoldTimer();
		holdTimer = setTimeout(unlock, HOLD_MS);
	};

	onBeforeUnmount(clearHoldTimer);

	const headingPressHandlers = {
		onMousedown: startHoldTimer,
		onMouseup: clearHoldTimer,
		onMouseleave: clearHoldTimer,
		onTouchstart: startHoldTimer,
		onTouchend: clearHoldTimer,
		onTouchcancel: clearHoldTimer,
	};

	return { toolsUnlocked, headingPressHandlers };
}
