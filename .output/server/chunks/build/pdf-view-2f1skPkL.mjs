import { defineComponent, useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pdf-view",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pdf-view" }, _attrs))} data-v-9d8141b8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/pdf-view.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pdfView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d8141b8"]]);

export { pdfView as default };
//# sourceMappingURL=pdf-view-2f1skPkL.mjs.map
