import { Button, Card, Col, Drawer, PageHeader, Row, Space, Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordForm from '../forms/password-form';
import ProfileForm from '../forms/profile-form';
import SessionsTable from '../tables/sessions-table';

const ProfileRoute: FC = function () {
  const navigate = useNavigate()
  const [refreshSession, setRefreshSession] = useState(Math.random())

  const [openProfileDrawer, setOpenProfileDrawer] = useState(false)
  const [openPasswordDrawer, setOpenPasswordDrawer] = useState(false)

  function onRemoveSessionClick(id: string) {
    // removeSessionMutation({
    //   variables: { id },
    //   onCompleted() {
    //     setRefreshSession(Math.random())
    //   }
    // })
  }

  return (
    <div>

      <Drawer
        title={"Edit Profile"}
        open={openProfileDrawer}
        onClose={() => setOpenProfileDrawer(false)}
        destroyOnClose={true}
        closable={false}
        maskClosable={false}
        extra={[
          <Button onClick={() => setOpenProfileDrawer(false)} key="cancel">Cancel</Button>,
        ]}
      >
        {openProfileDrawer && <ProfileForm
          onSave={() => setOpenProfileDrawer(false)}
        />}
      </Drawer>
      <Drawer
        title={"Change Password"}
        open={openPasswordDrawer}
        onClose={() => setOpenPasswordDrawer(false)}
        destroyOnClose={true}
        closable={false}
        maskClosable={false}
        extra={[
          <Button onClick={() => setOpenPasswordDrawer(false)} key="cancel">Cancel</Button>,
        ]}
      >
        {openPasswordDrawer &&
          <PasswordForm
            onSave={() => setOpenPasswordDrawer(false)}
          />}
      </Drawer>

      <PageHeader
        title="Profile"
        onBack={() => navigate(-1)}
        extra={[
          <Button onClick={() => setOpenProfileDrawer(true)} key="editProfile">Edit Profile</Button>,
          <Button onClick={() => setOpenPasswordDrawer(true)} key="changePassword">Change Password</Button>
        ]}
      />

      <PageHeader title="Sessions" />
      <div
        style={{ padding: "0 24px 16px 24px" }}
      >
        <SessionsTable
          onRemoveClick={onRemoveSessionClick}
          refresh={refreshSession} />
      </div>
    </div>
  )
};

export default ProfileRoute;