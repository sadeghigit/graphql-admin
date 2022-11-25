import { useQuery, gql } from '@apollo/client';
import { notification, Select } from 'antd';

import { FC, useEffect, useState } from 'react';

const USERS_OPTIONS = `
  query {
    users( paginateInput: { } searchInput: {}) {
       value:id label:name
    }
  }
`

const UsersSelect: FC<any> = function (props) {
  const [options, setOptions] = useState([])

  const usersQuery = useQuery(gql(USERS_OPTIONS), {
    onError() { notification.error({ message: "Error" }) }
  })

  useEffect(() => {
    if (!usersQuery.data) return;
    setOptions(usersQuery.data.users)
  }, [usersQuery.data])

  return (
    <Select showSearch optionFilterProp="label"  {...props} options={options} />
  )
};

export default UsersSelect;
