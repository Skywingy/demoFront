import React, { useEffect, useState } from "react";

import { Button, Image, Table } from "antd";
import { FileExcelOutlined, UserAddOutlined } from "@ant-design/icons";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link, useNavigate,useParams } from "react-router-dom";
import { API_ROOT } from "../const";
import axios from "axios";
const COLUMNS = [
  {
    title: "Хичээлийн нэр",
    dataIndex: "lessonname",
  },
  {
    title: "Хичээлийн код",
    dataIndex: "lessoncode",
  },
];
const List = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setlist] = useState(null);
  useEffect(() => {
    id && fetch();
  }, []);
  const fetch = async () => {
    let response = await axios({
      method: "GET",
      url: `/teacherView/list/${id}`,
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
        <div className="text-base font-semibold">Таны орох хичээлүүд</div>
        <div id="here" className="flex-row">
        </div>
      </div>
      {list && <Table id="endd" dataSource={list} columns={COLUMNS} />}
    </div>
  );
};

export default List;
