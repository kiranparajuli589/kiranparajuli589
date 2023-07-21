import { u as useSeoMeta, V as VCard, a as VCardTitle, b as VCardSubtitle, c as VCardText, _ as __nuxt_component_0 } from './index-1635224e.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { R as Resume$1 } from './VImg-51a9d54d.mjs';
import '../server.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blog",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Blog | " + Resume$1.personalInfo.name + " | " + Resume$1.personalInfo.bio,
      ogTitle: "Blog | " + Resume$1.personalInfo.name + " | " + Resume$1.personalInfo.bio
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "home" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, {
              class: "blog",
              variant: "flat",
              color: "transparent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-8"${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1${_scopeId3}>Blogs</h1>`);
                      } else {
                        return [
                          createVNode("h1", null, "Blogs")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardSubtitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` I write blogs occasionally. Here are some of them. `);
                      } else {
                        return [
                          createTextVNode(" I write blogs occasionally. Here are some of them. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` No blogs yet. `);
                      } else {
                        return [
                          createTextVNode(" No blogs yet. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "py-8" }),
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createVNode("h1", null, "Blogs")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardSubtitle, null, {
                      default: withCtx(() => [
                        createTextVNode(" I write blogs occasionally. Here are some of them. ")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createTextVNode(" No blogs yet. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, {
                class: "blog",
                variant: "flat",
                color: "transparent"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "py-8" }),
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createVNode("h1", null, "Blogs")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardSubtitle, null, {
                    default: withCtx(() => [
                      createTextVNode(" I write blogs occasionally. Here are some of them. ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createTextVNode(" No blogs yet. ")
                    ]),
                    _: 1
                  })
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=blog-a782aca2.mjs.map
