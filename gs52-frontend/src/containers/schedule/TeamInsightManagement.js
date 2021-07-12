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

import TeamInsightList from "src/components/shedule/TeamInsight/TeamInsightList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import {
  businessAxios,
  entrydateAxios,
  projectAxios,
  reportAxios,
  todoAxios,
  worktimeAxios,
} from "src/modules/schedule/teamInsight";
import PersonInsightManagement from "../attendance/PersonInsightManagement";

const slides = [
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
];
const PersonInsight = () => {
  const EMP_INDEX = getCurrentUser();

  const { entrydate, project, todo, business, report, worktime } = useSelector(
    (state) => {
      console.log(state);
      return {
        entrydate: state.TeamInsight.entrydate,
        project: state.TeamInsight.project,
        todo: state.TeamInsight.todo,
        business: state.TeamInsight.business,
        report: state.TeamInsight.report,
        worktime: state.TeamInsight.worktime,
      };
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entrydateAxios(EMP_INDEX.team));
    dispatch(projectAxios(EMP_INDEX.team));
    dispatch(todoAxios(EMP_INDEX.team));
    dispatch(businessAxios(EMP_INDEX.team));
    dispatch(reportAxios(EMP_INDEX.team));
    dispatch(worktimeAxios(EMP_INDEX.team));
  }, [dispatch, EMP_INDEX.team]);
  return (
    <div>
      <div class="row">
        <div class="col w-100 mt-3">
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
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CCard>
            <CCardBody>
              <CCarousel animate autoSlide={3000}>
                <CCarouselIndicators />
                <CCarouselInner>
                  <CCarouselItem>
                    <PersonInsightManagement></PersonInsightManagement>
                    <CCarouselCaption>
                      <h3>Slide 1</h3>
                      <p>Slide 1</p>
                    </CCarouselCaption>
                  </CCarouselItem>
                  <CCarouselItem>
                    <PersonInsightManagement></PersonInsightManagement>
                    <CCarouselCaption>
                      <h3>Slide 2</h3>
                      <p>Slide 2</p>
                    </CCarouselCaption>
                  </CCarouselItem>
                  <CCarouselItem>
                    <PersonInsightManagement></PersonInsightManagement>
                    <CCarouselCaption>
                      <h3>Slide 3</h3>
                      <p>Slide 3</p>
                    </CCarouselCaption>
                  </CCarouselItem>
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
