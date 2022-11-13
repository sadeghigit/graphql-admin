import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: FC = function () {
    return (
        <Layout style={{ height: "100vh" }}>
            <Layout.Content style={{ padding: "24px" }}>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
};

export default AdminLayout;