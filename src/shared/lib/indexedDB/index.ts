export type DatabaseMetaDataType = { dbName: string; keyPath: string; storeName: string }
type SetItemParamsType = DatabaseMetaDataType & { itemData: any }

export const indexedDbRepository = {
  clearDatabase: async ({ dbName, keyPath, storeName }: DatabaseMetaDataType) => {
    const db = await indexedDbRepository.getDatabase({ dbName, keyPath, storeName })
    const clearTx = db.transaction([storeName], 'readwrite')
    const clearStore = clearTx.objectStore(storeName)

    clearStore.clear()
  },

  countData: (dbName: string, storeName: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName)

      request.onupgradeneeded = function (event) {
        //@ts-ignore
        const db = event.target.result

        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName)
        }
      }

      request.onsuccess = function (event) {
        //@ts-ignore
        const db = event.target.result

        if (!db.objectStoreNames.contains(storeName)) {
          reject(0)

          return
        }

        const store = db.transaction(storeName, 'readonly').objectStore(storeName)

        // Use the count() method to count the number of records in the store
        const countRequest = store.count()

        countRequest.onsuccess = function (event: any) {
          const count = event.target.result

          resolve(count)
        }
        countRequest.onerror = function (event: any) {
          reject(event)
        }
      }
    })
  },

  getDatabase: async ({
    dbName,
    keyPath,
    storeName,
  }: DatabaseMetaDataType): Promise<IDBDatabase> => {
    const indexedDB =
      // @ts-ignore
      window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    const openRequest = indexedDB.open(dbName, 1)

    openRequest.onupgradeneeded = event => {
      //@ts-ignore
      const db = event.target.result
      const imagesStore = db.createObjectStore(storeName, {
        keyPath: keyPath,
      })
    }

    return new Promise((resolve, reject) => {
      openRequest.onsuccess = () => {
        resolve(openRequest.result)
      }

      openRequest.onerror = () => {
        reject(openRequest.error)
      }
    })
  },

  setItemToDatabase: async ({ dbName, itemData, keyPath, storeName }: SetItemParamsType) => {
    const db = await indexedDbRepository.getDatabase({ dbName, keyPath, storeName })
    const tx = db.transaction([storeName], 'readwrite')
    const store = tx.objectStore(storeName)

    const request = store.put(itemData, keyPath)
  },
}
