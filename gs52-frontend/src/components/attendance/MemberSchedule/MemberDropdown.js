import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "영업팀",
    value: "3",
    key: "3",
    children: [
      {
        title: "김미자",
        emp_ID: "12345",
        key: "123",
      },
    ],
  },
  {
    title: "인사팀",
    value: "5",
    key: "5",
    children: [
      {
        title: "김철수",
        emp_ID: "32142",
        key: "32142",
      },
      {
        title: "김수한",
        value: "25512",
        key: "25512",
      },
      {
        title: "무거북",
        value: "44443",
        key: "44443",
      },
    ],
  },

  {
    title: "경리팀",
    value: "7",
    key: "7",
    children: [
      {
        title: "김철수",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "김수한",
        value: "543",
        key: "543",
      },
      {
        title: "무거북",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];

const Dropdown = () => {
  const [value, setValue] = useState(["3"]);

  const onChange = (value) => {
    setValue(value);
    console.log(value);
  };

  const tProps = {
    treeData,
    value: value,
    onChange: onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  return <TreeSelect {...tProps} />;
};

export default Dropdown;
