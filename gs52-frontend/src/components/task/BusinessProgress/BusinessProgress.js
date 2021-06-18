import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import { DocsLink } from "src/reusable";
import Todo from "./Todo";
import Send from "./Send";
import Success from "./Success";
import {
  todo,
  doneInsert,
  send,
  success,
} from "src/lib/api/task/BusinessProgress";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
const BusinessProgress = () => {
  //임의로 userid 정해줌
  const todo_EMP_ID_RECEIVCE = useRef(0); //유저아이디

  //////////////////////////////////////////////
  const [todoCount, setTodoCount] = useState(0);
  const [todoContents, setTodoContents] = useState(null);

  const [sendCount, setSendCount] = useState(0);
  const [sendContents, setSendContents] = useState(null);

  const [successCount, setSuccessCount] = useState(0);
  const [successContents, setSuccessContents] = useState(null);
  ///////////////////////////////////////

  const Done = {
    0: "대기중",
    1: "거절",
    2: "완료",
  };

  useEffect(() => {
    todo(todo_EMP_ID_RECEIVCE.current).then((data) => {
      setTodoContents(
        data.map((item) => {
          return {
            //이름내용요청날짜상태수락거절
            id: item.todo_INDEX,
            보낸사람: item.todo_EMP_ID_SEND,
            내용: item.todo_CONTENTS,
            요청날짜: item.todo_START_DATE,
            상태: Done[item.todo_DONE],
          };
        })
      );

      setTodoCount(data.length / 10 + 1);
    });
    send(todo_EMP_ID_RECEIVCE.current).then((data) => {
      setSendContents(
        data.map((item) => {
          return {
            //이름내용요청날짜상태수락거절
            id: item.todo_INDEX,
            받은사람: item.todo_EMP_ID_RECEIVCE,
            내용: item.todo_CONTENTS,
            보낸날짜: item.todo_START_DATE,
            상태: "대기중",
          };
        })
      );
      setSendCount(data.length / 10 + 1);
    });
    success(todo_EMP_ID_RECEIVCE.current).then((data) => {
      setSuccessContents(
        data.map((item) => {
          return {
            //이름내용요청날짜상태수락거절
            id: item.todo_INDEX,
            보낸사람: item.todo_EMP_ID_RECEIVCE,
            내용: item.todo_CONTENTS,
            요청날짜: item.todo_START_DATE,
            완료한날짜: item.todo_END_DATE,
            상태: Done[item.todo_DONE],
          };
        })
      );
      setSuccessCount(data.length / 10 + 1);
    });
  }, []);

  const todoRemove = useCallback(
    (e) => {
      setTodoContents((contents) =>
        contents.filter((content) => {
          if (content.id == e.target.value) {
            console.log("안타냐?");

            setSuccessContents((con) => {
              const dat = {
                id: content["id"],
                보낸사람: content["보낸사람"],
                내용: content["내용"],
                요청날짜: content["요청날짜"],
                완료한날짜: moment().format("YYYY-MM-DD HH:mm:ss"),
                상태: Done[e.target.name],
              };

              return con.concat(dat);
            });
          }

          return content.id != e.target.value;
        })
      );
    },
    [todoContents]
  );

  const todoSucess = useCallback(
    (e) => {
      doneInsert([todo_EMP_ID_RECEIVCE.current, parseInt(e.target.value), 2]);
    },
    [todoContents, doneInsert, todoRemove]
  );

  const todoReject = useCallback(
    (e) => {
      doneInsert([todo_EMP_ID_RECEIVCE.current, parseInt(e.target.value), 1]);
    },
    [todoContents, doneInsert, todoRemove]
  );

  if (todoContents !== null) {
    return (
      <>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              업무 진행 사항
              <DocsLink name="CTabs" />
            </CCardHeader>
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>할 일</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>보낸 요청</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>완료한 요청</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <Todo
                      content={todoContents}
                      pageCount={Math.floor(todoCount)}
                      success={todoSucess}
                      reject={todoReject}
                      remove={todoRemove}
                    ></Todo>
                  </CTabPane>
                  <CTabPane>
                    <Send
                      content={sendContents}
                      pageCount={Math.floor(sendCount)}
                    ></Send>
                  </CTabPane>
                  <CTabPane>
                    <Success
                      content={successContents}
                      pageCount={Math.floor(successCount)}
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </>
    );
  } else {
    return <></>;
  }
  //   } else {
  //     return <></>;
  //   }
};

export default BusinessProgress;
