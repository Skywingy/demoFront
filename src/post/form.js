import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Spin, Switch } from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAuth } from "../utils/auth";

import axios from "axios";
import Swal from "sweetalert2";

const Forms = () => {
  const { postid } = useParams();
  const { user } = useAuth();
  const history = useNavigate();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    postid && fetch();
  }, []);
  const fetch = async () => {
    setloading(true);
    let res = await axios({
      url: `/post/${postid}`,
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
      method: postid ? "PUT" : "POST",
      url: postid ? `/post/${postid}` : "/post/create", 
      data: data,
    });
    navigate('/user')

    setloading(false);

    // onFinish;
  };
  const deleteById = async () => {
    Swal.fire({
      title: "Анхааруулага?",
      text: "Мэдээллийг устгах уу!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Устгах!",
      cancelButtonText: "Болих",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios({
          url: `/post/${postid}`,
          method: "DELETE",
        }).then((res) => {
          Swal.fire("Амжилттай устгагдлаа!", "", "success");
          history(-1);
        });
      }
    });
  };
  return (
    <div className="flex flex-col  p-2">
      <div className="flex justify-between items-center p-3 border-l-8 border-def-blue mx-2">
        <div className="text-sm font-semibold">Мэдээлэл</div>
      </div>
      <div className="flex w-full justify-between p-2 my-4">
        <Button
          danger
          icon={<ArrowLeftOutlined />}
          size="middle"
          onClick={() => history(-1)}
        />
        <Button
          danger
          icon={<DeleteOutlined />}
          size="middle"
          onClick={() => deleteById()}
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
            title: data?.title,
            message: data?.message,
          }}
          onFinish={onFinish}
        >
          <div className="p-4 flex justify-center flex-wrap">
            <div className="w-1/2 p-2">
              <Form.Item label="Гарчиг" name="title">
                <Input placeholder="Бичих" required />
              </Form.Item>
              <Form.Item label="Зарлал" name="message">
                <Input placeholder="Бичих" required />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                >
                  Дуусгах
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
