import { FC, useState } from 'react';
import { Button, Drawer, notification, PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../tables/users-table';
import { gql, useMutation } from '@apollo/client';
import UserForm from '../forms/user-form';

const REMOVE_USER_MUTATION = `
mutation($id: ID!) {
  removeUser(id: $id)
}
`

const UsersRoute: FC = function () {
  const navigate = useNavigate()
  const [removeUserMutation] = useMutation(gql(REMOVE_USER_MUTATION), {
    onError() { notification.error({ message: "Error" }) }
  })
  const [refresh, setRefresh] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  function onUpdateClick(id: string) {
    setUserId(id)
    setOpenDrawer(true)
  }

  function onCreateClick() {
    setUserId(null)
    setOpenDrawer(true)
  }

  function onCloseDrawer() {
    setOpenDrawer(false)
  }

  function onSave() {
    setRefresh(Math.random())
    setOpenDrawer(false)
  }

  function onRemoveClick(id: string) {
    removeUserMutation({
      variables: { id },
      onCompleted() {
        setRefresh(Math.random())
      }
    })
  }

  return (
    <div >
      <PageHeader
        title="Users"
        onBack={() => navigate(-1)}
        extra={[
          <Button onClick={onCreateClick} key="createUser">Create User</Button>
        ]}
      />
      <Drawer
        size='large'
        title={userId ? "Update User" : "Create User"}
        open={openDrawer}
        onClose={onCloseDrawer}
        destroyOnClose={true}
        closable={false}
        maskClosable={false}
        extra={[
          <Button onClick={onCloseDrawer} key="cancel">Cancel</Button>,
        ]}
      >
        <UserForm
          userId={userId}
          onSave={onSave}
        />
      </Drawer>
      <div
        style={{
          padding: "0 24px 16px 24px"
        }}
      >
        <UsersTable
          refresh={refresh}
          onRemoveClick={onRemoveClick}
          onUpdateClick={onUpdateClick}
        />
      </div>
    </div>
  )
};

export default UsersRoute;