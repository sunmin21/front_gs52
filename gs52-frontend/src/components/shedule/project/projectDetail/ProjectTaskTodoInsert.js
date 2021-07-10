import { CButton } from "@coreui/react";
import { useState } from "react";
import TaskTodoModal from "./ProjectTaskTodoModal";
const ProjectTaskTodo = ({ projectNo, axios, dispatch, taskIndex, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TaskTodoModal
        visible={visible}
        setVisible={setVisible}
        projectNo={projectNo}
        axios={axios}
        dispatch={dispatch}
        taskIndex={taskIndex}
        item={item}
      />
      <CButton
        active
        color="dark"
        aria-pressed="true"
        style={{ textAlign: "center", float: "right" }}
        onClick={() => {
          setVisible(true);
        }}
        key={taskIndex}
      >
        {taskIndex === undefined && "할일 등록"}
        {taskIndex !== undefined && "수정"}
      </CButton>
    </>
  );
};

export default ProjectTaskTodo;
