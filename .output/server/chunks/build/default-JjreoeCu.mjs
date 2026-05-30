import { Z as __nuxt_component_0, l as useAppStore, _ as __nuxt_component_0$3, m as _sfc_main$8, b as _sfc_main$d, n as useRoute, o as navigateTo } from './server.mjs';
import { defineComponent, mergeProps, computed, unref, withCtx, createTextVNode, ref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { storeToRefs } from 'pinia';
import { _ as _sfc_main$5 } from './Card-Ql4XOehz.mjs';
import { R as Resume } from './resume-CN0FSVbL.mjs';
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
import 'vue-router';
import 'tailwindcss/colors';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const useScrollTo = () => {
  const works = () => {
    const route = useRoute();
    const currentPath = route.path;
    if (currentPath !== "/") {
      navigateTo("/").then(() => {
        setTimeout(() => {
        }, 100);
      });
    }
  };
  const top = () => {
  };
  return { works, top };
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ToolBar",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollTo = useScrollTo();
    const appStore = useAppStore();
    const { isDarkTheme } = storeToRefs(appStore);
    const changeTheme = () => {
      isDarkTheme.value = true;
    };
    const links = computed(() => {
      return [
        {
          name: "Resume",
          icon: "i-heroicons-user-circle",
          to: "/resume"
        },
        {
          name: "Blogs",
          icon: "i-heroicons-document-text",
          to: "/blogs"
        }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between flex-wrap gap-4 p-4 bg-gray-300 dark:bg-gray-900" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(__nuxt_component_0$3), {
        to: "/",
        class: "uppercase font-semibold text-2xl font-brand"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kiran `);
          } else {
            return [
              createTextVNode(" Kiran ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex gap-2 flex-wrap">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        class: "font-bold",
        icon: "i-heroicons-folder-open",
        label: "Works",
        onClick: unref(scrollTo).works
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(links), (link) => {
        _push(ssrRenderComponent(_component_UButton, {
          key: link.name,
          variant: "ghost",
          as: "NuxtLink",
          to: link.to,
          icon: link.icon,
          label: link.name,
          ui: {
            label: "font-bold"
          }
        }, null, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        class: "font-bold",
        icon: unref(isDarkTheme) ? "mdi-weather-night" : "mdi-weather-sunny",
        title: unref(isDarkTheme) ? "Dark Mode" : "Light Mode",
        onClick: changeTheme
      }, null, _parent));
      _push(`</div><a href="mailto:kiranparajuli589@gmail.com" class="email flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-envelope" }, null, _parent));
      _push(`<b class="hidden md:block">kiranparajuli589@gmail.com</b></a></nav>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ToolBar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ToolBar = Object.assign(_sfc_main$4, { __name: "HomeToolBar" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ScrollTop",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollTo = useScrollTo();
    const showTop = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      if (showTop.value) {
        _push(ssrRenderComponent(_component_UButton, mergeProps({
          class: "scroll-top",
          onClick: ($event) => unref(scrollTo).top()
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Scroll To Top `);
            } else {
              return [
                createTextVNode(" Scroll To Top ")
              ];
            }
          }),
          _: 1
        }, _parent));
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
const ScrollTop = Object.assign(_sfc_main$3, { __name: "ScrollTop" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollTo = useScrollTo();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, {
        class: "max-w-5xl mx-auto",
        variant: "subtle",
        ui: { root: "rounded-b-none" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="first-row flex items-center justify-between pb-5 flex-wrap"${_scopeId}><div class="my-name text-xl uppercase font-bold"${_scopeId}>Kiran</div><div class="btn-grp flex flex-wrap gap-4 pl-16"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              class: "font-bold",
              onClick: ($event) => unref(scrollTo).works()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Works `);
                } else {
                  return [
                    createTextVNode(" Works ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              class: "font-bold",
              to: "/resume"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Resume `);
                } else {
                  return [
                    createTextVNode(" Resume ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              class: "font-bold",
              to: "/blogs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Blog `);
                } else {
                  return [
                    createTextVNode(" Blog ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="copyright text-sm"${_scopeId}> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Kiran. All rights reserved. </div></div><div class="second-row flex h-3"${_scopeId}><div class="red flex-1 bg-red-500 rounded-l"${_scopeId}></div><div class="orange flex-1 bg-orange-500"${_scopeId}></div><div class="light-orange flex-1 bg-orange-300"${_scopeId}></div><div class="indigo flex-1 bg-indigo-500 rounded-r"${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", { class: "first-row flex items-center justify-between pb-5 flex-wrap" }, [
                createVNode("div", { class: "my-name text-xl uppercase font-bold" }, "Kiran"),
                createVNode("div", { class: "btn-grp flex flex-wrap gap-4 pl-16" }, [
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    class: "font-bold",
                    onClick: ($event) => unref(scrollTo).works()
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Works ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    class: "font-bold",
                    to: "/resume"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Resume ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    class: "font-bold",
                    to: "/blogs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Blog ")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "copyright text-sm" }, " © " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Kiran. All rights reserved. ", 1)
              ]),
              createVNode("div", { class: "second-row flex h-3" }, [
                createVNode("div", { class: "red flex-1 bg-red-500 rounded-l" }),
                createVNode("div", { class: "orange flex-1 bg-orange-500" }),
                createVNode("div", { class: "light-orange flex-1 bg-orange-300" }),
                createVNode("div", { class: "indigo flex-1 bg-indigo-500 rounded-r" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Footer = Object.assign(_sfc_main$2, { __name: "Footer" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SideBar",
  __ssrInlineRender: true,
  setup(__props) {
    const personalInfo = Resume.personalInfo;
    const links = [
      {
        name: "LinkedIn",
        icon: "mdi:linkedin",
        href: personalInfo.linkedin,
        color: "text-blue-600 dark:text-white"
      },
      {
        name: "GitHub",
        icon: "mdi:github",
        href: personalInfo.github,
        color: "text-black dark:text-white"
      },
      {
        name: "dev.to",
        icon: "fa7-brands:dev",
        href: personalInfo.devto,
        color: "text-black dark:text-white"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 w-72 md:w-auto md:absolute md:left-8 top-24" }, _attrs))}><!--[-->`);
      ssrRenderList(links, (link) => {
        _push(`<a target="_blank"${ssrRenderAttr("title", link.name)}${ssrRenderAttr("href", link.href)}>`);
        _push(ssrRenderComponent(_component_UIcon, {
          class: ["text-4xl", link.color],
          name: link.icon
        }, null, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/SideBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SideBar = Object.assign(_sfc_main$1, { __name: "HomeSideBar" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:px-12 md:py-16" }, _attrs))}><div class="max-w-7xl w-full mx-auto bg-gray-200 dark:bg-gray-800 md:rounded-2xl overflow-hidden shadow-2xl">`);
      _push(ssrRenderComponent(ToolBar, null, null, _parent));
      _push(`<div class="flex relative">`);
      _push(ssrRenderComponent(SideBar, { class: "md:flex hidden" }, null, _parent));
      _push(`<div class="md:pl-28 pl-8 py-8 pr-8 w-full">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(ScrollTop, null, null, _parent));
      _push(ssrRenderComponent(Footer, { class: "mt-10" }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-JjreoeCu.mjs.map
