import { FC, useEffect, useState } from 'react';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { Button, InputNumber } from 'antd';
import { valueType } from 'antd/lib/statistic/utils';

const RangeFilter: FC<FilterDropdownProps> = function (props) {
  const [value, setValue] = useState<valueType[]>([])

  useEffect(() => {
    if (props.visible) return;

    if (value.length === 0 && props.selectedKeys.length !== 0) {
      props.setSelectedKeys([])
      props.confirm()
    }

    if (value.length !== 0 && value[0] && value[1]) {
      props.setSelectedKeys(value)
      props.confirm()
    }

  }, [props.visible])

  function onOk() {
    if (value && value[0] && value[1]) {
      props.setSelectedKeys(value)
      props.confirm()
    } else {
      props.setSelectedKeys([])
      props.confirm()
    }
  }

  return (
    <div>
      <div style={{ padding: 8 }}>
        <InputNumber style={{ width: "100%", marginBottom: "8px" }} placeholder="Min"
          value={value[0]}
          onChange={(val) => {
            if (val) setValue([val, value[1]])
          }} />
        <InputNumber style={{ width: "100%" }} placeholder="Max"
          value={value[1]}
          onChange={(val) => {
            if (val) setValue([value[0], val])
          }} />
      </div>
      <div className='ant-table-filter-dropdown-btns'>
        <Button
          onClick={() => setValue([])}
          size="small"
          type='link'
          disabled={!value}
        >
          Reset
        </Button>
        <Button
          type="primary"
          onClick={onOk}
          size="small"
        >
          Ok
        </Button>
      </div>
    </div>
  )
};

export default RangeFilter;