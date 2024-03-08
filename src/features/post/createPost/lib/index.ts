import { getCropSize } from './cropImageStep/getCropSize'
import { getCroppedImg } from './cropImageStep/getCroppedImg'
import { getModifiedImageSrc } from './filterImageStep/getModifiedImageSrc '
import { convertFileToBase64WithValidate } from './imageDownloadStep/convertFileToBase64'
import { clearDraftPost } from './indexedDB/clearDraftPost'
import { getDraftPost } from './indexedDB/getDraftPost'
import { indexedDBDraftPost } from './indexedDB/indexedDBDraftPost'
import { saveDraftPost } from './indexedDB/saveDraftPost'
export const CroppImageStepLib = { getCropSize, getCroppedImg }
export const ImageDownloadStepLib = { convertFileToBase64WithValidate }
export const FilterImageStepLib = { getModifiedImageSrc }
export const IndexedDBLib = { clearDraftPost, getDraftPost, indexedDBDraftPost, saveDraftPost }
