import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TeamInsightList from "src/components/shedule/TeamInsight/TeamInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { entrydateAxios } from "src/modules/schedule/teamInsight";

const PersonInsight = () => {
  const EMP_INDEX = getCurrentUser();

  const { entrydate } = useSelector((state) => {
    console.log(state);
    return {
      entrydate: state.TeamInsight.entrydate,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entrydateAxios(EMP_INDEX.team));
  }, [dispatch, EMP_INDEX.team]);
  return (
    <div class="container">
      <div class="row">
        <div class="col w-100 mt-3">
          {entrydate.length !== 0 ? (
            <TeamInsightList
              EMP_TEAM_INDEX={EMP_INDEX.team}
              entrydate={entrydate}
            ></TeamInsightList>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PersonInsight);
