"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var DemoData = {
  resources: [
    {
      id: "r0",
      name: "영업부",
      groupOnly: true,
    },
    {
      id: "r1",
      name: "김철수",
      parentId: "r0",
    },
    {
      id: "r2",
      name: "김민수",
      parentId: "r0",
    },
    {
      id: "r3",
      name: "김철지",
      parentId: "r0",
    },
    {
      id: "r4",
      name: "김학수",
    },
    {
      id: "r5",
      name: "김진수",
    },
    {
      id: "r6",
      name: "김정수",
    },
    {
      id: "r7",
      name: "김준수",
    },
    {
      id: "r8",
      name: "김재수",
    },
    {
      id: "r9",
      name: "김전수",
    },
    {
      id: "r10",
      name: "김절수",
    },
    {
      id: "r11",
      name: "김진슈",
    },
  ],
  events: [
    {
      id: 1,
      start: "2021-06-18",
      end: "2021-06-19",
      resourceId: "55555",
      title: "출근",
      bgColor: "#D9D9D9",
    },
    {
      id: 1,
      start: "2021-06-24",
      end: "2021-06-25",
      resourceId: "44444",
      title: "출장",
      bgColor: "#D9D9D9",
      resizable: false,
    },
    {
      id: 1,
      start: "2021-07-27",
      end: "2021-07-28",
      resourceId: "33333",
      title: "외근",
      movable: false,
    },
    {
      id: 4,
      start: "2021-06-11 14:30:00",
      end: "2021-06-11 23:30:00",
      resourceId: "55555",
      title: "출근",
    },
    {
      id: 5,
      start: "2017-12-19 15:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r5",
      title: "I am not end-resizable",
    },
    {
      id: 6,
      start: "2017-12-19 15:35:00",
      end: "2017-12-19 23:30:00",
      resourceId: "r6",
      title: "I am normal",
    },
    {
      id: 7,
      start: "2017-12-19 15:40:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r7",
      title: "I am exceptional",
      bgColor: "#FA9E95",
    },
    {
      id: 8,
      start: "2017-12-19 15:50:00",
      end: "2017-12-19 23:30:00",
      resourceId: "r1",
      title: "I am locked",
      movable: false,
      resizable: false,
      bgColor: "red",
    },
    {
      id: 8,
      start: "2017-12-19 16:30:00",
      end: "2017-12-27 23:30:00",
      resourceId: "r1",
      title: "R1 has many tasks 1",
    },
    {
      id: 10,
      start: "2017-12-19 17:30:00",
      end: "2017-12-19 23:30:00",
      resourceId: "r1",
      title: "R1 has recurring tasks every week on Tuesday, Friday",
      rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR",
      bgColor: "#f759ab",
    },
    {
      id: 11,
      start: "2017-12-19 18:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r1",
      title: "R1 has many tasks 3",
    },
    {
      id: 12,
      start: "2017-12-20 18:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r1",
      title: "R1 has many tasks 4",
    },
    {
      id: 13,
      start: "2017-12-21 18:30:00",
      end: "2017-12-24 23:30:00",
      resourceId: "r1",
      title: "R1 has many tasks 5",
    },
    {
      id: 14,
      start: "2017-12-23 18:30:00",
      end: "2017-12-27 23:30:00",
      resourceId: "r1",
      title: "R1 has many tasks 6",
    },
  ],
};
exports.default = DemoData;
