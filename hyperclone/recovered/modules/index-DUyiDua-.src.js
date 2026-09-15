import { r as t } from "./index-TjoB2Buo.js";
function i() {
  return typeof window != "undefined" && window.dubAnalytics;
}
function n(t) {
  var i;
  var n;
  var a;
  var e;
  var s;
  var o;
  if (typeof window == "undefined") {
    return;
  }
  (s = window)[o = "dubAnalytics"] = s[o] || function () {
    (s[o].q = s[o].q || []).push(arguments);
  };
  ["trackClick", "trackLead", "trackSale"].forEach(function (t) {
    s[o][t] = function () {
      (s[o].q = s[o].q || []).push([t, ...Array.from(arguments)]);
    };
  });
  const r = "https://www.dubcdn.com/analytics/script";
  const u = [];
  if ((i = t.domainsConfig) == null ? undefined : i.site) {
    u.push("site-visit");
  }
  if ((n = t.domainsConfig) == null ? undefined : n.outbound) {
    u.push("outbound-domains");
  }
  if (t.publishableKey) {
    u.push("conversion-tracking");
  }
  const c = ((a = t.scriptProps) == null ? undefined : a.src) || (u.length > 0 ? `${r}.${u.join(".")}.js` : `${r}.js`);
  if (document.head.querySelector(`script[src*="${c}"]`)) {
    return;
  }
  const d = document.createElement("script");
  d.src = c;
  d.defer = ((e = t.scriptProps) == null ? undefined : e.defer) ?? true;
  d.setAttribute("data-sdkn", "@dub/analytics");
  d.setAttribute("data-sdkv", "0.0.32");
  if (t.apiHost) {
    d.setAttribute("data-api-host", t.apiHost);
  }
  if (t.publishableKey) {
    d.setAttribute("data-publishable-key", t.publishableKey);
  }
  if (t.domainsConfig) {
    d.setAttribute("data-domains", JSON.stringify(t.domainsConfig));
  }
  if (t.shortDomain) {
    d.setAttribute("data-short-domain", t.shortDomain);
  }
  if (t.attributionModel) {
    d.setAttribute("data-attribution-model", t.attributionModel);
  }
  if (t.cookieOptions && Object.keys(t.cookieOptions).length > 0) {
    d.setAttribute("data-cookie-options", JSON.stringify(t.cookieOptions));
  }
  if (t.queryParam) {
    d.setAttribute("data-query-param", t.queryParam);
  }
  if (t.queryParams) {
    d.setAttribute("data-query-params", JSON.stringify(t.queryParams));
  }
  if (t.scriptProps) {
    const {
      src: i,
      ...n
    } = t.scriptProps;
    Object.assign(d, n);
  }
  d.onerror = () => {};
  document.head.appendChild(d);
}
function a() {
  const [n, a] = t.useState({
    partner: null,
    discount: null
  });
  const e = t.useCallback(() => {
    if (i()) {
      window.dubAnalytics("ready", () => {
        const {
          partner: t = null,
          discount: i = null
        } = window.DubAnalytics || {};
        a({
          partner: t,
          discount: i
        });
      });
    }
  }, []);
  const s = t.useCallback(t => {
    if (i()) {
      window.dubAnalytics.trackClick(t);
    }
  }, []);
  const o = t.useCallback(t => {
    if (i()) {
      window.dubAnalytics.trackLead(t);
    }
  }, []);
  const r = t.useCallback(t => {
    if (i()) {
      window.dubAnalytics.trackSale(t);
    }
  }, []);
  t.useEffect(() => {
    e();
  }, [e]);
  return {
    ...n,
    trackClick: s,
    trackLead: o,
    trackSale: r
  };
}
function e(i) {
  t.useEffect(() => {
    n(i);
  }, [i]);
  return null;
}
export { e as Analytics, a as useAnalytics };