import { ApolloProvider } from '@apollo/client';
import { Col, Layout, Row } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { authed } from '../../apollo-client';
import LogoutAction from './logout-action';

const AdminLayout: FC = function () {
    return (
        <ApolloProvider client={authed}>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Header style={{ padding: "0px 24px" }} >
                    <Row>
                        <Col flex={"auto"}>
                            <div style={{
                                margin: "16px 0px",
                                display: "inline-block",
                                height: "32px",
                                width: "200px",
                                background: "#dddddd88"
                            }} />
                        </Col>
                        <Col flex={'none'}>
                            <LogoutAction />
                        </Col>
                    </Row>
                </Layout.Header>
                <Layout.Content>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </ApolloProvider>
    )
};

export default AdminLayout;