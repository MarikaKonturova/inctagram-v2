import { type FC, useState } from 'react'
import { Modal } from 'shared/ui'
import { shallow } from 'zustand/shallow'

import { IndexedDBLib } from '../lib'
import { useUploadImagePostStore } from '../model'
import { CroppImageStep } from './modalSteps/cropImageStep/CropImageStep'
import { FilterImageStep } from './modalSteps/filterImageStep/FilterImageStep'
import { ImageDownloadStep } from './modalSteps/imageDownloadStep/ImageDownloadStep'
import { PublishPostStep } from './modalSteps/publishPostStep/PublishPostStep'
import { SaveDraftPost } from './modalSteps/saveDraftPost/SaveDraftPost'

interface IProps {
  handleClose: () => void
  isOpen: boolean
}

const MODALSTEPS = {
  CropImageStep: 2,
  FilterImageStep: 3,
  ImageDownloadStep: 1,
  PublishPostStep: 4,
} as const

type Keys = keyof typeof MODALSTEPS
type Values = (typeof MODALSTEPS)[Keys]

export const CreatePostModal: FC<IProps> = ({ handleClose, isOpen }) => {
  const [currentStep, setCurrentStep] = useState<Values>(1)
  const [isOpenSaveDraftPostModal, setIsOpenSaveDraftPostModal] = useState(false)
  const { description, images, location, setReset } = useUploadImagePostStore(
    ({ description, images, location, setReset }) => ({ description, images, location, setReset }),
    shallow
  )

  const onSubmitSuccess = () => {
    IndexedDBLib.clearDraftPost()
    setCurrentStep(MODALSTEPS.ImageDownloadStep)
    handleClose()
  }
  const setDraftPostOpen = () => {
    setIsOpenSaveDraftPostModal(true)
  }
  const onSaveDraftPost = () => {
    IndexedDBLib.saveDraftPost(images, description, location)
    setIsOpenSaveDraftPostModal(false)
    setCurrentStep(MODALSTEPS.ImageDownloadStep)
    handleClose()
  }
  const onCancelDraftPost = () => {
    setIsOpenSaveDraftPostModal(false)
  }
  const onDiscardDraftPost = () => {
    IndexedDBLib.clearDraftPost()
    setCurrentStep(MODALSTEPS.ImageDownloadStep)
    setIsOpenSaveDraftPostModal(false)
    setReset()
    handleClose()
  }

  const onClose = currentStep === MODALSTEPS.ImageDownloadStep ? handleClose : setDraftPostOpen

  const renderStep = () => {
    const setNexStep = () => {
      setCurrentStep((currentStep + 1) as Values)
    }
    const setPrevStep = () => {
      setCurrentStep((currentStep - 1) as Values)
    }
    const setInitialSep = () => {
      setCurrentStep(MODALSTEPS.PublishPostStep)
    }

    return (
      <>
        {currentStep === MODALSTEPS.ImageDownloadStep && (
          <ImageDownloadStep
            onDraftButtonClick={setInitialSep}
            onNextClick={setNexStep}
            onPrevClick={handleClose}
          />
        )}
        {currentStep === MODALSTEPS.CropImageStep && (
          <CroppImageStep onNextClick={setNexStep} onPrevClick={setPrevStep} />
        )}
        {currentStep === MODALSTEPS.FilterImageStep && (
          <FilterImageStep onNextClick={setNexStep} onPrevClick={setPrevStep} />
        )}
        {currentStep === MODALSTEPS.PublishPostStep && (
          <PublishPostStep onPrevClick={setPrevStep} onSubmitSuccess={onSubmitSuccess} />
        )}
        <SaveDraftPost
          handleClose={onCancelDraftPost}
          handleDiscard={onDiscardDraftPost}
          handleSave={onSaveDraftPost}
          isOpen={isOpenSaveDraftPostModal}
        />
      </>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} withHeader={false}>
      {renderStep()}
    </Modal>
  )
}
