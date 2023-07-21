import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { R as Resume$1, V as VIcon, a as VImg, g as getAssetUrl } from './VImg-51a9d54d.mjs';
import { b as useAppStore, s as storeToRefs } from '../server.mjs';
import { V as VDivider } from './VDivider-281d1850.mjs';
import { V as VFooter } from './VFooter-b62912e3.mjs';
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
  __name: "ResumePdf",
  __ssrInlineRender: true,
  setup(__props) {
    const appStore = useAppStore();
    const { isDarkTheme } = storeToRefs(appStore);
    const personalInfo = Resume$1.personalInfo;
    const experiences = Resume$1.experiences;
    const works = Resume$1.works;
    const technologies = Resume$1.technologies;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "resume-pdf" }, _attrs))}><div class="pdf"><h1>${ssrInterpolate(unref(personalInfo).name)}</h1><h4>${ssrInterpolate(unref(personalInfo).role)}</h4><p>${ssrInterpolate(unref(personalInfo).phone)} ${ssrInterpolate(unref(personalInfo).email)} ${ssrInterpolate(unref(personalInfo).municipality)}, ${ssrInterpolate(unref(personalInfo).country)} ${ssrInterpolate(unref(personalInfo).postalCode)}</p><div class="p-list"><a${ssrRenderAttr("href", unref(personalInfo).linkedin)} target="_blank">`);
      _push(ssrRenderComponent(VIcon, null, {
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
      _push(` ${ssrInterpolate(unref(personalInfo).linkedin.replace("https://", ""))}</a><a${ssrRenderAttr("href", unref(personalInfo).github)} target="_blank">`);
      _push(ssrRenderComponent(VIcon, {
        color: unref(isDarkTheme) ? "white" : "black"
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
      _push(` ${ssrInterpolate(unref(personalInfo).github.replace("https://", ""))}</a><a${ssrRenderAttr("href", unref(personalInfo).website)} target="_blank">`);
      _push(ssrRenderComponent(VIcon, { color: "indigo" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-web`);
          } else {
            return [
              createTextVNode("mdi-web")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ${ssrInterpolate(unref(personalInfo).website.replace("https://", ""))}</a><a${ssrRenderAttr("href", unref(personalInfo).devto)} target="_blank" class="list">`);
      _push(ssrRenderComponent(VImg, {
        src: unref(getAssetUrl)("devto.png"),
        width: "25"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(personalInfo).devto.replace("https://", ""))}</a></div><h2 class="pt-4">Summary</h2>`);
      _push(ssrRenderComponent(VDivider, { class: "mb-2" }, null, _parent));
      _push(`<p>${ssrInterpolate(unref(personalInfo).summary)}</p><h2 class="pt-4">Experience</h2>`);
      _push(ssrRenderComponent(VDivider, { class: "mb-2" }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(experiences), (experience, index) => {
        _push(`<div class="mb-4"><h3>${ssrInterpolate(index + 1)}. ${ssrInterpolate(experience.company)} <a${ssrRenderAttr("href", experience.companyUrl)} target="_blank"${ssrRenderAttr("title", experience.company)}>`);
        _push(ssrRenderComponent(VIcon, { size: "x-small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`mdi-open-in-new`);
            } else {
              return [
                createTextVNode("mdi-open-in-new")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</a></h3>`);
        _push(ssrRenderComponent(VDivider, null, null, _parent));
        _push(`<span></span><h4>${ssrInterpolate(experience.roles.join(", "))}</h4><p class="mb-2">${ssrInterpolate(experience.startDate)} - ${ssrInterpolate(experience.endDate)}</p><h3>Achievements</h3>`);
        _push(ssrRenderComponent(VDivider, { class: "mb-2" }, null, _parent));
        _push(`<ul><!--[-->`);
        ssrRenderList(experience.achievements, (task) => {
          _push(`<li>${task}</li>`);
        });
        _push(`<!--]--></ul><h3 class="pt-2">Projects</h3>`);
        _push(ssrRenderComponent(VDivider, { class: "pb-2" }, null, _parent));
        _push(`<!--[-->`);
        ssrRenderList(experience.projects, (project, index2) => {
          _push(`<div><h4>`);
          _push(ssrRenderComponent(VIcon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`mdi-chevron-right`);
              } else {
                return [
                  createTextVNode("mdi-chevron-right")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(` ${ssrInterpolate(project.name)}</h4><p>${ssrInterpolate(project.description)}</p><h4 class="py-2">Jobs:</h4><ul class="mb-3"><!--[-->`);
          ssrRenderList(project.job, (task) => {
            _push(`<li>${task}</li>`);
          });
          _push(`<!--]--></ul></div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--><h2 class="pt-4">Works</h2><hr class="mb-2"><!--[-->`);
      ssrRenderList(unref(works), (work, index) => {
        _push(`<div class="mb-4"><h3>${ssrInterpolate(index + 1)}. ${ssrInterpolate(work.title)}</h3>`);
        _push(ssrRenderComponent(VDivider, { class: "mb-2" }, null, _parent));
        _push(`<p class="mb-2">${ssrInterpolate(work.description)}</p><ul class="mb-3"><h3>Technologies:</h3>`);
        _push(ssrRenderComponent(VDivider, null, null, _parent));
        _push(`<!--[-->`);
        ssrRenderList(work.technologies, (tech) => {
          _push(`<li>${tech}</li>`);
        });
        _push(`<!--]--></ul><ul><h3>Links:</h3>`);
        _push(ssrRenderComponent(VDivider, { class: "mb-2" }, null, _parent));
        _push(`<!--[-->`);
        ssrRenderList(Object.entries(work.links), ([key, value]) => {
          _push(`<li><a${ssrRenderAttr("href", value)} target="_blank" class="text-capitalize">${ssrInterpolate(key)} `);
          _push(ssrRenderComponent(VIcon, { size: "small" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`mdi-open-in-new`);
              } else {
                return [
                  createTextVNode("mdi-open-in-new")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</a></li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--><h2 class="pt-4">Technologies</h2>`);
      _push(ssrRenderComponent(VDivider, { class: "mb-2" }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(technologies), (technology) => {
        _push(`<div class="mb-4"><h3>`);
        _push(ssrRenderComponent(VIcon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`mdi-chevron-right`);
            } else {
              return [
                createTextVNode("mdi-chevron-right")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`${ssrInterpolate(technology.name)}</h3>`);
        _push(ssrRenderComponent(VDivider, null, null, _parent));
        _push(`<ul><!--[-->`);
        ssrRenderList(technology.tools, (tech, index) => {
          _push(`<li>${ssrInterpolate(tech.tooltip)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(VDivider, null, null, _parent));
      _push(ssrRenderComponent(VFooter, { class: "d-flex justify-space-between" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}> kiranparajuli.com.np </div><div${_scopeId}> All rights reserved \xA9 ${ssrInterpolate(( new Date()).getFullYear())}</div>`);
          } else {
            return [
              createVNode("div", null, " kiranparajuli.com.np "),
              createVNode("div", null, " All rights reserved \xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ResumePdf.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ResumePdf-7b256285.mjs.map
