import { FC } from 'react';
import *  as Icons from '@ant-design/icons';

export type Props = {
  onClick: () => void,
}

const UpdateAction: FC<Props> = function (props) {
  return (
    <Icons.EditTwoTone
      onClick={props.onClick}
      style={{ fontSize: "18px" }}
      title="Update"
    />
  )
};

export default UpdateAction;
