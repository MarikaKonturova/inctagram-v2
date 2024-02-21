import { Nullable } from 'features/post/CreatePostModal/model'

export type ConvertedImageType = {
  dimensions: {
    height: number
    width: number
  }
  name: string
  src: string
}

export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()

  reader.onloadend = () => {
    const file64 = reader.result as string

    callBack(file64)
  }
  reader.readAsDataURL(file)
}

export const convertFileToBase64WithValidate = async (
  file: File,
  onSuccess?: (image: ConvertedImageType) => void,
  onError?: (error?: string) => void
): Promise<Nullable<ConvertedImageType>> =>
  new Promise<Nullable<ConvertedImageType>>(res => {
    const regEx = /\.(jpe?g|png|gif|bmp|svg)$/i

    if (regEx.test(file.name)) {
      const reader = new FileReader()

      const image = new Image()

      reader.readAsDataURL(file)

      reader.onloadend = () => {
        image.src = reader.result as string

        image.onload = () => {
          if (typeof reader.result === 'string') {
            const convertedImage: ConvertedImageType = {
              dimensions: {
                height: image.height,
                width: image.width,
              },
              name: file.name,
              src: reader.result,
            }

            if (onSuccess) {
              onSuccess(convertedImage)
            }
            res(convertedImage)
          }
        }

        image.onerror = () => {
          if (onError) {
            onError('image error')
          }
          res(null)
        }
      }
    } else {
      if (onError) {
        onError('image error')
      }

      res(null)
    }
  })
