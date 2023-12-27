import { get } from 'lodash'
import React from 'react'

import cls from './styles.module.scss'

interface ColumnType<T> {
  field: string
  title: string
}

interface PropsType<T> {
  columns: Array<ColumnType<T>>
  data: T[]
}

export const Table = <T,>({ columns, data }: PropsType<T>) => (
  <table className={cls.wrapper}>
    <thead className={cls.head}>
      <tr>
        {columns.map((column, columnIndex) => (
          <th className={cls.tableHeaderCell} key={`table-head-cell-${columnIndex}`}>
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, itemIndex) => (
        <tr className={cls.tableRowItem} key={`table-body-${itemIndex}`}>
          {columns.map((column, columnIndex) => {
            const value = get(item, column.field)

            return (
              <td className={cls.tableCell} key={`table-row-cell-${columnIndex}`}>
                {value || '-'}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  </table>
)
