import { useMutation, gql } from '@apollo/client';
import { Button, Divider, Form, Input, notification, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTH_REGISTER2_MUTATION = `
mutation($register2Input: Register2Input!) {
  authRegister2(register2Input: $register2Input) {
    accessToken
    expiresAt
    refreshToken
  }
}
`;

export type Props = {
  mobile: string,
  expiresAt: Date
}

const Register2Form: FC<Props> = function (props) {
  const [form] = useForm()
  const navigate = useNavigate()
  const [runRegister2Action, register2Action] = useMutation(gql(AUTH_REGISTER2_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  function onFinish(data: any) {
    console.log(data)
    runRegister2Action({
      variables: { register2Input: data },
      onCompleted(data) {
        localStorage.setItem('accessToken', data.authRegister2.accessToken)
        localStorage.setItem('expiresAt', data.authRegister2.expiresAt)
        localStorage.setItem('refreshToken', data.authRegister2.refreshToken)
        navigate('/dashboard')
      }
    })
  }

  useEffect(() => {
    form.setFieldValue('mobile', props.mobile)
  }, [props.mobile])

  return (
    <Spin spinning={register2Action.loading}>
      <h1>Register Step 2</h1>
      <Form form={form} layout="vertical" onFinish={onFinish} >
        <Form.Item
          name={'mobile'}
          label="Mobile"
          rules={[
            { required: true, message: "Mobile is required" },
            { pattern: /^09[0-9]{9}$/, message: "Mobile format is invalid" }
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name={'registerOtp'}
          label={"Register Otp"}
          rules={[{ required: true, message: "Register Otp is required" }]}
        >
          <Input />
        </Form.Item>

        <Divider style={{ margin: "30px 0 16px 0" }} />

        <Button htmlType='submit' type='primary' block>
          Login
        </Button>

      </Form>
    </Spin>
  )
};

export default Register2Form;