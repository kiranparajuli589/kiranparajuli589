globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { computed, isRef, ref, toRef, Text, createVNode, shallowRef, watch, nextTick, withDirectives, mergeProps, Fragment, resolveDirective, vShow, h, Transition } from 'vue';
import { p as propsFactory, w as getCurrentInstanceName, C as destructComputed, q as includes, o as convertToUnit, I as IconValue, m as makeComponentProps, e as makeTagProps, f as makeThemeProps, g as genericComponent, h as provideTheme, F as useIcon, j as useRender, G as flattenFragments, S as SUPPORTS_INTERSECTION, D as isCssColor } from '../server.mjs';

function getAssetUrl(path) {
  return new URL(`../assets/${path}`, globalThis._importMeta_.url).href;
}
function addThemeToStorage(isDark) {
  localStorage.setItem("isDark", isDark.toString());
}
function isDarkThemeSelected() {
  return localStorage.getItem("isDark") === "true";
}
const Resume = {
  personalInfo: {
    name: "Kiran Parajuli",
    role: "Software Engineer",
    municipality: "Panchkhal, Kavre",
    country: "Nepal",
    postalCode: "45200",
    phone: "+977 984-3530425",
    email: "kiranparajuli589@gmail.com",
    devto: "https://dev.to/kiranparajuli589",
    linkedin: "https://linkedin.com/in/kiranparajuli589",
    github: "https://github.com/kiranparajuli589",
    website: "https://kiranparajuli.com.np",
    bio: "Full Stack Developer, QA Automation Engineer, and a Tech Enthusiast",
    summary: "I'm a software developer and quality assurance engineer. My specialties include Python, PHP, and NodeJS for backend work and database management. I'm also skilled in VueJs for creating sophisticated web designs. I take great pride in my attention to detail and commitment to delivering high-quality results. When I'm not coding, I enjoy playing guitar and listening to music to stay inspired. I'm always eager to collaborate with others and help bring their visions to life.",
    avatar: getAssetUrl("avatar.jpeg")
  },
  experiences: [
    {
      company: "JankariTech Pvt. Ltd.",
      description: "An IT company situated at Pokhara, Nepal and specializes in helping customers set up test automation.",
      roles: [
        "Software Developer",
        "Junior Programmer"
      ],
      startDate: "2019",
      endDate: "2022",
      technologies: [
        "VueJs",
        "Vue Unit Tests",
        "Playwright",
        "Behat",
        "PhpUnit",
        "NightwatchJs",
        "GitHub",
        "GithubCI",
        "DroneCI"
      ],
      achievements: [
        "A blog website for the JankariTech peoples using markdowns and VueJS. <a href='https://blog.jankaritech.com' target='_blank' title='blog.jankaritech.com'>\u{1F517}</a>",
        "Help peoples from Programiz team to write unit and e2e tests for their website.",
        "Organize a workshop on Automation Testing using Playwright.",
        "Run weekly trainings about different technologies like Websockets, VueJS, Playwright, etc.",
        "Colab with the fellow programmers to get more quality test infrastructures."
      ],
      companyUrl: "www.jankaritech.com",
      companyLogo: "jankaritech.jpg",
      projects: [
        {
          name: "QA with Owncloud",
          description: "'ownCloud' develops and provides open-source software for content collaboration, allowing teams to easily share and work on files seamlessly regardless of device or location.",
          job: [
            "Write e2e and unit tests for new features added or bugs fixed.",
            "Maintain CI/CD pipelines for the daily running builds or tests.",
            "Automate the product release processes",
            "Build necessary test infrastructures like 'test-middleware', 'testing-app' for better test coverage and performance"
          ],
          url: "https://owncloud.com",
          badge: {
            dark: "/oc-badge-community-contributor-dark.png",
            light: "/oc-badge-community-contributor-light.png"
          },
          logo: "oc-logo.svg",
          logoStyle: {
            objectFit: "cover"
          }
        },
        {
          name: "Integration app for OpenProject and Nextcloud",
          description: "An integration app for OpenProject and Nextcloud to sync the files and folders from Nextcloud to the work-packages in the OpenProject application..",
          job: [
            "Implement the designs for the features in the Nextcloud integration app.",
            "Write backend for the nextcloud integration app to implement searches, database actions and OAuth.",
            "Write e2e and unit tests for the new features added or bugs fixed.",
            "Maintain CI/CD pipelines for the daily running builds or tests."
          ],
          url: "https://github.com/nextcloud/integration_openproject",
          logo: "o-n.jpg",
          logoStyle: {
            objectFit: "cover"
          }
        },
        {
          name: "E2E Tests Workshop with the Programiz Team",
          description: "'Programiz' helps to learn program with their beginner-friendly tutorials and examples",
          job: [
            "Write e2e tests for the new Programiz Pro features.",
            "Maintain UI test infrastructure to be completely independent of the backend service",
            "Organize a workshop on Automation Testing using Playwright to help Programiz team to write better tests."
          ],
          url: "https://www.programiz.com/",
          logo: "programiz.png",
          logoStyle: {
            width: 60
          }
        },
        {
          name: "E2E Tests for the My Second Teacher Website",
          description: "'My Second Teacher' is an online learning platform for students to learn from the best teachers in Nepal.",
          job: [
            "Write e2e tests for the different features (B2B, B2C) of the website.",
            "Maintain CI/CD pipelines for the daily running builds or tests."
          ],
          url: "https://www.mysecondteacher.com/",
          logo: "mst.png",
          logoStyle: {
            width: 60
          }
        }
      ]
    },
    {
      company: "Tech Himalaya",
      companyLogo: "tech-himalaya.png",
      companyUrl: "https://techhimalaya.com/",
      roles: [
        "Freelance Frontend Developer"
      ],
      description: "'Tech Himalaya' is a Nepal's leading IT Company dealing with all sorts of Software, Hardware and Cloud Solutions.",
      startDate: "2019",
      endDate: "2020",
      achievements: [
        "Learnt to work with a remote team and manage the time to complete the tasks.",
        "Learnt better strategies to implement websites using VueJS (concept of mixins)."
      ],
      projects: [
        {
          name: "Leave Management Dashboard",
          description: "A dashboard for a company to manage their employees' leaves.",
          job: [
            "Developed the frontend using VueJS and Vuetify"
          ]
        },
        {
          name: "Bit Coins Survey",
          description: "A survey website for different Bit Coins.",
          job: [
            "Developed the frontend using VueJS and Vuetify"
          ]
        }
      ],
      technologies: [
        "VueJs"
      ]
    },
    {
      company: "Nipuna Prabidhik Sewa",
      description: "Nipuna Prabidhik Sewa is a technology service provider specializing in Web Cloud, Professional, and Managed Services.",
      roles: [
        "Software Developer Internship"
      ],
      startDate: "2018",
      endDate: "2019",
      technologies: [
        "Python",
        "Django",
        "HTML",
        "CSS",
        "JS",
        "Ajax",
        "JQuery",
        "Bootstrap",
        "MySQL",
        "Git"
      ],
      achievements: [
        "Developed a inventory management system for a small retailer shop",
        "Developed a attendance system using Raspberry Pi for the company"
      ],
      projects: [
        {
          name: "Inventory Management System",
          description: "A web application for a small retailer shop to manage their inventory.",
          job: [
            "Cart system for the customers to buy products",
            "Admin panel to manage the products, customers, orders, etc.",
            "Generate reports for the sales, orders, etc."
          ],
          url: ""
        },
        {
          name: "Attendance System",
          description: "A web application to manage the attendance of the employees using RPi and a fingerprint module.",
          job: [
            "Collect daily attendance of the employees using fingerprint module",
            "Generate reports for the attendance of the employees"
          ]
        }
      ],
      companyLogo: "nps.png",
      companyUrl: "https://www.nipunasewa.com/"
    }
  ],
  works: [
    {
      title: "VueYtframe",
      description: "A Vue component to embed YouTube videos in your Vue app.",
      thumbnail: "vue-ytparser.png",
      technologies: [
        "VueJs",
        "Youtube Iframe API"
      ],
      links: {
        github: "https://github.com/kiranparajuli589/vue3-ytframe",
        demo: "https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=getting-started",
        playground: "https://kiranparajuli589.github.io/vue3-ytframe/#/playground"
      }
    },
    {
      title: "Markdown Parser",
      description: "A simple yet powerful markdown parser for NodeJS or Javascript.",
      thumbnail: "markdown-parser.png",
      technologies: [
        "NodeJS",
        "Javascript",
        "Modular Programming",
        "Recursion"
      ],
      links: {
        github: "https://github.com/kiranparajuli589/md-parser",
        demo: "https://kiranparajuli589.github.io/md-parser/"
      }
    },
    {
      title: "Sachchai Kendra Nepal",
      description: "A website for Sachchai Kendra Nepal, a non-profit religious organization.",
      thumbnail: "sachchai-kendra-nepal.png",
      technologies: [
        "Vue3",
        "Vuetify",
        "Djangorestframework",
        "MySQL"
      ],
      links: {
        demo: "https://sachchaikendranepal.org.np/"
      }
    },
    {
      title: "FoodSwipe",
      description: "A food delivery e-commerce website with beautiful carts and powerful order & transaction management.",
      thumbnail: "foodswipe.png",
      technologies: [
        "Vue2",
        "Vuetify",
        "Djangorestframework",
        "MySQL"
      ],
      links: {
        demo: "https://foodswipe.com.np/",
        github: "https://github.com/foodswipe"
      }
    },
    {
      title: "WordClub",
      description: "A reddit based social media website for writers and readers.",
      thumbnail: "wordclub.png",
      technologies: [
        "Vue2",
        "Vuetify",
        "Djangorestframework",
        "MySQL"
      ],
      links: {
        github: "https://github.com/word-club",
        demo: "https://wordclub.kiranparajuli.com.np/"
      }
    },
    {
      title: "Bagmati Nepal Sports Website",
      description: "A website for Bagmati Nepal Sports Government, providing news and information about the current sports events.",
      thumbnail: "bagmati-nepal-sports.png",
      technologies: [
        "Vue2",
        "Vuetify",
        "Laravel",
        "MySQL"
      ],
      links: {
        website: "https://sports.bagamati.gov.np/"
      }
    }
  ],
  services: [
    {
      name: "Frontend Development",
      description: "I can build a responsive and interactive frontend for your web application. It is true that I am not the best designer you can hire, but I can implement complex designs on your website.",
      icon: "web-box",
      iconColor: "primary",
      experience: (/* @__PURE__ */ new Date()).getFullYear() - 2018
    },
    {
      name: "Backend Development",
      description: "I have been working with different technologies to build a scalable and secure backend. You can hire me to build REST APIs or Websockets for your application. I also have some experience with microservices architecture. The advanced part of my work entails more engineering work relating to Data Structure operations, Query Optimization, and more.",
      icon: "server",
      iconColor: "indigo",
      experience: (/* @__PURE__ */ new Date()).getFullYear() - 2018
    },
    {
      name: "QA Automation",
      description: "I can write <b>automated tests</b> for your application. We can work together to increase test coverage of your application, reduce flakiness inside existing test cases and implement, maintain and optimize the CI/CD pipelines.",
      icon: "lightbulb-auto",
      iconColor: "green",
      types: [
        "Smoke Testing",
        "Regression Testing",
        "API Testing",
        "UI Testing",
        "Performance Testing",
        "Security Testing",
        "Load Testing",
        "Integration Testing",
        "Unit Testing",
        "Continuous Integration",
        "Continuous Deployment"
      ],
      experience: (/* @__PURE__ */ new Date()).getFullYear() - 2019
    },
    {
      name: "DevOps",
      description: "I have few years of experience in DevOps, I can deploy your web application to the cloud and organize load balancing for clients or servers. I can also create and maintain CI/CD pipelines for your application.",
      icon: "cloud",
      iconColor: "grey",
      experience: (/* @__PURE__ */ new Date()).getFullYear() - 2020
    }
  ],
  technologies: [
    {
      name: "Frontend Development",
      tools: [
        { class: "devicon-html5-plain-wordmark", tooltip: "HTML5" },
        { class: "devicon-css3-plain-wordmark", tooltip: "CSS3" },
        { class: "devicon-javascript-plain", tooltip: "JavaScript" },
        { class: "devicon-vuejs-plain-wordmark", tooltip: "VueJS" },
        { class: "devicon-vuetify-line", tooltip: "Vuetify" },
        { class: "devicon-figma-plain-wordmark", tooltip: "Figma" }
      ]
    },
    {
      name: "Backend Development",
      tools: [
        { class: "devicon-python-plain", tooltip: "Python" },
        { class: "devicon-django-plain", tooltip: "Django" },
        { class: "devicon-nodejs-plain", tooltip: "NodeJS" },
        { class: "devicon-postgresql-plain-wordmark", tooltip: "PostgreSQL" },
        { class: "devicon-mysql-plain-wordmark", tooltip: "MySQL" },
        { class: "devicon-redis-plain-wordmark", tooltip: "Redis" },
        { tooltip: "Websockets", image: "websockets.png" },
        { tooltip: "Djangorestframework", image: "drf.png" }
      ]
    },
    {
      name: "Quality Assurance",
      tools: [
        { tooltip: "Behat", image: "behat.png" },
        { tooltip: "CypressJs", image: "cypress.png" },
        { tooltip: "NightwatchJs", image: "nightwatchjs.png" },
        { class: "devicon-jest-plain", tooltip: "Jest" },
        { tooltip: "PHPUnit", image: "phpunit.png" },
        { tooltip: "Playwright", image: "playwright.png" },
        { tooltip: "Postman", image: "postman.svg" },
        { class: "devicon-vuejs-plain-wordmark", tooltip: "Vue Unit Tests" },
        { tooltip: "Locust", image: "locust.jpeg" },
        { class: "devicon-gitlab-original-wordmark", tooltip: "GitLab CI" },
        { class: "devicon-github-original-wordmark", tooltip: "GitHub CI" },
        { tooltip: "Drone CI", image: "droneci.png" }
      ]
    },
    {
      name: "DevOps",
      tools: [
        { class: "devicon-docker-plain-wordmark", tooltip: "Docker" },
        { image: "CPanel.png", tooltip: "Cpanel" },
        { image: "vps.png", tooltip: "VPS" },
        { class: "devicon-nginx-plain-wordmark", tooltip: "Nginx" },
        { class: "devicon-apache-plain-wordmark", tooltip: "Apache" }
      ]
    }
  ]
};
const Resume$1 = Resume;
function useColor(colors) {
  return destructComputed(() => {
    const classes = [];
    const styles = {};
    if (colors.value.background) {
      if (isCssColor(colors.value.background)) {
        styles.backgroundColor = colors.value.background;
      } else {
        classes.push(`bg-${colors.value.background}`);
      }
    }
    if (colors.value.text) {
      if (isCssColor(colors.value.text)) {
        styles.color = colors.value.text;
        styles.caretColor = colors.value.text;
      } else {
        classes.push(`text-${colors.value.text}`);
      }
    }
    return {
      colorClasses: classes,
      colorStyles: styles
    };
  });
}
function useTextColor(props, name) {
  const colors = computed(() => ({
    text: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(colors);
  return {
    textColorClasses,
    textColorStyles
  };
}
function useBackgroundColor(props, name) {
  const colors = computed(() => ({
    background: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(colors);
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, "border");
function useBorder(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border;
    const classes = [];
    if (border === true || border === "") {
      classes.push(`${name}--border`);
    } else if (typeof border === "string" || border === 0) {
      for (const value of String(border).split(" ")) {
        classes.push(`border-${value}`);
      }
    }
    return classes;
  });
  return {
    borderClasses
  };
}
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }
  }
}, "elevation");
function useElevation(props) {
  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    const classes = [];
    if (elevation == null)
      return classes;
    classes.push(`elevation-${elevation}`);
    return classes;
  });
  return {
    elevationClasses
  };
}
const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  }
}, "rounded");
function useRounded(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const classes = [];
    if (rounded === true || rounded === "") {
      classes.push(`${name}--rounded`);
    } else if (typeof rounded === "string" || rounded === 0) {
      for (const value of String(rounded).split(" ")) {
        classes.push(`rounded-${value}`);
      }
    }
    return classes;
  });
  return {
    roundedClasses
  };
}
const predefinedSizes = ["x-small", "small", "default", "large", "x-large"];
const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function useSize(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  return destructComputed(() => {
    let sizeClasses;
    let sizeStyles;
    if (includes(predefinedSizes, props.size)) {
      sizeClasses = `${name}--size-${props.size}`;
    } else if (props.size) {
      sizeStyles = {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size)
      };
    }
    return {
      sizeClasses,
      sizeStyles
    };
  });
}
const makeVIconProps = propsFactory({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "i"
  }),
  ...makeThemeProps()
}, "VIcon");
const VIcon = genericComponent()({
  name: "VIcon",
  props: makeVIconProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const slotIcon = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      iconData
    } = useIcon(computed(() => slotIcon.value || props.icon));
    const {
      sizeClasses
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => {
      var _a, _b;
      const slotValue = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (slotValue) {
        slotIcon.value = (_b = flattenFragments(slotValue).filter((node) => node.type === Text && node.children && typeof node.children === "string")[0]) == null ? void 0 : _b.children;
      }
      return createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": ["v-icon", "notranslate", themeClasses.value, sizeClasses.value, textColorClasses.value, {
          "v-icon--clickable": !!attrs.onClick,
          "v-icon--start": props.start,
          "v-icon--end": props.end
        }, props.class],
        "style": [!sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          height: convertToUnit(props.size),
          width: convertToUnit(props.size)
        } : void 0, textColorStyles.value, props.style],
        "role": attrs.onClick ? "button" : void 0,
        "aria-hidden": !attrs.onClick
      }, {
        default: () => [slotValue]
      });
    });
    return {};
  }
});
const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function useDimension(props) {
  const dimensionStyles = computed(() => ({
    height: convertToUnit(props.height),
    maxHeight: convertToUnit(props.maxHeight),
    maxWidth: convertToUnit(props.maxWidth),
    minHeight: convertToUnit(props.minHeight),
    minWidth: convertToUnit(props.minWidth),
    width: convertToUnit(props.width)
  }));
  return {
    dimensionStyles
  };
}
function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + "%"
      } : void 0;
    })
  };
}
const makeVResponsiveProps = propsFactory({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VResponsive");
const VResponsive = genericComponent()({
  name: "VResponsive",
  props: makeVResponsiveProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      aspectStyles
    } = useAspectStyles(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      var _a;
      return createVNode("div", {
        "class": ["v-responsive", {
          "v-responsive--inline": props.inline
        }, props.class],
        "style": [dimensionStyles.value, props.style]
      }, [createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null), (_a = slots.additional) == null ? void 0 : _a.call(slots), slots.default && createVNode("div", {
        "class": ["v-responsive__content", props.contentClass]
      }, [slots.default()])]);
    });
    return {};
  }
});
const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (val) => val !== true
  }
}, "transition");
const MaybeTransition = (props, _ref) => {
  let {
    slots
  } = _ref;
  const {
    transition,
    disabled,
    ...rest
  } = props;
  const {
    component = Transition,
    ...customProps
  } = typeof transition === "object" ? transition : {};
  return h(component, mergeProps(typeof transition === "string" ? {
    name: disabled ? "" : transition
  } : customProps, rest, {
    disabled
  }), slots);
};
function mounted(el, binding) {
  if (!SUPPORTS_INTERSECTION)
    return;
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    handler,
    options
  } = typeof value === "object" ? value : {
    handler: value,
    options: {}
  };
  const observer = new IntersectionObserver(function() {
    var _a;
    let entries = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let observer2 = arguments.length > 1 ? arguments[1] : void 0;
    const _observe = (_a = el._observe) == null ? void 0 : _a[binding.instance.$.uid];
    if (!_observe)
      return;
    const isIntersecting = entries.some((entry) => entry.isIntersecting);
    if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
      handler(isIntersecting, entries, observer2);
    }
    if (isIntersecting && modifiers.once)
      unmounted(el, binding);
    else
      _observe.init = true;
  }, options);
  el._observe = Object(el._observe);
  el._observe[binding.instance.$.uid] = {
    init: false,
    observer
  };
  observer.observe(el);
}
function unmounted(el, binding) {
  var _a;
  const observe = (_a = el._observe) == null ? void 0 : _a[binding.instance.$.uid];
  if (!observe)
    return;
  observe.observer.unobserve(el);
  delete el._observe[binding.instance.$.uid];
}
const Intersect = {
  mounted,
  unmounted
};
const intersect = Intersect;
const makeVImgProps = propsFactory({
  alt: String,
  cover: Boolean,
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  srcset: String,
  ...makeVResponsiveProps(),
  ...makeComponentProps(),
  ...makeTransitionProps()
}, "VImg");
const VImg = genericComponent()({
  name: "VImg",
  directives: {
    intersect
  },
  props: makeVImgProps(),
  emits: {
    loadstart: (value) => true,
    load: (value) => true,
    error: (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const currentSrc = shallowRef("");
    const image = ref();
    const state = shallowRef(props.eager ? "loading" : "idle");
    const naturalWidth = shallowRef();
    const naturalHeight = shallowRef();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === "object" ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect || 0)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== "idle");
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });
    function init(isIntersecting) {
      if (props.eager && isIntersecting)
        return;
      if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager)
        return;
      state.value = "loading";
      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
      if (!normalisedSrc.value.src)
        return;
      nextTick(() => {
        var _a, _b;
        emit("loadstart", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
        if ((_b = image.value) == null ? void 0 : _b.complete) {
          if (!image.value.naturalWidth) {
            onError();
          }
          if (state.value === "error")
            return;
          if (!aspectRatio.value)
            pollForSize(image.value, null);
          onLoad();
        } else {
          if (!aspectRatio.value)
            pollForSize(image.value);
          getSrc();
        }
      });
    }
    function onLoad() {
      var _a;
      getSrc();
      state.value = "loaded";
      emit("load", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
    }
    function onError() {
      var _a;
      state.value = "error";
      emit("error", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
    }
    function getSrc() {
      const img = image.value;
      if (img)
        currentSrc.value = img.currentSrc || img.src;
    }
    let timer = -1;
    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const poll = () => {
        clearTimeout(timer);
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;
        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === "loading" && timeout != null) {
          timer = window.setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };
      poll();
    }
    const containClasses = computed(() => ({
      "v-img__img--cover": props.cover,
      "v-img__img--contain": !props.cover
    }));
    const __image = () => {
      var _a;
      if (!normalisedSrc.value.src || state.value === "idle")
        return null;
      const img = createVNode("img", {
        "class": ["v-img__img", containClasses.value],
        "src": normalisedSrc.value.src,
        "srcset": normalisedSrc.value.srcset,
        "alt": props.alt,
        "sizes": props.sizes,
        "ref": image,
        "onLoad": onLoad,
        "onError": onError
      }, null);
      const sources = (_a = slots.sources) == null ? void 0 : _a.call(slots);
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === "loaded"]])]
      });
    };
    const __preloadImage = () => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createVNode("img", {
        "class": ["v-img__img", "v-img__img--preload", containClasses.value],
        "src": normalisedSrc.value.lazySrc,
        "alt": props.alt
      }, null)]
    });
    const __placeholder = () => {
      if (!slots.placeholder)
        return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    };
    const __error = () => {
      if (!slots.error)
        return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === "error" && createVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    };
    const __gradient = () => {
      if (!props.gradient)
        return null;
      return createVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    };
    const isBooted = shallowRef(false);
    {
      const stop = watch(aspectRatio, (val) => {
        if (val) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => {
      const [responsiveProps] = VResponsive.filterProps(props);
      return withDirectives(createVNode(VResponsive, mergeProps({
        "class": ["v-img", {
          "v-img--booting": !isBooted.value
        }, props.class],
        "style": [{
          width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
        }, props.style]
      }, responsiveProps, {
        "aspectRatio": aspectRatio.value,
        "aria-label": props.alt,
        "role": props.alt ? "img" : void 0
      }), {
        additional: () => createVNode(Fragment, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
        default: slots.default
      }), [[resolveDirective("intersect"), {
        handler: init,
        options: props.options
      }, null, {
        once: true
      }]]);
    });
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }
});

export { Resume$1 as R, VIcon as V, VImg as a, makeElevationProps as b, makeRoundedProps as c, makeSizeProps as d, useElevation as e, useRounded as f, getAssetUrl as g, useSize as h, useTextColor as i, useColor as j, useBackgroundColor as k, makeDimensionProps as l, makeBorderProps as m, useDimension as n, isDarkThemeSelected as o, addThemeToStorage as p, useBorder as u };
//# sourceMappingURL=VImg-51a9d54d.mjs.map
