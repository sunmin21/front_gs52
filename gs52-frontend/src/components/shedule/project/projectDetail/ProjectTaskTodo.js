import { CButton } from "@coreui/react";
import { useState } from "react";
import TaskTodoModal from "./ProjectTaskTodoModal";
const ProjectTaskTodo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TaskTodoModal visible={visible} setVisible={setVisible} />
      <CButton
        active
        block
        color="dark"
        aria-pressed="true"
        style={{ textAlign: "center", float: "right" }}
        onClick={() => {
          setVisible(true);
        }}
      >
        할일 등록
      </CButton>
    </>
  );
};

export default ProjectTaskTodo;
