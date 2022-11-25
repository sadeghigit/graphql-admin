import { useMutation, gql } from '@apollo/client';
import { Button, Col, Divider, Form, Input, notification, Row, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AUTH_RESET1_MUTATION = `
mutation($reset1Input: Reset1Input!) {
  authReset1(reset1Input: $reset1Input) {
    expiresAt
  }
}
`;

export type Props = {
  onReset: (mobile: string, expiresAt: Date) => void
}

const Reset1Form: FC<Props> = function (props) {
  const [form] = useForm()
  const navigate = useNavigate()
  const [runReset1Action, reset1Action] = useMutation(gql(AUTH_RESET1_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  function onFinish(data: any) {
    runReset1Action({
      variables: { reset1Input: data },
      onCompleted({ authReset1 }) {
        props.onReset(data.mobile, new Date(authReset1.expiresAt))
      }
    })
  }

  return (
    <Spin spinning={reset1Action.loading}>
      <h1>Reset Step 1</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name={'mobile'}
          label="Mobile"
          rules={[
            { required: true, message: "Mobile is required" },
            { pattern: /^09[0-9]{9}$/, message: "Mobile format is required" }
          ]}
        >
          <Input />
        </Form.Item>
        
        <Divider style={{ margin: "30px 0 16px 0" }} />

        <Button htmlType='submit' type='primary' block>
          Send SMS
        </Button>

      </Form>
      <Row style={{ padding: "10px 0 0 0" }}>
        <Col flex={"auto"}>
          <Link to={'/register'}>Register</Link>
        </Col>
        <Col flex={"none"}>
          <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </Spin>
  )
};

export default Reset1Form;