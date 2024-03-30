import { Button, Form, Input, Tooltip, Modal, Alert } from "antd";
import {
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  InfoCircleOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import md5 from "md5";
import { useAuth } from "../utils/auth.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Auth = () => {
  const { login } = useAuth();
  const [loading, setloading] = useState(false);
  const [show, setShow] = useState(false);
  const [phone, setphone] = useState(null);
  const [test, setTest] = useState();

  const onFinish = async ({ username, password }) => {
    try {
      setloading(true);
      let result = await axios({
        url: "/student/login",
        method: "POST",
        data: {
          username: username,
          password: password,
        },
      });
      setloading(false);
      if (result?.data?.success) {
        login(result.data);
        console.log("Нэвтэрлэээээээ", result.data);
      } else Swal.fire("Дахин оролдоно уу!!!", result?.data?.message, "error");
      console.log(
        "🚀 ~ file: Auth.jsx ~ line 35 ~ onFinish ~ result.data",
        result.data
      );
    } catch (err) {
      console.log("🚀 ~ file: Auth.jsx ~ line 40 ~ onFinish ~ err", err);
      setloading(false);
    }
  };
  const onFinishFailed = async (err) => {
    console.log("🚀 ~ file: Auth.jsx ~ line 45 ~ onFinishFailed ~ err", err);
  };

  return (
    <div className="big h-full flex flex-wrap bg-def-gray">
      <img
        className="left w-full sm:flex hidden  md:w-2/3  h-screen"
        src="../img/login.png"
        alt=""
      />
      <div className="right w-full h-screen md:w-1/3 flex flex-col">
        <div className="flex  justify-center align-middle object-center items-center h-screen">
          <div className="bg-white p-5 rounded-md shadow">
            <div className="flex justify-center">
              <img
                style={{ width: 60, height: 60 }}
                src="../img/wb.png"
                alt=""
              />
            </div>
            <div className="flex flex-row align-middle items-center">
              <div className="w-2 bg-def-blue h-12 " />
              <div className="mt-8 mb-8 pl-3">
                <div className="font-bold text-xl">Нэвтрэх</div>
              </div>
            </div>

            <Form
              name="basic"
              initialValues={{ username: "", password: "" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Хэрэглэгчийн нэр оруулна уу.!" },
                ]}
              >
                <Input
                  size="large"
                  maxLength={8}
                  prefix={
                    <MobileOutlined
                      color="#1890ff"
                      className="site-form-item-icon"
                    />
                  }
                  suffix={
                    <Tooltip color="blue" title="Хэрэглэгчийн нэр оруулна.">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                  placeholder="Хэрэглэгчийн нэр"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Нууц үг оруулна уу.!" }]}
              >
                <Input.Password
                  size="large"
                  prefix={
                    <LockOutlined
                      color="#1890ff"
                      className="site-form-item-icon"
                    />
                  }
                  type="password"
                  placeholder="Нууц үг"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <div className="flex justify-end -mt-2 mb-2">
                <div
                  className="text-end text-blue-600 hover:cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  Нууц үг мартсан?
                </div>
              </div>
              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Modal
        title="Нууц үг солих"
        visible={show}
        onOk={() => {}}
        onCancel={() => setShow(false)}
        okText={""}
      >
        <Input
          placeholder="Утасны дугаар оруулах"
          allowClear
          value={phone}
          maxLength={8}
          onChange={(e) => {
            setphone(e.target.value);
          }}
          prefix={
            <MobileOutlined color="#1890ff" className="site-form-item-icon" />
          }
        />
      </Modal>
    </div>
  );
};

export default Auth;
