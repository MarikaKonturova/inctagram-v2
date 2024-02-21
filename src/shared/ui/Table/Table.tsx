import clsx from 'clsx'
import { Property } from 'csstype'
import { get } from 'lodash'
import { ArrowDown, ArrowUp } from 'shared/assets/icons'
import { SortDirection } from 'shared/types/subscriptions'

import cls from './styles.module.scss'

export interface ColumnType {
  field: string
  textAlign?: Property.TextAlign
  title: string
  width?: Property.Width
}

interface PropsType<T> {
  columns: Array<ColumnType>
  data: T[]
  onSort?: (column: string) => void
  sortBy?: string
  sortDirection?: SortDirection
}

export const Table = <T,>({ columns, data, onSort, sortBy, sortDirection }: PropsType<T>) => (
  <table className={cls.wrapper}>
    <thead className={cls.head}>
      <tr>
        {columns.map((column, columnIndex) => (
          <th
            className={cls.tableHeaderCell}
            key={`table-head-cell-${columnIndex}`}
            onClick={() => {
              onSort && onSort(column.field)
            }}
            style={{ width: column.width }}
          >
            {column.title}
            {sortBy === column.field &&
              (sortDirection === 'asc' ? <ArrowDown /> : sortDirection === 'desc' && <ArrowUp />)}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, itemIndex) => (
        <tr className={clsx(cls.tableRowItem)} key={`table-body-${itemIndex}`}>
          {columns.map((column, columnIndex) => {
            const value = get(item, column.field)

            return (
              <td
                className={cls.tableCell}
                key={`table-row-cell-${columnIndex}`}
                style={{ textAlign: column.textAlign, width: column.width }}
              >
                {value || '-'}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  </table>
)
