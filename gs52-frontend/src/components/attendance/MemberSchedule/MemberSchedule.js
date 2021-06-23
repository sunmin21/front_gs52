import { RFC_2822 } from "moment";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table } from "antd";

const MemberSchedule = () => {
  const columns = [
    {
      title: "구성원 스케줄",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "1",
      dataIndex: "address",
      key: "1",
    },
    {
      title: "2",
      dataIndex: "address",
      key: "2",
    },
    {
      title: "3",
      dataIndex: "address",
      key: "3",
    },
    {
      title: "4",
      dataIndex: "address",
      key: "4",
    },
    {
      title: "5",
      dataIndex: "address",
      key: "5",
    },
    {
      title: "6",
      dataIndex: "address",
      key: "6",
    },
    {
      title: "7",
      dataIndex: "address",
      key: "7",
    },
    { title: "Column 8", dataIndex: "address", key: "8" },
    { title: "Column 9", dataIndex: "address", key: "9" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    { title: "Column 10", dataIndex: "address", key: "10" },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: ` ${i}`,
    });
  }
  return (
    <>
      <Table
        borderd
        columns={columns}
        dataSource={data}
        scroll={{ x: 3000, y: 400 }}
      />
    </>
  );
};

export default MemberSchedule;
