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
        title: "Гарчиг",
        dataIndex: "title",
    },
    {
        title: "Зарлал",
        dataIndex: "message",
    },
    {
        render: ({ postid }) => {
            return (
            <Link to={`edit/${postid}`}>
                <BsArrowRightCircle style={{ fontSize: 25 }} />
            </Link>
            );
        },
        },
    ];



const User = () => {
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
        url: `/post/list`,
        });
        setlist(response.data.data);
        console.log(
        "------_________-------",
        response.data);
        setloading(false);
    };
    
    
    return (
        <div className="big flex flex-col  p-2">
            <div className="flex flex-row justify-between items-center bg-white p-3 border-l-8 border-def-blue mb-4">
                <div className="text-base font-semibold">Зарлал</div>
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
            {<Table dataSource={list} columns={COLUMNS} loading={{ indicator: <div><Spin size="large"/></div>, spinning:!list}}/>} 
        </div>
    )
}

export default User;