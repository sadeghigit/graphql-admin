import { useMutation, gql } from '@apollo/client';
import { Button, Col, Divider, Form, Input, notification, Row, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AUTH_REGISTER1_MUTATION = `
mutation($register1Input: Register1Input!) {
  authRegister1(register1Input: $register1Input) {
    expiresAt
  }
}
`;

export type Props = {
  onRegister:(mobile:string, expiresAt:Date)=>void
}

const Register1Form: FC<Props> = function (props) {
  const [form] = useForm()
  const navigate = useNavigate()
  const [runRegister1Action, register1Action] = useMutation(gql(AUTH_REGISTER1_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  function onFinish(data: any) {
    runRegister1Action({
      variables: { register1Input: data },
      onCompleted({authRegister1}) {
        props.onRegister(data.mobile, new Date(authRegister1.expiresAt))
      }
    })
  }

  return (
    <Spin spinning={register1Action.loading}>
      <h1>Register Step 1</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
          name={'name'}
          label="Name"
          rules={[
            { required: true , message:"Name is required"},
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'mobile'}
          label="Mobile"
          rules={[
            { required: true , message:"Mobile is required"},
            { pattern: /^09[0-9]{9}$/, message:"Mobile format is required" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'password'}
          label={"Password"}
          rules={[{ required: true, message:"Password is required" }]}
        >
          <Input.Password />
        </Form.Item>

        <Divider style={{ margin: "30px 0 16px 0" }} />

        <Button htmlType='submit' type='primary' block>
          Send SMS
        </Button>

      </Form>
      <Row style={{ padding: "10px 0 0 0" }}>
        <Col flex={"auto"}>
          <Link to={'/login'}>Login</Link>
        </Col>
        <Col flex={"none"}>
          <Link to={'/reset'}>Reset Password</Link>
        </Col>
      </Row>
    </Spin>
  )
};

export default Register1Form;