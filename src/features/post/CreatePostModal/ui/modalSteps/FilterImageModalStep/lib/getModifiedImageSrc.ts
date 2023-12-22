import * as htmlToImage from 'html-to-image'

export const getModifiedImageSrc = async (): Promise<string> => {
    const src = await htmlToImage.toPng(document.getElementById('modified-image') as HTMLElement)

    return Promise.resolve(src)
}
