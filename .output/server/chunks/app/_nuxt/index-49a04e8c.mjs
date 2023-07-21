import { u as useSeoMeta, V as VCard, R as Ripple, d as VAvatar, a as VCardTitle, c as VCardText, _ as __nuxt_component_0 } from './index-1635224e.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, unref, toDisplayString, withDirectives, openBlock, createBlock, createTextVNode, createCommentVNode, capitalize, Fragment, renderList } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { R as Resume$1, V as VIcon, a as VImg, g as getAssetUrl } from './VImg-51a9d54d.mjs';
import { V as VDivider } from './VDivider-281d1850.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "IntroSection",
  __ssrInlineRender: true,
  setup(__props) {
    const personalInfo = Resume$1.personalInfo;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        variant: "flat",
        class: "home--intro"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="left-panel"${_scopeId}><div class="full-name"${_scopeId}>${ssrInterpolate(unref(personalInfo).name)}</div><div class="title"${_scopeId}>${ssrInterpolate(unref(personalInfo).role)}</div><div class="subtitle"${_scopeId}>${ssrInterpolate(unref(personalInfo).bio)}</div><a${ssrRenderAttrs(mergeProps({
              class: "lets-talk",
              href: "mailto:" + unref(personalInfo).email
            }, ssrGetDirectiveProps(_ctx, Ripple)))}${_scopeId}><span class="lets"${_scopeId}>let&#39;s</span><span class="talk"${_scopeId}>talk</span></a></div><div class="right-panel"${_scopeId}>`);
            _push2(ssrRenderComponent(VAvatar, {
              size: "300",
              color: "teal",
              variant: "elevated",
              class: "elevation-10",
              image: unref(personalInfo).avatar
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "left-panel" }, [
                createVNode("div", { class: "full-name" }, toDisplayString(unref(personalInfo).name), 1),
                createVNode("div", { class: "title" }, toDisplayString(unref(personalInfo).role), 1),
                createVNode("div", { class: "subtitle" }, toDisplayString(unref(personalInfo).bio), 1),
                withDirectives((openBlock(), createBlock("a", {
                  class: "lets-talk",
                  href: "mailto:" + unref(personalInfo).email
                }, [
                  createVNode("span", { class: "lets" }, "let's"),
                  createVNode("span", { class: "talk" }, "talk")
                ], 8, ["href"])), [
                  [Ripple]
                ])
              ]),
              createVNode("div", { class: "right-panel" }, [
                createVNode(VAvatar, {
                  size: "300",
                  color: "teal",
                  variant: "elevated",
                  class: "elevation-10",
                  image: unref(personalInfo).avatar
                }, null, 8, ["image"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/IntroSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ServicesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const services = Resume$1.services;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home--services" }, _attrs))}><h1 class="section-title">What can I do?</h1><div class="section-subtitle">Service Offers</div><div class="section-divider"></div><div class="d-flex flex-wrap" style="${ssrRenderStyle({ "gap": "2rem" })}"><!--[-->`);
      ssrRenderList(unref(services), (service) => {
        _push(ssrRenderComponent(VCard, {
          key: service.name,
          elevation: "4",
          variant: "elevated",
          "max-width": "460"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VCardTitle, { class: "list home--services--title" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, {
                      color: service.iconColor
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-${ssrInterpolate(service.icon)}`);
                        } else {
                          return [
                            createTextVNode("mdi-" + toDisplayString(service.icon), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<h2 class="ellipses"${_scopeId2}>${ssrInterpolate(service.name)}</h2>`);
                  } else {
                    return [
                      createVNode(VIcon, {
                        color: service.iconColor
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-" + toDisplayString(service.icon), 1)
                        ]),
                        _: 2
                      }, 1032, ["color"]),
                      createVNode("h2", { class: "ellipses" }, toDisplayString(service.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardText, { class: "pt-0 experience" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="mb-1"${_scopeId2}>Experience: <span class="exp"${_scopeId2}>${ssrInterpolate(service.experience)}</span> years</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "mb-1" }, [
                        createTextVNode("Experience: "),
                        createVNode("span", { class: "exp" }, toDisplayString(service.experience), 1),
                        createTextVNode(" years")
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardText, null, null, _parent2, _scopeId));
              if (service.types) {
                _push2(ssrRenderComponent(VCardText, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="list mb-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(VIcon, { size: "22" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`mdi-format-list-bulleted-type`);
                          } else {
                            return [
                              createTextVNode("mdi-format-list-bulleted-type")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<h3${_scopeId2}>Types:</h3></div> ${ssrInterpolate(service.types.join(", "))}. `);
                    } else {
                      return [
                        createVNode("div", { class: "list mb-3" }, [
                          createVNode(VIcon, { size: "22" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-format-list-bulleted-type")
                            ]),
                            _: 1
                          }),
                          createVNode("h3", null, "Types:")
                        ]),
                        createTextVNode(" " + toDisplayString(service.types.join(", ")) + ". ", 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(VCardTitle, { class: "list home--services--title" }, {
                  default: withCtx(() => [
                    createVNode(VIcon, {
                      color: service.iconColor
                    }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-" + toDisplayString(service.icon), 1)
                      ]),
                      _: 2
                    }, 1032, ["color"]),
                    createVNode("h2", { class: "ellipses" }, toDisplayString(service.name), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(VCardText, { class: "pt-0 experience" }, {
                  default: withCtx(() => [
                    createVNode("p", { class: "mb-1" }, [
                      createTextVNode("Experience: "),
                      createVNode("span", { class: "exp" }, toDisplayString(service.experience), 1),
                      createTextVNode(" years")
                    ])
                  ]),
                  _: 2
                }, 1024),
                createVNode(VCardText, {
                  innerHTML: service.description
                }, null, 8, ["innerHTML"]),
                service.types ? (openBlock(), createBlock(VCardText, { key: 0 }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "list mb-3" }, [
                      createVNode(VIcon, { size: "22" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-format-list-bulleted-type")
                        ]),
                        _: 1
                      }),
                      createVNode("h3", null, "Types:")
                    ]),
                    createTextVNode(" " + toDisplayString(service.types.join(", ")) + ". ", 1)
                  ]),
                  _: 2
                }, 1024)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ServicesSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MyWorks",
  __ssrInlineRender: true,
  setup(__props) {
    const works = Resume$1.works;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "home--works",
        id: "works"
      }, _attrs))}><h1 class="section-title">My Works</h1><div class="section-subtitle">Some of My Projects</div><div class="section-divider"></div><div class="cards-list"><!--[-->`);
      ssrRenderList(unref(works), (work) => {
        _push(ssrRenderComponent(VCard, {
          key: work.title,
          elevation: "4",
          variant: "elevated",
          class: "work--card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VCardTitle, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h2 class="work--card--title"${_scopeId2}>${ssrInterpolate(work.title)}</h2>`);
                  } else {
                    return [
                      createVNode("h2", { class: "work--card--title" }, toDisplayString(work.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardText, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VImg, {
                      src: unref(getAssetUrl)(work.thumbnail),
                      height: "auto",
                      width: "100%"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VImg, {
                        src: unref(getAssetUrl)(work.thumbnail),
                        height: "auto",
                        width: "100%"
                      }, null, 8, ["src"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardText, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(work.description)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(work.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDivider, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardText, { class: "list links" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(Object.entries(work.links), ([key, value]) => {
                      _push3(`<a${ssrRenderAttr("href", value)} target="_blank" rel="noopener noreferrer"${ssrRenderAttr("title", capitalize(key))}${_scopeId2}>${ssrInterpolate(key)}</a>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(Object.entries(work.links), ([key, value]) => {
                        return openBlock(), createBlock("a", {
                          key,
                          href: value,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          title: capitalize(key)
                        }, toDisplayString(key), 9, ["href", "title"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VCardTitle, null, {
                  default: withCtx(() => [
                    createVNode("h2", { class: "work--card--title" }, toDisplayString(work.title), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(VCardText, null, {
                  default: withCtx(() => [
                    createVNode(VImg, {
                      src: unref(getAssetUrl)(work.thumbnail),
                      height: "auto",
                      width: "100%"
                    }, null, 8, ["src"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(VCardText, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(work.description), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(VDivider),
                createVNode(VCardText, { class: "list links" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(Object.entries(work.links), ([key, value]) => {
                      return openBlock(), createBlock("a", {
                        key,
                        href: value,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        title: capitalize(key)
                      }, toDisplayString(key), 9, ["href", "title"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/MyWorks.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: Resume$1.personalInfo.name + " | " + Resume$1.personalInfo.bio,
      ogTitle: Resume$1.personalInfo.name + " | " + Resume$1.personalInfo.bio
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "home" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3),
              createVNode(_sfc_main$2),
              createVNode(_sfc_main$1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-49a04e8c.mjs.map
