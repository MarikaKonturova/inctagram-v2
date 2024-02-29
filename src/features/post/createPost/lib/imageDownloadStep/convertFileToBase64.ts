import { ConvertedImageType, Nullable } from 'shared/types/post'

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
