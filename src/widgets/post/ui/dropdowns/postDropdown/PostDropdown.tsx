import { Report } from 'features/post'
import { FollowAndUnfollowMenuItemButton } from 'features/profile'
import { MoreOptions } from 'shared/ui'

interface PostDropdownProps {
  isFollowing: boolean
  postId: number
  userId: number
  userName: string
}

export const PostDropdown = ({ isFollowing, postId, userId, userName }: PostDropdownProps) => (
  <MoreOptions
    content={
      <>
        <FollowAndUnfollowMenuItemButton
          isFollowing={isFollowing}
          userId={userId}
          userName={userName}
        />
        <Report />
      </>
    }
  />
)
