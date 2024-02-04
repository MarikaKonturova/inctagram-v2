import {RegisteredUsers} from 'entities/Public';
import {useState} from 'react';
import {LastPublicationsResponse} from 'shared/types/home';
import {PostResponse} from 'shared/types/post';
import {PublicPostList} from 'widgets/Public';

import {PublicPostModal} from './PublicPostModal/PublicPostModal'
import cls from './styles.module.scss'

export interface PublicPageProps {
  data: LastPublicationsResponse
}

export const PublicPage = ({data}: PublicPageProps) => {

  const [modalPost, setModalPost] = useState<PostResponse | null>(null)

  const openModal = (post: PostResponse) => {
    setModalPost(post)
  }

  const closeModal = () => {
    setModalPost(null)
  }

  return (
    <div className={cls.container}>
      <RegisteredUsers className={cls.users} userCount={data.countUsers} />
      {data.lastPosts && <PublicPostList openModal={openModal} posts={data.lastPosts} />}
      {modalPost &&
          <PublicPostModal handleClose={closeModal} isOpen={!!modalPost} post={modalPost} />
      }
    </div>
  )
}
