import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Spin, Switch } from "antd";

import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAuth } from "../utils/auth";

import axios from "axios";
import Swal from "sweetalert2";

const Forms = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const history = useNavigate();
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
    id && fetch();
    }, []);
    const fetch = async () => {
    setloading(true);
    let res = await axios({
        url: `/StudentClass/${id}`,
        method: "GET",
    });
    setdata(res.data.data);
    console.log("🚀 ~ file: Form.js ~ line 26 ~ fetch ~ res.data", res.data);
    setloading(false);
    };


    const onFinish = async (data) => {
    
    console.log("🚀 ~ file: Form.js ~ line 35 ~ onFinish ~ data", data);

    setloading(true);
    await axios({
        method: "POST",
        url: "/StudentClass/create",
        data: data,
    });
    navigate('/user/StudentClass');

    setloading(false);

    // onFinish;
    };

    return (
    <div className="flex flex-col  p-2">
        <div className="flex justify-between items-center p-3 border-l-8 border-def-blue mx-2">
        <div className="text-sm font-semibold">Та энэ хичээлийг сонгон судлах уу?   </div>
        </div>
        <div className="flex w-full justify-between p-2 my-4">
        <Button
            danger
            icon={<ArrowLeftOutlined />}
            size="middle"
            onClick={() => history(-1)}
        />
        </div>
        {loading ? (
        <div className="flex h-32 justify-center items-center align-middle">
            <Spin size="large" />
        </div>
        ) : (
        <Form
            className="bg-white "
            layout="vertical"
            initialValues={{
            lessonname: data?.lessonname,
            lessoncode: data?.lessoncode,
            studentid: user.studentid,
            
            }}
            onFinish={onFinish}
        >
            <div className="p-4 flex justify-center flex-wrap">
            <div className="w-1/2 p-2">
            <Form.Item label="Хичээлийн нэр" name="lessonname">
                <Input
                required
                disabled
                minLength={4}
                maxLength={30}
                placeholder="Бичих"
                />
            </Form.Item>
            <Form.Item label="Хичээлийн код" name="lessoncode">
                <Input required
                disabled
                minLength={1}
                maxLength={2} 
                placeholder="Бичих" />
            </Form.Item>
            <Form.Item label="Сурагчийн ID" name="studentid">
                <Input required
                disabled
                minLength={1}
                maxLength={2} 
                placeholder="Бичих" />
            </Form.Item>
                <Form.Item>
                <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                >
                    Нэмэх
                </Button>
                </Form.Item>
            </div>
            </div>
        </Form>
        )}
    </div>
);
};

export default Forms;
