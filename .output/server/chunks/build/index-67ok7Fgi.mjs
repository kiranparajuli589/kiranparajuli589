import { defineComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, createCommentVNode, createTextVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './Card-Ql4XOehz.mjs';
import { u as useHead, a as _sfc_main$b, b as _sfc_main$d } from './server.mjs';
import { R as Resume } from './resume-CN0FSVbL.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { g as getAssetUrl } from './utils-DjzuE-8B.mjs';
import { u as useSeo, c as createPersonStructuredData, a as createWebsiteStructuredData } from './useSeo--CXWwwl_.mjs';
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
import 'highlight.js';
import 'htmlmark';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "IntroSection",
  __ssrInlineRender: true,
  setup(__props) {
    const personalInfo = Resume.personalInfo;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UAvatar = _sfc_main$b;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        variant: "subtle",
        ui: {
          root: "dark:!bg-gray-900"
        }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-16 flex-wrap items-center" data-v-138c2250${_scopeId}><div class="left-panel flex flex-col gap-2 basis-1/3" data-v-138c2250${_scopeId}><div class="full-name text-5xl font-black uppercase" data-v-138c2250${_scopeId}>${ssrInterpolate(unref(personalInfo).name)}</div><div class="title text-2xl font-bold" data-v-138c2250${_scopeId}>${ssrInterpolate(unref(personalInfo).role)}</div><div class="subtitle" data-v-138c2250${_scopeId}>${ssrInterpolate(unref(personalInfo).bio)}</div><a class="lets-talk"${ssrRenderAttr("href", "mailto:" + unref(personalInfo).email)} data-v-138c2250${_scopeId}><span class="lets" data-v-138c2250${_scopeId}>let&#39;s</span><span class="talk" data-v-138c2250${_scopeId}>talk</span></a></div><div class="right-panel flex justify-center items-center p-4" data-v-138c2250${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UAvatar, {
              size: "160",
              src: "/avatar.webp",
              alt: "Kiran Parajuli - Frontend Developer",
              loading: "eager"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-16 flex-wrap items-center" }, [
                createVNode("div", { class: "left-panel flex flex-col gap-2 basis-1/3" }, [
                  createVNode("div", { class: "full-name text-5xl font-black uppercase" }, toDisplayString(unref(personalInfo).name), 1),
                  createVNode("div", { class: "title text-2xl font-bold" }, toDisplayString(unref(personalInfo).role), 1),
                  createVNode("div", { class: "subtitle" }, toDisplayString(unref(personalInfo).bio), 1),
                  createVNode("a", {
                    class: "lets-talk",
                    href: "mailto:" + unref(personalInfo).email
                  }, [
                    createVNode("span", { class: "lets" }, "let's"),
                    createVNode("span", { class: "talk" }, "talk")
                  ], 8, ["href"])
                ]),
                createVNode("div", { class: "right-panel flex justify-center items-center p-4" }, [
                  createVNode(_component_UAvatar, {
                    size: "160",
                    src: "/avatar.webp",
                    alt: "Kiran Parajuli - Frontend Developer",
                    loading: "eager"
                  })
                ])
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
const IntroSection = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-138c2250"]]), { __name: "HomeIntroSection" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ServicesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const services = Resume.services;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$d;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-12" }, _attrs))} data-v-16720a8a><h1 class="text-4xl font-bold" data-v-16720a8a>What can I do?</h1><div class="text-sm text-gray-500 dark:text-gray-400" data-v-16720a8a>Service Offers</div><div class="section-divider mb-12" data-v-16720a8a></div><div class="flex flex-wrap gap-4" data-v-16720a8a><!--[-->`);
      ssrRenderList(unref(services), (service, index) => {
        _push(ssrRenderComponent(_component_UCard, {
          key: service.name,
          variant: "subtle",
          class: ["grow w-full md:w-[calc(50%-0.5rem)]", "service-card service-" + index],
          ui: {
            root: "dark:!bg-gray-900"
          }
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2" data-v-16720a8a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                class: ["text-3xl", service.iconColor],
                name: "i-mdi-" + service.icon
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="overflow-hidden text-ellipsis whitespace-nowrap m-0 text-xl" data-v-16720a8a${_scopeId}>${ssrInterpolate(service.name)}</h2></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    class: ["text-3xl", service.iconColor],
                    name: "i-mdi-" + service.icon
                  }, null, 8, ["name", "class"]),
                  createVNode("h2", { class: "overflow-hidden text-ellipsis whitespace-nowrap m-0 text-xl" }, toDisplayString(service.name), 1)
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="pt-0 mb-4" data-v-16720a8a${_scopeId}><p class="mb-1" data-v-16720a8a${_scopeId}> Experience: <span class="${ssrRenderClass("font-bold text-" + service.iconColor)}" data-v-16720a8a${_scopeId}>${ssrInterpolate(service.experience)}</span> years </p></div><div class="mb-4" data-v-16720a8a${_scopeId}>${ssrInterpolate(service.description)}</div>`);
              if (service.types) {
                _push2(`<div class="mt-4" data-v-16720a8a${_scopeId}><div class="flex items-center gap-2 mb-3" data-v-16720a8a${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-mdi-format-list-bulleted-type",
                  class: "text-xl"
                }, null, _parent2, _scopeId));
                _push2(`<h3 data-v-16720a8a${_scopeId}>Types:</h3></div> ${ssrInterpolate(service.types.join(", "))}. </div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "pt-0 mb-4" }, [
                  createVNode("p", { class: "mb-1" }, [
                    createTextVNode(" Experience: "),
                    createVNode("span", {
                      class: "font-bold text-" + service.iconColor
                    }, toDisplayString(service.experience), 3),
                    createTextVNode(" years ")
                  ])
                ]),
                createVNode("div", { class: "mb-4" }, toDisplayString(service.description), 1),
                service.types ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-4"
                }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-3" }, [
                    createVNode(_component_UIcon, {
                      name: "i-mdi-format-list-bulleted-type",
                      class: "text-xl"
                    }),
                    createVNode("h3", null, "Types:")
                  ]),
                  createTextVNode(" " + toDisplayString(service.types.join(", ")) + ". ", 1)
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ServicesSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ServicesSection = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-16720a8a"]]), { __name: "HomeServicesSection" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MyWorks",
  __ssrInlineRender: true,
  setup(__props) {
    const works = Resume.works;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "works",
        class: "py-12"
      }, _attrs))}><h1 class="text-4xl font-bold">My Works</h1><div class="text-sm text-gray-500">Some of My Projects</div><div class="section-divider mb-12"></div><div class="flex flex-wrap gap-4"><!--[-->`);
      ssrRenderList(unref(works), (work) => {
        _push(ssrRenderComponent(_component_UCard, {
          key: work.title,
          variant: "subtle",
          class: "flex-[48%] min-w-80"
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h2 class="work--card--title text-3xl"${_scopeId}>${ssrInterpolate(work.title)}</h2>`);
            } else {
              return [
                createVNode("h2", { class: "work--card--title text-3xl" }, toDisplayString(work.title), 1)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="bg-gray-200 rounded-lg overflow-hidden"${_scopeId}><img class="w-full max-h-64 object-cover" loading="lazy" decoding="async"${ssrRenderAttr("alt", `${work.title} project thumbnail`)}${ssrRenderAttr("src", unref(getAssetUrl)(work.thumbnail, "projects"))}${_scopeId}></div><div class="mt-4"${_scopeId}>${ssrInterpolate(work.description)}</div><div class="border-t border-gray-200 dark:border-gray-700 my-4"${_scopeId}></div><div class="flex flex-wrap gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(Object.entries(work.links), ([key, value]) => {
                _push2(`<a target="_blank" rel="noopener noreferrer" class="text-primary hover:underline"${ssrRenderAttr("href", value)}${ssrRenderAttr("title", key)}${_scopeId}>${ssrInterpolate(key)}</a>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "bg-gray-200 rounded-lg overflow-hidden" }, [
                  createVNode("img", {
                    class: "w-full max-h-64 object-cover",
                    loading: "lazy",
                    decoding: "async",
                    alt: `${work.title} project thumbnail`,
                    src: unref(getAssetUrl)(work.thumbnail, "projects")
                  }, null, 8, ["alt", "src"])
                ]),
                createVNode("div", { class: "mt-4" }, toDisplayString(work.description), 1),
                createVNode("div", { class: "border-t border-gray-200 dark:border-gray-700 my-4" }),
                createVNode("div", { class: "flex flex-wrap gap-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(Object.entries(work.links), ([key, value]) => {
                    return openBlock(), createBlock("a", {
                      key,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      class: "text-primary hover:underline",
                      href: value,
                      title: key
                    }, toDisplayString(key), 9, ["href", "title"]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/MyWorks.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MyWorks = Object.assign(_sfc_main$1, { __name: "HomeMyWorks" });
const siteUrl = "https://kiranparajuli.com.np";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const imageUrl = `${siteUrl}/letter_k.png`;
    useSeo({
      title: "React.js, Vue.js, Django, Frontend Developer from Nepal",
      description: "Frontend Developer, Full Stack Developer, and QA Automation Engineer from Nepal specializing in Vue.js, React.js, Python, PHP, NodeJS, and modern web technologies.",
      keywords: "Kiran Parajuli, Frontend Developer, Full Stack Developer, QA Engineer, Python, Django, Vue.js, React.js, Node.js, PHP, Quality Assurance, Web Development, Nepal",
      image: imageUrl,
      url: siteUrl,
      type: "website",
      structuredData: createPersonStructuredData({
        name: "Kiran Parajuli",
        jobTitle: "Frontend & Full Stack Developer & QA Engineer",
        description: "Frontend Developer, Full Stack Developer, and QA Automation Engineer from Nepal specializing in Vue.js, React.js, Python, PHP, NodeJS, and modern web technologies.",
        image: imageUrl,
        url: siteUrl,
        sameAs: [
          "https://www.linkedin.com/in/kiranparajuli589",
          "https://github.com/kiranparajuli589",
          "https://dev.to/kiranparajuli589"
        ],
        address: {
          addressCountry: "NP",
          addressLocality: "Kathmandu"
        }
      })
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            ...createWebsiteStructuredData({
              name: "Kiran Parajuli Portfolio",
              description: "Personal portfolio of Kiran Parajuli - Frontend & Full Stack Developer & QA Engineer",
              url: siteUrl
            })
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(IntroSection, null, null, _parent));
      _push(ssrRenderComponent(ServicesSection, null, null, _parent));
      _push(ssrRenderComponent(MyWorks, null, null, _parent));
      _push(`</div>`);
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
//# sourceMappingURL=index-67ok7Fgi.mjs.map
