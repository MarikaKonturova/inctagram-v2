import { PublicPost } from 'features/public'
import { PostResponse } from 'shared/types/post'

import cls from './PublicPostList.module.scss'

interface PublicPostListProps {
  openModal: (post: PostResponse) => void
  posts: PostResponse[]
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
