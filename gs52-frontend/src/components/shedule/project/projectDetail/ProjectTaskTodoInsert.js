import { CButton } from "@coreui/react";
import React from "react";
import { useEffect, useRef, useState } from "react";
import TaskTodoModal from "./ProjectTaskTodoModal";
const ProjectTaskTodo = ({
  projectNo,
  axios,
  dispatch,
  taskIndex,
  item,
  sum,
  detail,
  projectWith,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CButton
        active
        color={taskIndex === undefined ? "dark" : "info"}
        aria-pressed="true"
        style={{ textAlign: "center", float: "right" }}
        onClick={async () => {
          await setVisible(false);

          await setVisible(true);
        }}
        key={taskIndex}
      >
        {taskIndex === undefined && "할일 등록"}
        {taskIndex !== undefined && "수정"}
      </CButton>
      <TaskTodoModal
        visible={visible}
        setVisible={setVisible}
        projectNo={projectNo}
        axios={axios}
        dispatch={dispatch}
        taskIndex={taskIndex}
        sum={sum}
        item={item}
        detail={detail}
        projectWith={projectWith}
      />
    </>
  );
};

export default React.memo(ProjectTaskTodo);
