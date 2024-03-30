import React, { useEffect, useState } from "react";

import { Button, Image, Table } from "antd";
import { FileExcelOutlined, UserAddOutlined } from "@ant-design/icons";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { API_ROOT } from "../const";
import axios from "axios";
const COLUMNS = [
  {
    title: "Хичээлийн нэр",
    dataIndex: "lessonname",
  },
  {
    title: "Хичээлийн дугаар",
    dataIndex: "lessoncode",
  },

  {
    render: ({ lessoncode }) => {
      return (
        <Link to={`add/${lessoncode}`}>
          <BsArrowRightCircle style={{ fontSize: 25 }} />
        </Link>
      );
    },
  },
];
const List = () => {
  const navigate = useNavigate();
  const [list, setlist] = useState(null);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    let response = await axios({
      method: "POST",
      url: "/StudentClass/list",
    });
    setlist(response.data.data);
    console.log(
      "🚀 ~ file: List.js ~ line 21 ~ fetch ~ response.data",
      response.data
    );
  };
  return (
    <div className="flex flex-col  p-2">
      <div className="flex flex-row justify-between items-center bg-white p-3 border-l-8 border-def-blue mb-4">
        <div className="text-base font-semibold">Таны сонгох боломжит хичээлүүд</div>
        <div className="flex-row">
        </div>
      </div>
      {list && <Table dataSource={list} columns={COLUMNS} />}
    </div>
  );
};

export default List;
