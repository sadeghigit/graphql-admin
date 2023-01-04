import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button, Divider, Form, Input, notification, Spin, Upload, UploadFile } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, useEffect, useState } from 'react';
import *  as Icons from '@ant-design/icons';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { apiUrl } from '../../apollo-client';

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

const UPLOAD_MUTATION = `
mutation($uploadinput: UploadInput!) {
  upload(uploadInput: $uploadinput) {
    link
  }
}
`;


export type Props = {
  onSave: () => void
}

const ProfileForm: FC<Props> = function (props) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] = useForm()

  const [runUpdateProfileMutation, updateProfileMutation] = useMutation(gql(UPDATE_PROFILE_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })

  const [runLoadFormQuery, loadFormQuery] = useLazyQuery(gql(LOAD_FORM_QUERY), {
    onError() { notification.error({ message: "Error" }) }
  })

  const [runUploadMutation, uploadMutation] = useMutation(gql(UPLOAD_MUTATION), {
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

  function uploadRequest(options: UploadRequestOption) {
    runUploadMutation({
      variables: { uploadinput: { file: options.file } },
      onCompleted(data) {
        setFileList([...fileList, {
          uid: data.upload.link,
          name: data.upload.link,
          status: 'done',
          url: apiUrl+data.upload.link,
        }])
        if (options.onSuccess) options.onSuccess(data.upload)
      }
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

        {/* <Form.Item
          name={'avatar'}
          label="Avatar"
        >
       
        </Form.Item> */}
        <Upload
          name='file'
          customRequest={uploadRequest}
          defaultFileList={[]}
          fileList={fileList}
        >
          <Button icon={<Icons.UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Divider style={{ margin: "30px 0 16px 0" }} />
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