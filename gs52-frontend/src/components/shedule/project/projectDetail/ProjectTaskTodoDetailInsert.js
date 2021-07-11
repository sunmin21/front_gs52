import { CButton } from "@coreui/react";
import { useState } from "react";
import TaskTodoDetailModal from "./ProjectTaskTodoDetailModal";
const ProjectTaskTodoDetailInsert = ({
  axios,
  dispatch,
  taskIndex,
  item,
  projectNo,
  projectWith,
}) => {
  const [visible, setVisible] = useState(false);
  console.log(projectWith);
  return (
    <>
      <TaskTodoDetailModal
        projectNo={projectNo}
        visible={visible}
        setVisible={setVisible}
        taskIndex={taskIndex}
        projectWith={projectWith}
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
        {"등록"}
      </CButton>
    </>
  );
};

export default ProjectTaskTodoDetailInsert;
