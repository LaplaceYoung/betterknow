import { u as s, a as e, r, j as o } from "./index-TjoB2Buo.js";
import { P as t, a } from "./ProSuccessCelebration-BLjYKG3E.js"; /* empty css                       */
const n = () => {
  const n = s();
  const [i] = e();
  const [c, j] = r.useState(false);
  return o.jsxs(o.Fragment, {
    children: [o.jsx(t, {
      tier: i.get("tier") ?? "pro",
      onContinue: () => j(true)
    }), o.jsx(a, {
      isOpen: c,
      onClose: () => {
        j(false);
        n("/");
      }
    })]
  });
};
export { n as default };