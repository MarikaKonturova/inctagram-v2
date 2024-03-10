import { IMAGES } from 'shared/constants/images'
import { DatabaseMetaDataType, indexedDbRepository } from 'shared/lib/indexedDB'
import { IImage, PostImages } from 'shared/types/post'

type ImageDataType = {
  data: {
    description: string
    images: PostImages<IImage>
    location: string
  }
  timestamp: number
}

export const indexedDBDraftPost = {
  checkCountDraftPost: async () => {
    const count = await indexedDbRepository.countData(IMAGES.DB_NAME, IMAGES.STORE_NAME)

    return count
  },

  clearPreviousDraft: async () => {
    await indexedDbRepository.clearDatabase({
      dbName: IMAGES.DB_NAME,
      keyPath: IMAGES.KEY_PATH,
      storeName: IMAGES.STORE_NAME,
    })
  },
  getItemFromDatabase: async ({
    dbName,
    keyPath,
    storeName,
  }: DatabaseMetaDataType): Promise<any | void> => {
    const db = await indexedDbRepository.getDatabase({ dbName, keyPath, storeName })
    const tx = db.transaction([storeName], 'readonly')
    const imagesStore = tx.objectStore(storeName)

    try {
      const result = await new Promise((resolve, reject) => {
        imagesStore.getAll().onsuccess = event => {
          // @ts-ignore
          resolve(event?.target?.result[0].data)
        }
      })

      return result
    } catch (e) {
      console.error('Error fetching data from IndexedDB:', e)
    }
  },
  setNewPostToIndexedDB: async (
    images: PostImages<IImage>,
    description: string,
    location: string
  ) => {
    try {
      const imageData: ImageDataType = {
        data: {
          description,
          images,
          location,
        },
        timestamp: Date.now(),
      }

      indexedDbRepository.setItemToDatabase({
        dbName: IMAGES.DB_NAME,
        itemData: imageData,
        keyPath: IMAGES.KEY_PATH,
        storeName: IMAGES.STORE_NAME,
      })
    } catch (e) {
      console.error('Error set New Post to indexedDB: ', e)
    }
  },
}
