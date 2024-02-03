import {useState} from 'react';
import {LastPublicationsResponse, ResponseItem} from 'shared/types/home';
import {PublicPostList, PublicPostModal, RegisteredUsers} from 'widgets/Public';

import cls from './styles.module.scss'

export interface PublicPageProps {
  data: LastPublicationsResponse
}

export const PublicPage = ({data}: PublicPageProps) => {

  const [modalPost, setModalPost] = useState<ResponseItem | null>(null)

  const openModal = (post: ResponseItem) => {
    setModalPost(post)
  }

  const closeModal = () => {
    setModalPost(null)
  }

  return (
    <div className={cls.container}>
      <RegisteredUsers className={cls.users} count={data.countUsers} />
      {data.lastPosts && <PublicPostList openModal={openModal} posts={data.lastPosts} />}
      {modalPost &&
          <PublicPostModal handleClose={closeModal} isOpen={!!modalPost} post={modalPost} />
      }
    </div>
  )
}
