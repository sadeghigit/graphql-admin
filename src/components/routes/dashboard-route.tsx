import { gql, useLazyQuery } from '@apollo/client';
import { FC, useEffect } from 'react';

const USERS_QUERY = gql`
{
  getUsersCount(searchInput: {})
}
`;

const DashoardRoute: FC = function () {
  const [runUsersQuery, usersQuery] = useLazyQuery(USERS_QUERY);

  useEffect(() => {
    runUsersQuery()
  }, [])

  return (
    <div>
      Users: {usersQuery.data?.getUsersCount}
    </div>
  )
};

export default DashoardRoute;