/** Chalkboard animation / board-image / instructional-video specs. Provider slots stay empty. */

export const MEDIA = Object.freeze({
  interactiveAnimation: "互动动画",
  htmlAnimationPatienceHint: "通常需要 30–90 秒，请耐心等待。",
  instructionVideo: "教学视频",
  diagramTitle: "HTML 动画图",
  kickerInteractive: "互动",
  boardImage: "配图",
  videoScript: "写剧本",
  videoNarration: "配旁白",
  videoCode: "生成画面",
  videoRender: "渲染",
  videoPlay: "播放",
  speakPrompt: "朗读题目",
});

export const MEDIA_STAGES = Object.freeze(["script", "narration", "code", "render"]);

function escapeXml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function labelOf(topic, fallback = "Concept") {
  const t = String(topic || "").replace(/\s+/g, " ").trim();
  return (t || fallback).slice(0, 48);
}

export function sceneForTopic(topic = "", scene = "") {
  const hinted = String(scene || "").trim();
  if (hinted) return hinted;
  const t = String(topic || "");
  if (/360|rotat|hypotenuse arrow|opposite the right/i.test(t)) return "triangle-rotate";
  if (/120|vertex angle|equality \(\$a\^2|Pythagorean equality|wider opening/i.test(t)) return "angle-open";
  if (/3D|space diagonal|prism|floor diagonal|height of the box/i.test(t)) return "prism-height";
  if (/scatter|cloud|study hours|correlation|bivariate|rigid rod|tension|least squares|circular spread|tight diagonal|cigar|residual|outlier|pencil|slope|y-hat|ŷ|\\hat\{y\}|tug-of-war|cancel|leverage|fulcrum|influence|squared error|quadratic|error square|ols|u-shape|v-shape|convex|closed-form|mae|cost function|one-bowl|ordinary least|normal equation|sse valley|mean-mean|beta1|covariance|hyperplane|regression plane/i.test(t)) return "scatter-cloud";
  return "concept";
}

function svgTriangleRotate() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" role="img" class="chalk-anim">
  <rect width="320" height="200" fill="#122018"/>
  <g class="anim-spin">
    <g transform="translate(160 110)">
      <polygon points="-52,36 70,36 -52,-40" fill="none" stroke="#f0e6a8" stroke-width="2"/>
      <path d="M -52,20 L -36,20 L -36,36" fill="none" stroke="#c5e0b4" stroke-width="1.6"/>
      <line x1="-52" y1="36" x2="18" y2="-8" stroke="#e07a6a" stroke-width="1.6"/>
      <text x="22" y="-10" fill="#b9d4e8" font-size="11">hypotenuse</text>
    </g>
  </g>
  <text x="18" y="22" fill="#c9c2ae" font-size="12">0° → 360°</text>
</svg>`;
}

function svgAngleOpen() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" role="img" class="chalk-anim">
  <rect width="320" height="200" fill="#122018"/>
  <g transform="translate(70 150)">
    <line x1="0" y1="0" x2="140" y2="0" stroke="#f4efe2" stroke-width="2"/>
    <g class="anim-open">
      <line x1="0" y1="0" x2="96" y2="-88" stroke="#c5e0b4" stroke-width="2"/>
    </g>
    <line class="anim-hyp" x1="140" y1="0" x2="96" y2="-88" stroke="#f0e6a8" stroke-width="2"/>
    <text x="148" y="4" fill="#c9c2ae" font-size="11">a</text>
    <text x="102" y="-96" fill="#c5e0b4" font-size="11">b</text>
    <text x="118" y="-40" fill="#f0e6a8" font-size="11">c</text>
  </g>
  <text x="18" y="22" fill="#c9c2ae" font-size="12">90° → 120°</text>
</svg>`;
}

function svgPrismHeight() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" role="img" class="chalk-anim">
  <rect width="320" height="200" fill="#122018"/>
  <g transform="translate(90 150)">
    <polygon points="0,0 110,18 170,-22 60,-40" fill="rgba(244,239,226,0.04)" stroke="#c9c2ae" stroke-width="1.4"/>
    <line x1="0" y1="0" x2="170" y2="-22" stroke="#e07a6a" stroke-width="1.6"/>
    <g class="anim-rise">
      <line x1="170" y1="-22" x2="170" y2="-92" stroke="#f4efe2" stroke-width="2"/>
      <line x1="0" y1="0" x2="170" y2="-92" stroke="#f0e6a8" stroke-width="2"/>
      <polygon points="0,-70 110,-52 170,-92 60,-110" fill="none" stroke="#b9d4e8" stroke-width="1.2"/>
    </g>
  </g>
  <text x="18" y="22" fill="#c9c2ae" font-size="12">floor → space diagonal</text>
</svg>`;
}

function svgScatterCloud() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" role="img" class="chalk-anim">
  <rect width="320" height="200" fill="#122018"/>
  <line x1="36" y1="168" x2="292" y2="168" stroke="#8f8a78" stroke-width="1"/>
  <line x1="36" y1="168" x2="36" y2="24" stroke="#8f8a78" stroke-width="1"/>
  <g class="anim-cloud">
    <circle cx="72" cy="132" r="4" fill="#f0e6a8"/>
    <circle cx="104" cy="118" r="4" fill="#f4efe2"/>
    <circle cx="138" cy="108" r="4" fill="#c5e0b4"/>
    <circle cx="168" cy="92" r="4" fill="#f0e6a8"/>
    <circle cx="198" cy="84" r="4" fill="#b9d4e8"/>
    <circle cx="228" cy="70" r="4" fill="#f4efe2"/>
    <circle cx="256" cy="58" r="4" fill="#c5e0b4"/>
    <circle cx="150" cy="128" r="3" fill="#c9c2ae"/>
    <circle cx="210" cy="102" r="3" fill="#c9c2ae"/>
    <circle cx="248" cy="128" r="3.5" fill="#e07a6a"/>
  </g>
  <line x1="58" y1="150" x2="272" y2="46" stroke="#f0e6a8" stroke-width="1.6"/>
  <text x="276" y="48" fill="#f0e6a8" font-size="11">ŷ</text>
  <line x1="150" y1="128" x2="150" y2="108" stroke="#e07a6a" stroke-width="1.2"/>
  <line x1="210" y1="102" x2="210" y2="78" stroke="#e07a6a" stroke-width="1.2"/>
  <rect x="150" y="108" width="20" height="20" fill="none" stroke="#e07a6a" stroke-width="1.1" opacity="0.85"/>
  <rect x="210" y="78" width="24" height="24" fill="none" stroke="#e07a6a" stroke-width="1.1" opacity="0.7"/>
  <text x="44" y="22" fill="#c9c2ae" font-size="12">study hours → scores</text>
</svg>`;
}

function svgConcept(topic) {
  const label = escapeXml(labelOf(topic));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" class="chalk-anim">
  <rect width="320" height="180" fill="#122018"/>
  <g class="anim-pulse-node">
    <circle cx="160" cy="82" r="44" fill="none" stroke="#f0e6a8" stroke-width="2"/>
    <text x="160" y="86" text-anchor="middle" fill="#f4efe2" font-size="12">${label}</text>
  </g>
  <text x="24" y="160" fill="#c9c2ae" font-size="12">${escapeXml(MEDIA.diagramTitle)}</text>
</svg>`;
}

function svgForScene(scene, topic) {
  if (scene === "triangle-rotate") return svgTriangleRotate();
  if (scene === "angle-open") return svgAngleOpen();
  if (scene === "prism-height") return svgPrismHeight();
  if (scene === "scatter-cloud") return svgScatterCloud();
  return svgConcept(topic);
}

function beatsForScene(scene, topic) {
  if (scene === "triangle-rotate") {
    return ["Mark the 90° vertex.", "Draw an arrow to the opposite side.", "Rotate — the opposite side stays the hypotenuse."];
  }
  if (scene === "angle-open") {
    return ["Hold legs a and b fixed.", "Open the vertex past 90°.", "Side c stretches, so c² > a² + b²."];
  }
  if (scene === "prism-height") {
    return ["Find the floor diagonal first.", "Raise the height as a new leg.", "The space diagonal is the new hypotenuse."];
  }
  if (scene === "scatter-cloud") {
    return ["Plot each pair as one chalk dot.", "Lay the pencil through the cloud.", "Watch residual gaps and the outlier tug."];
  }
  return ["Draw the working picture.", `Name the moving part of ${labelOf(topic)}.`, "Say what stays invariant."];
}

export function chalkboardAnimation(input = {}) {
  const topic = input.topic || input.title || input.prompt || "";
  const scene = sceneForTopic(topic, input.scene);
  const title = String(input.title || MEDIA.interactiveAnimation);
  const caption = String(input.caption || "");
  return {
    kind: "animation",
    id: input.id || scene,
    title,
    caption,
    scene,
    beats: Array.isArray(input.beats) && input.beats.length ? input.beats.map(String) : beatsForScene(scene, topic),
    svg: input.svg && !/hyperknow|orbie/i.test(input.svg) ? input.svg : svgForScene(scene, topic),
    provider: input.provider || "pending",
  };
}

export function chalkboardImage(input = {}) {
  const topic = input.topic || input.caption || input.alt || "Board illustration";
  const caption = String(input.caption || input.alt || topic);
  const scene = sceneForTopic(topic, input.scene || "scatter-cloud");
  return {
    kind: "image",
    title: String(input.title || MEDIA.boardImage),
    caption,
    alt: String(input.alt || caption),
    src: "",
    svg: svgForScene(scene, topic),
    provider: input.provider || "pending",
  };
}

export function chalkboardVideo(input = {}) {
  const topic = labelOf(input.topic || input.title || "this idea");
  const scenes = Array.isArray(input.scenes) && input.scenes.length
    ? input.scenes
    : [
        { title: "Hook", body: `What ${topic} looks like on the board.` },
        { title: "Move", body: "Change one part and watch the invariant." },
        { title: "Check", body: "Restate the relation in one sentence." },
      ];
  return {
    kind: "video",
    title: String(input.title || `${topic}`),
    caption: String(input.caption || MEDIA.instructionVideo),
    src: "",
    provider: input.provider || "pending",
    posterSvg: svgConcept(topic),
    stages: MEDIA_STAGES.map((id) => ({
      id,
      label: {
        script: MEDIA.videoScript,
        narration: MEDIA.videoNarration,
        code: MEDIA.videoCode,
        render: MEDIA.videoRender,
      }[id],
      done: true,
    })),
    scenes,
  };
}

export function chalkboardFor(kind, input = {}) {
  if (kind === "video") return chalkboardVideo(input);
  if (kind === "image") return chalkboardImage(input);
  return chalkboardAnimation(input);
}

export function mediaProviders() {
  return { image: false, animation: false, video: false };
}
