import React, { useEffect, useState } from "react";

import { Button, Image, Table, Input, Search, Spin } from "antd";
import { FileExcelOutlined, UserAddOutlined } from "@ant-design/icons";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link, useNavigate, useParams, useLocation, useSearchParam } from "react-router-dom";
import { API_ROOT } from "../const";
import axios from "axios";

const COLUMNS = [
    {
    title: "Хичээлийн код",
    dataIndex: "lessoncode",
    },
    {
    title: "Хичээлийн нэр",
    dataIndex: "lessonname",
    },
    {
    title: "teacherid",
    dataIndex: "teacherid",
    },
    {
    title: "Хичээл орох өдөр",
    dataIndex: "lessonday",
    },
    {
    title: "Хичээл орох цаг",
    dataIndex: "lessontime",
    },
    {
    title: "Багшийн нэр",
    dataIndex: "teachername",
    },
    {
    title: "Зураг",
    dataIndex: "image",
    render: image => <img alt={image} src={image} width="50px" height="50px"/>
    },
    {
    render: ({ lessoncode }) => {
    return (
        <Link to={`edit/${lessoncode}`}>
            <BsArrowRightCircle style={{ fontSize: 25 }} />
        </Link>
            );
        },
    },
];

const List = () => {
    const { Search } = Input;
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [list, setlist] = useState(null);
    const [loading, setloading] = useState(false);

    console.log("__________typing", query);

    useEffect(() => {
            setloading(true);
            fetch();
            }, [query]);
            const fetch = async () => {
            let response = await axios({
                method: "POST",
            url: `/lesson/list?q=${query}`,
            });
            setlist(response.data.data);
            console.log("🚀 ~ file: List.js ~ line 21 ~ fetch ~ response.data", response.data.data);
            setloading(false);
            };  
        console.log("-----------",list);
    return (
    <div className="flex flex-col  p-2">
    <div className="flex flex-row justify-between items-center bg-white p-3 border-l-8 border-def-blue mb-4">
        <div className="text-base font-semibold">Хичээлүүд</div>
        <div className="flex-row">
        <Search
        placeholder="Хичээлийн нэрээр хайх"
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

    {/*  //Was fine but not ideal */}
    {/*  {loading ? (
        <Spin size="large" visi="{loading}" />
        ) : (
            <Table dataSource={list} columns={COLUMNS} />
        )} */}
    
        <Table dataSource={list} columns={COLUMNS} loading={{ indicator: <div><Spin size="large"/></div>, spinning:!list}}/>

    </div>
);
};

export default List;
