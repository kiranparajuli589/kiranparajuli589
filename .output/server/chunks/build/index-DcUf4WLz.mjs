import { _ as _sfc_main$1 } from './Card-Ql4XOehz.mjs';
import { _ as _sfc_main$2 } from './Skeleton-CpedCoBy.mjs';
import { o as navigateTo } from './server.mjs';
import { defineComponent, reactive, ref, mergeProps, withCtx, unref, createBlock, createCommentVNode, createVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { h as htmlMark } from './utils-DjzuE-8B.mjs';
import { u as useSeo, b as createCollectionPageStructuredData } from './useSeo--CXWwwl_.mjs';
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

const siteUrl = "https://kiranparajuli.com.np";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const currentUrl = `${siteUrl}/blogs`;
    const imageUrl = `${siteUrl}/letter_k.png`;
    htmlMark();
    const frontMatters = reactive([]);
    const loading = ref(true);
    useSeo({
      title: "Blogs",
      description: "Read tech blogs, tutorials, and articles by Kiran Parajuli on software development, Python, Django, Vue.js, React.js, QA automation, and web development.",
      keywords: "Kiran Parajuli Blog, Tech Blog, Software Development Blog, Django Tutorial, Vue.js Tutorial, QA Automation Blog, Web Development Articles, Programming Tutorials",
      image: imageUrl,
      url: currentUrl,
      type: "website",
      structuredData: createCollectionPageStructuredData({
        name: "Kiran Parajuli Blog",
        description: "Tech blogs, tutorials, and articles on software development",
        url: currentUrl
      })
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_USkeleton = _sfc_main$2;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        variant: "subtle",
        color: "transparent",
        class: "blog min-h-[70vh]"
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1${_scopeId}>Blogs</h1>`);
          } else {
            return [
              createVNode("h1", null, "Blogs")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-2"${_scopeId}></div><div class="mb-4"${_scopeId}> I write blogs occasionally. I mostly write about things I learn, things I find interesting, and things I want to share. </div>`);
            if (loading.value) {
              _push2(`<div class="flex flex-col gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_USkeleton, { class: "h-64" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_USkeleton, { class: "h-64" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_USkeleton, { class: "h-64" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(frontMatters, (blog, blogIndex) => {
                _push2(`<!--[-->`);
                if (blog && blog.title) {
                  _push2(ssrRenderComponent(_component_UCard, {
                    class: "blog--item mb-4 hover:shadow-lg transition-shadow cursor-pointer",
                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/blog/${blog.fileName.replace(".md", "")}`)
                  }, {
                    header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<h2 class="font-semibold text-xl"${_scopeId2}>${ssrInterpolate(blog.title)}</h2>`);
                      } else {
                        return [
                          createVNode("h2", { class: "font-semibold text-xl" }, toDisplayString(blog.title), 1)
                        ];
                      }
                    }),
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        if (blog.tags) {
                          _push3(`<div class="blog--tags flex flex-wrap gap-2 mb-4"${_scopeId2}>`);
                          if (Array.isArray(blog.tags)) {
                            _push3(`<!--[-->`);
                            ssrRenderList(blog.tags, (tag, index) => {
                              _push3(`<div class="bg-gray-200 px-2 py-1 rounded dark:bg-gray-800"${_scopeId2}>${ssrInterpolate(tag)}</div>`);
                            });
                            _push3(`<!--]-->`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<div class="blog--info flex justify-between text-sm text-gray-600 dark:text-gray-400"${_scopeId2}><div class="blog--date"${_scopeId2}>${ssrInterpolate(new Date(blog.date).toDateString())}</div><div class="blog--time-to-read"${_scopeId2}>${ssrInterpolate(Math.ceil(blog.contentLength / 1e3))} minutes read </div></div>`);
                      } else {
                        return [
                          blog.tags ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "blog--tags flex flex-wrap gap-2 mb-4"
                          }, [
                            Array.isArray(blog.tags) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(blog.tags, (tag, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "bg-gray-200 px-2 py-1 rounded dark:bg-gray-800"
                              }, toDisplayString(tag), 1);
                            }), 128)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "blog--info flex justify-between text-sm text-gray-600 dark:text-gray-400" }, [
                            createVNode("div", { class: "blog--date" }, toDisplayString(new Date(blog.date).toDateString()), 1),
                            createVNode("div", { class: "blog--time-to-read" }, toDisplayString(Math.ceil(blog.contentLength / 1e3)) + " minutes read ", 1)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
            }
          } else {
            return [
              createVNode("div", { class: "py-2" }),
              createVNode("div", { class: "mb-4" }, " I write blogs occasionally. I mostly write about things I learn, things I find interesting, and things I want to share. "),
              loading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col gap-4"
              }, [
                createVNode(_component_USkeleton, { class: "h-64" }),
                createVNode(_component_USkeleton, { class: "h-64" }),
                createVNode(_component_USkeleton, { class: "h-64" })
              ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(frontMatters, (blog, blogIndex) => {
                return openBlock(), createBlock(Fragment, { key: blogIndex }, [
                  blog && blog.title ? (openBlock(), createBlock(_component_UCard, {
                    key: 0,
                    class: "blog--item mb-4 hover:shadow-lg transition-shadow cursor-pointer",
                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/blog/${blog.fileName.replace(".md", "")}`)
                  }, {
                    header: withCtx(() => [
                      createVNode("h2", { class: "font-semibold text-xl" }, toDisplayString(blog.title), 1)
                    ]),
                    default: withCtx(() => [
                      blog.tags ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "blog--tags flex flex-wrap gap-2 mb-4"
                      }, [
                        Array.isArray(blog.tags) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(blog.tags, (tag, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "bg-gray-200 px-2 py-1 rounded dark:bg-gray-800"
                          }, toDisplayString(tag), 1);
                        }), 128)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "blog--info flex justify-between text-sm text-gray-600 dark:text-gray-400" }, [
                        createVNode("div", { class: "blog--date" }, toDisplayString(new Date(blog.date).toDateString()), 1),
                        createVNode("div", { class: "blog--time-to-read" }, toDisplayString(Math.ceil(blog.contentLength / 1e3)) + " minutes read ", 1)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["onClick"])) : createCommentVNode("", true)
                ], 64);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blogs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DcUf4WLz.mjs.map
