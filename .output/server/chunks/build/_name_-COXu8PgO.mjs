import { _ as _sfc_main$1 } from './Skeleton-CpedCoBy.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { h as htmlMark } from './utils-DjzuE-8B.mjs';
import { n as useRoute } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'highlight.js';
import 'htmlmark';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[name]",
  __ssrInlineRender: true,
  setup(__props) {
    htmlMark();
    const route = useRoute();
    const emptyFrontMatter = {
      title: "",
      date: "",
      tags: [],
      fileName: "",
      filePath: "",
      contentLength: 0
    };
    const frontMatter = ref(emptyFrontMatter);
    const blogContent = ref("");
    `/blogBase/${route.params.name}.md`;
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USkeleton = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))} data-v-6e18fefe>`);
      if (loading.value) {
        _push(`<div data-v-6e18fefe>`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-64 mb-4" }, null, _parent));
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-64 mb-4" }, null, _parent));
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-64 mb-4" }, null, _parent));
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-64 mb-4" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div data-v-6e18fefe><h1 data-v-6e18fefe>${ssrInterpolate(frontMatter.value.title)}</h1><p data-v-6e18fefe>${ssrInterpolate(new Date(frontMatter.value.date).toDateString())}</p><div class="blog-tags flex flex-wrap gap-2 mt-4" data-v-6e18fefe><!--[-->`);
        ssrRenderList(frontMatter.value.tags, (tag, index) => {
          _push(`<span class="bg-gray-100 px-3 py-1 rounded-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-700" data-v-6e18fefe>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><br data-v-6e18fefe><div class="blog-content bg-white dark:bg-gray-900 pt-6 rounded-xl p-4" data-v-6e18fefe>${blogContent.value ?? ""}</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[name].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _name_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6e18fefe"]]);

export { _name_ as default };
//# sourceMappingURL=_name_-COXu8PgO.mjs.map
