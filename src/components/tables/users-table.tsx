import { useQuery, gql } from '@apollo/client';
import { Card, notification, Space, Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { FilterValue, SorterResult, SortOrder } from 'antd/lib/table/interface';
import { FC, useEffect, useState } from 'react';
import UpdateAction from './actions/update-action';
import RemoveAction from './actions/remove-action';
import TextFilter from './filters/text-filter';
import UserRoleColumn from './columns/user-role-column';
import { roleLabel } from '../forms/inputs/role-select';

export type Props = {
  onUpdateClick: (id: string) => void
  onRemoveClick: (id: string) => void
  refresh: number
}

const USERS_PAGINATION_QUERY = `
query($searchUserInput: SearchUserInput!, $paginateInput: PaginateInput!) {
  total: getUsersCount(searchUserInput: $searchUserInput)
  dataSource: getUsers(
    paginateInput: $paginateInput
    searchUserInput: $searchUserInput
  ) {
    id
    mobile
    role
    name
  }
}
`

const UsersTable: FC<Props> = function (props) {
  const [total, setTotal] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [sortDir, setSortDir] = useState("desc")
  const [sort, setSort] = useState("mobile")
  const [search, setSearch] = useState({})

  const usersQuery = useQuery(
    gql(USERS_PAGINATION_QUERY), {
    variables: { paginateInput: { page, perPage, sort, sortDir }, searchUserInput: search },
    fetchPolicy: 'network-only',
    onError() { notification.error({ message: "Error" }) }
  })

  useEffect(() => {
    if (props.refresh !== 0) usersQuery.refetch()
  }, [props.refresh])

  useEffect(() => {
    if (usersQuery.data) {
      setTotal(usersQuery.data.total)
      setDataSource(usersQuery.data.dataSource)

      if ((page - 1) * perPage === usersQuery.data.total)
        if (page > 1) setPage(page - 1)
    }
  }, [usersQuery.data])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    sorter = sorter as SorterResult<any>

    setPage(pagination.current as number)
    if (perPage !== pagination.pageSize) setPage(1)
    if (sort !== sorter.field) setPage(1)
    if (sorter.order !== sortDir + "end") setPage(1)

    setSort(sorter.field as string)
    setSortDir(sorter.order === "ascend" ? "asc" : "desc")
    setPerPage(pagination.pageSize as number)

    const search: any = {}
    if (filters.createdAt) search.createdAt = filters.createdAt
    if (filters.updatedAt) search.updatedAt = filters.updatedAt
    if (filters.name) search.name = filters.name[0]
    if (filters.mobile) search.mobile = filters.mobile[0]
    if (filters.role) search.role = filters.role
    setSearch({ ...search })

    usersQuery.refetch()
  };

  function sortOrder(dataIndex: string): SortOrder | undefined {
    if (sort !== dataIndex) return undefined
    return sortDir === "desc" ? "descend" : "ascend"
  }

  return (
    <Card bodyStyle={{ padding: "0" }}>
      <Table
        loading={usersQuery.loading}
        dataSource={dataSource}
        columns={[
          {
            sorter: true,
            sortOrder: sortOrder("mobile"),
            title: "Mobile",
            dataIndex: "mobile",
            filterDropdown: TextFilter,
            width: 150,
          },
          {
            sorter: true,
            sortOrder: sortOrder("name"),
            title: "Name",
            dataIndex: "name",
            filterDropdown: TextFilter,
          },
          {
            sorter: true,
            sortOrder: sortOrder("role"),
            title: "Role",
            dataIndex: "role",
            filters: [
              { text: roleLabel("USER"), value: "USER" },
              { text: roleLabel("ADMIN"), value: "ADMIN" },
            ],
            width: 110,
            render(value) {
              return <UserRoleColumn value={value} />
            }
          },
          {
            title: "Action",
            dataIndex: "id",
            width: 90,
            fixed: "right",
            render(value) {
              return (
                <Space>
                  <UpdateAction onClick={() => props.onUpdateClick(value)} />
                  <RemoveAction onClick={() => props.onRemoveClick(value)} />
                </Space>
              )
            }
          },
        ]
        }
        sortDirections={['ascend', 'descend', 'ascend']}
        pagination={{
          style: { paddingRight: "16px" },
          showTotal: (total, range) => `${total} Users`,
          current: page,
          pageSize: perPage,
          total: total,
          pageSizeOptions: [10, 20, 30, 40, 50]
        }}
        rowKey={'id'}
        onChange={handleTableChange}
        scroll={{ x: 400 }}
      />
    </Card>
  )
};

export default UsersTable;