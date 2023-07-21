import { toRef, createVNode, mergeProps, ref, computed, watchEffect, withDirectives, resolveDirective, shallowRef, useSSRContext, defineComponent, withCtx, renderSlot, watch, nextTick, unref, createSlots, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, createElementBlock } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { p as propsFactory, m as makeComponentProps, e as makeTagProps, f as makeThemeProps, g as genericComponent, h as provideTheme, i as provideDefaults, j as useRender, H as useResizeObserver, o as convertToUnit, I as IconValue, x as useRtl, J as useDisplay, b as useAppStore, s as storeToRefs, n as navigateTo, r as useRoute$1 } from '../server.mjs';
import { useRoute, useRouter } from 'vue-router';
import { m as makeBorderProps, b as makeElevationProps, c as makeRoundedProps, u as useBorder, e as useElevation, f as useRounded, d as makeSizeProps, h as useSize, i as useTextColor, l as makeDimensionProps, n as useDimension, V as VIcon, k as useBackgroundColor, a as VImg, R as Resume$1, g as getAssetUrl, o as isDarkThemeSelected, p as addThemeToStorage } from './VImg-51a9d54d.mjs';
import { m as makeGroupProps, u as useGroup, a as makeGroupItemProps, b as useGroupItem, c as VExpandTransition } from './group-b817aca7.mjs';
import { f as makeDensityProps, m as makeVariantProps, i as useDensity, n as useIntersectionObserver, o as makeLoaderProps, p as makeLocationProps, q as makePositionProps, g as makeRouterProps, R as Ripple, h as useVariant, r as useLoader, s as useLocation, t as usePosition, j as useLink, k as genOverlays, l as VDefaultsProvider, V as VCard } from './index-1635224e.mjs';
import { V as VFooter } from './VFooter-b62912e3.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import 'ufo';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';

const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useScrollTo() {
  const route = useRoute$1();
  function toWorks() {
    const works2 = document.getElementById("works");
    if (works2) {
      works2.scrollIntoView({ behavior: "smooth" });
    }
  }
  function works() {
    if (route.name !== "index") {
      navigateTo("/").then(() => {
        setTimeout(() => {
          toWorks();
        }, 500);
      });
    } else {
      toWorks();
    }
  }
  function top() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return { works, top };
}
const makeVBtnGroupProps = propsFactory({
  divided: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps()
}, "VBtnGroup");
const VBtnGroup = genericComponent()({
  name: "VBtnGroup",
  props: makeVBtnGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBtn: {
        height: "auto",
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        flat: true,
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-btn-group", {
          "v-btn-group--divided": props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": props.style
      }, slots);
    });
  }
});
const VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
const makeVBtnToggleProps = propsFactory({
  ...makeVBtnGroupProps(),
  ...makeGroupProps()
}, "VBtnToggle");
genericComponent()({
  name: "VBtnToggle",
  props: makeVBtnToggleProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      const [btnGroupProps] = VBtnGroup.filterProps(props);
      return createVNode(VBtnGroup, mergeProps({
        "class": ["v-btn-toggle", props.class]
      }, btnGroupProps, {
        "style": props.style
      }), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected,
            next,
            prev,
            select,
            selected
          })];
        }
      });
    });
    return {
      next,
      prev,
      select
    };
  }
});
const makeVProgressCircularProps = propsFactory({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "div"
  }),
  ...makeThemeProps()
}, "VProgressCircular");
const VProgressCircular = genericComponent()({
  name: "VProgressCircular",
  props: makeVProgressCircularProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const root = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(toRef(props, "bgColor"));
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = computed(() => Number(props.width));
    const size = computed(() => {
      return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
    });
    const diameter = computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = computed(() => width.value / size.value * diameter.value);
    const strokeDashOffset = computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!props.indeterminate,
        "v-progress-circular--visible": isIntersecting.value,
        "v-progress-circular--disable-shrink": props.indeterminate === "disable-shrink"
      }, themeClasses.value, sizeClasses.value, textColorClasses.value, props.class],
      "style": [sizeStyles.value, textColorStyles.value, props.style],
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
    }, {
      default: () => [createVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [createVNode("circle", {
        "class": ["v-progress-circular__underlay", underlayColorClasses.value],
        "style": underlayColorStyles.value,
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null), createVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null)]), slots.default && createVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])]
    }));
    return {};
  }
});
function useSelectLink(link, select) {
  watch(() => {
    var _a;
    return (_a = link.isActive) == null ? void 0 : _a.value;
  }, (isActive) => {
    if (link.isLink.value && isActive && select) {
      nextTick(() => {
        select(true);
      });
    }
  }, {
    immediate: true
  });
}
const makeVBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: VBtnToggleSymbol
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: IconValue,
  appendIcon: IconValue,
  block: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "button"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VBtn");
const VBtn = genericComponent()({
  name: "VBtn",
  directives: {
    Ripple
  },
  props: makeVBtnProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a;
      if (props.active !== void 0) {
        return props.active;
      }
      if (link.isLink.value) {
        return (_a = link.isActive) == null ? void 0 : _a.value;
      }
      return group == null ? void 0 : group.isSelected.value;
    });
    const isDisabled = computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
    const isElevated = computed(() => {
      return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
    });
    const valueAttr = computed(() => {
      if (props.value === void 0)
        return void 0;
      return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
    });
    function onClick(e) {
      var _a;
      if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === "_blank"))
        return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    useSelectLink(link, group == null ? void 0 : group.select);
    useRender(() => {
      var _a, _b;
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasPrepend = !!(props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendIcon || slots.append);
      const hasIcon = !!(props.icon && props.icon !== true);
      const hasColor = (group == null ? void 0 : group.isSelected.value) && (!link.isLink.value || ((_a = link.isActive) == null ? void 0 : _a.value)) || !group || ((_b = link.isActive) == null ? void 0 : _b.value);
      return withDirectives(createVNode(Tag, {
        "type": Tag === "a" ? void 0 : "button",
        "class": ["v-btn", group == null ? void 0 : group.selectedClass.value, {
          "v-btn--active": isActive.value,
          "v-btn--block": props.block,
          "v-btn--disabled": isDisabled.value,
          "v-btn--elevated": isElevated.value,
          "v-btn--flat": props.flat,
          "v-btn--icon": !!props.icon,
          "v-btn--loading": props.loading,
          "v-btn--stacked": props.stacked
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value, locationStyles.value, sizeStyles.value, props.style],
        "disabled": isDisabled.value || void 0,
        "href": link.href.value,
        "onClick": onClick,
        "value": valueAttr.value
      }, {
        default: () => {
          var _a3;
          var _a2;
          return [genOverlays(true, "v-btn"), !props.icon && hasPrepend && createVNode("span", {
            "key": "prepend",
            "class": "v-btn__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.prependIcon,
            "defaults": {
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, slots.prepend)]), createVNode("span", {
            "class": "v-btn__content",
            "data-no-activator": ""
          }, [!slots.default && hasIcon ? createVNode(VIcon, {
            "key": "content-icon",
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "content-defaults",
            "disabled": !hasIcon,
            "defaults": {
              VIcon: {
                icon: props.icon
              }
            }
          }, {
            default: () => {
              var _a4;
              var _a32;
              return [(_a4 = (_a32 = slots.default) == null ? void 0 : _a32.call(slots)) != null ? _a4 : props.text];
            }
          })]), !props.icon && hasAppend && createVNode("span", {
            "key": "append",
            "class": "v-btn__append"
          }, [!slots.append ? createVNode(VIcon, {
            "key": "append-icon",
            "icon": props.appendIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !props.appendIcon,
            "defaults": {
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, slots.append)]), !!props.loading && createVNode("span", {
            "key": "loader",
            "class": "v-btn__loader"
          }, [(_a3 = (_a2 = slots.loader) == null ? void 0 : _a2.call(slots)) != null ? _a3 : createVNode(VProgressCircular, {
            "color": typeof props.loading === "boolean" ? void 0 : props.loading,
            "indeterminate": true,
            "size": "23",
            "width": "2"
          }, null)])];
        }
      }), [[resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
    });
    return {};
  }
});
const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": ["v-toolbar-title", props.class],
        "style": props.style
      }, {
        default: () => {
          var _a;
          return [hasText && createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)])];
        }
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _a;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(!!(props.extended || ((_a = slots.extension) == null ? void 0 : _a.call(slots))));
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_a2 = slots.extension) == null ? void 0 : _a2.call(slots);
      isExtended.value = !!(props.extended || extension);
      return createVNode(props.tag, {
        "class": ["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => {
            var _a3, _b, _c;
            return [createVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && createVNode("div", {
              "class": "v-toolbar__prepend"
            }, [(_a3 = slots.prepend) == null ? void 0 : _a3.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), (_b = slots.default) == null ? void 0 : _b.call(slots), slots.append && createVNode("div", {
              "class": "v-toolbar__append"
            }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])])];
          }
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ToolBar",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollTo = useScrollTo();
    const route = useRoute();
    const { width } = useDisplay();
    const appStore = useAppStore();
    const { isDarkTheme } = storeToRefs(appStore);
    const vs = computed(() => width.value < 400);
    const onMainClick = () => {
      if (route.name === "index") {
        scrollTo.top();
      } else {
        navigateTo("/");
      }
    };
    const changeTheme = () => {
      const currentTheme = isDarkThemeSelected();
      addThemeToStorage(!currentTheme);
      appStore.updateTheme(!currentTheme);
      document.body.classList.toggle("dark");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VToolbar, mergeProps({
        class: "home--toolbar",
        density: "compact",
        extended: unref(width) < 820
      }, _attrs), createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="main"${_scopeId}>Kiran</div>`);
            if (unref(width) >= 820) {
              _push2(`<div class="btn-grp"${_scopeId}><div${ssrRenderAttrs(mergeProps({ class: "btn" }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-file`);
                  } else {
                    return [
                      createTextVNode("mdi-file")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` Works </div><div${ssrRenderAttrs(mergeProps({ class: "btn" }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-account-tie`);
                  } else {
                    return [
                      createTextVNode("mdi-account-tie")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` Resume </div><div${ssrRenderAttrs(mergeProps({ class: "btn" }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-post`);
                  } else {
                    return [
                      createTextVNode("mdi-post")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` Blog </div>`);
              _push2(ssrRenderComponent(VBtn, {
                size: "small",
                icon: "",
                title: "Change Theme",
                onClick: ($event) => changeTheme()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, { size: "24" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(isDarkTheme) ? "mdi-weather-sunny" : "mdi-weather-night")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(isDarkTheme) ? "mdi-weather-sunny" : "mdi-weather-night"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VIcon, { size: "24" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(isDarkTheme) ? "mdi-weather-sunny" : "mdi-weather-night"), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<a href="mailto:kiranparajuli589@gmail.com" class="email"${_scopeId}>`);
            _push2(ssrRenderComponent(VIcon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-email`);
                } else {
                  return [
                    createTextVNode("mdi-email")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!vs.value) {
              _push2(`<b${_scopeId}>kiranparajuli589@gmail.com</b>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</a>`);
          } else {
            return [
              createVNode("div", {
                class: "main",
                onClick: ($event) => onMainClick()
              }, "Kiran", 8, ["onClick"]),
              unref(width) >= 820 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "btn-grp"
              }, [
                withDirectives((openBlock(), createBlock("div", {
                  class: "btn",
                  onClick: ($event) => unref(scrollTo).works()
                }, [
                  createVNode(VIcon, null, {
                    default: withCtx(() => [
                      createTextVNode("mdi-file")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" Works ")
                ], 8, ["onClick"])), [
                  [Ripple]
                ]),
                withDirectives((openBlock(), createBlock("div", {
                  class: "btn",
                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/resume")
                }, [
                  createVNode(VIcon, null, {
                    default: withCtx(() => [
                      createTextVNode("mdi-account-tie")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" Resume ")
                ], 8, ["onClick"])), [
                  [Ripple]
                ]),
                withDirectives((openBlock(), createBlock("div", {
                  class: "btn",
                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("blog")
                }, [
                  createVNode(VIcon, null, {
                    default: withCtx(() => [
                      createTextVNode("mdi-post")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" Blog ")
                ], 8, ["onClick"])), [
                  [Ripple]
                ]),
                createVNode(VBtn, {
                  size: "small",
                  icon: "",
                  title: "Change Theme",
                  onClick: ($event) => changeTheme()
                }, {
                  default: withCtx(() => [
                    createVNode(VIcon, { size: "24" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(isDarkTheme) ? "mdi-weather-sunny" : "mdi-weather-night"), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])) : createCommentVNode("", true),
              createVNode("a", {
                href: "mailto:kiranparajuli589@gmail.com",
                class: "email"
              }, [
                createVNode(VIcon, null, {
                  default: withCtx(() => [
                    createTextVNode("mdi-email")
                  ]),
                  _: 1
                }),
                !vs.value ? (openBlock(), createBlock("b", { key: 0 }, "kiranparajuli589@gmail.com")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 2
      }, [
        unref(width) < 820 ? {
          name: "extension",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="btn-grp px-1"${_scopeId}><div${ssrRenderAttrs(mergeProps({
                class: "btn",
                title: "Works"
              }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-file`);
                  } else {
                    return [
                      createTextVNode("mdi-file")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (!vs.value) {
                _push2(`<!--[-->Works<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${ssrRenderAttrs(mergeProps({
                class: "btn",
                title: "Resume"
              }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-account-tie`);
                  } else {
                    return [
                      createTextVNode("mdi-account-tie")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (!vs.value) {
                _push2(`<!--[-->Resume<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${ssrRenderAttrs(mergeProps({
                class: "btn",
                title: "Blog"
              }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-post`);
                  } else {
                    return [
                      createTextVNode("mdi-post")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (!vs.value) {
                _push2(`<!--[-->Blog<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(VBtn, {
                size: "small",
                icon: "",
                title: "Change Theme",
                onClick: ($event) => changeTheme()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, { size: "24" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(isDarkTheme) ? "mdi-weather-sunny" : "mdi-weather-night")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(isDarkTheme) ? "mdi-weather-sunny" : "mdi-weather-night"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VIcon, { size: "24" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(isDarkTheme) ? "mdi-weather-sunny" : "mdi-weather-night"), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "btn-grp px-1" }, [
                  withDirectives((openBlock(), createBlock("div", {
                    class: "btn",
                    onClick: ($event) => unref(scrollTo).works(),
                    title: "Works"
                  }, [
                    createVNode(VIcon, null, {
                      default: withCtx(() => [
                        createTextVNode("mdi-file")
                      ]),
                      _: 1
                    }),
                    !vs.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode("Works")
                    ], 64)) : createCommentVNode("", true)
                  ], 8, ["onClick"])), [
                    [Ripple]
                  ]),
                  withDirectives((openBlock(), createBlock("div", {
                    class: "btn",
                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/resume"),
                    title: "Resume"
                  }, [
                    createVNode(VIcon, null, {
                      default: withCtx(() => [
                        createTextVNode("mdi-account-tie")
                      ]),
                      _: 1
                    }),
                    !vs.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode("Resume")
                    ], 64)) : createCommentVNode("", true)
                  ], 8, ["onClick"])), [
                    [Ripple]
                  ]),
                  withDirectives((openBlock(), createBlock("div", {
                    class: "btn",
                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/blog"),
                    title: "Blog"
                  }, [
                    createVNode(VIcon, null, {
                      default: withCtx(() => [
                        createTextVNode("mdi-post")
                      ]),
                      _: 1
                    }),
                    !vs.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode("Blog")
                    ], 64)) : createCommentVNode("", true)
                  ], 8, ["onClick"])), [
                    [Ripple]
                  ]),
                  createVNode(VBtn, {
                    size: "small",
                    icon: "",
                    title: "Change Theme",
                    onClick: ($event) => changeTheme()
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { size: "24" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(isDarkTheme) ? "mdi-weather-sunny" : "mdi-weather-night"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ToolBar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ScrollTop",
  __ssrInlineRender: true,
  setup(__props) {
    useScrollTo();
    const showTop = ref(false);
    document.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        showTop.value = true;
      } else {
        showTop.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (showTop.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "scroll-top" }, _attrs, ssrGetDirectiveProps(_ctx, Ripple)))}>Scroll To Top</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ScrollTop.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollTo = useScrollTo();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VFooter, mergeProps({ class: "footer" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              "max-width": "1000",
              class: "mx-auto",
              variant: "flat"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="first-row"${_scopeId2}><div class="my-name"${_scopeId2}>Kiran</div><div class="btn-grp"${_scopeId2}><div${ssrRenderAttrs(mergeProps({ class: "btn" }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId2}>Works</div><div${ssrRenderAttrs(mergeProps({ class: "btn" }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId2}>Resume</div><div${ssrRenderAttrs(mergeProps({ class: "btn" }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId2}>Blog</div></div><div class="copyright"${_scopeId2}> \xA9 ${ssrInterpolate(( new Date()).getFullYear())} Kiran. All rights reserved. </div></div><div class="second-row"${_scopeId2}><div class="red"${_scopeId2}></div><div class="orange"${_scopeId2}></div><div class="light-orange"${_scopeId2}></div><div class="indigo"${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "first-row" }, [
                      createVNode("div", { class: "my-name" }, "Kiran"),
                      createVNode("div", { class: "btn-grp" }, [
                        withDirectives((openBlock(), createBlock("div", {
                          class: "btn",
                          onClick: ($event) => unref(scrollTo).works()
                        }, [
                          createTextVNode("Works")
                        ], 8, ["onClick"])), [
                          [Ripple]
                        ]),
                        withDirectives((openBlock(), createBlock("div", {
                          class: "btn",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/resume")
                        }, [
                          createTextVNode("Resume")
                        ], 8, ["onClick"])), [
                          [Ripple]
                        ]),
                        withDirectives((openBlock(), createBlock("div", {
                          class: "btn",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/blog")
                        }, [
                          createTextVNode("Blog")
                        ], 8, ["onClick"])), [
                          [Ripple]
                        ])
                      ]),
                      createVNode("div", { class: "copyright" }, " \xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Kiran. All rights reserved. ", 1)
                    ]),
                    createVNode("div", { class: "second-row" }, [
                      createVNode("div", { class: "red" }),
                      createVNode("div", { class: "orange" }),
                      createVNode("div", { class: "light-orange" }),
                      createVNode("div", { class: "indigo" })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                "max-width": "1000",
                class: "mx-auto",
                variant: "flat"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "first-row" }, [
                    createVNode("div", { class: "my-name" }, "Kiran"),
                    createVNode("div", { class: "btn-grp" }, [
                      withDirectives((openBlock(), createBlock("div", {
                        class: "btn",
                        onClick: ($event) => unref(scrollTo).works()
                      }, [
                        createTextVNode("Works")
                      ], 8, ["onClick"])), [
                        [Ripple]
                      ]),
                      withDirectives((openBlock(), createBlock("div", {
                        class: "btn",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/resume")
                      }, [
                        createTextVNode("Resume")
                      ], 8, ["onClick"])), [
                        [Ripple]
                      ]),
                      withDirectives((openBlock(), createBlock("div", {
                        class: "btn",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/blog")
                      }, [
                        createTextVNode("Blog")
                      ], 8, ["onClick"])), [
                        [Ripple]
                      ])
                    ]),
                    createVNode("div", { class: "copyright" }, " \xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Kiran. All rights reserved. ", 1)
                  ]),
                  createVNode("div", { class: "second-row" }, [
                    createVNode("div", { class: "red" }),
                    createVNode("div", { class: "orange" }),
                    createVNode("div", { class: "light-orange" }),
                    createVNode("div", { class: "indigo" })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SideBar",
  __ssrInlineRender: true,
  setup(__props) {
    const personalInfo = Resume$1.personalInfo;
    const appStore = useAppStore();
    const { isDarkTheme } = storeToRefs(appStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home--sidebar" }, _attrs))}><a${ssrRenderAttr("href", unref(personalInfo).linkedin)} target="_blank" title="LinkedIn">`);
      _push(ssrRenderComponent(VIcon, { class: "linkedin" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-linkedin`);
          } else {
            return [
              createTextVNode("mdi-linkedin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</a><a${ssrRenderAttr("href", unref(personalInfo).github)} target="_blank" title="GitHub">`);
      _push(ssrRenderComponent(VIcon, {
        class: "github",
        color: unref(isDarkTheme) ? "white" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-github`);
          } else {
            return [
              createTextVNode("mdi-github")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</a><a${ssrRenderAttr("href", unref(personalInfo).devto)} target="_blank" title="dev.to">`);
      _push(ssrRenderComponent(VImg, {
        src: unref(getAssetUrl)("devto.png"),
        class: "twitter",
        width: "30"
      }, null, _parent));
      _push(`</a></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/SideBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(VCard, mergeProps({
        variant: "flat",
        class: "home"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              variant: "elevated",
              elevation: "12",
              class: "home--container",
              "max-width": "1200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, null, null, _parent3, _scopeId2));
                  _push3(`<div class="home--content"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(_sfc_main$4),
                    createVNode("div", { class: "home--content" }, [
                      createVNode(_sfc_main$1),
                      createVNode("div", null, [
                        renderSlot(_ctx.$slots, "default")
                      ])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, { class: "mt-10" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                variant: "elevated",
                elevation: "12",
                class: "home--container",
                "max-width": "1200"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4),
                  createVNode("div", { class: "home--content" }, [
                    createVNode(_sfc_main$1),
                    createVNode("div", null, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ])
                ]),
                _: 3
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$2, { class: "mt-10" })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=home-3a8db601.mjs.map
