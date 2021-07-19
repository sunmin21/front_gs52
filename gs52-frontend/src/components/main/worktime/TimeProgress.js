import React, { useEffect, useState } from "react";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CProgress,
} from "@coreui/react";
import {
  SelectTotal,
  SelectWeekTotal,
  SelectVacation,
} from "src/lib/api/main/TimeProgress";
import { SelectWorkCheck } from "src/lib/api/main/SideBar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

export function TimeProgress() {
  const user = getCurrentUser();
  const dispatch = useDispatch();
  const [user_52, setUser_52] = useState(0);
  const [work_regular, setWork_regular] = useState(40);


  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [breakTime, setBreakTime] = useState(null);


  // 7:연차, 8:오전반차, 9:오후반차
  // const [dayoff, setDayoff] = useState(0)
  // const [halfday_AM, setHalfday_AM] = useState(0)
  // const [halfday_PM, setHalfday_PM] = useState(0)
  // const [week, setWeek] = useState(null);

  const render = useSelector((state) => state.main.render);


  useEffect(async () => {
    await SelectWorkCheck(user.index, moment().format("YYYY-MM-DD")).then(
      (item) => {
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
        }
      }
    );
    // await SelectTotal(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
    //     console.log("SelectTotal")
    //     console.log(item)
    // })
    await SelectWeekTotal(user.index, moment().format("YYYY-MM-DD")).then(
      (item) => {
        let a = 0;
        for (let i = 0; i < item.data.length; i++) {
          a = a + item.data[i].attend_TOTAL;
          setUser_52(a);
        }
      }
    );

  }, [render]);

  useEffect(async()=>{

    await SelectVacation(user.index, moment().format("YYYY-MM-DD")).then(
      (item) => {
        for (let i = 0; i < item.data.length; i++) {
            if("7" == item.data[i].attend_ATTEND_TYPE_INDEX){
                setWork_regular(work_regular-item.data[i].attend_TYPE_COUNT*8)
                //setDayoff(item.data[i].attend_TYPE_COUNT)
            }
            else if("8" == item.data[i].attend_ATTEND_TYPE_INDEX){
                
                setWork_regular(work_regular-item.data[i].attend_TYPE_COUNT*3.5)
                //setHalfday_AM(item.data[i].attend_TYPE_COUNT)
            }
            else if("9" == item.data[i].attend_ATTEND_TYPE_INDEX){
                setWork_regular(work_regular-item.data[i].attend_TYPE_COUNT*4.5)
                //setHalfday_PM(item.data[i].attend_TYPE_COUNT)
            }
        }
        
      }
    );
  },[])

  //return()=>setooooo    <- useEffect의 cleanup
  useEffect(() => {
    if(startTime!=null){
    var str = startTime.split(":");
    const currentMinute = date.getHours()*60 + date.getMinutes();
    const startMinute = parseInt(str[0])*60 + parseInt(str[1]);
    const calculMinute = currentMinute-startMinute;

    setDateTime({
      hours: calculMinute/60,
      minutes: calculMinute%60
    });

  }
    }, [startTime]);

  const date = new Date();
  const [dateTime, setDateTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });


  const showStart = () => {
    var str = startTime.split(":");
    setInterval(() => {
      const date = new Date();
      const currentMinute = date.getHours()*60 + date.getMinutes();
      const startMinute = parseInt(str[0])*60 + parseInt(str[1]);
      const calculMinute = currentMinute-startMinute;

      setDateTime({
        hours: calculMinute/60,
        minutes: calculMinute%60
      });
    }, 1000*60);
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


  return (
    <div style={{ align: "center" }}>
      <h4>
        이번 주 예정근무시간 {parseInt(work_regular/1)}시간 {parseInt((work_regular % 1)*60)}분

      </h4>
      <h4>
        이번 주 근무시간 {parseInt(user_52 / 60)}시간 {user_52 % 60}분
      </h4>      <h4>
        오늘의 근무시간 {Math.floor(dateTime.hours)}시간 {dateTime.minutes}분
      </h4>
      <CProgress
        value={(user_52 / (work_regular*60))*100}
        showPercentage
        className="mb-3"
        style={{ marginTop: "20px" }}
      />

      <CRow>
        <CCol sm="3">{startTime != null ? showStart() : null}</CCol>
        <CCol sm="3">{endTime != null ? showEnd() : null}</CCol>
        <CCol sm="3">{breakTime != null ? showBreak() : null}</CCol>
      </CRow>
    </div>
  );
}

export default TimeProgress;
