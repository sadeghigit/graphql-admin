import { Avatar, Badge, Button, Calendar, Drawer, Modal, notification, Space } from 'antd';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from '@ant-design/icons'
import LogoutAction from './logout-action';
import { gql, useQuery } from '@apollo/client';

const GET_PROFILE_QUERY = `
query {
  getProfile {
    mobile
    name
  }
}
`

const UserMenu: FC = function () {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false)

  const getProfileQuery = useQuery(gql(GET_PROFILE_QUERY), {
    onError() { notification.error({ message: "Error" }) }
  })

  return (
    <div>
      <Badge >
        <Avatar
          onClick={() => setOpenDrawer(true)}
          shape="square"
          icon={<Icons.UserOutlined />}
        />
      </Badge>

      <Drawer
        headerStyle={{
          padding: " 10px 16px 10px 16px"
        }}
        bodyStyle={{
          padding: "0 8px",

        }}
        title={
          <Space>
            <Avatar
              shape="square"
              icon={<Icons.UserOutlined />} />
            <div style={{ fontSize: "11pt" }}>
              <div>{getProfileQuery.data?.getProfile.name}</div>
              <div style={{
                color: "#999999"
              }}>{getProfileQuery.data?.getProfile.mobile}</div>
            </div>
          </Space>
        }
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        destroyOnClose={true}
        closable={false}
        maskClosable={true}
        extra={[
          <LogoutAction key={'logout'} />,
        ]}
      >
        <div style={{ height: "calc(100% - 340px)" }}></div>
        <Calendar
          fullscreen={false}

        />

      </Drawer>
    </div>
  )
};

export default UserMenu;