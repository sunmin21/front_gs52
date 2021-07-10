import { CButton } from "@coreui/react";
import { useState } from "react";
import TaskTodoDetailModal from "./ProjectTaskTodoDetailModal";
const ProjectTaskTodoDetailInsert = ({ axios, dispatch, taskIndex, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TaskTodoDetailModal
        visible={visible}
        setVisible={setVisible}
        taskIndex={taskIndex}
        axios={axios}
        dispatch={dispatch}
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

export default ProjectTaskTodoDetailInsert;
