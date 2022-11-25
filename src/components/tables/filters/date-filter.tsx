import { FC, useEffect, useState } from 'react';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { Button } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import moment, { Moment } from 'moment-jalaali';
import "moment/locale/fa";
import DatePicker from '../../jalali/date-picker';

const DateFilter: FC<FilterDropdownProps> = function (props) {
  const [value, setValue] = useState<RangeValue<Moment>>(null)

  useEffect(() => {
    if (props.visible) return;

    if (!value && props.selectedKeys.length !== 0) {
      props.setSelectedKeys([])
      props.confirm()
    }

    if (value && value[0] && value[1]) {
      props.setSelectedKeys([
        value[0].startOf('day').toISOString(),
        value[1].endOf('day').toISOString()]
      )
      props.confirm()
    }

  }, [props.visible])

  function onOk() {
    if (value && value[0] && value[1]) {
      props.setSelectedKeys([
        value[0].startOf('day').toISOString(),
        value[1].endOf('day').toISOString()]
      )
      props.confirm()
    } else {
      props.setSelectedKeys([])
      props.confirm()
    }
  }

  return (
    <div>
      <div style={{ padding: 8 }}>
        <DatePicker.RangePicker
          allowClear={false}
          value={value}
          onChange={setValue}
          ranges={{
            'Today': [moment(), moment()],
            'This month': [moment().startOf('jMonth'), moment().endOf('jMonth')],
            'This week': [moment().startOf('week'), moment().endOf('week')],
          }}
        />
      </div>
      <div className='ant-table-filter-dropdown-btns'>
        <Button
          onClick={() => setValue(null)}
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
          Ok+
        </Button>
      </div>
    </div>
  )
};

export default DateFilter;