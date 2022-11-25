import { FC, useState } from 'react';
import { Card } from 'antd';
import Reset1Form from '../forms/reset1-form';
import Reset2Form from '../forms/reset2-form';

const ResetRoute: FC = function () {
  const [mobile, setMobile] = useState<string>()
  const [expiresAt, setExpiresAt] = useState<Date>()

  function onReset(mobile: string, expiresAt: Date) {
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
        {mobile && expiresAt && <Reset2Form expiresAt={expiresAt} mobile={mobile} />}
        {!mobile && <Reset1Form onReset={onReset} />}
      </Card>
    </div>
  )
};

export default ResetRoute;