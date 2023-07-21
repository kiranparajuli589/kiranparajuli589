globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import gracefulShutdown from 'http-graceful-shutdown';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function trapUnhandledNodeErrors() {
  {
    process.on(
      "unhandledRejection",
      (err) => console.error("[nitro] [unhandledRejection] " + err)
    );
    process.on(
      "uncaughtException",
      (err) => console.error("[nitro]  [uncaughtException] " + err)
    );
  }
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(html);
});

const assets = {
  "/letter_k.png": {
    "type": "image/png",
    "etag": "\"1191b-pYum6QOxL68IrL3rHIUqAXR44N8\"",
    "mtime": "2023-07-21T11:58:42.511Z",
    "size": 71963,
    "path": "../public/letter_k.png"
  },
  "/oc-badge-community-contributor-dark.png": {
    "type": "image/png",
    "etag": "\"9b56-qAT7Oaj1ZTVdcMSWxQlpnj1PHOY\"",
    "mtime": "2023-07-21T11:58:42.511Z",
    "size": 39766,
    "path": "../public/oc-badge-community-contributor-dark.png"
  },
  "/oc-badge-community-contributor-light.png": {
    "type": "image/png",
    "etag": "\"9fb9-LW6kMqjB9nnQFTJ1mXh8mL+y+8I\"",
    "mtime": "2023-07-21T11:58:42.511Z",
    "size": 40889,
    "path": "../public/oc-badge-community-contributor-light.png"
  },
  "/_nuxt/CPanel.85d95e9f.png": {
    "type": "image/png",
    "etag": "\"205f-2enWC23dCqrJb9NVznpSBQkQtj8\"",
    "mtime": "2023-07-21T11:58:42.507Z",
    "size": 8287,
    "path": "../public/_nuxt/CPanel.85d95e9f.png"
  },
  "/_nuxt/Century Gothic.3a9cbb5d.ttf": {
    "type": "font/ttf",
    "etag": "\"21960-ovnKKuUppswDytiP77Cg5FtwRvQ\"",
    "mtime": "2023-07-21T11:58:42.507Z",
    "size": 137568,
    "path": "../public/_nuxt/Century Gothic.3a9cbb5d.ttf"
  },
  "/_nuxt/CenturyGothic.64654e25.ttf": {
    "type": "font/ttf",
    "etag": "\"21960-j3fcupRuNwOBPu4ukddLXuOAeyM\"",
    "mtime": "2023-07-21T11:58:42.507Z",
    "size": 137568,
    "path": "../public/_nuxt/CenturyGothic.64654e25.ttf"
  },
  "/_nuxt/GOTHIC.98057976.TTF": {
    "type": "font/ttf",
    "etag": "\"ef60-A1ZpqOiltIbDMA656npmcrt6wzE\"",
    "mtime": "2023-07-21T11:58:42.507Z",
    "size": 61280,
    "path": "../public/_nuxt/GOTHIC.98057976.TTF"
  },
  "/_nuxt/GOTHICB0.cd17b425.TTF": {
    "type": "font/ttf",
    "etag": "\"1fa8c-7TPhMHpJHXjq3qn1xi4CG5TzOdE\"",
    "mtime": "2023-07-21T11:58:42.507Z",
    "size": 129676,
    "path": "../public/_nuxt/GOTHICB0.cd17b425.TTF"
  },
  "/_nuxt/ResumePdf.d3896181.js": {
    "type": "application/javascript",
    "etag": "\"f13-DRbZqO82z4leEPk+XbstDZLb9ic\"",
    "mtime": "2023-07-21T11:58:42.507Z",
    "size": 3859,
    "path": "../public/_nuxt/ResumePdf.d3896181.js"
  },
  "/_nuxt/ResumePdf.f3e688fa.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e0-FisTuE//RLTyD+JT/IcSioAa2Qs\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 224,
    "path": "../public/_nuxt/ResumePdf.f3e688fa.css"
  },
  "/_nuxt/VCard.4de023b2.js": {
    "type": "application/javascript",
    "etag": "\"44a0-APjtF6ZNyenx4rpYB4eZ1/cTCpM\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 17568,
    "path": "../public/_nuxt/VCard.4de023b2.js"
  },
  "/_nuxt/VCard.ab24a35d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3404-kcvsy+u9aSRjQR+CXzxiY6O4waI\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 13316,
    "path": "../public/_nuxt/VCard.ab24a35d.css"
  },
  "/_nuxt/VDivider.7d96b3aa.js": {
    "type": "application/javascript",
    "etag": "\"384-t/wiZk7wTxhOUJ0GIzZuD4C8pxE\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 900,
    "path": "../public/_nuxt/VDivider.7d96b3aa.js"
  },
  "/_nuxt/VDivider.fc38186d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"212-2zbZWgmPnm3BHaXfgA4w27X/skI\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 530,
    "path": "../public/_nuxt/VDivider.fc38186d.css"
  },
  "/_nuxt/VFooter.3da98673.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"30a-w4A9sz152ihwHcOF7w0aqi2cv7c\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 778,
    "path": "../public/_nuxt/VFooter.3da98673.css"
  },
  "/_nuxt/VFooter.b473190d.js": {
    "type": "application/javascript",
    "etag": "\"463-6DNMgu/lE1z12AotNXw1s7WVN54\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 1123,
    "path": "../public/_nuxt/VFooter.b473190d.js"
  },
  "/_nuxt/VImg.1721d401.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"693-alCq32ZvfrQCYWP0L/jda6Wb6Qc\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 1683,
    "path": "../public/_nuxt/VImg.1721d401.css"
  },
  "/_nuxt/VImg.67de675a.js": {
    "type": "application/javascript",
    "etag": "\"4e5e-9sOvqV7ihMaF2o5J1A/jxjnw4xs\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 20062,
    "path": "../public/_nuxt/VImg.67de675a.js"
  },
  "/_nuxt/_plugin-vue_export-helper.c27b6911.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.c27b6911.js"
  },
  "/_nuxt/avatar.6a59a89e.jpeg": {
    "type": "image/jpeg",
    "etag": "\"3197-RmyOqPPSyQ6gCVAhUvZyGz/x6Qw\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 12695,
    "path": "../public/_nuxt/avatar.6a59a89e.jpeg"
  },
  "/_nuxt/behat.8e3ed0a5.png": {
    "type": "image/png",
    "etag": "\"230d-D2I7esw6kADRy85A1WFzM2jZAD0\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 8973,
    "path": "../public/_nuxt/behat.8e3ed0a5.png"
  },
  "/_nuxt/blog.51dbf074.js": {
    "type": "application/javascript",
    "etag": "\"331-7NVCBbGxpj7Qoj2kP73phRkzyQI\"",
    "mtime": "2023-07-21T11:58:42.503Z",
    "size": 817,
    "path": "../public/_nuxt/blog.51dbf074.js"
  },
  "/_nuxt/cypress.160568b1.png": {
    "type": "image/png",
    "etag": "\"4761-d/lQpuKA30ndCKkoB/Uyf73r6/A\"",
    "mtime": "2023-07-21T11:58:42.499Z",
    "size": 18273,
    "path": "../public/_nuxt/cypress.160568b1.png"
  },
  "/_nuxt/drf.da7b90c4.png": {
    "type": "image/png",
    "etag": "\"1966-K2YWPOwRemSC98xtP9z7RQAafYw\"",
    "mtime": "2023-07-21T11:58:42.499Z",
    "size": 6502,
    "path": "../public/_nuxt/drf.da7b90c4.png"
  },
  "/_nuxt/droneci.730d423d.png": {
    "type": "image/png",
    "etag": "\"2494-NeLozMudwvLSX43knkaktszXAao\"",
    "mtime": "2023-07-21T11:58:42.499Z",
    "size": 9364,
    "path": "../public/_nuxt/droneci.730d423d.png"
  },
  "/_nuxt/entry.69d3b7f9.js": {
    "type": "application/javascript",
    "etag": "\"30e5f-FovoCLjfnI9P1aP/hGJfpqbqhcI\"",
    "mtime": "2023-07-21T11:58:42.499Z",
    "size": 200287,
    "path": "../public/_nuxt/entry.69d3b7f9.js"
  },
  "/_nuxt/entry.f146c917.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8f2-KhpwT+9VQIw3Efd3QoKm9E8BFF8\"",
    "mtime": "2023-07-21T11:58:42.499Z",
    "size": 2290,
    "path": "../public/_nuxt/entry.f146c917.css"
  },
  "/_nuxt/error-404.1dfe7e06.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-1IaF6m3aQ2UwZg/SLXgkgMu7x/8\"",
    "mtime": "2023-07-21T11:58:42.499Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.1dfe7e06.css"
  },
  "/_nuxt/error-404.6c90bf6c.js": {
    "type": "application/javascript",
    "etag": "\"19b8-sLltZBe5p49Hbm6Uj0PqgmVbKvI\"",
    "mtime": "2023-07-21T11:58:42.499Z",
    "size": 6584,
    "path": "../public/_nuxt/error-404.6c90bf6c.js"
  },
  "/_nuxt/error-500.65796b32.js": {
    "type": "application/javascript",
    "etag": "\"78b-Wsth4ly6YnrE/6iK8L8Z/zpeTsE\"",
    "mtime": "2023-07-21T11:58:42.495Z",
    "size": 1931,
    "path": "../public/_nuxt/error-500.65796b32.js"
  },
  "/_nuxt/error-500.7376934c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-JVFAikodhqgGDFLa2T3V1zs27cE\"",
    "mtime": "2023-07-21T11:58:42.495Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.7376934c.css"
  },
  "/_nuxt/foodswipe.076b80bc.png": {
    "type": "image/png",
    "etag": "\"266738-IKdpJP1VcjEGxc4uyjtPYGWNyGc\"",
    "mtime": "2023-07-21T11:58:42.495Z",
    "size": 2516792,
    "path": "../public/_nuxt/foodswipe.076b80bc.png"
  },
  "/_nuxt/gothicb.3f8e628a.ttf": {
    "type": "font/ttf",
    "etag": "\"d758-GUOIoSmZxNZDq1iuq+wKSVNevus\"",
    "mtime": "2023-07-21T11:58:42.491Z",
    "size": 55128,
    "path": "../public/_nuxt/gothicb.3f8e628a.ttf"
  },
  "/_nuxt/group.2782897a.js": {
    "type": "application/javascript",
    "etag": "\"16d9-7lP2en1XTGayF1JyVURhWx8FXzA\"",
    "mtime": "2023-07-21T11:58:42.491Z",
    "size": 5849,
    "path": "../public/_nuxt/group.2782897a.js"
  },
  "/_nuxt/home.980ab4e7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"49bb-WMb+kIBOleUt7bFX4ByodxSvmCc\"",
    "mtime": "2023-07-21T11:58:42.491Z",
    "size": 18875,
    "path": "../public/_nuxt/home.980ab4e7.css"
  },
  "/_nuxt/home.dca65ca6.js": {
    "type": "application/javascript",
    "etag": "\"3adc-3Wgo4+MAok6bn7eiJC5/ZgIvEic\"",
    "mtime": "2023-07-21T11:58:42.491Z",
    "size": 15068,
    "path": "../public/_nuxt/home.dca65ca6.js"
  },
  "/_nuxt/index.532e07b3.js": {
    "type": "application/javascript",
    "etag": "\"d09-iQcmuiT4t6y1n9U+HU9RbGRx3Ys\"",
    "mtime": "2023-07-21T11:58:42.491Z",
    "size": 3337,
    "path": "../public/_nuxt/index.532e07b3.js"
  },
  "/_nuxt/jankaritech.5bda4955.jpg": {
    "type": "image/jpeg",
    "etag": "\"250e-XR7g4lRg3asmLON7GLALpgCBgwY\"",
    "mtime": "2023-07-21T11:58:42.491Z",
    "size": 9486,
    "path": "../public/_nuxt/jankaritech.5bda4955.jpg"
  },
  "/_nuxt/layout.ce994c82.js": {
    "type": "application/javascript",
    "etag": "\"5f0-yxPHbPw7lYB0V1P7D8qM/pbmW9g\"",
    "mtime": "2023-07-21T11:58:42.491Z",
    "size": 1520,
    "path": "../public/_nuxt/layout.ce994c82.js"
  },
  "/_nuxt/locust.8bfd623b.jpeg": {
    "type": "image/jpeg",
    "etag": "\"19b0-fdwkbyTMosaajhOClsiHRrCtvy0\"",
    "mtime": "2023-07-21T11:58:42.491Z",
    "size": 6576,
    "path": "../public/_nuxt/locust.8bfd623b.jpeg"
  },
  "/_nuxt/markdown-parser.0a99201f.png": {
    "type": "image/png",
    "etag": "\"e317-FGluiNAItydjNiBdboqZKCAN4lg\"",
    "mtime": "2023-07-21T11:58:42.487Z",
    "size": 58135,
    "path": "../public/_nuxt/markdown-parser.0a99201f.png"
  },
  "/_nuxt/materialdesignicons-webfont.67d24abe.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1388d4-MnWK6SbfCpKcnlAuemBtiwuopTo\"",
    "mtime": "2023-07-21T11:58:42.487Z",
    "size": 1280212,
    "path": "../public/_nuxt/materialdesignicons-webfont.67d24abe.eot"
  },
  "/_nuxt/materialdesignicons-webfont.80bb28b3.woff": {
    "type": "font/woff",
    "etag": "\"8ccec-5ZgN4S2fm96iQiYk/0JVsfifYgk\"",
    "mtime": "2023-07-21T11:58:42.487Z",
    "size": 576748,
    "path": "../public/_nuxt/materialdesignicons-webfont.80bb28b3.woff"
  },
  "/_nuxt/materialdesignicons-webfont.a58ecb54.ttf": {
    "type": "font/ttf",
    "etag": "\"1387f8-j78E9Zp9n71W2+dBoUcVh2zLaPY\"",
    "mtime": "2023-07-21T11:58:42.483Z",
    "size": 1279992,
    "path": "../public/_nuxt/materialdesignicons-webfont.a58ecb54.ttf"
  },
  "/_nuxt/materialdesignicons-webfont.c1c004a9.woff2": {
    "type": "font/woff2",
    "etag": "\"60dbc-Ny7iWtVyfhmKnwTiem7ds7fgSTo\"",
    "mtime": "2023-07-21T11:58:42.483Z",
    "size": 396732,
    "path": "../public/_nuxt/materialdesignicons-webfont.c1c004a9.woff2"
  },
  "/_nuxt/mst.3162dba7.png": {
    "type": "image/png",
    "etag": "\"2b4f4-3No2wjnYkyGeD3BYM45ZVbUt8BQ\"",
    "mtime": "2023-07-21T11:58:42.483Z",
    "size": 177396,
    "path": "../public/_nuxt/mst.3162dba7.png"
  },
  "/_nuxt/nightwatchjs.77cf0567.png": {
    "type": "image/png",
    "etag": "\"3d41-Z3fKF918yeAujt5pq3HRq1MQTjA\"",
    "mtime": "2023-07-21T11:58:42.483Z",
    "size": 15681,
    "path": "../public/_nuxt/nightwatchjs.77cf0567.png"
  },
  "/_nuxt/nps.0b4c3045.png": {
    "type": "image/png",
    "etag": "\"b13a-XabYtsbConZtji7YpLMFoB3ysgQ\"",
    "mtime": "2023-07-21T11:58:42.483Z",
    "size": 45370,
    "path": "../public/_nuxt/nps.0b4c3045.png"
  },
  "/_nuxt/o-n.ac6ae8bd.jpg": {
    "type": "image/jpeg",
    "etag": "\"80a7-0NW23/VC8dsD9BrDDvTi3pRamMc\"",
    "mtime": "2023-07-21T11:58:42.483Z",
    "size": 32935,
    "path": "../public/_nuxt/o-n.ac6ae8bd.jpg"
  },
  "/_nuxt/oc-logo.c66af466.svg": {
    "type": "image/svg+xml",
    "etag": "\"218b-mxgeLNVhkAVH76kxpyIPEjT+aUg\"",
    "mtime": "2023-07-21T11:58:42.479Z",
    "size": 8587,
    "path": "../public/_nuxt/oc-logo.c66af466.svg"
  },
  "/_nuxt/phpunit.c8b27069.png": {
    "type": "image/png",
    "etag": "\"6f97-TN4DgfTXIlGViBcrp1GfU4kjHts\"",
    "mtime": "2023-07-21T11:58:42.479Z",
    "size": 28567,
    "path": "../public/_nuxt/phpunit.c8b27069.png"
  },
  "/_nuxt/playwright.9d8e6df1.png": {
    "type": "image/png",
    "etag": "\"17b2-G9u9j5TlgNCedsAKpObh+MV4jc4\"",
    "mtime": "2023-07-21T11:58:42.479Z",
    "size": 6066,
    "path": "../public/_nuxt/playwright.9d8e6df1.png"
  },
  "/_nuxt/postman.6e5289d3.svg": {
    "type": "image/svg+xml",
    "etag": "\"31b4-msaettZI8DwMVGPoCAvmokxHLLo\"",
    "mtime": "2023-07-21T11:58:42.479Z",
    "size": 12724,
    "path": "../public/_nuxt/postman.6e5289d3.svg"
  },
  "/_nuxt/resume.25b6f161.js": {
    "type": "application/javascript",
    "etag": "\"252f-qrX0DYdygnu7/kopGtOPfLPVkik\"",
    "mtime": "2023-07-21T11:58:42.479Z",
    "size": 9519,
    "path": "../public/_nuxt/resume.25b6f161.js"
  },
  "/_nuxt/resume.d2c24291.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"292c-xX2wImRZ5ecLUVWLJXHAHOT5N1o\"",
    "mtime": "2023-07-21T11:58:42.479Z",
    "size": 10540,
    "path": "../public/_nuxt/resume.d2c24291.css"
  },
  "/_nuxt/sachchai-kendra-nepal.d8dcf42c.png": {
    "type": "image/png",
    "etag": "\"2fadec-dlRBywtw1rDIJNcNRUbEHCBUULc\"",
    "mtime": "2023-07-21T11:58:42.475Z",
    "size": 3124716,
    "path": "../public/_nuxt/sachchai-kendra-nepal.d8dcf42c.png"
  },
  "/_nuxt/tech-himalaya.27426038.png": {
    "type": "image/png",
    "etag": "\"8ada-ya89J35TD+/2B026hff26ag9G9Y\"",
    "mtime": "2023-07-21T11:58:42.471Z",
    "size": 35546,
    "path": "../public/_nuxt/tech-himalaya.27426038.png"
  },
  "/_nuxt/vps.d0655d90.png": {
    "type": "image/png",
    "etag": "\"4fd2-lfs3IUGLaBVoz0c8eLxir5fHd/g\"",
    "mtime": "2023-07-21T11:58:42.471Z",
    "size": 20434,
    "path": "../public/_nuxt/vps.d0655d90.png"
  },
  "/_nuxt/vue-ytparser.7dc69ee3.png": {
    "type": "image/png",
    "etag": "\"1d0d6-8yvToAL/pm0gpRvio6lKqTAoSMM\"",
    "mtime": "2023-07-21T11:58:42.471Z",
    "size": 118998,
    "path": "../public/_nuxt/vue-ytparser.7dc69ee3.png"
  },
  "/_nuxt/wordclub.233a3d14.png": {
    "type": "image/png",
    "etag": "\"552a5-Y1ojwV5mtuySF6bfkyAB6RXkWTc\"",
    "mtime": "2023-07-21T11:58:42.471Z",
    "size": 348837,
    "path": "../public/_nuxt/wordclub.233a3d14.png"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_lWNEgz = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_lWNEgz, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_lWNEgz, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  gracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const listener = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
