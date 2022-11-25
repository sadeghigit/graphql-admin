import { FC, useEffect } from 'react';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { Button, Input } from 'antd';

const TextFilter: FC<FilterDropdownProps> = function (props) {
  useEffect(() => {
    if (!props.visible) props.confirm()
  }, [props.visible])

  return (
    <div>
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search"
          value={props.selectedKeys[0]}
          onChange={(e) => {
            const selectedKeys = e.target.value ? [e.target.value] : []
            props.setSelectedKeys(selectedKeys)
          }}
          onPressEnter={() => { props.confirm() }}
          style={{ display: 'block' }}
        />
      </div>
      <div className='ant-table-filter-dropdown-btns'>
        <Button
          onClick={props.clearFilters}
          size="small"
          type='link'
          disabled={props.selectedKeys.length === 0}
        >
          Reset
        </Button>
        <Button
          type="primary"
          onClick={() => { props.confirm() }}
          size="small"
        >
          Ok
        </Button>
      </div>
    </div>
  )
};

export default TextFilter;