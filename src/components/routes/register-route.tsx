import { FC, useState } from 'react';
import { Card } from 'antd';
import Register1Form from '../forms/register1-form';
import Register2Form from '../forms/register2-form';

const RegisterRoute: FC = function () {
  const [mobile, setMobile] = useState<string>()
  const [expiresAt, setExpiresAt] = useState<Date>()

  function onRegister(mobile: string, expiresAt: Date) {
    setMobile(mobile)
    setExpiresAt(expiresAt)
  }

  return (
    <div>
      <Card
        style={{
          width: "400px",
          margin: "10% auto"
        }}
      >
        {mobile && expiresAt && <Register2Form expiresAt={expiresAt} mobile={mobile} />}
        {!mobile && <Register1Form onRegister={onRegister} />}
      </Card>
    </div>
  )
};

export default RegisterRoute;