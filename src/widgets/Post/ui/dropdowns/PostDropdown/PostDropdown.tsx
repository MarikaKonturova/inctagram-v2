import { CopyToClipboard, Report, SubscribeOrUnsubscribeButton } from 'features/post'
import { MoreOptions } from 'shared/ui'

interface PostDropdownProps {
  postId: string
  userId: string
}

export const PostDropdown = ({ postId, userId, ...restProps }: PostDropdownProps) => (
  <MoreOptions
    content={
      <>
        <SubscribeOrUnsubscribeButton userId={userId} />
        <Report />
        <CopyToClipboard />
      </>
    }
  />
)
