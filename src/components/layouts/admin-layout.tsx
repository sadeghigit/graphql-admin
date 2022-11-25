import { ApolloProvider } from '@apollo/client';
import { Col, Layout, Row } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { authed } from '../../apollo-client';
import AdminLogo from './admin-logo';
import UserMenu from './user-menu';

const AdminLayout: FC = function () {
    return (
        <ApolloProvider client={authed}>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Header style={{ padding: "0px 24px" }} >
                    <Row>
                        <Col flex={"auto"}>
                            <AdminLogo />
                        </Col>
                        <Col flex={'none'}>
                            <UserMenu />
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