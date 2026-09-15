import { j as e } from "./index-TjoB2Buo.js";
const t = {
  lecture: e.jsxs(e.Fragment, {
    children: [e.jsx("rect", {
      x: "4",
      y: "3",
      width: "16",
      height: "12",
      rx: "1.6"
    }), e.jsx("path", {
      d: "M7 11l3-3 2 2 3-4"
    }), e.jsx("path", {
      d: "M12 15v3"
    }), e.jsx("path", {
      d: "M9 21l3-3 3 3"
    })]
  }),
  project: e.jsxs(e.Fragment, {
    children: [e.jsx("rect", {
      x: "5",
      y: "4",
      width: "14",
      height: "17",
      rx: "2.5"
    }), e.jsx("rect", {
      x: "9",
      y: "2",
      width: "6",
      height: "3.4",
      rx: "1.2"
    }), e.jsx("path", {
      d: "M8.5 13l2.5 2.5L16 11"
    })]
  }),
  exam: e.jsxs(e.Fragment, {
    children: [e.jsx("circle", {
      cx: "12",
      cy: "9",
      r: "5.5"
    }), e.jsx("path", {
      d: "M8.6 13.4L6.6 21.4L12 18.4L17.4 21.4L15.4 13.4"
    })]
  })
};
const r = ({
  type: r,
  size: s = 16,
  className: i
}) => e.jsx("svg", {
  className: i,
  width: s,
  height: s,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  children: t[r]
});
export { r as C };