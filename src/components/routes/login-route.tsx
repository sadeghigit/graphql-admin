import { FC } from 'react';
import { Card } from 'antd';
import LoginForm from '../forms/login-form';

const LoginRoute: FC = function () {
  return (
    <div>
      <Card
        style={{
          width: "400px",
          margin: "10% auto"
        }}
      >
        <LoginForm />
      </Card>
    </div>
  )
};

export default LoginRoute;