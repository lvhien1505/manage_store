import React from "react";
import { Row, Col, Image, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../logo/logo.png";

import { login } from "../../api/login";
import { notifyScreen } from "../../utils/notify";

const Login = ({history}) => {

  const handleLogin = async (values) => {
    try {
      let username = values.username;
      let password = values.password;
      let res = await login(username, password);
      if (res.status === 200) {
        notifyScreen("success", res.data.statusCode, res.data.message);
        return history.push("/")
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          notifyScreen("error",error.response.data.statusCode,error.response.data.message)
        }
      }else{
        notifyScreen("error","500","Lỗi không xác định")
      }
    }
  };

  return (
    <div>
      <Row
        style={{
          width: "250px",
          margin: "0 auto",
        }}
      >
        <Col>
          <Image src={logo} preview={false} width="250px" height="250px" />
        </Col>
      </Row>
      <Row style={{ width: "250px", margin: "0 auto" }}>
        <Col>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input style={{ width: "250px" }} prefix={<UserOutlined />} placeholder="Nhập tài khoản"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                style={{ width: "250px" }}
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
            <Form.Item  name="remember" valuePropName="checked" >
              <Checkbox >Nhớ mật khẩu</Checkbox>
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" style={{float:"right"}}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
