import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "영업팀",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "김미자",
        emp: "12345",
        key: "123",
      },
    ],
  },
  {
    title: "인사팀",
    value: "0-1",
    key: "0-1",
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

  {
    title: "경리팀",
    value: "0-1",
    key: "0-1",
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
  const [value, setValue] = useState(["0-0"]);

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
