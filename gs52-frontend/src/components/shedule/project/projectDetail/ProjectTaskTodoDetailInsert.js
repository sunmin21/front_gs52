import { CButton } from "@coreui/react";
import { useState } from "react";
import TaskTodoDetailModal from "./ProjectTaskTodoDetailModal";
const ProjectTaskTodoDetailInsert = ({
  axios,
  axios2,
  dispatch,
  taskIndex,
  item,
  projectNo,
  projectWith,
  sum,
  detailIndex,
  todo,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TaskTodoDetailModal
        projectNo={projectNo}
        visible={visible}
        setVisible={setVisible}
        taskIndex={taskIndex}
        projectWith={projectWith}
        axios={axios}
        axios2={axios2}
        dispatch={dispatch}
        item={item}
        todo={todo}
        sum={sum}
        detailIndex={detailIndex}
      />
      <CButton
        active
        color={detailIndex === undefined ? "dark" : "info"}
        aria-pressed="true"
        style={{ textAlign: "center", float: "right" }}
        onClick={async () => {
          await setVisible(false);

          await setVisible(true);
        }}
        key={taskIndex}
        style={
          detailIndex === undefined
            ? { marginLeft: "20px", float: "right" }
            : { float: "right", marginTop: "5px" }
        }
      >
        {detailIndex === undefined && "할일 등록"}
        {detailIndex !== undefined && "수정"}
      </CButton>
    </>
  );
};

export default ProjectTaskTodoDetailInsert;
