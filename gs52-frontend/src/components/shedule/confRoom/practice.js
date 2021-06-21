import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSelect,
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";

export function Practice(props) {

	const FLOOR_SELECT = ["5층", "6층"];
	const ROOM_SELECT = ["1호", "2호"];

	const [primary, setPrimary] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [floor, setFloor] = useState();
	const [room, setRoom] = useState(false);

            // let LIFE_VALUE = ""; // 값이 계속 바뀌기 때문에 let으로 선언.
            // const { register, handleSubmit } = useForm(); //ref의 선택자인 register
            // const onSubmit = (data) => {
            // LIFE_VALUE = data.lifeArr;
            // console.log(LIFE_VALUE);
            // }; // data(인자)를 받아 lifeArr(select name 속성) LIFE_VALUE의 값에 반영한다.

            const [q1, setQ1] = useState("");
              const handleChangeQ1 = e => {
                setQ1(e.target.value);
                console.log("handleChangeQ1")
                console.log("e.target.value::::"+e.target.value)
              };

  const click = () => {
    setPrimary(!primary);
    props.setModal(q1)
  };

  return (
    <div>
      <br />
      <CButton
        color="primary"
        onClick={() => setPrimary(!primary)}

      >
        추가
      </CButton>

      <CModal
        show={primary}
        onClose={() => setPrimary(!primary)}
        color="primary"
      >

        <CModalBody>
        <select value={q1} onChange={handleChangeQ1} >
          <option value="001">영유아</option>
          <option value="002">아동</option>
          <option value="003">청소년</option>
          <option value="004">청년</option>
          <option value="005">중장년</option>
          <option value="006">노년</option>
        </select>

        </CModalBody>
        <CModalFooter>
         <CButton color="primary" onClick={click}>
            등록
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setPrimary(!primary)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default Practice;
