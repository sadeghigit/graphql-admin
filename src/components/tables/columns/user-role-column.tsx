import { Tag } from 'antd';
import { FC } from 'react';
import { roleLabel } from '../../forms/inputs/role-select';

export type Props = { value: any }

const UserRoleColumn: FC<Props> = function (props) {
  let color = ""
  let text = props.value
  
  switch (props.value) {
    case "ADMIN": color = "red"; text = roleLabel("ADMIN"); break
    case "USER": color = "blue"; text =  roleLabel("USER"); break
  }

  return (
    <div>
      <Tag color={color} >{text}</Tag>
    </div>
  )
};

export default UserRoleColumn;