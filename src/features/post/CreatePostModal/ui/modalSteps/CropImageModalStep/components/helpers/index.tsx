import { Nullable } from 'features/post/CreatePostModal/model'
import { Area } from 'react-easy-crop'

type CroppedImageType = {
  dimensions: {
    height: number
    width: number
  }
  src: string
}

export const createImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.src = src
  })

export const getCroppedImg = async (
  imageSrc: string,
  croppedAreaPixels: Area
): Promise<Nullable<CroppedImageType>> => {
  const image: HTMLImageElement = await createImage(imageSrc)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  // calculate bounding box of the rotated image

  // set canvas size to match the bounding box
  canvas.width = image.width
  canvas.height = image.height

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  )

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0)

  return new Promise(resolve => {
    canvas.toBlob(file => {
      const src = canvas.toDataURL('image/jpeg')

      if (file) {
        const modifiedImage = {
          dimensions: {
            height: data.height,
            width: data.width,
          },
          src,
        }

        resolve(modifiedImage)

        return
      }

      resolve(null)
    }, 'image/jpeg')
  })
}
