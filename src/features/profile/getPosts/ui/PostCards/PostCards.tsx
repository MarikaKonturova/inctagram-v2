import { useState, type FC, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInView } from 'react-intersection-observer'
import { PostModalActions } from 'widgets/Post/actions/PostModalActions/PostModalActions'
import { MyPostDropdown } from 'widgets/Post/dropdowns/MyPostDropdown/MyPostDropdown'
import { GetCommentaries } from 'features/post'
import DeletePostModal from 'features/profile/getPosts/ui/modals/DeletePostModal/ui'
import EditPostModal from 'features/profile/getPosts/ui/modals/EditPostModal/ui'
import { GetPostModal } from 'features/profile/getPosts/ui/modals/GetPostModal'
import { type ProfileDataModel } from 'shared/types/auth'
import { Card } from 'shared/ui'
import { useGetMyPost, useGetPosts } from '../../model'
import photo from '../../premium_photo-1687382111414-7b87afa5da34.avif'
import cls from './PostCards.module.scss'

interface Props {
    userData: ProfileDataModel
}

const MODALS = {
    GetPostModal: 1,
    EditPostModal: 2,
    DeletePostModal: 3
} as const

type Keys = keyof typeof MODALS
type Values = typeof MODALS[Keys]

export const PostCards: FC<Props> = ({ userData }) => {
    const {
        data,
        isLoading,
        error,
        isSuccess,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage

    } = useGetPosts(userData.id)
    const [currentModal, setCurrentModal] = useState<Values | null>(null)
    const [postId, setPostId] = useState<number | undefined>(undefined)

    const { post } = useGetMyPost(postId || 0)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    // @ts-ignore

    const { ref, inView } = useInView()

    console.log(inView)

    useEffect(() => {
        if (inView && hasNextPage) {
            void fetchNextPage()
        }
    }, [inView])

    const renderContent = (page: any) => page.items.map((item: any) => {
        const onPostCardClick = () => {
            openModal(MODALS.GetPostModal)
            setPostId(item.id)
        }

        return (
            <div
                key={item.id}
                className={cls.card}
                onClick={onPostCardClick}>
                {/* <Card src={item.images[0]?.versions.huge?.url} alt="post"/> */}
                <Card src={photo} alt="post"/>
            </div>
        )
    })

    const openModal = (id: Values) => {
        if (currentModal !== null) {
            closeModal()
        }
        setCurrentModal(id)
    }

    const closeModal = () => {
        setCurrentModal(null)
    }

    const openEditPostModal = () => {
        openModal(MODALS.EditPostModal)
    }

    const openDeletePostModal = () => {
        openModal(MODALS.DeletePostModal)
    }

    return (
        <div >
            <div className={cls.cardsList}>
                {data?.pages.map((page, index) => (
                    page && renderContent(page)
                ))}
            </div>

            {/* <InfiniteScroll */}
            {/*     dataLength={data?.pages.page[0].totalCount} */}
            {/*     next={fetchNextPage} */}
            {/*     hasMore={true} loader={<h4>Loading...</h4>}> */}
            {/*     {data?.pages.map((page, index) => ( */}
            {/*         page && renderContent(page) */}
            {/*     ))} */}
            {/* </InfiniteScroll> */}

            {postId && post && [
                <GetPostModal
                    key="GetPostModal"
                    id={MODALS.GetPostModal}
                    post={post}
                    userName={userData.userName}
                    isOpen={currentModal === MODALS.GetPostModal}
                    handleClose={closeModal}
                    headerActions={<MyPostDropdown
                        openEditPostModal={openEditPostModal}
                        openDeletePostModal={openDeletePostModal}
                    />}
                    content={<GetCommentaries postId={postId} userData={userData}/>}
                    actionsSlot={<PostModalActions postId={postId}/>}/>,
                <EditPostModal
                    id={MODALS.EditPostModal}
                    key="EditPostModal"
                    postId={postId}
                    isOpen={currentModal === MODALS.EditPostModal}
                    handleClose={closeModal}/>,
                <DeletePostModal
                    id={MODALS.DeletePostModal}
                    key="DeletePostModal"
                    postId={postId}
                    isOpen={currentModal === MODALS.DeletePostModal}
                    openEditPostModal={openEditPostModal}
                    handleClose={closeModal}/>
            ]}

            {isSuccess && (
                <div ref={ref}>
                    {isFetchingNextPage && (
                        <div className={'grid grid-cols-4 gap-3'}>{'Loading...'}</div>
                    )}
                </div>
            )}
        </div>
    )
}
