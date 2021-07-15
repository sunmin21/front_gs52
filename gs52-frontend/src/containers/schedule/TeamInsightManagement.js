import {
  CCard,
  CCardBody,
  CCardHeader,
  CCarousel,
  CCarouselCaption,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
} from "@coreui/react";
import { Carousel, PageHeader } from "antd";
import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonInsightList from "src/components/attendance/PersonInsight/PersonInsightList";

import TeamInsightList from "src/components/shedule/TeamInsight/TeamInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { personinsightAxios } from "src/modules/annual/personInsight";

import {
  businessAxios,
  entrydateAxios,
  listAxios,
  projectAxios,
  reportAxios,
  todoAxios,
  worktimeAxios,
} from "src/modules/schedule/teamInsight";

const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};

const PersonInsight = () => {
  const EMP_INDEX = getCurrentUser();

  const { entrydate, project, todo, business, report, worktime, teamlist } =
    useSelector((state) => {
      return {
        entrydate: state.TeamInsight.entrydate,
        project: state.TeamInsight.project,
        todo: state.TeamInsight.todo,
        business: state.TeamInsight.business,
        report: state.TeamInsight.report,
        worktime: state.TeamInsight.worktime,
        teamlist: state.TeamInsight.list,
      };
    });

  const dispatch = useDispatch();

  //const teamlist0 = teamlist.map((item) => item.emp_INDEX);
  const teamlist0 = teamlist.map((item) => ({
    emp_INDEX: item.emp_INDEX,
    emp_NAME: item.emp_NAME,
    rank_NAME: item.rank_NAME,
  }));

  useEffect(async () => {
    await dispatch(entrydateAxios(EMP_INDEX.team));
    await dispatch(projectAxios(EMP_INDEX.team));
    await dispatch(todoAxios(EMP_INDEX.team));
    await dispatch(businessAxios(EMP_INDEX.team));
    await dispatch(reportAxios(EMP_INDEX.team));
    await dispatch(worktimeAxios(EMP_INDEX.team));
    await dispatch(listAxios(EMP_INDEX.team));
    await dispatch(personinsightAxios());
  }, [dispatch, EMP_INDEX.team]);

  //////////////////////////////////////////////////////////////personInsight

  const { personinsight } = useSelector((state) => {
    return {
      personinsight: state.personInsight.personinsight,
    };
  });

  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>팀 인사이트</h4>
      </div>
      <div>
        <div className="row">
          <div className="col w-50 mt-3">
            <CCard>
              {entrydate.length !== 0 &&
              project.length !== 0 &&
              todo.length !== 0 &&
              business.length !== 0 &&
              report.length !== 0 &&
              worktime.length !== 0 ? (
                <TeamInsightList
                  EMP_TEAM_INDEX={EMP_INDEX.team}
                  entrydate={entrydate}
                  project={project}
                  todo={todo}
                  business={business}
                  report={report}
                  worktime={worktime}
                ></TeamInsightList>
              ) : null}
            </CCard>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <CCard>
              <PageHeader
                title="팀원 인사이트"
                style={{ border: "1px solid rgb(235, 237, 240)" }}
              />
              <CCardBody>
                <CCarousel animate autoSlide={3000}>
                  <CCarouselIndicators />
                  <CCarouselInner>
                    {personinsight.length !== 0
                      ? teamlist0.map((item, key) => (
                          <CCarouselItem>
                            <PersonInsightList
                              EMP_INDEX={item.emp_INDEX}
                              personinsight={personinsight}
                              key={key}
                            ></PersonInsightList>
                            <hr />
                            <br />
                            <br />
                            <br />
                            <br />
                            <CCarouselCaption>
                              <h2>
                                {item.emp_NAME} {item.rank_NAME}
                              </h2>
                            </CCarouselCaption>
                          </CCarouselItem>
                        ))
                      : null}
                  </CCarouselInner>
                  <CCarouselControl direction="prev" />
                  <CCarouselControl direction="next" />
                </CCarousel>
              </CCardBody>
            </CCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PersonInsight);
