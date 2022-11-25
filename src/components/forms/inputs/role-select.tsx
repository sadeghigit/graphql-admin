import { Select } from 'antd';
import { FC } from 'react';

export function roleLabel(value: string) {
  if (value === "ADMIN") return "Admin";
  if (value === "USER") return "User";
  return value
}

const RoleSelect: FC<any> = function (props) {
  const options = [
    { label: roleLabel("ADMIN"), value: "ADMIN" },
    { label: roleLabel("USER"), value: "USER" },
  ]
  return (
    <Select  {...props} options={options} />
  )
};

export default RoleSelect;
