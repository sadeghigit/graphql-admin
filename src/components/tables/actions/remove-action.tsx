import { FC } from 'react';
import *  as Icons from '@ant-design/icons';
import { Modal } from 'antd';

export type Props = {
  onClick: () => void,
}

const RemoveAction: FC<Props> = function (props) {

  function onClick() {
    Modal.confirm({
      title: "Are you sure you want to remove this item?",
      icon: <Icons.DeleteTwoTone twoToneColor={"red"} />,
      onOk: props.onClick,
      okText: "Remove",
      okButtonProps: { danger: true },
    })
  }

  return (
    <Icons.DeleteTwoTone
      twoToneColor={"red"}
      onClick={onClick}
      style={{ fontSize: "18px" }}
      title="Remove"
    />
  )
};

export default RemoveAction;
