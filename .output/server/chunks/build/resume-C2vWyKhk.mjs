import { u as useHead, m as _sfc_main$8, b as _sfc_main$d, l as useAppStore, h as useAppConfig, j as useForwardPropsEmits, r as reactivePick, t as tv, k as get, e as useForwardExpose, d as createContext, P as Primitive, c as useVModel, f as useEventListener, g as Presence_default, i as isNullish } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toRefs, computed, unref, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, withModifiers, renderList, createTextVNode, useSlots, renderSlot, withKeys, ref, watch, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAnalytics, a as useDirection, b as useId } from './useAnalytics-DpPWkulx.mjs';
import { R as Resume } from './resume-CN0FSVbL.mjs';
import { g as getAssetUrl } from './utils-DjzuE-8B.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as _sfc_main$5 } from './Card-Ql4XOehz.mjs';
import { u as useSeo, c as createPersonStructuredData, b as createCollectionPageStructuredData } from './useSeo--CXWwwl_.mjs';
import { useResumeExport } from './useResumeExport-lKJqarjE.mjs';
import { C as isEqual } from '../nitro/nitro.mjs';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
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
import 'highlight.js';
import 'htmlmark';

function isValueEqualOrExist(base, current) {
  if (isNullish(base)) return false;
  if (Array.isArray(base)) return base.some((val) => isEqual(val, current));
  else return isEqual(base, current);
}
const ignoredElement = ["INPUT", "TEXTAREA"];
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
  if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
  const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
  const [right, left, up, down, home, end] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ];
  const goingVertical = up || down;
  const goingHorizontal = right || left;
  if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
  const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
  if (!allCollectionItems.length) return null;
  if (preventScroll) e.preventDefault();
  let item = null;
  if (goingHorizontal || goingVertical) {
    const goForward = goingVertical ? down : dir === "ltr" ? right : left;
    item = findNextFocusableElement(allCollectionItems, currentElement, {
      goForward,
      loop
    });
  } else if (home) item = allCollectionItems.at(0) || null;
  else if (end) item = allCollectionItems.at(-1) || null;
  if (focus) item?.focus();
  return item;
}
function findNextFocusableElement(elements, currentElement, options, iterations = elements.length) {
  if (--iterations === 0) return null;
  const index = elements.indexOf(currentElement);
  const newIndex = options.goForward ? index + 1 : index - 1;
  if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
  const adjustedNewIndex = (newIndex + elements.length) % elements.length;
  const candidate = elements[adjustedNewIndex];
  if (!candidate) return null;
  const isDisabled = candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false";
  if (isDisabled) return findNextFocusableElement(elements, candidate, options, iterations);
  return candidate;
}
const [injectCollapsibleRootContext, provideCollapsibleRootContext] = createContext("CollapsibleRoot");
var CollapsibleRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: false
    },
    unmountOnHide: {
      type: Boolean,
      required: false,
      default: true
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: ["update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const { disabled, unmountOnHide } = toRefs(props);
    provideCollapsibleRootContext({
      contentId: "",
      disabled,
      open,
      unmountOnHide,
      onOpenToggle: () => {
        if (disabled.value) return;
        open.value = !open.value;
      }
    });
    __expose({ open });
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": props.asChild,
        "data-state": unref(open) ? "open" : "closed",
        "data-disabled": unref(disabled) ? "" : void 0
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-state",
        "data-disabled"
      ]);
    };
  }
});
var CollapsibleRoot_default = CollapsibleRoot_vue_vue_type_script_setup_true_lang_default;
var CollapsibleContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "CollapsibleContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: ["contentFound"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectCollapsibleRootContext();
    rootContext.contentId ||= useId(void 0, "reka-collapsible-content");
    const presentRef = ref();
    const { forwardRef, currentElement } = useForwardExpose();
    const width = ref(0);
    const height = ref(0);
    const isOpen = computed(() => rootContext.open.value);
    const isMountAnimationPrevented = ref(isOpen.value);
    const currentStyle = ref();
    watch(() => [isOpen.value, presentRef.value?.present], async () => {
      await nextTick();
      const node = currentElement.value;
      if (!node) return;
      currentStyle.value = currentStyle.value || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      height.value = rect.height;
      width.value = rect.width;
      if (!isMountAnimationPrevented.value) {
        node.style.transitionDuration = currentStyle.value.transitionDuration;
        node.style.animationName = currentStyle.value.animationName;
      }
    }, { immediate: true });
    const skipAnimation = computed(() => isMountAnimationPrevented.value && rootContext.open.value);
    useEventListener(currentElement, "beforematch", (ev) => {
      requestAnimationFrame(() => {
        rootContext.onOpenToggle();
        emits("contentFound");
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence_default), {
        ref_key: "presentRef",
        ref: presentRef,
        present: _ctx.forceMount || unref(rootContext).open.value,
        "force-mount": true
      }, {
        default: withCtx(({ present }) => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
          id: unref(rootContext).contentId,
          ref: unref(forwardRef),
          "as-child": props.asChild,
          as: _ctx.as,
          hidden: !present ? unref(rootContext).unmountOnHide.value ? "" : "until-found" : void 0,
          "data-state": skipAnimation.value ? void 0 : unref(rootContext).open.value ? "open" : "closed",
          "data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
          style: {
            [`--reka-collapsible-content-height`]: `${height.value}px`,
            [`--reka-collapsible-content-width`]: `${width.value}px`
          }
        }), {
          default: withCtx(() => [(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)]),
          _: 2
        }, 1040, [
          "id",
          "as-child",
          "as",
          "hidden",
          "data-state",
          "data-disabled",
          "style"
        ])]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var CollapsibleContent_default = CollapsibleContent_vue_vue_type_script_setup_true_lang_default;
var CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleTrigger",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectCollapsibleRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        type: _ctx.as === "button" ? "button" : void 0,
        as: _ctx.as,
        "as-child": props.asChild,
        "aria-controls": unref(rootContext).contentId,
        "aria-expanded": unref(rootContext).open.value,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        "data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
        disabled: unref(rootContext).disabled?.value,
        onClick: unref(rootContext).onOpenToggle
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "type",
        "as",
        "as-child",
        "aria-controls",
        "aria-expanded",
        "data-state",
        "data-disabled",
        "disabled",
        "onClick"
      ]);
    };
  }
});
var CollapsibleTrigger_default = CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default;
function validateProps({ type, defaultValue, modelValue }) {
  const value = modelValue || defaultValue;
  const canTypeBeInferred = modelValue !== void 0 || defaultValue !== void 0;
  if (canTypeBeInferred) return Array.isArray(value) ? "multiple" : "single";
  else return type ?? "single";
}
function getDefaultType({ type, defaultValue, modelValue }) {
  if (type) return type;
  return validateProps({
    type,
    defaultValue,
    modelValue
  });
}
function getDefaultValue({ type, defaultValue }) {
  if (defaultValue !== void 0) return defaultValue;
  return type === "single" ? void 0 : [];
}
function useSingleOrMultipleValue(props, emits) {
  const type = computed(() => getDefaultType(props));
  const modelValue = useVModel(props, "modelValue", emits, {
    defaultValue: getDefaultValue(props),
    passive: props.modelValue === void 0,
    deep: true
  });
  function changeModelValue(value) {
    if (type.value === "single") modelValue.value = isEqual(value, modelValue.value) ? void 0 : value;
    else {
      const modelValueArray = Array.isArray(modelValue.value) ? [...modelValue.value || []] : [modelValue.value].filter(Boolean);
      if (isValueEqualOrExist(modelValueArray, value)) {
        const index = modelValueArray.findIndex((i) => isEqual(i, value));
        modelValueArray.splice(index, 1);
      } else modelValueArray.push(value);
      modelValue.value = modelValueArray;
    }
  }
  const isSingle = computed(() => type.value === "single");
  return {
    modelValue,
    changeModelValue,
    isSingle
  };
}
const [injectAccordionRootContext, provideAccordionRootContext] = createContext("AccordionRoot");
var AccordionRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "AccordionRoot",
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    dir: {
      type: String,
      required: false
    },
    orientation: {
      type: String,
      required: false,
      default: "vertical"
    },
    unmountOnHide: {
      type: Boolean,
      required: false,
      default: true
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    modelValue: {
      type: null,
      required: false
    },
    defaultValue: {
      type: null,
      required: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { dir, disabled, unmountOnHide } = toRefs(props);
    const direction = useDirection(dir);
    const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);
    const { forwardRef, currentElement: parentElement } = useForwardExpose();
    provideAccordionRootContext({
      disabled,
      direction,
      orientation: props.orientation,
      parentElement,
      isSingle,
      collapsible: props.collapsible,
      modelValue,
      changeModelValue,
      unmountOnHide
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});
var AccordionRoot_default = AccordionRoot_vue_vue_type_script_setup_true_lang_default;
var AccordionItemState = /* @__PURE__ */ (function(AccordionItemState$1) {
  AccordionItemState$1["Open"] = "open";
  AccordionItemState$1["Closed"] = "closed";
  return AccordionItemState$1;
})(AccordionItemState || {});
const [injectAccordionItemContext, provideAccordionItemContext] = createContext("AccordionItem");
var AccordionItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "AccordionItem",
  props: {
    disabled: {
      type: Boolean,
      required: false
    },
    value: {
      type: String,
      required: true
    },
    unmountOnHide: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const open = computed(() => rootContext.isSingle.value ? props.value === rootContext.modelValue.value : Array.isArray(rootContext.modelValue.value) && rootContext.modelValue.value.includes(props.value));
    const disabled = computed(() => {
      return rootContext.disabled.value || props.disabled;
    });
    const dataDisabled = computed(() => disabled.value ? "" : void 0);
    const dataState = computed(() => open.value ? AccordionItemState.Open : AccordionItemState.Closed);
    __expose({
      open,
      dataDisabled
    });
    const { currentRef, currentElement } = useForwardExpose();
    provideAccordionItemContext({
      open,
      dataState,
      disabled,
      dataDisabled,
      triggerId: "",
      currentRef,
      currentElement,
      value: computed(() => props.value)
    });
    function handleArrowKey(e) {
      const target = e.target;
      const allCollectionItems = Array.from(rootContext.parentElement.value?.querySelectorAll("[data-reka-collection-item]") ?? []);
      const collectionItemIndex = allCollectionItems.findIndex((item) => item === target);
      if (collectionItemIndex === -1) return null;
      useArrowNavigation(e, target, rootContext.parentElement.value, {
        arrowKeyOptions: rootContext.orientation,
        dir: rootContext.direction.value,
        focus: true
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollapsibleRoot_default), {
        "data-orientation": unref(rootContext).orientation,
        "data-disabled": dataDisabled.value,
        "data-state": dataState.value,
        disabled: disabled.value,
        open: open.value,
        as: props.as,
        "as-child": props.asChild,
        "unmount-on-hide": unref(rootContext).unmountOnHide.value,
        onKeydown: withKeys(handleArrowKey, [
          "up",
          "down",
          "left",
          "right",
          "home",
          "end"
        ])
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: open.value })]),
        _: 3
      }, 8, [
        "data-orientation",
        "data-disabled",
        "data-state",
        "disabled",
        "open",
        "as",
        "as-child",
        "unmount-on-hide"
      ]);
    };
  }
});
var AccordionItem_default = AccordionItem_vue_vue_type_script_setup_true_lang_default;
var AccordionContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "AccordionContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const itemContext = injectAccordionItemContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollapsibleContent_default), {
        role: "region",
        "as-child": props.asChild,
        as: _ctx.as,
        "force-mount": props.forceMount,
        "aria-labelledby": unref(itemContext).triggerId,
        "data-state": unref(itemContext).dataState.value,
        "data-disabled": unref(itemContext).dataDisabled.value,
        "data-orientation": unref(rootContext).orientation,
        style: {
          "--reka-accordion-content-width": "var(--reka-collapsible-content-width)",
          "--reka-accordion-content-height": "var(--reka-collapsible-content-height)"
        },
        onContentFound: _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(unref(itemContext).value.value))
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "as-child",
        "as",
        "force-mount",
        "aria-labelledby",
        "data-state",
        "data-disabled",
        "data-orientation"
      ]);
    };
  }
});
var AccordionContent_default = AccordionContent_vue_vue_type_script_setup_true_lang_default;
var AccordionHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "AccordionHeader",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "h3"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const itemContext = injectAccordionItemContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: props.as,
        "as-child": props.asChild,
        "data-orientation": unref(rootContext).orientation,
        "data-state": unref(itemContext).dataState.value,
        "data-disabled": unref(itemContext).dataDisabled.value
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-orientation",
        "data-state",
        "data-disabled"
      ]);
    };
  }
});
var AccordionHeader_default = AccordionHeader_vue_vue_type_script_setup_true_lang_default;
var AccordionTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "AccordionTrigger",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const itemContext = injectAccordionItemContext();
    itemContext.triggerId ||= useId(void 0, "reka-accordion-trigger");
    function changeItem() {
      const triggerDisabled = rootContext.isSingle.value && itemContext.open.value && !rootContext.collapsible;
      if (itemContext.disabled.value || triggerDisabled) return;
      rootContext.changeModelValue(itemContext.value.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollapsibleTrigger_default), {
        id: unref(itemContext).triggerId,
        ref: unref(itemContext).currentRef,
        "data-reka-collection-item": "",
        as: props.as,
        "as-child": props.asChild,
        "aria-disabled": unref(itemContext).disabled.value || void 0,
        "aria-expanded": unref(itemContext).open.value || false,
        "data-disabled": unref(itemContext).dataDisabled.value,
        "data-orientation": unref(rootContext).orientation,
        "data-state": unref(itemContext).dataState.value,
        disabled: unref(itemContext).disabled.value,
        onClick: changeItem
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "id",
        "as",
        "as-child",
        "aria-disabled",
        "aria-expanded",
        "data-disabled",
        "data-orientation",
        "data-state",
        "disabled"
      ]);
    };
  }
});
var AccordionTrigger_default = AccordionTrigger_vue_vue_type_script_setup_true_lang_default;
const theme = {
  "slots": {
    "root": "w-full",
    "item": "border-b border-default last:border-b-0",
    "header": "flex",
    "trigger": "group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0",
    "content": "data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none",
    "body": "text-sm pb-3.5",
    "leadingIcon": "shrink-0 size-5",
    "trailingIcon": "shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200",
    "label": "text-start break-words"
  },
  "variants": {
    "disabled": {
      "true": {
        "trigger": "cursor-not-allowed opacity-75"
      }
    }
  }
};
const _sfc_main$4 = {
  __name: "UAccordion",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    trailingIcon: { type: [String, Object], required: false },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    collapsible: { type: Boolean, required: false, default: true },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    type: { type: String, required: false, default: "single" },
    disabled: { type: Boolean, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "collapsible", "defaultValue", "disabled", "modelValue", "unmountOnHide"), emits);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.accordion || {} })({
      disabled: props.disabled
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionRoot_default), mergeProps(unref(rootProps), {
        type: __props.type,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(props.items, (item, index) => {
              _push2(ssrRenderComponent(unref(AccordionItem_default), {
                key: index,
                value: item.value || String(index),
                disabled: item.disabled,
                class: ui.value.item({ class: [props.ui?.item, item.ui?.item, item.class] })
              }, {
                default: withCtx(({ open }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(AccordionHeader_default), {
                      as: "div",
                      class: ui.value.header({ class: [props.ui?.header, item.ui?.header] })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(AccordionTrigger_default), {
                            class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                ssrRenderSlot(_ctx.$slots, "leading", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => {
                                  if (item.icon) {
                                    _push5(ssrRenderComponent(_sfc_main$d, {
                                      name: item.icon,
                                      class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                }, _push5, _parent5, _scopeId4);
                                if (unref(get)(item, props.labelKey) || !!slots.default) {
                                  _push5(`<span class="${ssrRenderClass(ui.value.label({ class: [props.ui?.label, item.ui?.label] }))}"${_scopeId4}>`);
                                  ssrRenderSlot(_ctx.$slots, "default", {
                                    item,
                                    index,
                                    open
                                  }, () => {
                                    _push5(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                  }, _push5, _parent5, _scopeId4);
                                  _push5(`</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                ssrRenderSlot(_ctx.$slots, "trailing", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => {
                                  _push5(ssrRenderComponent(_sfc_main$d, {
                                    name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                    class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                                  }, null, _parent5, _scopeId4));
                                }, _push5, _parent5, _scopeId4);
                              } else {
                                return [
                                  renderSlot(_ctx.$slots, "leading", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                      key: 0,
                                      name: item.icon,
                                      class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                  ]),
                                  unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                                  }, [
                                    renderSlot(_ctx.$slots, "default", {
                                      item,
                                      index,
                                      open
                                    }, () => [
                                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                    ])
                                  ], 2)) : createCommentVNode("", true),
                                  renderSlot(_ctx.$slots, "trailing", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    createVNode(_sfc_main$d, {
                                      name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                      class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                                    }, null, 8, ["name", "class"])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(AccordionTrigger_default), {
                              class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "leading", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => [
                                  item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                    key: 0,
                                    name: item.icon,
                                    class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                ]),
                                unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                                }, [
                                  renderSlot(_ctx.$slots, "default", {
                                    item,
                                    index,
                                    open
                                  }, () => [
                                    createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                  ])
                                ], 2)) : createCommentVNode("", true),
                                renderSlot(_ctx.$slots, "trailing", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => [
                                  createVNode(_sfc_main$d, {
                                    name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                    class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                                  }, null, 8, ["name", "class"])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`]) {
                      _push3(ssrRenderComponent(unref(AccordionContent_default), {
                        class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderSlot(_ctx.$slots, item.slot || "content", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => {
                              _push4(`<div class="${ssrRenderClass(ui.value.body({ class: [props.ui?.body, item.ui?.body] }))}"${_scopeId3}>`);
                              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => {
                                _push4(`${ssrInterpolate(item.content)}`);
                              }, _push4, _parent4, _scopeId3);
                              _push4(`</div>`);
                            }, _push4, _parent4, _scopeId3);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, item.slot || "content", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                createVNode("div", {
                                  class: ui.value.body({ class: [props.ui?.body, item.ui?.body] })
                                }, [
                                  renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    createTextVNode(toDisplayString(item.content), 1)
                                  ])
                                ], 2)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(unref(AccordionHeader_default), {
                        as: "div",
                        class: ui.value.header({ class: [props.ui?.header, item.ui?.header] })
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(AccordionTrigger_default), {
                            class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "leading", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                  key: 0,
                                  name: item.icon,
                                  class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                              ]),
                              unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                              }, [
                                renderSlot(_ctx.$slots, "default", {
                                  item,
                                  index,
                                  open
                                }, () => [
                                  createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                ])
                              ], 2)) : createCommentVNode("", true),
                              renderSlot(_ctx.$slots, "trailing", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                createVNode(_sfc_main$d, {
                                  name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                  class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                                }, null, 8, ["name", "class"])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1032, ["class"]),
                      item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`] ? (openBlock(), createBlock(unref(AccordionContent_default), {
                        key: 0,
                        class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, item.slot || "content", {
                            item,
                            index,
                            open,
                            ui: ui.value
                          }, () => [
                            createVNode("div", {
                              class: ui.value.body({ class: [props.ui?.body, item.ui?.body] })
                            }, [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                createTextVNode(toDisplayString(item.content), 1)
                              ])
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(props.items, (item, index) => {
                return openBlock(), createBlock(unref(AccordionItem_default), {
                  key: index,
                  value: item.value || String(index),
                  disabled: item.disabled,
                  class: ui.value.item({ class: [props.ui?.item, item.ui?.item, item.class] })
                }, {
                  default: withCtx(({ open }) => [
                    createVNode(unref(AccordionHeader_default), {
                      as: "div",
                      class: ui.value.header({ class: [props.ui?.header, item.ui?.header] })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(AccordionTrigger_default), {
                          class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "leading", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                key: 0,
                                name: item.icon,
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                            ]),
                            unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item,
                                index,
                                open
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              createVNode(_sfc_main$d, {
                                name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                              }, null, 8, ["name", "class"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ]),
                      _: 2
                    }, 1032, ["class"]),
                    item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`] ? (openBlock(), createBlock(unref(AccordionContent_default), {
                      key: 0,
                      class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index,
                          open,
                          ui: ui.value
                        }, () => [
                          createVNode("div", {
                            class: ui.value.body({ class: [props.ui?.body, item.ui?.body] })
                          }, [
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              createTextVNode(toDisplayString(item.content), 1)
                            ])
                          ], 2)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["value", "disabled", "class"]);
              }), 128))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.1.0_@babel+parser@7.28.5_change-case@5.4.4_db0@0.3.4_embla-carousel@8.6.0_io_3b5b7d656f8d69f13a3726b0c89ea276/node_modules/@nuxt/ui/dist/runtime/components/Accordion.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ItemList",
  __ssrInlineRender: true,
  props: {
    items: {},
    noSplit: { type: Boolean, default: false },
    maxItemsInAColumn: { default: 3 }
  },
  setup(__props) {
    const props = __props;
    const dividedItems = computed(() => {
      if (props.noSplit) return [props.items];
      const maxItems = props.maxItemsInAColumn;
      if (props.items && props.items.length <= maxItems) {
        return [props.items];
      } else if (props.items) {
        const dividedItems2 = [];
        for (let i = 0; i < props.items.length; i += maxItems) {
          dividedItems2.push(props.items.slice(i, i + maxItems));
        }
        return dividedItems2;
      } else {
        return [];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "item-list flex gap-4" }, _attrs))} data-v-4bae2f78><!--[-->`);
      ssrRenderList(dividedItems.value, (list, listIndex) => {
        _push(`<ul data-v-4bae2f78><!--[-->`);
        ssrRenderList(list, (item, index) => {
          _push(`<li data-v-4bae2f78>${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ul>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ItemList.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ItemList = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-4bae2f78"]]), { __name: "HomeItemList" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ExperienceSection",
  __ssrInlineRender: true,
  setup(__props) {
    const experiences = Resume.experiences;
    const appStore = useAppStore();
    const { isDarkTheme } = toRefs(appStore);
    const accordionItems = computed(() => {
      return experiences.map((exp) => ({
        label: exp.company,
        value: exp.company,
        icon: void 0
      }));
    });
    const getExperienceByCompany = (company) => {
      return experiences.find((e) => e.company === company);
    };
    const getProjectAccordionItems = (company) => {
      const experience = getExperienceByCompany(company);
      if (!experience?.projects) return [];
      return experience.projects.map((proj, index) => ({
        label: proj.name,
        value: `${company}-project-${index}`,
        icon: void 0
      }));
    };
    const getProjectByValue = (value) => {
      if (!value) return void 0;
      const [company, , indexStr] = value.split("-");
      if (!company) return void 0;
      const index = parseInt(indexStr || "0", 10);
      const experience = getExperienceByCompany(company);
      return experience?.projects?.[index];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAccordion = _sfc_main$4;
      const _component_UIcon = _sfc_main$d;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-12" }, _attrs))} data-v-bf99c4a8><h1 class="text-4xl font-bold" data-v-bf99c4a8>My Experiences</h1><div class="text-sm text-gray-500 dark:text-gray-400" data-v-bf99c4a8> Where I had been engaged. </div><div class="section-divider mb-12" data-v-bf99c4a8></div>`);
      _push(ssrRenderComponent(_component_UAccordion, {
        class: "w-full",
        type: "multiple",
        items: unref(accordionItems),
        ui: {
          root: "bg-gray-100 dark:bg-gray-900! rounded-lg overflow-hidden shadow-md main-accordion",
          trigger: "px-4 hover:bg-sky-100 dark:hover:bg-blue-800 transition-colors gap-4 md:gap-2",
          content: "px-4"
        }
      }, {
        leading: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (item.value) {
              _push2(`<!--[--><img height="24px" width="24px" class="w-6 h-6 object-contain" loading="lazy" decoding="async"${ssrRenderAttr("alt", `${getExperienceByCompany(item.value)?.company} logo`)}${ssrRenderAttr(
                "src",
                unref(getAssetUrl)(
                  getExperienceByCompany(item.value)?.companyLogo || "",
                  "company"
                )
              )} data-v-bf99c4a8${_scopeId}><div class="flex items-center gap-2 flex-wrap" data-v-bf99c4a8${_scopeId}><span class="font-semibold" data-v-bf99c4a8${_scopeId}>${ssrInterpolate(getExperienceByCompany(item.value)?.company)}</span><span class="mx-2 text-gray-400" data-v-bf99c4a8${_scopeId}>|</span><span class="text-sm text-gray-600 dark:text-gray-400" data-v-bf99c4a8${_scopeId}>${ssrInterpolate(getExperienceByCompany(item.value)?.roles.join(", "))}</span><span class="mx-2 text-gray-400" data-v-bf99c4a8${_scopeId}>|</span><span class="text-sm text-gray-600 dark:text-gray-400" data-v-bf99c4a8${_scopeId}>${ssrInterpolate(`${getExperienceByCompany(item.value)?.startDate} - ${getExperienceByCompany(item.value)?.endDate}`)}</span>`);
              if (getExperienceByCompany(item.value)?.companyUrl) {
                _push2(`<a class="ml-auto" target="_blank"${ssrRenderAttr("href", getExperienceByCompany(item.value)?.companyUrl || "#")}${ssrRenderAttr("title", getExperienceByCompany(item.value)?.company || "")} data-v-bf99c4a8${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-top-right-on-square",
                  class: "text-xs"
                }, null, _parent2, _scopeId));
                _push2(`</a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              item.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("img", {
                  height: "24px",
                  width: "24px",
                  class: "w-6 h-6 object-contain",
                  loading: "lazy",
                  decoding: "async",
                  alt: `${getExperienceByCompany(item.value)?.company} logo`,
                  src: unref(getAssetUrl)(
                    getExperienceByCompany(item.value)?.companyLogo || "",
                    "company"
                  )
                }, null, 8, ["alt", "src"]),
                createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                  createVNode("span", { class: "font-semibold" }, toDisplayString(getExperienceByCompany(item.value)?.company), 1),
                  createVNode("span", { class: "mx-2 text-gray-400" }, "|"),
                  createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(getExperienceByCompany(item.value)?.roles.join(", ")), 1),
                  createVNode("span", { class: "mx-2 text-gray-400" }, "|"),
                  createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(`${getExperienceByCompany(item.value)?.startDate} - ${getExperienceByCompany(item.value)?.endDate}`), 1),
                  getExperienceByCompany(item.value)?.companyUrl ? (openBlock(), createBlock("a", {
                    key: 0,
                    class: "ml-auto",
                    target: "_blank",
                    href: getExperienceByCompany(item.value)?.companyUrl || "#",
                    title: getExperienceByCompany(item.value)?.company || "",
                    onClick: withModifiers(() => {
                    }, ["stop"])
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-top-right-on-square",
                      class: "text-xs"
                    })
                  ], 8, ["href", "title", "onClick"])) : createCommentVNode("", true)
                ])
              ], 64)) : createCommentVNode("", true)
            ];
          }
        }),
        body: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (item.value) {
              _push2(`<div class="space-y-4" data-v-bf99c4a8${_scopeId}><div data-v-bf99c4a8${_scopeId}>${ssrInterpolate(getExperienceByCompany(item.value)?.description)}</div>`);
              if (getExperienceByCompany(item.value)?.achievements) {
                _push2(`<div data-v-bf99c4a8${_scopeId}><h2 class="mb-4 font-bold" data-v-bf99c4a8${_scopeId}>Achievements:</h2>`);
                _push2(ssrRenderComponent(ItemList, {
                  items: getExperienceByCompany(item.value)?.achievements || [],
                  "no-split": ""
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.value && getExperienceByCompany(item.value)?.projects) {
                _push2(`<div class="space-y-4" data-v-bf99c4a8${_scopeId}><h2 class="mb-4 font-bold" data-v-bf99c4a8${_scopeId}>Projects:</h2>`);
                _push2(ssrRenderComponent(_component_UAccordion, {
                  class: "w-full",
                  type: "multiple",
                  items: item.value ? getProjectAccordionItems(item.value) : [],
                  ui: {
                    root: "bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md",
                    trigger: "px-4 hover:bg-sky-100 dark:hover:bg-blue-800 transition-colors",
                    content: "px-4"
                  }
                }, {
                  leading: withCtx(({ item: projectItem }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (projectItem.value) {
                        _push3(`<div class="flex items-center gap-2" data-v-bf99c4a8${_scopeId2}><h4 class="overflow-hidden text-ellipsis whitespace-nowrap font-semibold flex-1 text-start"${ssrRenderAttr("title", getProjectByValue(projectItem.value)?.name)} data-v-bf99c4a8${_scopeId2}>${ssrInterpolate(getProjectByValue(projectItem.value)?.name)}</h4>`);
                        if (getProjectByValue(projectItem.value)?.badge) {
                          _push3(`<!--[-->`);
                          if (unref(isDarkTheme)) {
                            _push3(`<img height="28" width="auto" class="max-w-[100px] h-7 object-contain" loading="lazy" decoding="async"${ssrRenderAttr("alt", `${getProjectByValue(projectItem.value)?.name} badge`)}${ssrRenderAttr(
                              "src",
                              getProjectByValue(projectItem.value)?.badge?.dark || getProjectByValue(projectItem.value)?.badge?.default
                            )} data-v-bf99c4a8${_scopeId2}>`);
                          } else {
                            _push3(`<img height="28" width="auto" class="max-w-[100px] h-7 object-contain" loading="lazy" decoding="async"${ssrRenderAttr("alt", `${getProjectByValue(projectItem.value)?.name} badge`)}${ssrRenderAttr(
                              "src",
                              getProjectByValue(projectItem.value)?.badge?.light || getProjectByValue(projectItem.value)?.badge?.default
                            )} data-v-bf99c4a8${_scopeId2}>`);
                          }
                          _push3(`<!--]-->`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (getProjectByValue(projectItem.value)?.url) {
                          _push3(`<a target="_blank"${ssrRenderAttr("href", getProjectByValue(projectItem.value)?.url)}${ssrRenderAttr("title", getProjectByValue(projectItem.value)?.name)} data-v-bf99c4a8${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_UIcon, {
                            name: "i-heroicons-arrow-top-right-on-square",
                            class: "text-xs"
                          }, null, _parent3, _scopeId2));
                          _push3(`</a>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        projectItem.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode("h4", {
                            class: "overflow-hidden text-ellipsis whitespace-nowrap font-semibold flex-1 text-start",
                            title: getProjectByValue(projectItem.value)?.name
                          }, toDisplayString(getProjectByValue(projectItem.value)?.name), 9, ["title"]),
                          getProjectByValue(projectItem.value)?.badge ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            unref(isDarkTheme) ? (openBlock(), createBlock("img", {
                              key: 0,
                              height: "28",
                              width: "auto",
                              class: "max-w-[100px] h-7 object-contain",
                              loading: "lazy",
                              decoding: "async",
                              alt: `${getProjectByValue(projectItem.value)?.name} badge`,
                              src: getProjectByValue(projectItem.value)?.badge?.dark || getProjectByValue(projectItem.value)?.badge?.default
                            }, null, 8, ["alt", "src"])) : (openBlock(), createBlock("img", {
                              key: 1,
                              height: "28",
                              width: "auto",
                              class: "max-w-[100px] h-7 object-contain",
                              loading: "lazy",
                              decoding: "async",
                              alt: `${getProjectByValue(projectItem.value)?.name} badge`,
                              src: getProjectByValue(projectItem.value)?.badge?.light || getProjectByValue(projectItem.value)?.badge?.default
                            }, null, 8, ["alt", "src"]))
                          ], 64)) : createCommentVNode("", true),
                          getProjectByValue(projectItem.value)?.url ? (openBlock(), createBlock("a", {
                            key: 1,
                            target: "_blank",
                            href: getProjectByValue(projectItem.value)?.url,
                            title: getProjectByValue(projectItem.value)?.name,
                            onClick: withModifiers(() => {
                            }, ["stop"])
                          }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-arrow-top-right-on-square",
                              class: "text-xs"
                            })
                          ], 8, ["href", "title", "onClick"])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  body: withCtx(({ item: projectItem }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (projectItem.value) {
                        _push3(`<div class="space-y-4" data-v-bf99c4a8${_scopeId2}><div data-v-bf99c4a8${_scopeId2}>${ssrInterpolate(getProjectByValue(projectItem.value)?.description)}</div>`);
                        if (getProjectByValue(projectItem.value)?.job && (getProjectByValue(projectItem.value)?.job?.length || 0) > 0) {
                          _push3(`<div class="mt-4" data-v-bf99c4a8${_scopeId2}><h3 class="mb-3 font-semibold" data-v-bf99c4a8${_scopeId2}>Responsibilities:</h3>`);
                          _push3(ssrRenderComponent(ItemList, {
                            items: getProjectByValue(projectItem.value)?.job || [],
                            "no-split": ""
                          }, null, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        projectItem.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, toDisplayString(getProjectByValue(projectItem.value)?.description), 1),
                          getProjectByValue(projectItem.value)?.job && (getProjectByValue(projectItem.value)?.job?.length || 0) > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-4"
                          }, [
                            createVNode("h3", { class: "mb-3 font-semibold" }, "Responsibilities:"),
                            createVNode(ItemList, {
                              items: getProjectByValue(projectItem.value)?.job || [],
                              "no-split": ""
                            }, null, 8, ["items"])
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              item.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-4"
              }, [
                createVNode("div", null, toDisplayString(getExperienceByCompany(item.value)?.description), 1),
                getExperienceByCompany(item.value)?.achievements ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("h2", { class: "mb-4 font-bold" }, "Achievements:"),
                  createVNode(ItemList, {
                    items: getExperienceByCompany(item.value)?.achievements || [],
                    "no-split": ""
                  }, null, 8, ["items"])
                ])) : createCommentVNode("", true),
                item.value && getExperienceByCompany(item.value)?.projects ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4"
                }, [
                  createVNode("h2", { class: "mb-4 font-bold" }, "Projects:"),
                  createVNode(_component_UAccordion, {
                    class: "w-full",
                    type: "multiple",
                    items: item.value ? getProjectAccordionItems(item.value) : [],
                    ui: {
                      root: "bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md",
                      trigger: "px-4 hover:bg-sky-100 dark:hover:bg-blue-800 transition-colors",
                      content: "px-4"
                    }
                  }, {
                    leading: withCtx(({ item: projectItem }) => [
                      projectItem.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode("h4", {
                          class: "overflow-hidden text-ellipsis whitespace-nowrap font-semibold flex-1 text-start",
                          title: getProjectByValue(projectItem.value)?.name
                        }, toDisplayString(getProjectByValue(projectItem.value)?.name), 9, ["title"]),
                        getProjectByValue(projectItem.value)?.badge ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          unref(isDarkTheme) ? (openBlock(), createBlock("img", {
                            key: 0,
                            height: "28",
                            width: "auto",
                            class: "max-w-[100px] h-7 object-contain",
                            loading: "lazy",
                            decoding: "async",
                            alt: `${getProjectByValue(projectItem.value)?.name} badge`,
                            src: getProjectByValue(projectItem.value)?.badge?.dark || getProjectByValue(projectItem.value)?.badge?.default
                          }, null, 8, ["alt", "src"])) : (openBlock(), createBlock("img", {
                            key: 1,
                            height: "28",
                            width: "auto",
                            class: "max-w-[100px] h-7 object-contain",
                            loading: "lazy",
                            decoding: "async",
                            alt: `${getProjectByValue(projectItem.value)?.name} badge`,
                            src: getProjectByValue(projectItem.value)?.badge?.light || getProjectByValue(projectItem.value)?.badge?.default
                          }, null, 8, ["alt", "src"]))
                        ], 64)) : createCommentVNode("", true),
                        getProjectByValue(projectItem.value)?.url ? (openBlock(), createBlock("a", {
                          key: 1,
                          target: "_blank",
                          href: getProjectByValue(projectItem.value)?.url,
                          title: getProjectByValue(projectItem.value)?.name,
                          onClick: withModifiers(() => {
                          }, ["stop"])
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-top-right-on-square",
                            class: "text-xs"
                          })
                        ], 8, ["href", "title", "onClick"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ]),
                    body: withCtx(({ item: projectItem }) => [
                      projectItem.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, toDisplayString(getProjectByValue(projectItem.value)?.description), 1),
                        getProjectByValue(projectItem.value)?.job && (getProjectByValue(projectItem.value)?.job?.length || 0) > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-4"
                        }, [
                          createVNode("h3", { class: "mb-3 font-semibold" }, "Responsibilities:"),
                          createVNode(ItemList, {
                            items: getProjectByValue(projectItem.value)?.job || [],
                            "no-split": ""
                          }, null, 8, ["items"])
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["items"])
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ExperienceSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ExperienceSection = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-bf99c4a8"]]), { __name: "HomeExperienceSection" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ToolsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const Techs = Resume.technologies;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      _push(`<section${ssrRenderAttrs(_attrs)} data-v-c20cf0a7><h2 data-v-c20cf0a7>Tools I Use</h2><div class="section-divider" data-v-c20cf0a7></div><p class="mb-7" data-v-c20cf0a7> These are, but not limited to, the techs I use for different services. </p><!--[-->`);
      ssrRenderList(unref(Techs), (tech) => {
        _push(ssrRenderComponent(_component_UCard, {
          key: tech.name,
          class: "mb-4",
          variant: "soft",
          ui: {
            root: "dark:!bg-gray-900"
          }
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tech.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(tech.name), 1)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="tech-list flex items-center flex-wrap gap-4 mt-4" data-v-c20cf0a7${_scopeId}><!--[-->`);
              ssrRenderList(tech.tools, (tool, index) => {
                _push2(`<div${ssrRenderAttr("title", tool.tooltip)} data-v-c20cf0a7${_scopeId}>`);
                if (tool.class) {
                  _push2(`<i class="${ssrRenderClass([tool.class, "text-5xl"])}" data-v-c20cf0a7${_scopeId}></i>`);
                } else {
                  _push2(`<!---->`);
                }
                if (tool.image) {
                  _push2(`<img width="64" height="64" loading="lazy" decoding="async"${ssrRenderAttr("alt", tool.tooltip || "Technology icon")}${ssrRenderAttr("src", unref(getAssetUrl)(tool.image, "tech"))} class="${ssrRenderClass([tool.class, "w-16 h-16 object-contain transition-all"])}" data-v-c20cf0a7${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "tech-list flex items-center flex-wrap gap-4 mt-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(tech.tools, (tool, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      title: tool.tooltip
                    }, [
                      tool.class ? (openBlock(), createBlock("i", {
                        key: 0,
                        class: ["text-5xl", tool.class]
                      }, null, 2)) : createCommentVNode("", true),
                      tool.image ? (openBlock(), createBlock("img", {
                        key: 1,
                        width: "64",
                        height: "64",
                        class: ["w-16 h-16 object-contain transition-all", tool.class],
                        loading: "lazy",
                        decoding: "async",
                        alt: tool.tooltip || "Technology icon",
                        src: unref(getAssetUrl)(tool.image, "tech")
                      }, null, 10, ["alt", "src"])) : createCommentVNode("", true)
                    ], 8, ["title"]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ToolsSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ToolsSection = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-c20cf0a7"]]), { __name: "HomeToolsSection" });
const siteUrl = "https://kiranparajuli.com.np";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "resume",
  __ssrInlineRender: true,
  setup(__props) {
    const currentUrl = `${siteUrl}/resume`;
    const imageUrl = `${siteUrl}/letter_k.png`;
    const personalInfo = Resume.personalInfo;
    const experiences = Resume.experiences;
    const technologies = Resume.technologies;
    const skills = technologies.flatMap((tech) => tech.tools.map((t) => t.tooltip));
    const skillsList = [...new Set(skills)].slice(0, 10).join(", ");
    const resumeSummary = `Professional resume of ${personalInfo.name}, a ${personalInfo.role} with ${experiences.length} years of experience in software development and quality assurance. Specialized in ${skillsList} and modern web technologies.`;
    useSeo({
      title: `Resume - ${personalInfo.name}`,
      description: resumeSummary,
      keywords: `${personalInfo.name}, Resume, Curriculum Vitae, Frontend Developer Resume, Full Stack Developer Resume, QA Engineer Resume, Developer Portfolio`,
      image: imageUrl,
      url: currentUrl,
      type: "profile",
      structuredData: createPersonStructuredData({
        name: String(personalInfo.name),
        jobTitle: String(personalInfo.role),
        description: String(personalInfo.summary),
        image: imageUrl,
        url: siteUrl,
        email: personalInfo.email ? String(personalInfo.email) : void 0,
        telephone: personalInfo.phone ? String(personalInfo.phone) : void 0,
        address: {
          addressLocality: String(personalInfo.municipality),
          addressCountry: String(personalInfo.country),
          postalCode: personalInfo.postalCode ? String(personalInfo.postalCode) : void 0
        },
        sameAs: [
          personalInfo.linkedin ? String(personalInfo.linkedin) : void 0,
          personalInfo.github ? String(personalInfo.github) : void 0,
          personalInfo.devto ? String(personalInfo.devto) : void 0
        ].filter((item) => item !== void 0),
        knowsAbout: [...new Set(skills)].slice(0, 20)
      })
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            ...createCollectionPageStructuredData({
              name: `${personalInfo.name} Resume`,
              description: `Professional resume and experience of ${personalInfo.name}`,
              url: currentUrl
            })
          })
        }
      ]
    });
    const { downloadAsPlainText } = useResumeExport();
    const { trackPlainTextDownload } = useAnalytics();
    const handleDownloadPlainText = () => {
      trackPlainTextDownload();
      const filename = `${personalInfo.name?.replace(/\s+/g, "_") || "Resume"}_Resume.txt`;
      downloadAsPlainText(filename);
    };
    const handleDownloadDocx = async () => {
      try {
        const { useDocxExport } = await import('./useDocxExport-DVBDEl5o.mjs');
        const { exportResumeAsDocx } = useDocxExport();
        await exportResumeAsDocx();
      } catch (error) {
        console.error("Failed to export DOCX:", error);
        const message = error instanceof Error ? error.message : "Failed to export DOCX. Please try again.";
        alert(message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "resume" }, _attrs))} data-v-c9bb79cd><div class="pt-12 flex flex-wrap gap-4 items-center" data-v-c9bb79cd><h1 class="text-xl uppercase font-bold" data-v-c9bb79cd>Resume</h1>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        title: "Download a copy of my resume as PDF",
        variant: "subtle",
        to: "/resume-pdf"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-arrow-down-tray" }, null, _parent2, _scopeId));
            _push2(`<span class="px-1 font-bold" data-v-c9bb79cd${_scopeId}>Download Pdf</span>`);
          } else {
            return [
              createVNode(_component_UIcon, { name: "i-heroicons-arrow-down-tray" }),
              createVNode("span", { class: "px-1 font-bold" }, "Download Pdf")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        title: "Download resume as plain text (ATS-friendly)",
        variant: "subtle",
        onClick: handleDownloadPlainText
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-document-text" }, null, _parent2, _scopeId));
            _push2(`<span class="px-1 font-bold" data-v-c9bb79cd${_scopeId}>Download TXT</span>`);
          } else {
            return [
              createVNode(_component_UIcon, { name: "i-heroicons-document-text" }),
              createVNode("span", { class: "px-1 font-bold" }, "Download TXT")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        title: "Download resume as DOCX",
        variant: "subtle",
        onClick: handleDownloadDocx
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-document-duplicate" }, null, _parent2, _scopeId));
            _push2(`<span class="px-1 font-bold" data-v-c9bb79cd${_scopeId}>Download DOCX</span>`);
          } else {
            return [
              createVNode(_component_UIcon, { name: "i-heroicons-document-duplicate" }),
              createVNode("span", { class: "px-1 font-bold" }, "Download DOCX")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(ExperienceSection, null, null, _parent));
      _push(ssrRenderComponent(ToolsSection, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resume.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resume = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c9bb79cd"]]);

export { resume as default };
//# sourceMappingURL=resume-C2vWyKhk.mjs.map
