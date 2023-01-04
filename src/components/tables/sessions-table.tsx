import { useQuery, gql } from '@apollo/client';
import { Card, notification, Space, Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { FilterValue, SorterResult, SortOrder } from 'antd/lib/table/interface';
import { FC, useEffect, useState } from 'react';
import RemoveAction from './actions/remove-action';
import DateFilter from './filters/date-filter';

export type Props = {
  onRemoveClick: (id: string) => void
  refresh: number
}

const SESSIONS_PAGINATION_QUERY = `
query($searchInput: SearchSessionInput!) {
  total: getSessionsCount(searchInput: $searchInput)
  dataSource: getSessions(searchInput: $searchInput) {
    id
    createdAt
  }
}
`

const SessionsTable: FC<Props> = function (props) {
  const [total, setTotal] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [sortDir, setSortDir] = useState("desc")
  const [sort, setSort] = useState("mobile")
  const [search, setSearch] = useState({})

  const sessionsQuery = useQuery(
    gql(SESSIONS_PAGINATION_QUERY), {
    variables: { searchInput: search },
    fetchPolicy: 'network-only',
    onError() { notification.error({ message: "Error" }) }
  })

  useEffect(() => {
    if (props.refresh !== 0) sessionsQuery.refetch()
  }, [props.refresh])

  useEffect(() => {
    if (sessionsQuery.data) {
      setTotal(sessionsQuery.data.total)
      setDataSource(sessionsQuery.data.dataSource)

      if ((page - 1) * perPage === sessionsQuery.data.total)
        if (page > 1) setPage(page - 1)
    }
  }, [sessionsQuery.data])

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
    setSearch({ ...search })

    sessionsQuery.refetch()
  };

  function sortOrder(dataIndex: string): SortOrder | undefined {
    if (sort !== dataIndex) return undefined
    return sortDir === "desc" ? "descend" : "ascend"
  }

  return (
    <Card bodyStyle={{ padding: "0" }}>
      <Table
        loading={sessionsQuery.loading}
        dataSource={dataSource}
        columns={[
          {
            sorter: true,
            sortOrder: sortOrder("createdAt"),
            title: "Created",
            dataIndex: "createdAt",
            filterDropdown: DateFilter,
          },
          {
            title: "Action",
            dataIndex: "id",
            width: 90,
            fixed: "right",
            render(value) {
              return (
                <Space>
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
          showTotal: (total, range) => `${total} Sessions`,
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

export default SessionsTable;