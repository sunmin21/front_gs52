import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { CCard, CCardBody } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

function DetailCalendar() {

  return (
    <CCard>
      <CCardBody>
        <FullCalendar
          contentHeight="385px"
          defaultView="dayGridMonth"
          plugins={[daygridPlugin]}
          // events={data}
          // eventDisplay="title"
        />
      </CCardBody>
    </CCard>
  );
}
export default DetailCalendar;
