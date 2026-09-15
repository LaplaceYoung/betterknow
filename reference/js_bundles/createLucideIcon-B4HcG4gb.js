import{r as e}from"./index-TjoB2Buo.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=e=>{const r=(e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,t)=>t?t.toUpperCase():r.toLowerCase()))(e);return r.charAt(0).toUpperCase()+r.slice(1)},t=(...e)=>e.filter((e,r,t)=>Boolean(e)&&""!==e.trim()&&t.indexOf(e)===r).join(" ").trim(),o=e=>{for(const r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=e.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:n,className:c="",children:l,iconNode:d,...m},h)=>e.createElement("svg",{ref:h,...a,width:s,height:s,stroke:r,strokeWidth:n?24*Number(i)/Number(s):i,className:t("lucide",c),...!l&&!o(m)&&{"aria-hidden":"true"},...m},[...d.map(([r,t])=>e.createElement(r,t)),...Array.isArray(l)?l:[l]])),i=(o,a)=>{const i=e.forwardRef(({className:i,...n},c)=>{return e.createElement(s,{ref:c,iconNode:a,className:t(`lucide-${l=r(o),l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${o}`,i),...n});var l});return i.displayName=r(o),i};
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */export{i as c};
