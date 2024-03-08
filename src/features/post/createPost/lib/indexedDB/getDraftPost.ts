import { IMAGES } from 'shared/constants/images'

import { indexedDBDraftPost } from './indexedDBDraftPost'

export const getDraftPost = async () => {
  try {
    const { description, images, location } = await indexedDBDraftPost.getItemFromDatabase({
      dbName: IMAGES.DB_NAME,
      keyPath: IMAGES.KEY_PATH,
      storeName: IMAGES.STORE_NAME,
    })

    return { descriptionDraft: description, imagesDraft: images, locationDraft: location }
  } catch (e) {
    console.error(e)
  }
}
