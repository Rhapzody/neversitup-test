import React, { useRef, useState } from "react";
import { Input, Button, Typography } from "antd";
import { Form, Formik } from "formik";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import * as Yup from "yup";
import Layout from "../layout/Layout";
import { login } from "../../utils/auth";
import { getErrorMessage } from "../../utils";
import AlertMessage from "../general/AlertMessage";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function LoginPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const alertRef = useRef();
  const navigate = useNavigate();
  return (
    <Layout>
      <Typography.Title level={3} className="text-center">
        <OrderedListOutlined className="me-2" />
        Todo App
      </Typography.Title>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            setIsLoading(true);
            await login(values);
            setIsLoading(false);
            navigate("/");
          } catch (error) {
            setIsLoading(false);
            const message = getErrorMessage(error);
            alertRef.current.error({ message });
          }
        }}
      >
        {({
          values,
          touched,
          handleSubmit,
          errors,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <div className="mb-3">
                <Input
                  value={values.username}
                  onChange={(e) => {
                    setFieldValue("username", e.target.value);
                  }}
                  onBlur={() => {
                    setFieldTouched("username", true);
                  }}
                  placeholder="Username"
                  prefix={<UserOutlined />}
                  className="w-100"
                />
                {touched.username && errors.username ? (
                  <Typography.Text type="danger">
                    {errors.username}
                  </Typography.Text>
                ) : null}
              </div>

              <div className="mb-3">
                <Input.Password
                  value={values.password}
                  onChange={(e) => {
                    setFieldValue("password", e.target.value);
                  }}
                  onBlur={() => {
                    setFieldTouched("password", true);
                  }}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {touched.password && errors.password ? (
                  <Typography.Text type="danger">
                    {errors.password}
                  </Typography.Text>
                ) : null}
              </div>

              <div className="d-flex flex-column justify-content-center mt-5 mb-2">
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={handleSubmit}
                  loading={isLoading}
                >
                  Login
                </Button>
              </div>

              <div className="d-flex justify-content-center">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://nevers-todo-register.firebaseapp.com/"
                >
                  Create account
                </a>
              </div>
            </Form>
          );
        }}
      </Formik>

      <AlertMessage ref={alertRef} />
    </Layout>
  );
}
export default LoginPage;
