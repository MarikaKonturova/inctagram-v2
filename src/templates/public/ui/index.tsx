import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {HomeService} from 'shared/api/home';
import {ResponseItem} from 'shared/types/home';
import {PublicPostList, PublicPostModal, RegisteredUsers} from 'widgets/Public';

import cls from './styles.module.scss'

export const PublicPage = () => {

const {data} = useQuery({queryFn: HomeService.getLastPublications})

  const [modalPost, setModalPost] = useState<ResponseItem | null>(null)

  const openModal = (post: ResponseItem) => {
    setModalPost(post)
  }

  const closeModal = () => {
    setModalPost(null)
  }

  return (
    <div className={cls.container}>
      <RegisteredUsers className={cls.users} count={data?.data?.countUsers} />
      {data?.data?.lastPosts && <PublicPostList openModal={openModal} posts={data.data.lastPosts} />}
      {modalPost &&
          <PublicPostModal handleClose={closeModal} isOpen={!!modalPost} post={modalPost} />
      }

    </div>
  )
}
