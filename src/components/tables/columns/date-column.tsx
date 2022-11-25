import moment from 'moment-jalaali';
import { FC } from 'react';

export type Props = { value: any, showTime: boolean }

const DateColumn: FC<Props> = function (props) {
  if (!props.value) return <></>

  const m = moment(props.value)
  return (
    <div title={m.fromNow()} style={{ minWidth: "109px", direction: "ltr" }}>
      {m.format(props.showTime ? 'jYYYY/jMM/jDD H:mm' : 'jYYYY/jMM/jDD')}
    </div>
  )
};

export default DateColumn;