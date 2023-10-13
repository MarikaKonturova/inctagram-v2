import React, { type FC, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { type PublicationsInPagesResponse } from '../../../../../shared/types/home'
import { Loader } from '../../../../../shared/ui'
import { Publication } from '../../../../../shared/ui/Publication/Publication'
import { useGetHomeData } from '../../model'
import cls from './PublicationCards.module.scss'

export const PublicationCards: FC = () => {
    const {
        data,
        isSuccess,
        fetchNextPage,
        isFetchingNextPage
    } = useGetHomeData()
    // const [currentModal, setCurrentModal] = useState<Values | null>(null)
    // const [postId, setPostId] = useState<number | undefined>(undefined)

    // const { post } = useGetMyPost(postId || 0)
    console.log(data)
    const {
        ref,
        inView
    } = useInView()

    useEffect(() => {
        if (inView) {
            void fetchNextPage()
        }
    }, [inView])

    const renderContent = (page: PublicationsInPagesResponse) => page.items.map((item) => {
        // const onPostCardClick = () => {
        //     openModal(MODALS.GetPostModal)
        //     setPostId(item.id)
        // }

        return (
            <div key={item.id}
                 className={cls.card}
                // onClick={onPostCardClick}
            >
                <Publication
                    createdAt = {item.createdAt}
                    publ = {item}
                    src={item.images[0]?.versions.huge?.url}
                    skeletonWidth={item.images[0]?.versions.huge?.width}
                    skeletonHeight={item.images[0]?.versions.huge?.height}
                    cardWrapperClassName={cls.cardWrapper}
                    alt='post'/>
            </div>
        )
    })

    return (
        <div>
            <div className={cls.cardsList}>
                {data?.pages.map((page) => (
                    page && renderContent(page.data)
                ))}
            </div>

            {isSuccess && (
                <div ref={ref} className={cls.loaderContainer} >
                    {isFetchingNextPage && (
                        <Loader/>
                    )}
                </div>
            )}
        </div>
    )
}
