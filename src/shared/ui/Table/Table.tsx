import clsx from 'clsx'
import { Property } from 'csstype'
import { get } from 'lodash'

import cls from './styles.module.scss'

export interface ColumnType {
  field: string
  onClick?: (column: string) => void
  textAlign?: Property.TextAlign
  title: string
  width?: Property.Width
}

interface PropsType<T> {
  columns: Array<ColumnType>
  data: T[]
}

export const Table = <T,>({ columns, data }: PropsType<T>) => (
  <table className={cls.wrapper}>
    <thead className={cls.head}>
      <tr>
        {columns.map((column, columnIndex) => (
          <th
            className={cls.tableHeaderCell}
            key={`table-head-cell-${columnIndex}`}
            onClick={() => {
              column.onClick && column.onClick(column.field)
            }}
            style={{ width: column.width }}
          >
            {column.title}
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
