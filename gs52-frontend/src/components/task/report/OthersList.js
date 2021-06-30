import { CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EmpList } from "src/lib/api/task/ReportAPI";
import { changeSEARCHADD, changeSEARCHSUB, } from "src/modules/task/reportemplist";

// 팀원 리스트 불러오기
// search.js

const OthersList = ({ check }) => {

    let [emp] = useState(1);

    const [userContents, setUserContents] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        EmpList().then((data) => {
        setUserContents(
            data.map((item) => {
                console.log(item);
                return {
                    사원번호: item.emp_INDEX,
                    이름: item.emp_NAME,
                    부서: item.dept_NAME,
                    팀: item.team_NAME,
                    직급: item.position_NAME,
                    직책: item.rank_NAME,
                    선택: false,
                }
            })
        );
        });
    }, [check]);

    const fields = [
        { key: "이름", _style: { width: "20%", textAlign: "center" } },
        { key: "부서", _style: { width: "20%", textAlign: "center" } },
        { key: "팀", _style: { width: "20%", textAlign: "center" } },
        { key: "직급", _style: { width: "20%", textAlign: "center" } },
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
        onRowClick={(item) => {
            const select = document.getElementsByClassName(item.사원번호);
            if (
                select.item(0).selected === undefined ||
                select.item(0).selected === false
            ) {
            for (var i = 0; i < select.length; i++) {
                select.item(i).style.background = "#999991"; // 선택된 모든 요소의 텍스트 색상을 변경함.
                select.item(i).selected = true;
            }

            dispatch(
                changeSEARCHADD({
                form: "search",

                사원번호: item.사원번호,
                이름: item.이름,
                부서: item.부서,
                팀: item.팀,
                직급: item.직급,
                직책: item.직책,
                })
            );
            setUserContents((contents) => {
                return contents.map((content) => {
                    return content.사원번호 === item.사원번호
                        ? { ...content, 선택: !content.선택 }
                        : content;
                    });
                });
            } else {
            for (i = 0; i < select.length; i++) {
                select.item(i).style.background = "white";
                // 선택된 모든 요소의 텍스트 색상을 변경함.
                select.item(i).selected = false;
            }

            dispatch(
                changeSEARCHSUB({
                form: "search",

                사원번호: item.사원번호,
                이름: item.이름,
                부서: item.부서,
                팀: item.팀,
                직급: item.직급,
                직책: item.직책,
                })
            );
            setUserContents((contents) => {
                return contents.map((content) => {
                return content.사원번호 === item.사원번호
                    ? { ...content, 선택: !content.선택 }
                    : content;
                });
            });
            }
        }}
        scopedSlots={{
            이름: (item) => (
            <td
                className={item.사원번호}
                selected={item.선택}
                style={{
                textAlign: "center",
                background: item.선택 ? "#999991" : "white",
                }}
            >
                {item.이름}
            </td>
            ),
            부서: (item) => (
            <td
                className={item.사원번호}
                selected={item.선택}
                style={{
                textAlign: "center",
                background: item.선택 ? "#999991" : "white",
                }}
            >
                {item.부서}
            </td>
            ),
            팀: (item) => (
            <td
                className={item.사원번호}
                selected={item.선택}
                style={{
                textAlign: "center",
                background: item.선택 ? "#999991" : "white",
                }}
            >
                {item.팀}
            </td>
            ),
        
            직급: (item) => (
            <td
                className={item.사원번호}
                selected={item.선택}
                style={{
                textAlign: "center",
                background: item.선택 ? "#999991" : "white",
                }}
            >
                {item.직급}
            </td>
            ),

            직책: (item) => (
            <td
                className={item.사원번호}
                selected={item.선택}
                style={{
                textAlign: "center",
                background: item.선택 ? "#999991" : "white",
                }}
            >
                {item.직책}
            </td>
            ),
        }}
        />
    );
};

export default OthersList;
