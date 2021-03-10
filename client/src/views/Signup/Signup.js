import React from "react";
import { Row, Col, Image, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined,MailOutlined,SmileOutlined } from "@ant-design/icons";
import logo from "../../logo/logo.png";

import { signup } from "../../api/signup";
import { notifyScreen } from "../../utils/notify";

const Signup = ({ history }) => {
  const handleSignup = async (values) => {
    try {
      let username = values.username;
      let password = values.password;
      let email = values.email;
      let name = values.name;
      let res = await signup(username, password, email,name);
      if (res.status === 200) {
        notifyScreen("success", res.data.statusCode, res.data.message);
        return history.push("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          notifyScreen(
            "error",
            error.response.data.statusCode,
            error.response.data.message
          );
        }
      } else {
        notifyScreen("error", "500", "Lỗi không xác định");
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
          <Form name="signup" onFinish={handleSignup}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input
                style={{ width: "250px" }}
                prefix={<SmileOutlined />}
                placeholder="Nhập tên"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input
                style={{ width: "250px" }}
                prefix={<UserOutlined />}
                placeholder="Nhập tài khoản"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input
                style={{ width: "250px" }}
                prefix={<MailOutlined />}
                placeholder="Nhập email"
              />
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
