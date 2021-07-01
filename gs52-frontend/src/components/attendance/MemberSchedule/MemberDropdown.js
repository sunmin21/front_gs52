import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { treeValue } from "src/modules/annual/memberSchedule";
import { CodeSandboxCircleFilled } from "@ant-design/icons";

const { SHOW_PARENT } = TreeSelect;

const Dropdown = (data) => {
  const [value, setValue] = useState(["3"]);

  console.log(data);

  const dispatch = useDispatch();

  const treeData = data.data;
  console.log(treeData);

  useEffect(() => {
    dispatch(treeValue(value));
  }, [dispatch]);

  const onChange = (value) => {
    setValue(value);
    dispatch(treeValue(value));
  };

  const tProps = {
    treeData,
    value: value,
    onChange: onChange,
    treeCheckable: true,
    treeNodeFilterProp: "title",
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  return <TreeSelect {...tProps} />;
};

export default Dropdown;
