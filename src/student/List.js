import React, { useEffect, useState } from "react";

import { Button, Image, Table,  Input, Search, Spin } from "antd";
import { FileExcelOutlined, UserAddOutlined } from "@ant-design/icons";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link, useNavigate, useSearchParams, useParams, withRouter } from "react-router-dom";
import { API_ROOT } from "../const";
import axios from "axios";
const COLUMNS = [
    {
    title: "Сурагчийн хувийн дугаар",
    dataIndex: "studentid",
    },
    {
    title: "Овог",
    dataIndex: "lastname",
    },
    {
    title: "Нэр",
    dataIndex: "firstname",
    },
    {
    title: "Хүйс",
    dataIndex: "sex",
    },
    {
    render: ({ studentid }) => {
    return (
        <Link to={`edit/${studentid}`}>
            <BsArrowRightCircle style={{ fontSize: 25 }} />
        </Link>
        );
    },
    },
];
const List = () => {
    const { Search } = Input;
    const [query, setQuery] = useState("");
    // This function will be called whenever the text input changes
    const navigate = useNavigate();
    const [list, setlist] = useState(null);
    const [loading, setloading] = useState(false);
    
    useEffect(() => {
        setloading(true);
        fetch();
    }, [query]);
    const fetch = async () => {
    let response = await axios({
        method: "POST",
        url: `/student/list?q=${query}`,
    });
    setlist(response.data.data);
    console.log( "🚀 ~ file: List.js ~ line 21 ~ fetch ~ response.data",response.data.data);
    setloading(false);
    };
        

   /*  //Was working >>> but not ideal
    useEffect(() => {
        fetchy();
    }, [query]);
    const fetchy = async() =>{
        let response = await axios({
            method: "GET",
            url: `/student/search/${query}`,
            })
            setData(response.data.data);     
    }
    console.log("data", data);
    console.log("q",query); */

    return (
    <div className="flex flex-col  p-2">
    <div className="flex flex-row justify-between items-center bg-white p-3 border-l-8 border-def-blue mb-4">
        <div className="text-base font-semibold">Сурагчид</div>
        <div className="flex-row">
            <Search
            placeholder="Сурагчийн нэрээр хайх"
            onChange={(e) => setQuery(e.target.value)}
            style={{
            width: 600,
        }} />
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

    {/* /Was working but not ideal */}
    {/*  {loading ? (
        <Spin size="large" />
        ) : (
        <Table dataSource={list} columns={COLUMNS} />
        )} */}
        
        <Table dataSource={list} columns={COLUMNS} loading={{ indicator: <div><Spin size="large"/></div>, spinning:!list}}/>

    </div>
);
};

export default List;
