import React, { Component, useEffect, useState } from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import DemoData from "./DemoData";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "react-big-scheduler/lib/css/style.css";
import { Button, Col, Row } from "antd";
import MemberDropdown from "./MemberDropdown";

const withDragDropContext = DragDropContext(HTML5Backend);

function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

const Readonly = withDragDropContext((props) => {
  //treevalue값 까지 받아와짐

  console.log("props");
  console.log(props.treevalue);
  console.log(props.data);
  console.log(props.team);
  console.log(props.emp);

  // const teamList = props.data
  //   .filter((item) => props.treevalue.includes(item.key))
  //   .map((item) => ({
  //     id: item.key,
  //     name: item.title,
  //     groupOnly: true,
  //   }));

  // const childList = props.data.map((item) => {
  //   item.children.map((data) => ({
  //     id: data.key,
  //     name: data.title,
  //     parentId: data.team,
  //   }));
  // });

  const teamList = props.team
    .filter((item) => props.treevalue.includes(String(item.team_INDEX)))
    .map((item) => ({
      id: String(item.team_INDEX),
      name: item.team_NAME,
      groupOnly: true,
    }));

  const empList = props.emp
    .filter((item) => props.treevalue.includes(String(item.emp_TEAM_INDEX)))
    .map((item) => ({
      id: item.emp_ID,
      name: item.emp_NAME,
      parentId: String(item.emp_TEAM_INDEX),
    }));

  const List = teamList.concat(empList);

  const selectList = {
    resources: List,
  };

  let schedulerData = new SchedulerData(
    "2021-06-25",
    ViewTypes.Month,
    false,
    false,
    {
      eventItemPopoverEnabled: false,

      views: [],
    }
  );
  schedulerData.localeMoment.locale("en");
  schedulerData.setResources(selectList.resources);
  schedulerData.setEvents(DemoData.events);

  const forceUpdate = useForceUpdate();

  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    forceUpdate();
  };

  const nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    forceUpdate();

    // console.log("@@");
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
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
      schedulerData.setEvents(DemoData.events);
      forceUpdate();

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(DemoData.events);
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

  return (
    <div>
      <div>
        <Scheduler
          schedulerData={schedulerData}
          prevClick={prevClick}
          nextClick={nextClick}
          onSelectDate={onSelectDate}
          updateEventStart={updateEventStart}
          updateEventEnd={updateEventEnd}
          onScrollLeft={onScrollLeft}
          onScrollRight={onScrollRight}
          onScrollTop={onScrollTop}
          onScrollBottom={onScrollBottom}
          toggleExpandFunc={toggleExpandFunc}
        />
      </div>
    </div>
  );
});

export default withDragDropContext(Readonly);
