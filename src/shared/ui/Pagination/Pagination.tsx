import { clsx } from 'clsx'
import { useTranslation } from 'next-i18next'
import { ArrowBack, ArrowForward } from 'shared/assets/icons'
import { Select, SelectProps } from 'shared/ui/Select/Select'

import cls from './Pagination.module.scss'
import { DOTS, usePagination } from './hooks/usePagination'

type PaginationProps = {
  currentPage: number
  onChangePage: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
} & SelectProps

export const Pagination = ({
  className,
  currentPage,
  onChangePage,
  pageSize,
  siblingCount = 1,
  totalCount,
  ...restProps
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  const { t } = useTranslation()
  const onNextHandler = () => {
    onChangePage(currentPage + 1)
  }

  const onPreviousHandler = () => {
    onChangePage(currentPage - 1)
  }

  const changePageHandler = (pageNumber: number) => () => onChangePage(pageNumber)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === paginationRange[paginationRange.length - 1]

  const classNames = {
    buttonLeft: clsx(cls.item, { [cls.disabled]: isFirstPage }),
    buttonRight: clsx(cls.item, { [cls.disabled]: isLastPage }),
    container: clsx(cls.container, className),
    dots: clsx(cls.item, cls.dots),
  }

  return (
    <div className={classNames.container}>
      <button className={classNames.buttonLeft} disabled={isFirstPage} onClick={onPreviousHandler}>
        <ArrowBack />
      </button>
      {paginationRange.map((pageNumber, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <span className={classNames.dots} key={i}>
              &#8230;
            </span>
          )
        }

        // Render our Page Pills
        return (
          <button
            className={clsx(cls.item, pageNumber === currentPage && cls.selected)}
            key={i}
            onClick={changePageHandler(pageNumber)}
          >
            <span className={clsx(cls.item, pageNumber === currentPage && cls.selected)}>
              {pageNumber}
            </span>
          </button>
        )
      })}
      <button className={classNames.buttonRight} disabled={isLastPage} onClick={onNextHandler}>
        <ArrowForward />
      </button>
      <div className={cls.selectContainer}>
        {t('show')}
        <div className={cls.selectWrapper}>
          <Select
            {...restProps}
            buttonClassName={cls.selectButton}
            className={cls.select}
            optionClassName={cls.selectOption}
          />
        </div>
        {t('onPage')}
      </div>
    </div>
  )
}
