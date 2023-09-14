import { Input, Modal, Typography } from "antd";
import { Form, Formik } from "formik";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import * as Yup from "yup";
import useTodoAction from "../hooks/useTodoAction";
import { getErrorMessage } from "../../utils";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
});

const CreateTodoModal = forwardRef(({ alertMessageRef }, ref) => {
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { createTodo } = useTodoAction();
  const formRef = useRef();
  useImperativeHandle(
    ref,
    () => {
      return {
        show() {
          setShow(true);
        },
        close() {
          setShow(false);
        },
      };
    },
    []
  );
  return (
    <Modal
      title="Create Todo"
      open={show}
      onOk={() => {
        formRef.current.submitForm();
      }}
      onCancel={() => {
        setShow(false);
        formRef.current.resetForm();
      }}
      confirmLoading={submitting}
      okText="Create"
    >
      <div>
        <Formik
          innerRef={formRef}
          initialValues={{
            title: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              setSubmitting(true);
              await createTodo(values);
              setShow(false);
              setSubmitting(false);
              actions.resetForm();
              alertMessageRef.current.success({
                message: "Create Todo Successfully",
              });
            } catch (error) {
              setSubmitting(false);
              const message = getErrorMessage(error);
              alertMessageRef.current.success({ message });
            }
          }}
        >
          {(form) => {
            const { errors, touched } = form;
            return (
              <Form>
                <div className="mb-3">
                  <Input
                    value={form.values.title}
                    onChange={(e) => {
                      form.setFieldValue("title", e.target.value);
                    }}
                    onBlur={() => {
                      form.setFieldTouched("title");
                    }}
                    placeholder="Title"
                  />
                  {touched.title && errors.title ? (
                    <Typography.Text type="danger">
                      {errors.title}
                    </Typography.Text>
                  ) : null}
                </div>
                <Input.TextArea
                  value={form.values.description}
                  onChange={(e) => {
                    form.setFieldValue("description", e.target.value);
                  }}
                  rows={4}
                  placeholder="Description"
                  className="mb-1"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
});

export default CreateTodoModal;
