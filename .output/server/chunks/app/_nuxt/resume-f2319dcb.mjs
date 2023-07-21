import { e as createSimpleFunctional, m as makeVariantProps, f as makeDensityProps, g as makeRouterProps, R as Ripple, h as useVariant, i as useDensity, j as useLink, k as genOverlays, l as VDefaultsProvider, d as VAvatar, u as useSeoMeta, V as VCard, a as VCardTitle, c as VCardText, b as VCardSubtitle, _ as __nuxt_component_0 } from './index-1635224e.mjs';
import { useSSRContext, toRef, createVNode, computed, withDirectives, resolveDirective, vShow, Fragment, mergeProps, defineComponent, withCtx, createTextVNode, unref, toDisplayString, openBlock, createBlock, renderList, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { m as makeBorderProps, b as makeElevationProps, c as makeRoundedProps, d as makeSizeProps, u as useBorder, e as useElevation, f as useRounded, h as useSize, V as VIcon, R as Resume$1, g as getAssetUrl, a as VImg } from './VImg-51a9d54d.mjs';
import { p as propsFactory, d as deepEqual, m as makeComponentProps, e as makeTagProps, f as makeThemeProps, g as genericComponent, h as provideTheme, i as provideDefaults, j as useRender, I as IconValue, E as EventProp, k as useLocale, l as useProxiedModel, b as useAppStore, s as storeToRefs } from '../server.mjs';
import { m as makeGroupProps, u as useGroup, a as makeGroupItemProps, b as useGroupItem, V as VExpandXTransition } from './group-b817aca7.mjs';
import { V as VDivider } from './VDivider-281d1850.mjs';
import 'vue-router';
import 'unhead';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import 'ufo';
import '@unhead/ssr';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ItemList",
  __ssrInlineRender: true,
  props: {
    items: {},
    noSplit: { type: Boolean, default: false },
    maxItemsInAColumn: { default: 4 }
  },
  setup(__props) {
    const props = __props;
    const dividedItems = computed(() => {
      if (props.noSplit)
        return [props.items];
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "item-list" }, _attrs))}><!--[-->`);
      ssrRenderList(dividedItems.value, (list, listIndex) => {
        _push(`<ul><!--[-->`);
        ssrRenderList(list, (item, index) => {
          _push(`<li>${item}</li>`);
        });
        _push(`<!--]--></ul>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ItemList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const VSpacer = createSimpleFunctional("flex-grow-1", "div", "VSpacer");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ExperienceSection",
  __ssrInlineRender: true,
  setup(__props) {
    const experiences = Resume$1.experiences;
    const AppStore = useAppStore();
    const { isDarkTheme } = storeToRefs(AppStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home--experience" }, _attrs))}><h1 class="section-title">My Experiences</h1><div class="section-subtitle">Where I had been engaged.</div><div class="section-divider"></div><!--[-->`);
      ssrRenderList(unref(experiences), (exp) => {
        _push(ssrRenderComponent(VCard, {
          key: exp.company,
          class: "mb-8"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VCardTitle, { class: "list" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VAvatar, {
                      image: unref(getAssetUrl)(exp.companyLogo),
                      size: "60"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 class="ellipses"${_scopeId2}>${ssrInterpolate(exp.company)}</h3><a${ssrRenderAttr("href", exp.companyUrl)} target="_blank"${ssrRenderAttr("title", exp.company)}${_scopeId2}>`);
                    _push3(ssrRenderComponent(VIcon, { size: "x-small" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-open-in-new`);
                        } else {
                          return [
                            createTextVNode("mdi-open-in-new")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</a>`);
                  } else {
                    return [
                      createVNode(VAvatar, {
                        image: unref(getAssetUrl)(exp.companyLogo),
                        size: "60"
                      }, null, 8, ["image"]),
                      createVNode("h3", { class: "ellipses" }, toDisplayString(exp.company), 1),
                      createVNode("a", {
                        href: exp.companyUrl,
                        target: "_blank",
                        title: exp.company
                      }, [
                        createVNode(VIcon, { size: "x-small" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-open-in-new")
                          ]),
                          _: 1
                        })
                      ], 8, ["href", "title"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardSubtitle, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(exp.roles.join(", "))} <span class="mx-2"${_scopeId2}>|</span> ${ssrInterpolate(exp.startDate)} - ${ssrInterpolate(exp.endDate)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(exp.roles.join(", ")) + " ", 1),
                      createVNode("span", { class: "mx-2" }, "|"),
                      createTextVNode(" " + toDisplayString(exp.startDate) + " - " + toDisplayString(exp.endDate), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardText, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(exp.description)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(exp.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardText, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h2 class="mb-4"${_scopeId2}>Achievements:</h2>`);
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      items: exp.achievements,
                      "no-split": ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("h2", { class: "mb-4" }, "Achievements:"),
                      createVNode(_sfc_main$2, {
                        items: exp.achievements,
                        "no-split": ""
                      }, null, 8, ["items"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VCardText, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h2 class="mb-4"${_scopeId2}>Projects:</h2><!--[-->`);
                    ssrRenderList(exp.projects, (proj) => {
                      _push3(ssrRenderComponent(VCard, {
                        key: proj.name,
                        class: "mb-4",
                        variant: "outlined"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VCardTitle, { class: "list" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                var _a, _b, _c, _d, _e, _f;
                                if (_push5) {
                                  _push5(`<h4 class="ellipses"${ssrRenderAttr("title", proj.name)}${_scopeId4}>${ssrInterpolate(proj.name)}</h4>`);
                                  if (proj.badge) {
                                    _push5(`<!--[-->`);
                                    if (unref(isDarkTheme)) {
                                      _push5(ssrRenderComponent(VImg, {
                                        src: proj.badge.dark || proj.badge.default,
                                        height: "35",
                                        "max-width": "130"
                                      }, null, _parent5, _scopeId4));
                                    } else {
                                      _push5(ssrRenderComponent(VImg, {
                                        src: proj.badge.light || proj.badge.default,
                                        height: "35",
                                        "max-width": "130"
                                      }, null, _parent5, _scopeId4));
                                    }
                                    _push5(`<!--]-->`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<a${ssrRenderAttr("href", proj.url)} target="_blank"${ssrRenderAttr("title", proj.name)}${_scopeId4}>`);
                                  _push5(ssrRenderComponent(VIcon, { size: "x-small" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`mdi-open-in-new`);
                                      } else {
                                        return [
                                          createTextVNode("mdi-open-in-new")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</a>`);
                                  if (proj.logo) {
                                    _push5(`<!--[-->`);
                                    _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                                    _push5(`<img${ssrRenderAttr("src", unref(getAssetUrl)(proj.logo))}${ssrRenderAttr("height", ((_a = proj.logoStyle) == null ? void 0 : _a.height) || 60)}${ssrRenderAttr("width", ((_b = proj.logoStyle) == null ? void 0 : _b.width) || 100)} class="rounded" style="${ssrRenderStyle("object-fit: " + (((_c = proj.logoStyle) == null ? void 0 : _c.objectFit) || "contain"))}"${_scopeId4}><!--]-->`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                } else {
                                  return [
                                    createVNode("h4", {
                                      class: "ellipses",
                                      title: proj.name
                                    }, toDisplayString(proj.name), 9, ["title"]),
                                    proj.badge ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      unref(isDarkTheme) ? (openBlock(), createBlock(VImg, {
                                        key: 0,
                                        src: proj.badge.dark || proj.badge.default,
                                        height: "35",
                                        "max-width": "130"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock(VImg, {
                                        key: 1,
                                        src: proj.badge.light || proj.badge.default,
                                        height: "35",
                                        "max-width": "130"
                                      }, null, 8, ["src"]))
                                    ], 64)) : createCommentVNode("", true),
                                    createVNode("a", {
                                      href: proj.url,
                                      target: "_blank",
                                      title: proj.name
                                    }, [
                                      createVNode(VIcon, { size: "x-small" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-open-in-new")
                                        ]),
                                        _: 1
                                      })
                                    ], 8, ["href", "title"]),
                                    proj.logo ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                      createVNode(VSpacer),
                                      createVNode("img", {
                                        src: unref(getAssetUrl)(proj.logo),
                                        height: ((_d = proj.logoStyle) == null ? void 0 : _d.height) || 60,
                                        width: ((_e = proj.logoStyle) == null ? void 0 : _e.width) || 100,
                                        class: "rounded",
                                        style: "object-fit: " + (((_f = proj.logoStyle) == null ? void 0 : _f.objectFit) || "contain")
                                      }, null, 12, ["src", "height", "width"])
                                    ], 64)) : createCommentVNode("", true)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(VCardText, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(proj.description)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(proj.description), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(VCardText, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<h3 class="mb-3"${_scopeId4}>Responsibilities:</h3>`);
                                  _push5(ssrRenderComponent(_sfc_main$2, {
                                    items: proj.job,
                                    "no-split": ""
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode("h3", { class: "mb-3" }, "Responsibilities:"),
                                    createVNode(_sfc_main$2, {
                                      items: proj.job,
                                      "no-split": ""
                                    }, null, 8, ["items"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VCardTitle, { class: "list" }, {
                                default: withCtx(() => {
                                  var _a, _b, _c;
                                  return [
                                    createVNode("h4", {
                                      class: "ellipses",
                                      title: proj.name
                                    }, toDisplayString(proj.name), 9, ["title"]),
                                    proj.badge ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      unref(isDarkTheme) ? (openBlock(), createBlock(VImg, {
                                        key: 0,
                                        src: proj.badge.dark || proj.badge.default,
                                        height: "35",
                                        "max-width": "130"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock(VImg, {
                                        key: 1,
                                        src: proj.badge.light || proj.badge.default,
                                        height: "35",
                                        "max-width": "130"
                                      }, null, 8, ["src"]))
                                    ], 64)) : createCommentVNode("", true),
                                    createVNode("a", {
                                      href: proj.url,
                                      target: "_blank",
                                      title: proj.name
                                    }, [
                                      createVNode(VIcon, { size: "x-small" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-open-in-new")
                                        ]),
                                        _: 1
                                      })
                                    ], 8, ["href", "title"]),
                                    proj.logo ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                      createVNode(VSpacer),
                                      createVNode("img", {
                                        src: unref(getAssetUrl)(proj.logo),
                                        height: ((_a = proj.logoStyle) == null ? void 0 : _a.height) || 60,
                                        width: ((_b = proj.logoStyle) == null ? void 0 : _b.width) || 100,
                                        class: "rounded",
                                        style: "object-fit: " + (((_c = proj.logoStyle) == null ? void 0 : _c.objectFit) || "contain")
                                      }, null, 12, ["src", "height", "width"])
                                    ], 64)) : createCommentVNode("", true)
                                  ];
                                }),
                                _: 2
                              }, 1024),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(proj.description), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode("h3", { class: "mb-3" }, "Responsibilities:"),
                                  createVNode(_sfc_main$2, {
                                    items: proj.job,
                                    "no-split": ""
                                  }, null, 8, ["items"])
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      createVNode("h2", { class: "mb-4" }, "Projects:"),
                      (openBlock(true), createBlock(Fragment, null, renderList(exp.projects, (proj) => {
                        return openBlock(), createBlock(VCard, {
                          key: proj.name,
                          class: "mb-4",
                          variant: "outlined"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, { class: "list" }, {
                              default: withCtx(() => {
                                var _a, _b, _c;
                                return [
                                  createVNode("h4", {
                                    class: "ellipses",
                                    title: proj.name
                                  }, toDisplayString(proj.name), 9, ["title"]),
                                  proj.badge ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    unref(isDarkTheme) ? (openBlock(), createBlock(VImg, {
                                      key: 0,
                                      src: proj.badge.dark || proj.badge.default,
                                      height: "35",
                                      "max-width": "130"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock(VImg, {
                                      key: 1,
                                      src: proj.badge.light || proj.badge.default,
                                      height: "35",
                                      "max-width": "130"
                                    }, null, 8, ["src"]))
                                  ], 64)) : createCommentVNode("", true),
                                  createVNode("a", {
                                    href: proj.url,
                                    target: "_blank",
                                    title: proj.name
                                  }, [
                                    createVNode(VIcon, { size: "x-small" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-open-in-new")
                                      ]),
                                      _: 1
                                    })
                                  ], 8, ["href", "title"]),
                                  proj.logo ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createVNode(VSpacer),
                                    createVNode("img", {
                                      src: unref(getAssetUrl)(proj.logo),
                                      height: ((_a = proj.logoStyle) == null ? void 0 : _a.height) || 60,
                                      width: ((_b = proj.logoStyle) == null ? void 0 : _b.width) || 100,
                                      class: "rounded",
                                      style: "object-fit: " + (((_c = proj.logoStyle) == null ? void 0 : _c.objectFit) || "contain")
                                    }, null, 12, ["src", "height", "width"])
                                  ], 64)) : createCommentVNode("", true)
                                ];
                              }),
                              _: 2
                            }, 1024),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(proj.description), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode("h3", { class: "mb-3" }, "Responsibilities:"),
                                createVNode(_sfc_main$2, {
                                  items: proj.job,
                                  "no-split": ""
                                }, null, 8, ["items"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VCardTitle, { class: "list" }, {
                  default: withCtx(() => [
                    createVNode(VAvatar, {
                      image: unref(getAssetUrl)(exp.companyLogo),
                      size: "60"
                    }, null, 8, ["image"]),
                    createVNode("h3", { class: "ellipses" }, toDisplayString(exp.company), 1),
                    createVNode("a", {
                      href: exp.companyUrl,
                      target: "_blank",
                      title: exp.company
                    }, [
                      createVNode(VIcon, { size: "x-small" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-open-in-new")
                        ]),
                        _: 1
                      })
                    ], 8, ["href", "title"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(VCardSubtitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(exp.roles.join(", ")) + " ", 1),
                    createVNode("span", { class: "mx-2" }, "|"),
                    createTextVNode(" " + toDisplayString(exp.startDate) + " - " + toDisplayString(exp.endDate), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(VCardText, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(exp.description), 1)
                  ]),
                  _: 2
                }, 1024),
                createVNode(VCardText, null, {
                  default: withCtx(() => [
                    createVNode("h2", { class: "mb-4" }, "Achievements:"),
                    createVNode(_sfc_main$2, {
                      items: exp.achievements,
                      "no-split": ""
                    }, null, 8, ["items"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(VCardText, null, {
                  default: withCtx(() => [
                    createVNode("h2", { class: "mb-4" }, "Projects:"),
                    (openBlock(true), createBlock(Fragment, null, renderList(exp.projects, (proj) => {
                      return openBlock(), createBlock(VCard, {
                        key: proj.name,
                        class: "mb-4",
                        variant: "outlined"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "list" }, {
                            default: withCtx(() => {
                              var _a, _b, _c;
                              return [
                                createVNode("h4", {
                                  class: "ellipses",
                                  title: proj.name
                                }, toDisplayString(proj.name), 9, ["title"]),
                                proj.badge ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  unref(isDarkTheme) ? (openBlock(), createBlock(VImg, {
                                    key: 0,
                                    src: proj.badge.dark || proj.badge.default,
                                    height: "35",
                                    "max-width": "130"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock(VImg, {
                                    key: 1,
                                    src: proj.badge.light || proj.badge.default,
                                    height: "35",
                                    "max-width": "130"
                                  }, null, 8, ["src"]))
                                ], 64)) : createCommentVNode("", true),
                                createVNode("a", {
                                  href: proj.url,
                                  target: "_blank",
                                  title: proj.name
                                }, [
                                  createVNode(VIcon, { size: "x-small" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-open-in-new")
                                    ]),
                                    _: 1
                                  })
                                ], 8, ["href", "title"]),
                                proj.logo ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createVNode(VSpacer),
                                  createVNode("img", {
                                    src: unref(getAssetUrl)(proj.logo),
                                    height: ((_a = proj.logoStyle) == null ? void 0 : _a.height) || 60,
                                    width: ((_b = proj.logoStyle) == null ? void 0 : _b.width) || 100,
                                    class: "rounded",
                                    style: "object-fit: " + (((_c = proj.logoStyle) == null ? void 0 : _c.objectFit) || "contain")
                                  }, null, 12, ["src", "height", "width"])
                                ], 64)) : createCommentVNode("", true)
                              ];
                            }),
                            _: 2
                          }, 1024),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(proj.description), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("h3", { class: "mb-3" }, "Responsibilities:"),
                              createVNode(_sfc_main$2, {
                                items: proj.job,
                                "no-split": ""
                              }, null, 8, ["items"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
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
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ExperienceSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-chip--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChipGroup");
genericComponent()({
  name: "VChipGroup",
  props: makeVChipGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        filter: toRef(props, "filter"),
        variant: toRef(props, "variant")
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-chip-group", {
        "v-chip-group--column": props.column
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })];
      }
    }));
    return {};
  }
});
const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "span"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChip");
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    Ripple
  },
  props: makeVChipProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
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
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = computed(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    function onClick(e) {
      var _a;
      emit("click", e);
      if (!isClickable.value)
        return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasColor = !group || group.isSelected.value;
      return isActive.value && withDirectives(createVNode(Tag, {
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value, props.class],
        "style": [hasColor ? colorStyles.value : void 0, props.style],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "href": link.href.value,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, {
        default: () => {
          var _a2;
          var _a;
          return [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [withDirectives(createVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : withDirectives(createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, null), [[resolveDirective("slot"), slots.filter, "default"]])]), [[vShow, group.isSelected.value]])]
          }), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? createVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), createVNode("div", {
            "class": "v-chip__content"
          }, [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) != null ? _a2 : props.text]), hasAppend && createVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? createVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && createVNode("div", mergeProps({
            "key": "close",
            "class": "v-chip__close"
          }, closeProps.value), [!slots.close ? createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, slots.close)])];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "resume",
  __ssrInlineRender: true,
  setup(__props) {
    const Techs = Resume$1.technologies;
    useSeoMeta({
      title: "Resume | " + Resume$1.personalInfo.name + " | " + Resume$1.personalInfo.bio,
      ogTitle: "Resume | " + Resume$1.personalInfo.name + " | " + Resume$1.personalInfo.bio
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "home" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="resume"${_scopeId}><h1 class="mb-10 pt-12"${_scopeId}> Resume `);
            _push2(ssrRenderComponent(VChip, {
              color: "primary",
              to: { name: "ResumePdf" },
              title: "Download a copy of my resume"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VIcon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`mdi-download`);
                      } else {
                        return [
                          createTextVNode("mdi-download")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span class="px-1 font-weight-bold"${_scopeId2}>Download Pdf</span>`);
                } else {
                  return [
                    createVNode(VIcon, null, {
                      default: withCtx(() => [
                        createTextVNode("mdi-download")
                      ]),
                      _: 1
                    }),
                    createVNode("span", { class: "px-1 font-weight-bold" }, "Download Pdf")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</h1><h2${_scopeId}>Tools I Use</h2><div class="section-divider"${_scopeId}></div><p class="mb-7"${_scopeId}>These are, but not limited to, the techs I use for different services.</p><i class="colored"${_scopeId}></i><!--[-->`);
            ssrRenderList(unref(Techs), (tech) => {
              _push2(ssrRenderComponent(VCard, {
                key: tech.name,
                class: "mb-4",
                variant: "outlined"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(tech.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(tech.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCardText, { class: "tech-list" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(tech.tools, (tool, index) => {
                            _push4(`<div${ssrRenderAttr("title", tool.tooltip)}${_scopeId3}>`);
                            if (tool.class) {
                              _push4(`<i class="${ssrRenderClass([tool.class, "colored"])}"${_scopeId3}></i>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            if (tool.image) {
                              _push4(`<img${ssrRenderAttr("src", unref(getAssetUrl)(tool.image))}${_scopeId3}>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(tech.tools, (tool, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                title: tool.tooltip
                              }, [
                                tool.class ? (openBlock(), createBlock("i", {
                                  key: 0,
                                  class: ["colored", tool.class]
                                }, null, 2)) : createCommentVNode("", true),
                                tool.image ? (openBlock(), createBlock("img", {
                                  key: 1,
                                  src: unref(getAssetUrl)(tool.image)
                                }, null, 8, ["src"])) : createCommentVNode("", true)
                              ], 8, ["title"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(tech.name), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(VDivider),
                      createVNode(VCardText, { class: "tech-list" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(tech.tools, (tool, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              title: tool.tooltip
                            }, [
                              tool.class ? (openBlock(), createBlock("i", {
                                key: 0,
                                class: ["colored", tool.class]
                              }, null, 2)) : createCommentVNode("", true),
                              tool.image ? (openBlock(), createBlock("img", {
                                key: 1,
                                src: unref(getAssetUrl)(tool.image)
                              }, null, 8, ["src"])) : createCommentVNode("", true)
                            ], 8, ["title"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--><div class="py-12"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "resume" }, [
                createVNode("h1", { class: "mb-10 pt-12" }, [
                  createTextVNode(" Resume "),
                  createVNode(VChip, {
                    color: "primary",
                    to: { name: "ResumePdf" },
                    title: "Download a copy of my resume"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, null, {
                        default: withCtx(() => [
                          createTextVNode("mdi-download")
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "px-1 font-weight-bold" }, "Download Pdf")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("h2", null, "Tools I Use"),
                createVNode("div", { class: "section-divider" }),
                createVNode("p", { class: "mb-7" }, "These are, but not limited to, the techs I use for different services."),
                createVNode("i", { class: "colored" }),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(Techs), (tech) => {
                  return openBlock(), createBlock(VCard, {
                    key: tech.name,
                    class: "mb-4",
                    variant: "outlined"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(tech.name), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(VDivider),
                      createVNode(VCardText, { class: "tech-list" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(tech.tools, (tool, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              title: tool.tooltip
                            }, [
                              tool.class ? (openBlock(), createBlock("i", {
                                key: 0,
                                class: ["colored", tool.class]
                              }, null, 2)) : createCommentVNode("", true),
                              tool.image ? (openBlock(), createBlock("img", {
                                key: 1,
                                src: unref(getAssetUrl)(tool.image)
                              }, null, 8, ["src"])) : createCommentVNode("", true)
                            ], 8, ["title"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128)),
                createVNode("div", { class: "py-12" }),
                createVNode(_sfc_main$1)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resume.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=resume-f2319dcb.mjs.map
