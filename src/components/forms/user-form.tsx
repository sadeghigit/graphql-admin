import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button, Col, Divider, Form, Input, notification, Row, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, useEffect } from 'react';
import RoleSelect from './inputs/role-select';

const CREATE_USER_MUTATION = `
mutation($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
  }
}
`

const UPDATE_USER_MUTATION = `
mutation($id: ID!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $id, updateUserInput: $updateUserInput)
}
`

const LOAD_FORM_QUERY = `
query($id: ID!) {
  getUser(id: $id) {
    mobile
    role
    name
  }
}
`

export type Props = {
  userId: string | null
  onSave: () => void
}

const UserForm: FC<Props> = function (props) {
  const [form] = useForm()

  const [runCreateUserMutation, createUserMutation] = useMutation(gql(CREATE_USER_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  const [runUpdateUserMutation, updateUserMutation] = useMutation(gql(UPDATE_USER_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  const [runLoadFormQuery, loadFormQuery] = useLazyQuery(gql(LOAD_FORM_QUERY), {
    onError() { notification.error({ message: "Error" }) }
  })

  useEffect(() => {
    if (!props.userId) return
    runLoadFormQuery({
      variables: { id: props.userId },
      onCompleted(data) { form.setFieldsValue(data.getUser) }
    })
  }, [props.userId])

  function onUpdate(id: string, updateUserInput: any) {
    runUpdateUserMutation({
      variables: { id, updateUserInput },
      onCompleted(data) { props.onSave() }
    })
  }

  function onCreate(createUserInput: any) {
    runCreateUserMutation({
      variables: { createUserInput  },
      onCompleted(data) { props.onSave() }
    })
  }

  function onSave(data: any) {
    if (props.userId) onUpdate(props.userId, data)
    else onCreate(data)
  }

  return (
    <Spin spinning={
      loadFormQuery.loading ||
      createUserMutation.loading ||
      updateUserMutation.loading
    }>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSave}
      >
        <Form.Item
          name={'name'}
          label="Name"
          rules={[
            { required: true, message: "Mobile is required" },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={[16, 0]}>
          <Col xs={12}>
            <Form.Item
              name={'mobile'}
              label="Mobile"
              rules={[
                { required: true, message: "Mobile is required" },
                { pattern: /^09[0-9]{9}$/, message: "Mobile format is invalid" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              name={'role'}
              label="Role"
              rules={[
                { required: true, message: "Mobile is required" },
              ]}
            >
              <RoleSelect />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name={'password'}
          label={"Password"}
          rules={[
            { required: !props.userId, message: "Mobile is required" },
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

export default UserForm;