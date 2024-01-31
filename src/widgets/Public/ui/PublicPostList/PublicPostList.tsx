import { PublicPost } from 'features/public'
import { ResponseItem } from 'shared/types/home'

import cls from './PublicPostList.module.scss'

interface PublicPostListProps {
  openModal: (post: ResponseItem) => void
  posts: ResponseItem[]
}

export const PublicPostList = ({ openModal, posts }: PublicPostListProps) => {
  return (
    <div className={cls.postList}>
      {posts.map(p => (
        <PublicPost key={p.id} openModal={openModal} post={p} />
      ))}
    </div>
  )
}
