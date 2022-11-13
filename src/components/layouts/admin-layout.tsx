import { ApolloProvider } from '@apollo/client';
import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { authed } from '../../apollo-client';

const AdminLayout: FC = function () {
    return (
        <ApolloProvider client={authed}>
            <Layout style={{ height: "100vh" }}>
                <Layout.Content style={{ padding: "24px" }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </ApolloProvider>
    )
};

export default AdminLayout;