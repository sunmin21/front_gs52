import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonInsightList from "src/components/attendance/PersonInsight/PersonInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { personinsightAxios } from "src/modules/annual/personInsight";

const PersonInsight = (props) => {
  const EMP_INDEX = getCurrentUser();
  const dispatch = useDispatch();

  const { personinsight } = useSelector((state) => {
    console.log(state);
    return {
      personinsight: state.personInsight.personinsight,
    };
  });

  useEffect(() => {
    dispatch(personinsightAxios(EMP_INDEX.index));
  }, [dispatch, EMP_INDEX.index]);

  return (
    <div class="container">
      <div class="row">
        <div class="col w-100 mt-3">
          {personinsight.length !== 0 ? (
            <PersonInsightList
              EMP_INDEX={EMP_INDEX.index}
              personinsight={personinsight}
            ></PersonInsightList>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PersonInsight);
