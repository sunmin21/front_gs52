import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonInsightList from "src/components/attendance/PersonInsight/PersonInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { personinsightAxios } from "src/modules/annual/personInsight";

const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};

const PersonInsight = (props) => {
  const EMP_INDEX = getCurrentUser();
  const dispatch = useDispatch();

  const { personinsight } = useSelector((state) => {
    return {
      personinsight: state.personInsight.personinsight,
    };
  });

  useEffect(() => {
    dispatch(personinsightAxios());
  }, [dispatch]);

  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>개인 인사이트</h4>
      </div>
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
    </>
  );
};

export default React.memo(PersonInsight);
