import React, { useEffect, useLayoutEffect, useState } from "react";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CProgress,
  CProgressBar,
} from "@coreui/react";
import {
  SelectTotal,
  SelectWeekTotal,
  SelectVacation,
} from "src/lib/api/main/TimeProgress";
import { SelectWorkCheck,SelectWorkRule } from "src/lib/api/main/SideBar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

export function TimeProgress() {
  const user = getCurrentUser();
  const dispatch = useDispatch();
  const [user_52, setUser_52] = useState(0);              //유저 이번주 근무시간
  const [work_regular, setWork_regular] = useState(40);   //그냥 기본 40시간

  const [startTime, setStartTime] = useState(null);       //오늘 출근
  const [endTime, setEndTime] = useState(null);           //오늘 퇴근
  const [breakTime, setBreakTime] = useState(null);       //휴게시간
  const [todayTotal, setTodayTotal] =useState(null)       //오늘토탈

  const [teamStart, setTeamStart] = useState(null);       //팀 출근
  const [teamEnd, setTeamEnd] = useState(null);           //팀퇴근

  // 7:연차, 8:오전반차, 9:오후반차
  // const [dayoff, setDayoff] = useState(0)
  // const [halfday_AM, setHalfday_AM] = useState(0)
  // const [halfday_PM, setHalfday_PM] = useState(0)
  // const [week, setWeek] = useState(null);

  const render = useSelector((state) => state.main.render);

  useLayoutEffect(()=>{
    
    SelectWorkRule(user.team).then((item)=>{
      setTeamStart(item.data[0].work_RULE_START)
      setTeamEnd(item.data[0].work_RULE_END)
    })
  },[])

  useEffect(async () => {
    await SelectWorkCheck(user.index, moment().format("YYYY-MM-DD")).then(
      (item) => {
        console.log(item)
        if (item.data != 0) {
          if (item.data[0].attend_START != null) {
            setStartTime(item.data[0].attend_START);
          }
          if (item.data[0].attend_END != null) {
            setEndTime(item.data[0].attend_END);
          }
          if (item.data[0].attend_BREAK != null) {
            setBreakTime(item.data[0].attend_BREAK);
          }
          if (item.data[0].attend_TOTAL != null) {
            setTodayTotal(item.data[0].attend_TOTAL);
          }
        }
      }
    );
    // await SelectTotal(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
    //     console.log("SelectTotal")
    //     console.log(item)
    // })
    await SelectWeekTotal(user.index, moment().format("YYYY-MM-DD")).then(
      (item) => {
        console.log(item)
        let a = 0;
        for (let i = 0; i < item.data.length; i++) {
          a = a + item.data[i].attend_TOTAL;
          setUser_52(a);
          console.log(a)
        }
      }
    );
  }, [render]);

  useEffect(async () => {
    await SelectVacation(user.index, moment().format("YYYY-MM-DD")).then(
      (item) => {
        for (let i = 0; i < item.data.length; i++) {
          if ("7" == item.data[i].attend_ATTEND_TYPE_INDEX) {
            setWork_regular(work_regular - (item.data[i].attend_TYPE_COUNT * 8));
            //setDayoff(item.data[i].attend_TYPE_COUNT)
          } else if ("8" == item.data[i].attend_ATTEND_TYPE_INDEX) {
            setWork_regular(
              work_regular - (item.data[i].attend_TYPE_COUNT * 3.5)
            );
            //setHalfday_AM(item.data[i].attend_TYPE_COUNT)
          } else if ("9" == item.data[i].attend_ATTEND_TYPE_INDEX) {
            setWork_regular(
              work_regular - (item.data[i].attend_TYPE_COUNT * 4.5)
            );
            //setHalfday_PM(item.data[i].attend_TYPE_COUNT)
          }
        }
      }
    );
  }, []);

  const date = new Date();
  const [dateTime, setDateTime] = useState({
    hours: null,
    minutes: null,
  });
  //return()=>setooooo    <- useEffect의 cleanup
  useLayoutEffect(() => {
    console.log("useeffecttttttttttttt")
    if (startTime != null&&todayTotal==null) {
      console.log("startTime111")
      var str = startTime.split(":");
      const currentMinute = (date.getHours() * 60) + date.getMinutes();
      const startMinute = (parseInt(str[0]) * 60) + parseInt(str[1]);
      const calculMinute = currentMinute - startMinute;

      setDateTime({
        hours: calculMinute / 60,
        minutes: calculMinute % 60,
      });
    }
    else if (startTime == null&&todayTotal!=null){
      console.log("startTime222")
      setDateTime({
        hours: todayTotal / 60,
        minutes: todayTotal % 60,
      });
    }
  }, [startTime,todayTotal]);


  const showStart = () => {
    var str = startTime.split(":");
    console.log("showStart")
    setInterval(() => {
      const date = new Date();
      const currentMinute = (date.getHours() * 60) + date.getMinutes();
      const startMinute = (parseInt(str[0]) * 60) + parseInt(str[1]);
      const calculMinute = currentMinute - startMinute;

      setDateTime({
        hours: calculMinute / 60,
        minutes: calculMinute % 60,
      });
    }, 1000 * 60);
    return (
      <div style={{ width: "100px", textAlign: "center" }}>
        금일 출근시간{" "}
        <div style={{ color: "blue", textAlign: "center" }}>
          {" "}
          {str[0]}시 {str[1]}분{" "}
        </div>
      </div>
    );
  };

  const showEnd = () => {
    var str = endTime.split(":");
    return (
      <div style={{ width: "100px", textAlign: "center" }}>
        금일 퇴근시간{" "}
        <div style={{ color: "blue", textAlign: "center" }}>
          {" "}
          {str[0]}시 {str[1]}분{" "}
        </div>
      </div>
    );
  };

  const showBreak = () => {
    return (
      <div style={{ width: "120px", textAlign: "center" }}>
        금일 총 휴식시간{" "}
        <div style={{ color: "green", textAlign: "center" }}>
          {" "}
          {Math.floor(breakTime / 60)}시간 {breakTime % 60} 분
        </div>
      </div>
    );
  };

  const showTodayWork = () => {
    return (
      <div>
        오늘의 근무시간 {Math.floor(dateTime.hours)}시간 {dateTime.minutes}
        분
      </div>
    );
  };

  return (
    <div style={{ align: "center" }}>
      <h4>
        이번 주 예정근무시간 {parseInt(work_regular / 1)}시간{" "}
        {parseInt((work_regular % 1) * 60)}분
      </h4>
      <h4>
        이번 주 근무시간 {parseInt(user_52 / 60)}
        시간 {user_52 % 60}분
      </h4>
      <h4>{startTime != null ? showTodayWork() : null}</h4>
      <CProgress
        value={
          ((user_52 + (Math.floor(dateTime.hours) * 60) + dateTime.minutes) /
            (work_regular * 60)) * 100
        }
        showPercentage
        className="mb-3"
        style={{ marginTop: "20px" }}
      />


        {console.log("user_52")}
        {console.log(user_52)}
        {console.log("(Math.floor(dateTime.hours)")}
        {console.log(Math.floor(dateTime.hours))}
        {console.log("dateTime.minutes")}
        {console.log(dateTime.minutes)}
      <CProgress
        color="danger"
        showPercentage
        value={
          ((user_52 + (Math.floor(dateTime.hours) * 60) + dateTime.minutes) /
            //((user_52 + Math.floor(dateTime.hours) * 60 + dateTime.minutes-60) /
            (work_regular * 60)) %
          100
        }
      />

      <CRow style={{color:"gray", paddingBottom:"15px"}}>
        <CCol sm="3">정규 출근시간 : {teamStart}</CCol>
        <CCol sm="3">정규 퇴근시간 : {teamEnd}</CCol>
      </CRow>
      <CRow>
        <CCol sm="3">{startTime != null ? showStart() : null}</CCol>
        <CCol sm="3">{endTime != null ? showEnd() : null}</CCol>
        <CCol sm="3">{breakTime != null ? showBreak() : null}</CCol>
      </CRow>
    </div>
  );
}

export default TimeProgress;
