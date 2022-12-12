import { Button, Card, Col, Drawer, PageHeader, Row, Space } from 'antd';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordForm from '../forms/password-form';
import ProfileForm from '../forms/profile-form';

const ProfileRoute: FC = function () {
  const navigate = useNavigate()

  const [openProfileDrawer, setOpenProfileDrawer] = useState(false)
  const [openPasswordDrawer, setOpenPasswordDrawer] = useState(false)

  return (<div>
    <PageHeader
      title="Profile"
      onBack={() => navigate(-1)}
      extra={[
        <Button onClick={() => setOpenProfileDrawer(true)} key="createUser">Edit Profile</Button>,
        <Button onClick={() => setOpenPasswordDrawer(true)} key="createUser">Change Password</Button>
      ]}
    />
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
  </div>)
};

export default ProfileRoute;