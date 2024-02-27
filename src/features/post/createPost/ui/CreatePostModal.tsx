import { type FC, useState } from 'react'
import { Modal } from 'shared/ui'

import { CroppImageStep } from './modalSteps/cropImageStep/CropImageStep'
import { FilterImageStep } from './modalSteps/filterImageStep/FilterImageStep'
import { ImageDownloadStep } from './modalSteps/imageDownloadStep/ImageDownloadStep'
import { PublishPostStep } from './modalSteps/publishPostStep/PublishPostStep'

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
  const onSubmitSuccess = () => {
    setCurrentStep(1)
    handleClose()
  }

  const renderStep = () => {
    const setNexStep = () => {
      setCurrentStep((currentStep + 1) as Values)
    }
    const setPrevStep = () => {
      setCurrentStep((currentStep - 1) as Values)
    }

    return (
      <>
        {currentStep === MODALSTEPS.ImageDownloadStep && (
          <ImageDownloadStep onNextClick={setNexStep} onPrevClick={handleClose} />
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
      </>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} withHeader={false}>
      {renderStep()}
    </Modal>
  )
}
