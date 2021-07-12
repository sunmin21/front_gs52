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
import { Carousel } from "antd";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonInsightList from "src/components/attendance/PersonInsight/PersonInsightList";

import TeamInsightList from "src/components/shedule/TeamInsight/TeamInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

import {
  businessAxios,
  entrydateAxios,
  listAxios,
  projectAxios,
  reportAxios,
  todoAxios,
  worktimeAxios,
} from "src/modules/schedule/teamInsight";

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

  const teamlist0 = teamlist.map((item) => ({
    emp_INDEX: item.emp_INDEX,
  }));

  useEffect(() => {
    dispatch(entrydateAxios(EMP_INDEX.team));
    dispatch(projectAxios(EMP_INDEX.team));
    dispatch(todoAxios(EMP_INDEX.team));
    dispatch(businessAxios(EMP_INDEX.team));
    dispatch(reportAxios(EMP_INDEX.team));
    dispatch(worktimeAxios(EMP_INDEX.team));
    dispatch(listAxios(EMP_INDEX.team));
  }, [dispatch, EMP_INDEX.team]);
  return (
    <div>
      <div class="row">
        <div class="col w-100 mt-3">
          <CCard>
            <CCardBody>
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
            </CCardBody>
          </CCard>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CCard>
            <CCardBody>
              <CCarousel animate autoSlide={3000}>
                <CCarouselIndicators />
                <CCarouselInner>
                  {teamlist0.map((item) => {
                    return (
                      <CCarouselItem>
                        <CCarouselCaption>
                          <h3>Slide {item.emp_INDEX}</h3>
                          <p>Slide {item.emp_INDEX}</p>
                        </CCarouselCaption>
                        <PersonInsightList
                          EMP_INDEX={item.emp_INDEX}
                          key={item}
                        ></PersonInsightList>
                      </CCarouselItem>
                    );
                  })}
                </CCarouselInner>
                <CCarouselControl direction="prev" />
                <CCarouselControl direction="next" />
              </CCarousel>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PersonInsight);
