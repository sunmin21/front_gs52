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
import Todo from "../../components/task/BusinessProgress/Todo";
import Send from "../../components/task/BusinessProgress/Send";
import Success from "../../components/task/BusinessProgress/Success";
import {
  todo,
  doneInsert,
  send,
  success,
} from "src/lib/api/task/BusinessProgress";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { sendAxios, succssAxios, todoAxios } from "src/modules/task/task";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import React from "react";

const BusinessProgress = () => {
  //임의로 userid 정해줌

  const [user, setUser] = useState(getCurrentUser());

  const todo_EMP_ID_RECEIVCE = useRef(user.index); //유저아이디

  //////////////////////////////////////////////
  const [todoCount, setTodoCount] = useState(0);
  const [todoContents, setTodoContents] = useState(null);

  const [sendCount, setSendCount] = useState(0);
  const [sendContents, setSendContents] = useState(null);

  const [successCount, setSuccessCount] = useState(0);
  const [successContents, setSuccessContents] = useState(null);
  ///////////////////////////////////////
  const dispatch = useDispatch();
  const { todo, send, success } = useSelector(({ task }) => ({
    todo: task.todo,
    send: task.send,
    success: task.success,
  }));

  const Done = {
    0: "대기",
    1: "반려",
    2: "완료",
  };
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  useEffect(() => {
    dispatch(todoAxios(todo_EMP_ID_RECEIVCE.current));
    // todo(todo_EMP_ID_RECEIVCE.current).then((data) => {
    //   dispatch(todo);
    //   setTodoContents(
    //     data.map((item) => {
    //       return {
    //         //이름내용요청날짜상태수락거절
    //         id: item.todo_INDEX,
    //         보낸사람: item.todo_EMP_ID_SEND,
    //         내용: item.todo_CONTENTS,
    //         요청날짜: item.todo_START_DATE,
    //         상태: Done[item.todo_DONE],
    //       };
    //     })
    //   );

    //   setTodoCount(data.length / 10 + 1);
    // });
    dispatch(sendAxios(todo_EMP_ID_RECEIVCE.current));
    // send(todo_EMP_ID_RECEIVCE.current).then((data) => {
    //   setSendContents(
    //     data.map((item) => {
    //       console.log(item);
    //       return {
    //         //이름내용요청날짜상태수락거절
    //         id: item.todo_INDEX,
    //         받은사람: item.todo_RE_EMP_ID,
    //         내용: item.todo_CONTENTS,
    //         보낸날짜: item.todo_START_DATE,
    //         상태: Done[item.todo_DONE],
    //       };
    //     })
    //   );
    //   setSendCount(data.length / 10 + 1);
    // });
    dispatch(succssAxios(todo_EMP_ID_RECEIVCE.current));
    // success(todo_EMP_ID_RECEIVCE.current).then((data) => {
    //   setSuccessContents(
    //     data.map((item) => {
    //       return {
    //         //이름내용요청날짜상태수락거절
    //         id: item.todo_INDEX,
    //         보낸사람: item.todo_EMP_ID_SEND,
    //         내용: item.todo_CONTENTS,
    //         요청날짜: item.todo_START_DATE,
    //         완료날짜: item.todo_END_DATE,
    //         상태: Done[item.todo_DONE],
    //       };
    //     })
    //   );
    //   setSuccessCount(data.length / 10 + 1);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const todoRemove = useCallback(
    (e) => {
      setTodoContents((contents) =>
        contents.filter((content) => {
          // eslint-disable-next-line eqeqeq
          if (content.id == e.target.value) {
            //같으면 완료목룍에 넣어라
            setSuccessContents((con) => {
              const dat = {
                id: content["id"],
                보낸사람: content["보낸사람"],
                내용: content["내용"],
                요청날짜: content["요청날짜"],
                완료날짜: moment().format("YYYY-MM-DD HH:mm:ss"),
                상태: Done[e.target.name],
              };

              return con.concat(dat);
            });
          }

          // eslint-disable-next-line eqeqeq
          return content.id != e.target.value; //todo 목록에서빼는거고
        })
      );
    },
    [todoContents]
  );

  const todoSucess = async (e) => {
    await doneInsert([
      todo_EMP_ID_RECEIVCE.current,
      parseInt(e.target.value),
      2,
    ]);
  };

  const todoReject = async (e) => {
    await doneInsert([
      todo_EMP_ID_RECEIVCE.current,
      parseInt(e.target.value),
      1,
    ]);
  };
  const contentStyle = {
    backgroundColor: "#3e4b54",
    width: "400px",
    textAlign: "center",
    boxShadow: "5px 5px 5px gray",
    padding: "8px",
    borderRadius: "50px",
    marginBottom: "30px",
  };
  const [checkTodo, setCheckTodo] = useState(false);
  const [checkSend, setCheckSend] = useState(false);
  const [checkSuccess, setCheckSuccess] = useState(false);
  if (todo !== null) {
    return (
      <>
        <div style={contentStyle}>
          <h4 style={{ color: "white", marginTop: "5px" }}>업무진행사항</h4>
        </div>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink
                      onClick={() => {
                        setCheckTodo(true);
                        setCheckSend(false);
                        setCheckSuccess(false);
                      }}
                    >
                      받은 요청
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      onClick={() => {
                        setCheckTodo(false);
                        setCheckSend(true);
                        setCheckSuccess(false);
                      }}
                    >
                      보낸 요청
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      onClick={() => {
                        setCheckTodo(false);
                        setCheckSend(false);
                        setCheckSuccess(true);
                      }}
                    >
                      완료한 요청
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <Todo
                      content={todo}
                      pageCount={Math.floor(todoCount)}
                      success={todoSucess}
                      reject={todoReject}
                      remove={todoRemove}
                      userid={todo_EMP_ID_RECEIVCE.current}
                      checkTodo={checkTodo}
                    ></Todo>
                  </CTabPane>
                  <CTabPane>
                    <Send
                      content={send}
                      pageCount={Math.floor(sendCount)}
                      setSendContents={setSendContents}
                      user={user}
                      checkSend={checkSend}
                    ></Send>
                  </CTabPane>
                  <CTabPane>
                    <Success
                      content={success}
                      pageCount={Math.floor(successCount)}
                      checkSuccess={checkSuccess}
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

export default React.memo(BusinessProgress);
