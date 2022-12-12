import { Button, Card, Col, PageHeader, Row, Space } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const DashoardRoute: FC = function () {
  return (<div>
    <PageHeader
      title="Dashboard"
      extra={[
        <Button key="viewProfile"><Link to={"/profile"}>View Profile</Link></Button>,
      ]}
    />
    <div style={{ padding: "0 24px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <Card title="Users" bodyStyle={{ textAlign: "right" }}>
            <Space>
              <Button type='primary'>
                <Link to={"/users"}> Show</Link>
              </Button>
            </Space>
          </Card>
        </Col>


      </Row>
    </div>
  </div>)
};

export default DashoardRoute;