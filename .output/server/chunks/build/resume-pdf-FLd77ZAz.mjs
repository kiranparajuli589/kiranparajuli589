import { defineComponent, mergeProps, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { R as Resume } from './resume-CN0FSVbL.mjs';
import { u as useSeo } from './useSeo--CXWwwl_.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './server.mjs';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _imports_0 = publicAssetsURL("/icons/phone.svg");
const _imports_1 = publicAssetsURL("/icons/email.svg");
const _imports_2 = publicAssetsURL("/icons/location.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Divider",
  __ssrInlineRender: true,
  props: {
    height: { default: 1 },
    color: { default: "#ababab" }
  },
  setup(__props) {
    const props = __props;
    const computedHeight = computed(() => {
      if (typeof props.height === "string" && (props.height.endsWith("px") || props.height.endsWith("rem"))) {
        return props.height;
      } else {
        return `${props.height}px`;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "divider",
        style: { height: computedHeight.value, backgroundColor: __props.color }
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Divider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Divider = Object.assign(_sfc_main$1, { __name: "Divider" });
const siteUrl = "https://kiranparajuli.com.np";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "resume-pdf",
  __ssrInlineRender: true,
  setup(__props) {
    const currentUrl = `${siteUrl}/resume-pdf`;
    const imageUrl = `${siteUrl}/letter_k.png`;
    const personalInfo = Resume.personalInfo;
    const experiences = Resume.experiences;
    const education = Resume.education;
    const skills = Resume.skills;
    const leadershipHighlights = Resume.leadershipHighlights;
    const selectedProjects = Resume.selectedProjects;
    const extras = Resume.extras;
    const socialLinks = [
      {
        label: "LinkedIn",
        href: personalInfo.linkedin || "#"
      },
      {
        label: "GitHub",
        href: personalInfo.github || "#"
      },
      {
        label: "Website",
        href: personalInfo.website || "#"
      },
      {
        label: "Dev.to",
        href: personalInfo.devto || "#"
      }
    ].filter((link) => link.href !== "#");
    useSeo({
      title: `${personalInfo.name} - Resume PDF`,
      description: `Professional resume PDF of ${personalInfo.name}, ${personalInfo.role}. Download the complete resume and professional background.`,
      keywords: `${personalInfo.name} Resume PDF, Curriculum Vitae, Frontend Developer Resume, Full Stack Developer Resume, QA Engineer Resume, Download Resume`,
      image: imageUrl,
      url: currentUrl,
      type: "profile",
      structuredData: {
        "@type": "MediaObject",
        name: `${personalInfo.name} Resume`,
        description: `Professional resume PDF of ${personalInfo.name}`,
        url: currentUrl,
        author: {
          "@type": "Person",
          name: personalInfo.name,
          email: personalInfo.email,
          telephone: personalInfo.phone,
          jobTitle: personalInfo.role
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "resume-pdf" }, _attrs))} data-v-42380673><div class="pdf" data-v-42380673><h1 class="font-bold text-xl" data-v-42380673>${ssrInterpolate(unref(personalInfo).name)}</h1><h4 class="text-gray-700 font-semibold mb-2" data-v-42380673>${ssrInterpolate(unref(personalInfo).role)}</h4><p class="flex items-center gap-4 flex-wrap contact-info" data-v-42380673><span class="flex items-center gap-2" data-v-42380673><img${ssrRenderAttr("src", _imports_0)} alt="Phone" class="size-4 block print-hide" data-v-42380673> ${ssrInterpolate(unref(personalInfo).phone)}</span><span class="flex items-center gap-2" data-v-42380673><img${ssrRenderAttr("src", _imports_1)} alt="Email" class="size-4 block print-hide" data-v-42380673> ${ssrInterpolate(unref(personalInfo).email)}</span><span class="flex items-center gap-2" data-v-42380673><img${ssrRenderAttr("src", _imports_2)} alt="Location" class="size-4 block print-hide" data-v-42380673> ${ssrInterpolate(unref(personalInfo).municipality)}, ${ssrInterpolate(unref(personalInfo).country)}, ${ssrInterpolate(unref(personalInfo).postalCode)}</span></p><div class="p-list flex gap-2 flex-wrap items-center" data-v-42380673><span class="font-semibold" data-v-42380673>Links:</span><!--[-->`);
      ssrRenderList(unref(socialLinks), (link, index) => {
        _push(`<span class="link-item" data-v-42380673><span data-v-42380673>${ssrInterpolate(link.label)}</span><span class="link-url" data-v-42380673>(${ssrInterpolate(link.href)})</span>`);
        if (index < unref(socialLinks).length - 1) {
          _push(`<span data-v-42380673>, </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></div><h2 class="pt-4" data-v-42380673>Summary</h2><hr class="mb-2" data-v-42380673><p data-v-42380673>${ssrInterpolate(unref(personalInfo).summary)}</p><h2 class="pt-4" data-v-42380673>Leadership Highlights</h2><hr class="mb-2" data-v-42380673><ul data-v-42380673><!--[-->`);
      ssrRenderList(unref(leadershipHighlights), (highlight) => {
        _push(`<li data-v-42380673>${ssrInterpolate(highlight)}</li>`);
      });
      _push(`<!--]--></ul><h2 class="pt-4" data-v-42380673>Skills</h2><hr class="mb-2" data-v-42380673><!--[-->`);
      ssrRenderList(unref(skills), (skill) => {
        _push(`<div class="mb-4" data-v-42380673><h4 class="font-semibold" data-v-42380673>${ssrInterpolate(skill.title)}</h4><ul data-v-42380673><!--[-->`);
        ssrRenderList(skill.items, (item) => {
          _push(`<li data-v-42380673>${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--><h2 class="pt-4 experience-section-start" data-v-42380673>Experience</h2><hr class="mb-2 border-gray-500" data-v-42380673><!--[-->`);
      ssrRenderList(unref(experiences), (experience) => {
        _push(`<div class="mb-6 experience-item" data-v-42380673><h3 class="font-semibold experience-company" data-v-42380673>${ssrInterpolate(experience.company)} <span class="company-url" data-v-42380673>(${ssrInterpolate(experience.companyUrl)})</span></h3><div class="mb-1" data-v-42380673><div title="Role" class="font-semibold text-gray-600 role-text" data-v-42380673>${ssrInterpolate(experience.roles.join(", "))} (${ssrInterpolate(experience.startDate)} - ${ssrInterpolate(experience.endDate)}) </div></div><hr class="mb-2 border-gray-400" data-v-42380673><h3 data-v-42380673>Achievements</h3><hr class="mb-2 border-gray-300" data-v-42380673><ul data-v-42380673><!--[-->`);
        ssrRenderList(experience.achievements, (task) => {
          _push(`<li data-v-42380673>${ssrInterpolate(task)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--><h2 class="pt-4" data-v-42380673>Selected Projects</h2>`);
      _push(ssrRenderComponent(Divider, {
        class: "mb-2",
        height: "2"
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(selectedProjects), (project) => {
        _push(`<div class="mb-6 project-item" data-v-42380673><h3 class="font-semibold" data-v-42380673>${ssrInterpolate(project.title)}</h3><hr class="mb-2" data-v-42380673><p class="mb-1" data-v-42380673>${ssrInterpolate(project.description)}</p><p class="mb-2 text-sm italic" data-v-42380673>${ssrInterpolate(project.impact)}</p><div class="mb-1 text-sm" data-v-42380673><strong class="mr-3" data-v-42380673>Stack:</strong> ${ssrInterpolate(project.stack.join(", "))}</div>`);
        if (project.links && Object.keys(project.links).length) {
          _push(`<div class="flex gap-4 mb-2 flex-wrap project-links" data-v-42380673><strong data-v-42380673>Links:</strong><!--[-->`);
          ssrRenderList(project.links, (value, key, idx) => {
            _push(`<span data-v-42380673><span class="capitalize" data-v-42380673>${ssrInterpolate(key)}</span>: ${ssrInterpolate(value)} `);
            if (idx < Object.keys(project.links).length - 1) {
              _push(`<span data-v-42380673> , </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--><h2 class="pt-4" data-v-42380673>Education</h2><hr class="mb-2" data-v-42380673><!--[-->`);
      ssrRenderList(unref(education), (edu) => {
        _push(`<div class="mb-4" data-v-42380673><h3 class="font-semibold" data-v-42380673>${ssrInterpolate(edu.degree)} in ${ssrInterpolate(edu.name)}</h3><h4 data-v-42380673>${ssrInterpolate(edu.major)}</h4><p data-v-42380673>${ssrInterpolate(edu.startDate)} - ${ssrInterpolate(edu.endDate)}</p></div>`);
      });
      _push(`<!--]--><h2 class="pt-4" data-v-42380673>Extras</h2><hr class="mb-2" data-v-42380673><ul data-v-42380673><!--[-->`);
      ssrRenderList(unref(extras), (extra) => {
        _push(`<li data-v-42380673>${ssrInterpolate(extra)}</li>`);
      });
      _push(`<!--]--></ul></div><hr class="border-gray-200 dark:border-gray-700 my-4" data-v-42380673><footer class="flex justify-between" data-v-42380673><div data-v-42380673>kiranparajuli.com.np</div><div data-v-42380673>All rights reserved © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())}</div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resume-pdf.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resumePdf = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-42380673"]]);

export { resumePdf as default };
//# sourceMappingURL=resume-pdf-FLd77ZAz.mjs.map
