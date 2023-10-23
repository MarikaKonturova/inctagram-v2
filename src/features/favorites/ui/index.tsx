import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { PostModalActions } from 'widgets/Post/actions/PostModalActions/PostModalActions'
import { MODALS, type Values } from 'shared/constants/post'
import { type FavoritesType } from 'shared/types/post'
import { Card, Loader } from 'shared/ui'
import { GetCommentaries } from '../../post'
import { useGetMyPost } from '../../profile/getPosts/model'
import { GetPostModal } from '../../profile/getPosts/ui/modals/GetPostModal'
import { useGetProfileData } from '../../profile/getProfileData/model'
import { useGetFavoritesData } from '../model'
import cls from './favorites.module.scss'

const Favorites = () => {
    const { response } = useGetProfileData()
    const userData = response?.data
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
        useGetFavoritesData(response?.data.userName)
    const { ref, inView } = useInView({ threshold: 0.0 })
    const [currentModal, setCurrentModal] = useState<Values | null>(null)
    const [postId, setPostId] = useState<number | undefined>(undefined)
    const { post } = useGetMyPost(postId || 0)

    useEffect(() => {
        if (inView && hasNextPage) {
            void fetchNextPage()
        }
    }, [inView, hasNextPage])

    const openModal = (id: Values) => {
        if (currentModal !== null) {
            closeModal()
        }
        setCurrentModal(id)
    }

    const closeModal = () => {
        setCurrentModal(null)
    }
    const renderContent = (page: FavoritesType) => {
        return page.items.map((item) => {
            const onPostClick = () => {
                openModal(MODALS.GetPostModal)
                setPostId(item.id)
            }

            return (
                <div key={item.id}
                     className={cls.card}
                     onClick={onPostClick}>
                    <Card src={ item.images[0]?.versions.huge?.url}
                          skeletonWidth={item.images[0]?.versions.huge?.width}
                          skeletonHeight={item.images[0]?.versions.huge?.height}
                          cardWrapperClassName={cls.cardWrapper}
                          alt='post' />
                </div>
            )
        })
    }
    return (
        <div className={cls.favoritesPage}>
            <div className={cls.cardsList}>
                {data?.pages.map((page) => (
                    page && renderContent(page)
                ))}
            </div>

            {postId && post && userData &&
                <GetPostModal
                    key={postId}
                    id={MODALS.GetPostModal}
                    post={post}
                    userName={response?.data.userName}
                    isOpen={currentModal === MODALS.GetPostModal}
                    handleClose={closeModal}
                    content={<GetCommentaries key={postId} postId={postId} userData={userData}/>}
                    actionsSlot={<PostModalActions post={post} />} />
            }

            {isSuccess && (
                <div ref={ref} className={cls.loaderContainer}>
                    {isFetchingNextPage && (
                        <Loader/>
                    )}
                </div>
            )}

        </div>
    )
}

export default Favorites
