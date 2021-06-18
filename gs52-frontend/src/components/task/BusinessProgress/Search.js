import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import { useState } from "react";
const Search = () => {
  const usersData = [
    {
      id: 0,
      이름: "John Doe",
      부서: "2018/01/01",
      팀: "Guest",
      직급: "Pending",
    },
    {
      id: 1,
      name: "Samppa Nori",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 2,
      name: "Estavan Lykos",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 3,
      name: "Chetan Mohamed",
      registered: "2018/02/01",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Derick Maximinus",
      registered: "2018/03/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 5,
      name: "Friderik Dávid",
      registered: "2018/01/21",
      role: "Staff",
      status: "Active",
    },
    {
      id: 6,
      name: "Yiorgos Avraamu",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 7,
      name: "Avram Tarasios",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 8,
      name: "Quintin Ed",
      registered: "2018/02/01",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Enéas Kwadwo",
      registered: "2018/03/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 10,
      name: "Agapetus Tadeáš",
      registered: "2018/01/21",
      role: "Staff",
      status: "Active",
    },
    {
      id: 11,
      name: "Carwyn Fachtna",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 12,
      name: "Nehemiah Tatius",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 13,
      name: "Ebbe Gemariah",
      registered: "2018/02/01",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 14,
      name: "Eustorgios Amulius",
      registered: "2018/03/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 15,
      name: "Leopold Gáspár",
      registered: "2018/01/21",
      role: "Staff",
      status: "Active",
    },
    {
      id: 16,
      name: "Pompeius René",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 17,
      name: "Paĉjo Jadon",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 18,
      name: "Micheal Mercurius",
      registered: "2018/02/01",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 19,
      name: "Ganesha Dubhghall",
      registered: "2018/03/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 20,
      name: "Hiroto Šimun",
      registered: "2018/01/21",
      role: "Staff",
      status: "Active",
    },
    {
      id: 21,
      name: "Vishnu Serghei",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 22,
      name: "Zbyněk Phoibos",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 23,
      name: "Aulus Agmundr",
      registered: "2018/01/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 42,
      name: "Ford Prefect",
      registered: "2001/05/25",
      role: "Alien",
      status: "Don't panic!",
    },
  ];

  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(usersData)

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "이름", _style: { width: "40%", textAlign: "center" } },
    { key: "부서", _style: { width: "20%", textAlign: "center" } },
    { key: "팀", _style: { width: "20%", textAlign: "center" } },
    { key: "직급", _style: { width: "20%", textAlign: "center" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <CDataTable
      items={usersData}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
          </td>
        ),
        show_details: (item, index) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  toggleDetails(index);
                }}
              >
                {details.includes(index) ? "Hide" : "Show"}
              </CButton>
            </td>
          );
        },
        details: (item, index) => {
          return (
            <CCollapse show={details.includes(index)}>
              <CCardBody>
                <h4>{item.username}</h4>
                <p className="text-muted">User since: {item.registered}</p>
                <CButton size="sm" color="info">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" className="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default Search;
