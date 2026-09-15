import { l as e, r, c as t, j as s } from "./index-TjoB2Buo.js";
import o from "./ChatResponsePage-B8jlcC8f.js";
import "./historyConversationDataParser-f81MQw9L.js";
import "./github-BU76ptNE.js";
import "./utils-Bmk8urhx.js";
import "./index-CMJxjNZ8.js";
import "./check-BBSENZCf.js";
import "./createLucideIcon-B4HcG4gb.js";
import "./copy-jHTWzodI.js";
import "./CourseStructureMap-41hR1got.js";
import "./loader-circle-BZEIbChB.js";
import "./plus-jBDDhggQ.js";
import "./maximize-2-78VwLVLI.js";
import "./x-BPqZ-rfi.js";
import "./index-qYFgNVxk.js";
import "./download-dDsBfY4e.js";
import "./CourseTypeIcon-27chSRPG.js";
import "./TextSelectionPopup-gC3xy-py.js";
import "./addErrorLog-Dxv53mIo.js";
import "./ConversationSkeletonLoader-BLm7Nk9F.js";
import "./index-BYcV05tM.js"; /* empty css                  */
import "./with-selector-U5gkSzzZ.js";
import "./BugReportModal-DxKVyQda.js";
import "./CourseRatingBar-BgzZWlQB.js";
const i = ({
  isSidebarExpanded: i
}) => {
  const {
    runId: n
  } = e();
  const [a, u] = r.useState(null);
  const [p, l] = r.useState(null);
  r.useEffect(() => {
    if (!n) {
      return;
    }
    let e = false;
    l(null);
    fetch(t(`/api/v1/course-generation/generation-log/${encodeURIComponent(n)}`)).then(async e => {
      if (!e.ok) {
        throw new Error(e.status === 404 ? "This generation run was not found." : `Failed to load this run (${e.status}).`);
      }
      return e.json();
    }).then(r => {
      if (!e) {
        u(r);
      }
    }).catch(r => {
      if (!e) {
        l(r.message);
      }
    });
    return () => {
      e = true;
    };
  }, [n]);
  const c = r.useMemo(() => a ? {
    conversationId: `course-log-${a.run_id}`,
    query: a.query || "",
    courseUuid: a.course_uuid ?? null,
    status: String(a.status ?? ""),
    events: Array.isArray(a.events) ? a.events : [],
    finalCourse: a.final_course ?? null,
    semiStructure: a.semi_structure ?? null
  } : null, [a]);
  if (p) {
    return s.jsx("div", {
      className: "cgl-state",
      children: p
    });
  } else if (c) {
    return s.jsx(o, {
      isSidebarExpanded: i,
      replay: c
    });
  } else {
    return s.jsx("div", {
      className: "cgl-state",
      children: "Loading generation transcript…"
    });
  }
};
export { i as default };