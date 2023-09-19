import { get } from 'lodash'
import React from 'react'
import cls from './styles.module.scss'

interface ColumnType<T> {
    field: string
    title: string
}

interface PropsType<T> {
    data: T[]
    columns: Array<ColumnType<T>>
}

export const Table = <T,>({ data, columns }: PropsType<T>) => (
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
                <tr key={`table-body-${itemIndex}`} className={cls.tableRowItem}>
                    {columns.map((column, columnIndex) => {
                        const value = get(item, column.field)

                        return <td key={`table-row-cell-${columnIndex}`}
                                   className={cls.tableCell}>
                            {value || '-'}
                        </td>
                    })}
                </tr>
            ))}
        </tbody>
    </table>
)
