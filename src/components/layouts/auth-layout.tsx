import { ApolloProvider } from '@apollo/client';
import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { guest } from '../../apollo-client';

const AuthLayout: FC = function () {
    return (
        <ApolloProvider client={guest}>
            <Layout style={{ height: "100vh" }}>
                <Layout.Content style={{ padding: "24px" }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </ApolloProvider>
    )
};

export default AuthLayout;