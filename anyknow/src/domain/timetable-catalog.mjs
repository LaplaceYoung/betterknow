/** Leftover sample 课表: 小爱 JSON + 正方 kbList + ICS snippets (no 教务 login). */

export const SAMPLE_XIAOAI = {
  school: "示例大学",
  termStart: "2026-09-07",
  courseInfos: [
    {
      name: "高等数学A",
      teacher: "王老师",
      position: "理教 210",
      weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      day: 1,
      sections: [1, 2],
    },
    {
      name: "线性代数",
      teacher: "李老师",
      position: "理教 108",
      weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      day: 3,
      sections: [3, 4],
    },
    {
      name: "机器学习导论",
      teacher: "陈老师",
      position: "计科 305",
      weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: 2,
      sections: [5, 6],
    },
    {
      name: "社会学原理",
      teacher: "赵老师",
      position: "文教 401",
      weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      day: 5,
      sections: [7, 8],
    },
  ],
};

export const SAMPLE_ZHENGFANG = {
  kbList: [
    {
      kcmc: "高等数学A",
      xm: "王老师",
      cdmc: "理教 210",
      zcd: "1-16周",
      jc: "1-2节",
      xqj: 1,
    },
    {
      kcmc: "线性代数",
      xm: "李老师",
      cdmc: "理教 108",
      zcd: "1-16周",
      jc: "3-4节",
      xqj: 3,
    },
  ],
};

export const SAMPLE_ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//simo know//timetable//ZH
BEGIN:VEVENT
SUMMARY:高等数学A
LOCATION:理教 210
DESCRIPTION:王老师
DTSTART:20260907T080000
DTEND:20260907T093500
RRULE:FREQ=WEEKLY;COUNT=16
END:VEVENT
END:VCALENDAR
`;
