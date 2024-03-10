import { IImage, PostImages } from 'shared/types/post'

import { indexedDBDraftPost } from './indexedDBDraftPost'

export const saveDraftPost = async (
  images: PostImages<IImage>,
  description: string,
  location: string
) => {
  await indexedDBDraftPost.clearPreviousDraft()
  await indexedDBDraftPost.setNewPostToIndexedDB(images, description, location)
}
