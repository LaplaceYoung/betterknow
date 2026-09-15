/** Print-ready two-page cheatsheet layout and a small PDF writer. */

export const CHEAT_COLUMNS = Object.freeze([1, 2]);
export const CHEAT_DENSITIES = Object.freeze(["tight", "normal", "roomy"]);
export const CHEAT_FONTS = Object.freeze(["chalk", "body"]);

export function paginateCheatsheet(sheet = {}, { columns = 2, density = "normal", font = "chalk" } = {}) {
  const sections = Array.isArray(sheet.sections) ? sheet.sections : [];
  const cols = columns === 1 ? 1 : 2;
  const dens = CHEAT_DENSITIES.includes(density) ? density : "normal";
  const face = CHEAT_FONTS.includes(font) ? font : "chalk";
  const mid = Math.max(1, Math.ceil(sections.length / 2));
  const basedOn = String(sheet.basedOn || "").trim();
  return {
    title: sheet.title || "速查表",
    basedOn,
    columns: cols,
    density: dens,
    font: face,
    pages: [
      { page: 1, sections: sections.slice(0, mid) },
      { page: 2, sections: sections.slice(mid) },
    ],
  };
}

function utf16BeHex(s) {
  let hex = "FEFF";
  for (const ch of [...String(s || "")]) {
    const cp = ch.codePointAt(0);
    if (cp <= 0xffff) hex += cp.toString(16).padStart(4, "0").toUpperCase();
    else {
      const u = cp - 0x10000;
      hex += (0xd800 + (u >> 10)).toString(16).padStart(4, "0").toUpperCase();
      hex += (0xdc00 + (u & 0x3ff)).toString(16).padStart(4, "0").toUpperCase();
    }
  }
  return hex;
}

function wrapLine(text, maxChars) {
  const s = String(text || "");
  if (s.length <= maxChars) return [s];
  const out = [];
  let i = 0;
  while (i < s.length) {
    out.push(s.slice(i, i + maxChars));
    i += maxChars;
  }
  return out;
}

function pageStream(layout, page, { width = 595, height = 842 } = {}) {
  const sections = page.sections || [];
  const fontSize = layout.density === "tight" ? 9 : layout.density === "roomy" ? 12 : 10;
  const leading = fontSize + (layout.density === "roomy" ? 6 : layout.density === "tight" ? 3 : 4);
  const margin = 36;
  const cols = layout.columns;
  const colGap = 16;
  const colW = (width - margin * 2 - (cols - 1) * colGap) / cols;
  const maxChars = Math.max(12, Math.floor(colW / (fontSize * 0.72)));
  const colHeight = height - margin * 2 - 48;
  const lines = [];
  lines.push(`BT /F1 ${fontSize + 4} Tf`);
  lines.push(`1 0 0 1 ${margin} ${height - margin - 16} Tm`);
  lines.push(`<${utf16BeHex(`${layout.title}  ·  ${page.page}/2`)}> Tj`);
  if (layout.basedOn) {
    lines.push(`0 ${-(leading + 2)} Td`);
    lines.push(`/F1 ${fontSize} Tf`);
    lines.push(`<${utf16BeHex(`公开教材 · ${layout.basedOn}`)}> Tj`);
  }
  lines.push("ET");

  const items = [];
  for (const sec of sections) {
    items.push({ kind: "h", text: sec.heading || "" });
    for (const b of sec.bullets || []) items.push({ kind: "b", text: `· ${b}` });
    if (sec.cite) items.push({ kind: "c", text: `〔${sec.cite}〕` });
  }
  const colLines = [[], []];
  let col = 0;
  let yUsed = 0;
  for (const item of items) {
    const wrapped = wrapLine(item.text, maxChars);
    const blockH = wrapped.length * leading + (item.kind === "h" ? 6 : 0);
    if (cols === 2 && yUsed + blockH > colHeight && col === 0) {
      col = 1;
      yUsed = 0;
    }
    colLines[col].push({ ...item, wrapped });
    yUsed += blockH;
  }

  for (let c = 0; c < cols; c++) {
    const x = margin + c * (colW + colGap);
    let y = height - margin - 52;
    for (const item of colLines[c]) {
      const size = item.kind === "h" ? fontSize + 1 : fontSize;
      if (item.kind === "h") y -= 6;
      for (const row of item.wrapped) {
        y -= leading;
        if (y < margin) break;
        lines.push("BT");
        lines.push(`/F1 ${size} Tf`);
        lines.push(`1 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)} Tm`);
        lines.push(`<${utf16BeHex(row)}> Tj`);
        lines.push("ET");
      }
    }
  }
  return lines.join("\n");
}

function pdfObjects(layout) {
  const pageStreams = (layout.pages || []).slice(0, 2).map((p) => pageStream(layout, p));
  while (pageStreams.length < 2) pageStreams.push(pageStream(layout, { page: pageStreams.length + 1, sections: [] }));
  const font = `<< /Type /Font /Subtype /Type0 /BaseFont /STSong-Light /Encoding /UniGB-UCS2-H /DescendantFonts [8 0 R] >>`;
  const cid = `<< /Type /Font /Subtype /CIDFontType0 /BaseFont /STSong-Light /CIDSystemInfo << /Registry (Adobe) /Ordering (GB1) /Supplement 2 >> /FontDescriptor 9 0 R >>`;
  const desc = `<< /Type /FontDescriptor /FontName /STSong-Light /Flags 6 /FontBBox [-25 -254 1000 880] /ItalicAngle 0 /Ascent 880 /Descent -254 /CapHeight 880 /StemV 50 >>`;
  return { pageStreams, font, cid, desc };
}

export function cheatsheetToPdf(layout = {}) {
  const { pageStreams, font, cid, desc } = pdfObjects(layout);
  const s1 = Buffer.from(pageStreams[0], "utf8");
  const s2 = Buffer.from(pageStreams[1], "utf8");
  const objs = [];
  const add = (body) => {
    objs.push(body);
    return objs.length;
  };
  add("<< /Type /Catalog /Pages 2 0 R >>");
  add("<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>");
  add("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 5 0 R /Resources << /Font << /F1 7 0 R >> >> >>");
  add("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 6 0 R /Resources << /Font << /F1 7 0 R >> >> >>");
  add(`<< /Length ${s1.length} >>\nstream\n${pageStreams[0]}\nendstream`);
  add(`<< /Length ${s2.length} >>\nstream\n${pageStreams[1]}\nendstream`);
  add(font);
  add(cid);
  add(desc);

  let out = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objs.length; i++) {
    offsets.push(Buffer.byteLength(out, "utf8"));
    out += `${i + 1} 0 obj\n${objs[i]}\nendobj\n`;
  }
  const startxref = Buffer.byteLength(out, "utf8");
  out += `xref\n0 ${objs.length + 1}\n`;
  out += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i++) {
    out += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  out += `trailer << /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;
  return Buffer.from(out, "utf8");
}
