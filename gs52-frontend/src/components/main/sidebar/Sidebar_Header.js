import { getCurrentUser } from "../../../lib/api/jwt/LoginAPI";
import WorkTime from "../worktime/WorkTime";
import moment from "moment";
import { useEffect, useState } from "react";

import { SelectEmpImg } from "src/lib/api/main/SideBar";
import WiseSaying from "./WiseSaying";
import { CImg } from "@coreui/react";
import { userList } from "src/lib/api/auth/auth";

// 퇴근가능시간 이후에는 퇴근 버튼 활성화

function Sidebar_Header() {
  const user = getCurrentUser();

  const [img, setImg] = useState(null);
  const [userContent, setUserContent] = useState();
  useEffect(async () => {
    SelectEmpImg(user.index).then((res) => {
      console.log("res.data[0]");
      console.log(res.data[0]);
      if (res.data[0] != null) {
        setImg(res.data[0].emp_IMG_PATH);
        console.log(res);
        console.log("res");
      } else {
        setImg("/upload/empImages/default.png");
      }
    });

    setUserContent(
      await (
        await userList()
      ).filter((item) => Number(item.emp_INDEX) === user.index)
    );
  }, []);

  console.log(userContent);

  return (
    <div style={{ background: "" }}>
      <br />

      <img
        src={img}
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      />

      <div style={{ marginTop: "30px" }}>
        <div style={{ fontSize: "30px" }}>
          {user.username} {userContent && userContent[0].rank_NAME}
        </div>
        <div>
          {userContent && userContent[0].team_NAME}{" "}
          {userContent && userContent[0].rank_NAME}{" "}
          {userContent && userContent[0].position_NAME}
        </div>
      </div>
      <br />
      <WorkTime></WorkTime>
      <br />
      <br />
      <WiseSaying />
    </div>
  );
}

export default Sidebar_Header;
