import React from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "react-big-scheduler/lib/css/style.css";

import moment from "moment";
import { Modal } from "antd";

const withDragDropContext = DragDropContext(HTML5Backend);

function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

const now = moment(new Date()).format("YYYY-MM-DD");

let schedulerData = new SchedulerData(now, ViewTypes.Day, false, false, {
  startResizable: false,
  endResizable: false,
  eventItemPopoverEnabled: false,
  movable: false,
  calendarPopoverEnabled: false,
  resourceName: "개인 스케줄",
  schedulerWidth: "73%",
  views: [],
});
schedulerData.localeMoment.locale("en");

const Readonly = withDragDropContext((props) => {
  //treevalue값 까지 받아와짐

  ////////////////////////////팀, 직원 목록
  const empList = props.emp
    .filter(
      (item) =>
        props.treevalue.includes(String(item.emp_TEAM_INDEX)) ||
        props.treevalue.includes(item.emp_ID)
    )
    .map((item) => ({
      id: item.emp_ID,
      name: item.emp_NAME,
      parentId: String(item.emp_TEAM_INDEX),
    }));

  const parentList = empList
    .filter((item, i) => {
      return (
        empList.findIndex((item2, j) => {
          return item.parentId === item2.parentId;
        }) === i
      );
    })
    .map((item) => item.parentId);

  const teamList = props.team
    .filter((item) => parentList.includes(String(item.team_INDEX)))
    .map((item) => ({
      id: String(item.team_INDEX),
      name: item.dept_NAME + " : " + item.team_NAME,
      groupOnly: true,
    }));
  // moment(weekStart).add(7, 'd').day(0).format("YYYY-MM-DD")
  ////////////////////////////직원들 연차목록
  const attendList = props.attend.map((item) => {
    var startdate = new Date(item.attend_DATE);

    startdate.setDate(startdate.getDate() + 1);

    if (item.attend_TYPE_NAME == "연차") {
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE,
        end: moment(startdate).format("YYYY-MM-DD"),
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#FA9E95",
      };
    } else if (item.attend_TYPE_NAME.includes("오전반차")) {
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE + " 09:00",
        end: item.attend_DATE + " 13:00",
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#DC143C",
      };
    } else if (item.attend_TYPE_NAME.includes("오후반차")) {
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE + " 14:00",
        end: item.attend_DATE + " 19:00",
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#DC143C",
      };
    } else if (item.attend_TYPE_NAME == "출장") {
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE,
        end: moment(startdate).format("YYYY-MM-DD"),
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#D9D9D9",
      };
    } else if (item.attend_TYPE_NAME == "외근") {
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE,
        end: moment(startdate).format("YYYY-MM-DD"),
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#f759ab",
      };
    } else if (item.attend_TYPE_NAME == "지각") {
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE + " 10:00",
        end: item.attend_DATE + " " + item.attend_START,
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
      };
    } else if (item.attend_TYPE_NAME == "출근") {
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE + " " + item.attend_START,
        end: item.attend_DATE + " 10:00",
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
      };
    }
  });

  const endList = props.attend
    .filter(
      (item) =>
        item.attend_TYPE_NAME == "지각" || item.attend_TYPE_NAME == "출근"
    )
    .map((item) => {
      if (item.attend_TYPE_NAME == "지각") {
        return {
          id: item.attend_INDEX,
          start: item.attend_DATE + " 17:00",
          end: item.attend_DATE + " " + item.attend_END,
          resourceId: item.emp_ID,
          title: "퇴근",
        };
      } else if (item.attend_TYPE_NAME == "출근") {
        return {
          id: item.attend_INDEX,
          start: item.attend_DATE + " 17:00",
          end: item.attend_DATE + " " + item.attend_END,
          resourceId: item.emp_ID,
          title: "퇴근",
        };
      }
    });

  ///직원 별 회의실 목록
  console.log("@@@@@1");
  console.log(attendList);
  console.log("@@@@@2");
  console.log(endList);

  const confPerson = props.person.map((item) => ({
    id: item.conf_RE_INDEX,
    start: item.conf_DATE + " " + item.conf_START,
    end: item.conf_DATE + " " + item.conf_END,
    resourceId: item.emp_ID,
    title: item.conf_TITLE,
    room: item.conf_ROOM_NUMBER + "호",
  }));

  //직원, 팀 부서 리스트
  const List = teamList.concat(empList);

  //각 직원별 일정 리스트
  const eventList = attendList.concat(confPerson).concat(endList);

  const selectList = {
    resources: List,
    events: eventList,
  };
  schedulerData.setResources(selectList.resources);
  schedulerData.setEvents(selectList.events);

  const forceUpdate = useForceUpdate();

  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(selectList.events);
    forceUpdate();
  };

  const nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(selectList.events);
    forceUpdate();

    // console.log("@@");
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(selectList.events);
    forceUpdate();
  };

  const updateEventStart = (schedulerData, event, newStart) => {
    if (
      window.confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    forceUpdate();
  };

  const updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      window.confirm(
        `Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    forceUpdate();
  };

  const onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(selectList.events);
      forceUpdate();

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(selectList.events);
      forceUpdate();

      schedulerContent.scrollLeft = 10;
    }
  };

  const onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollTop");
  };

  const onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("@@s");
    console.log("onScrollBottom");
  };

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    forceUpdate();
  };

  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(selectList.events);
    forceUpdate();
  };
  const eventClicked = (schedulerData, event) => {
    Modal.info({
      title: event.title,
      content: <div>{event.room}</div>,
      onOk() {},
    });
  };

  return (
    <div>
      <div>
        <Scheduler
          schedulerData={schedulerData}
          prevClick={prevClick}
          nextClick={nextClick}
          onSelectDate={onSelectDate}
          onViewChange={onViewChange}
          updateEventStart={updateEventStart}
          updateEventEnd={updateEventEnd}
          onScrollLeft={onScrollLeft}
          onScrollRight={onScrollRight}
          onScrollTop={onScrollTop}
          onScrollBottom={onScrollBottom}
          toggleExpandFunc={toggleExpandFunc}
          eventItemClick={eventClicked}
        />
      </div>
    </div>
  );
});

export default withDragDropContext(Readonly);
