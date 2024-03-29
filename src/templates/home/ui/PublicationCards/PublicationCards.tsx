import { useGetPublications } from 'entities/Publication'
import React, { type FC, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { type PublicationsResponseType } from 'shared/types/home'
import { Loader } from 'shared/ui'

import { Publication } from '../Publication/Publication'
import cls from './PublicationCards.module.scss'

export const PublicationCards: FC = () => {
  const { data, fetchNextPage, isFetchingNextPage, isSuccess } = useGetPublications()

  const { inView, ref } = useInView()

  useEffect(() => {
    if (inView) {
      void fetchNextPage()
    }
  }, [inView])

  const renderContent = (page: PublicationsResponseType) =>
    page.items.map(item => {
      return (
        <div className={cls.card} key={item.id}>
          <Publication
            alt={'post'}
            cardWrapperClassName={cls.cardWrapper}
            createdAt={item.createdAt}
            publ={item}
            src={item.images[0]?.versions.huge?.url}
          />
        </div>
      )
    })

  return (
    <div>
      <div className={cls.cardsList}>
        {data?.pages.map(page => page && renderContent(page.data))}
      </div>

      {isSuccess && (
        <div className={cls.loaderContainer} ref={ref}>
          {isFetchingNextPage && <Loader />}
        </div>
      )}
    </div>
  )
}
