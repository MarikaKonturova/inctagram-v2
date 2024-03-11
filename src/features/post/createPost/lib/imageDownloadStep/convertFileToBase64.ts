import { ConvertedImageType, Nullable } from 'shared/types/post'

export const convertFileToBase64WithValidate = async (
  file: File
): Promise<Nullable<ConvertedImageType>> =>
  new Promise<Nullable<ConvertedImageType>>(res => {
    const regEx = /\.(jpe?g|png)$/i

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

          res(convertedImage)
        }
      }

      image.onerror = () => {
        res(null)
      }
    }
  })
