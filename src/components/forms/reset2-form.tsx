import { useMutation, gql } from '@apollo/client';
import { Button, Divider, Form, Input, notification, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTH_RESET2_MUTATION = `
mutation($reset2Input: Reset2Input!) {
  authReset2(reset2Input: $reset2Input) {
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

const Reset2Form: FC<Props> = function (props) {
  const [form] = useForm()
  const navigate = useNavigate()
  const [runReset2Action, reset2Action] = useMutation(gql(AUTH_RESET2_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  function onFinish(data: any) {
    console.log(data)
    runReset2Action({
      variables: { reset2Input: data },
      onCompleted(data) {
        localStorage.setItem('accessToken', data.authReset2.accessToken)
        localStorage.setItem('expiresAt', data.authReset2.expiresAt)
        localStorage.setItem('refreshToken', data.authReset2.refreshToken)
        navigate('/dashboard')
      }
    })
  }

  useEffect(() => {
    form.setFieldValue('mobile', props.mobile)
  }, [props.mobile])

  return (
    <Spin spinning={reset2Action.loading}>
      <h1>Reset Step 2</h1>
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
          name={'resetOtp'}
          label={"Reset Otp"}
          rules={[{ required: true, message: "Reset Otp is required" }]}
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
          Login
        </Button>

      </Form>
    </Spin>
  )
};

export default Reset2Form;