import { indexedDBDraftPost } from './indexedDBDraftPost'

export const clearDraftPost = async () => {
  await indexedDBDraftPost.clearPreviousDraft()
}
