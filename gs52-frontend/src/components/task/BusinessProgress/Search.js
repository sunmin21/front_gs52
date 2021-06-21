import { CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "src/lib/api/auth/Emp";
import { changeSEARCH } from "src/modules/emp";
const Search = () => {
  //   const [userCount, setUserCount] = useState(0);
  const [userContents, setUserContents] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    userList().then((data) => {
      setUserContents(
        data.map((item) => {
          return {
            사원번호: item.emp_ID,
            이름: item.emp_NAME,
            부서: item.dept_NAME,
            팀: item.team_NAME,
            직책: item.position_NAME,
          };
        })
      );
    });
  }, []);

  const fields = [
    { key: "이름", _style: { width: "40%", textAlign: "center" } },
    { key: "부서", _style: { width: "20%", textAlign: "center" } },
    { key: "팀", _style: { width: "20%", textAlign: "center" } },

    { key: "직책", _style: { width: "20%", textAlign: "center" } },
  ];

  return (
    <CDataTable
      items={userContents}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      border
      clickableRows
      onRowClick={(item) => {
        return dispatch(
          changeSEARCH({
            form: "search",

            사원번호: item.사원번호,
            이름: item.이름,
            부서: item.부서,
            팀: item.팀,
            직책: item.직책,
          })
        );
      }}
      scopedSlots={{
        이름: (item) => <td style={{ textAlign: "center" }}>{item.이름}</td>,
        부서: (item) => <td style={{ textAlign: "center" }}>{item.부서}</td>,
        팀: (item) => <td style={{ textAlign: "center" }}>{item.팀}</td>,

        직책: (item) => <td style={{ textAlign: "center" }}>{item.직책}</td>,
      }}
    />
  );
};

export default Search;
