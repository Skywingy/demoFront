import React, { useEffect, useState } from "react";

import { Button, Image, Table, Input, Search, Spin } from "antd";
import { FileExcelOutlined, UserAddOutlined } from "@ant-design/icons";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_ROOT } from "../const";
import axios from "axios";
import Item from "antd/lib/list/Item";
const COLUMNS = [
  {
    title: "Багшийн дугаар",
    dataIndex: "teacherid",
  },
  {
    title: "Нэр",
    dataIndex: "teachername",
  },
  {
    title: "Утас",
    dataIndex: "phone",
  },
  {
    render: ({ teacherid }) => {
      return (
        <Link to={`edit/${teacherid}`}>
          <BsArrowRightCircle style={{ fontSize: 25 }} />
        </Link>
      );
    },
  },
];


const List = () => {
  const { Search } = Input;
  const navigate = useNavigate();
  const [list, setlist] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setloading] = useState(false);
  
  console.log("typing__________", query);
  useEffect(() => {
    setloading(true);
    fetch();
  }, [query]);
  const fetch = async () => {
    let response = await axios({
      method: "POST",
      url: `/teacher/list?q=${query}`,
    });
    setlist(response.data.data);
    console.log(
      "🚀 ~ file: List.js ~ line 21 ~ fetch ~ response.data",
      response.data);
      setloading(false);
  };
  return (
    <div className="big flex flex-col  p-2">
      <div className="flex flex-row justify-between items-center bg-white p-3 border-l-8 border-def-blue mb-4">
        <div className="text-base font-semibold">Багш нар</div>
        <div className="flex-row">
        <Search
          id="haih"
          placeholder="Багшийн нэрээр хайх"
          type="search"
          allowClear
          onChange={(e) => setQuery(e.target.value)}
          style={{
              width: 600,
        }}
        />
          <Link to={"new"}>
            <Button
              type="primary"
              className="ml-2"
              icon={<UserAddOutlined />}
              size="middle"
              shape="circle"
              onClick={() => navigate("/new")}
            ></Button>
          </Link>
        </div>
      </div>
      {<Table dataSource={list} columns={COLUMNS} loading={{ indicator: <div><Spin size="large"/></div>, spinning:!list}}/>} 
    </div>
  );
};

export default List;
