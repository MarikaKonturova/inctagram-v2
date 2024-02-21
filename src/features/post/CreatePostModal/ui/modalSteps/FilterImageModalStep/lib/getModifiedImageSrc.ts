import * as htmlToImage from 'html-to-image'

export const getModifiedImageSrc = async (imgElement: HTMLImageElement): Promise<string> => {
  const src = await htmlToImage.toPng(imgElement)

  return Promise.resolve(src)
}
