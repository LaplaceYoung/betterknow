const r = r => {
  const o = (r || "").trim().toLowerCase();
  if (o === "max") {
    return "max";
  } else if (o === "pro") {
    return "pro";
  } else {
    return "free";
  }
};
export { r as t };