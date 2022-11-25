import { Button, Modal } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutAction: FC = function () {
  const navigate = useNavigate();

  function onLogout() {
    Modal.confirm({
      title: "Are you sure you want to log out of your account?",
      onOk() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expiresAt')
        localStorage.removeItem('refreshToken')
        navigate('/login')
      },
      okText: "Logout",
    })
  }

  return <Button onClick={onLogout} type='primary' danger>Logout</Button>
};

export default LogoutAction;
