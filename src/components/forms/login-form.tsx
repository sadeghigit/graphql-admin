import { useMutation, gql } from '@apollo/client';
import { Button, Divider, Form, Input, notification, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTH_LOGIN_MUTATION = `
mutation($loginInput: LoginInput!) {
  authLogin(loginInput:$loginInput){
    accessToken
    expiresAt
    refreshToken
  }
}
`;

export type Props = {}

const LoginForm: FC<Props> = function (props) {
  const [form] = useForm()
  const navigate = useNavigate()
  const [runLoginAction, loginAction] = useMutation(gql(AUTH_LOGIN_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })


  function onFinish(data: any) {
    console.log(data)
    runLoginAction({
      variables: { loginInput: data },
      onCompleted(data) {
        localStorage.setItem('accessToken', data.authLogin.accessToken)
        localStorage.setItem('expiresAt', data.authLogin.expiresAt)
        localStorage.setItem('refreshToken', data.authLogin.refreshToken)
        navigate('/dashboard')
      }
    })
  }

  return (
    <Spin spinning={loginAction.loading}>
      <h1>Control Panel</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name={'mobile'}
          label="Mobile"
          rules={[
            { required: true , message:" Mobile is required"},
            { pattern: /^09[0-9]{9}$/, message:"Mobile format is required" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={'password'}
          label={"Password"}
          rules={[{ required: true, message:" Password is required" }]}
        >
          <Input.Password />
        </Form.Item>

        <Divider style={{ margin: "30px 0 16px 0" }} />

        <Button htmlType='submit' type='primary' block>
          Login
        </Button>

      </Form>
    </Spin>
  )
};

export default LoginForm;