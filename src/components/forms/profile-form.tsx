import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button, Divider, Form, Input, notification, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, useEffect } from 'react';

const UPDATE_PROFILE_MUTATION = `
mutation($updateProfileInput: UpdateProfileInput!) {
  updateProfile( updateProfileInput: $updateProfileInput)
}
`

const LOAD_FORM_QUERY = `
 query {
  getProfile {
    name
  }
 }
`

export type Props = {
  onSave: () => void
}

const ProfileForm: FC<Props> = function (props) {
  const [form] = useForm()

  const [runUpdateProfileMutation, updateProfileMutation] = useMutation(gql(UPDATE_PROFILE_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  const [runLoadFormQuery, loadFormQuery] = useLazyQuery(gql(LOAD_FORM_QUERY), {
    onError() { notification.error({ message: "Error" }) }
  })

  useEffect(() => {
    runLoadFormQuery({
      onCompleted(data) { form.setFieldsValue(data.getProfile) }
    })
  }, [])

  function onSave(data: any) {
    runUpdateProfileMutation({
      variables: { updateProfileInput: data },
      onCompleted(data) { props.onSave() }
    })
  }

  return (
    <Spin spinning={
      updateProfileMutation.loading
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

export default ProfileForm;