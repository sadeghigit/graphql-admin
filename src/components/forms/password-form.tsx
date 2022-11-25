import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button, Col, Divider, Form, Input, notification, Row, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, useEffect } from 'react';
import RoleSelect from './inputs/role-select';

const CHANGE_PASSWORD_MUTATION = `
mutation($updatePasswordInput: UpdatePasswordInput!) {
  updatePassword(updatePasswordInput: $updatePasswordInput)
}
`
export type Props = {
  onSave: () => void
}

const PasswordForm: FC<Props> = function (props) {
  const [form] = useForm()

  const [runChangePasswordMutation, updatePasswordMutation] = useMutation(gql(CHANGE_PASSWORD_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  function onSave(data: any) {
    runChangePasswordMutation({
      variables: { updatePasswordInput: data },
      onCompleted(data) { props.onSave() }
    })
  }

  return (
    <Spin spinning={updatePasswordMutation.loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSave}
      >

        <Form.Item
          name={'oldPassword'}
          label={"Old Password"}
          rules={[
            { required: true, message: "Old Password is required" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name={'newPassword'}
          label={"New Password"}
          rules={[
            { required: true, message: "New Password is required" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Divider
          style={{
            margin: "30px 0 16px 0"
          }}
        />
        <Button
          htmlType='submit'
          type='primary'
        >
          Save
        </Button>
      </Form>
    </Spin>
  )
};

export default PasswordForm;