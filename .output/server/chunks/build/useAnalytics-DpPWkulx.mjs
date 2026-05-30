import { s as injectConfigProviderContext } from './server.mjs';
import * as vue from 'vue';
import { ref, computed } from 'vue';

function useDirection(dir) {
  const context = injectConfigProviderContext({ dir: ref("ltr") });
  return computed(() => dir?.value || context.dir?.value || "ltr");
}
let count = 0;
function useId(deterministicId, prefix = "reka") {
  if ("useId" in vue) return `${prefix}-${vue.useId?.()}`;
  const configProviderContext = injectConfigProviderContext({ useId: void 0 });
  if (configProviderContext.useId) return `${prefix}-${configProviderContext.useId()}`;
  return `${prefix}-${++count}`;
}
const defaultAnalytics = {
  pdfDownloads: 0,
  coverLetterGenerations: 0,
  plainTextDownloads: 0
};
function useAnalytics() {
  const loadAnalytics = () => {
    return defaultAnalytics;
  };
  const trackPdfDownload = () => {
    const analytics = loadAnalytics();
    analytics.pdfDownloads += 1;
    analytics.lastPdfDownload = (/* @__PURE__ */ new Date()).toISOString();
  };
  const trackCoverLetterGeneration = () => {
    const analytics = loadAnalytics();
    analytics.coverLetterGenerations += 1;
    analytics.lastCoverLetterGeneration = (/* @__PURE__ */ new Date()).toISOString();
  };
  const trackPlainTextDownload = () => {
    const analytics = loadAnalytics();
    analytics.plainTextDownloads += 1;
    analytics.lastPlainTextDownload = (/* @__PURE__ */ new Date()).toISOString();
  };
  const getAnalytics = () => {
    return loadAnalytics();
  };
  const resetAnalytics = () => {
  };
  return {
    trackPdfDownload,
    trackCoverLetterGeneration,
    trackPlainTextDownload,
    getAnalytics,
    resetAnalytics
  };
}

export { useDirection as a, useId as b, useAnalytics as u };
//# sourceMappingURL=useAnalytics-DpPWkulx.mjs.map
