import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonInsightList from "src/components/attendance/PersonInsight/PersonInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import {
  businesscountAxios,
  entrydateAxios,
  projectcountAxios,
  reportcountAxios,
  todocountAxios,
} from "src/modules/annual/personInsight";

const PersonInsight = () => {
  const EMP_INDEX = getCurrentUser();

  const { entrydate, projectcount, todocount, businesscount, reportcount } =
    useSelector((state) => {
      console.log(state);
      return {
        entrydate: state.personInsight.entrydate,
        projectcount: state.personInsight.projectcount,
        todocount: state.personInsight.todocount,
        businesscount: state.personInsight.businesscount,
        reportcount: state.personInsight.reportcount,
      };
    });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entrydateAxios(EMP_INDEX.index));
    dispatch(projectcountAxios(EMP_INDEX.index));
    dispatch(todocountAxios(EMP_INDEX.index));
    dispatch(businesscountAxios(EMP_INDEX.index));
    dispatch(reportcountAxios(EMP_INDEX.index));
  }, [dispatch, EMP_INDEX.index]);
  console.log(reportcount);
  return (
    <div class="container">
      <div class="row">
        <div class="col w-100 mt-3">
          {entrydate.length !== 0 &&
          projectcount.length !== 0 &&
          todocount.length !== 0 &&
          businesscount.length !== 0 &&
          reportcount.length !== 0 ? (
            <PersonInsightList
              EMP_INDEX={EMP_INDEX.index}
              entrydate={entrydate}
              projectcount={projectcount}
              todocount={todocount}
              businesscount={businesscount}
              reportcount={reportcount}
            ></PersonInsightList>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PersonInsight);
