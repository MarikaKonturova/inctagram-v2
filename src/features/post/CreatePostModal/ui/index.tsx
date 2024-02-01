import { type FC, useEffect, useRef, useState } from 'react'
import { Modal } from 'shared/ui'

import { CropImageModalStep } from './modalSteps/CropImageModalStep'
import { FilterIamgeModalStep } from './modalSteps/FilterImageModalStep'
import { ImageModalStep } from './modalSteps/ImageModalStep'
import { NewPostModalStep } from './modalSteps/NewPostModalStep'

interface IProps {
  handleClose: () => void
  isOpen: boolean
}

export interface INewPostInterface {
  description: string
  location: string
}

const MODALSTEPS = {
  CropImageStep: 2,
  ImageStep: 1,
  NewPostStep: 4,
  filterImageStep: 3,
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
        {currentStep === MODALSTEPS.ImageStep && (
          <ImageModalStep onNextClick={setNexStep} onPrevClick={handleClose} />
        )}
        {currentStep === MODALSTEPS.CropImageStep && (
          <CropImageModalStep onNextClick={setNexStep} onPrevClick={setPrevStep} />
        )}
        {currentStep === MODALSTEPS.filterImageStep && (
          <FilterIamgeModalStep onNextClick={setNexStep} onPrevClick={setPrevStep} />
        )}
        {currentStep === MODALSTEPS.NewPostStep && (
          <NewPostModalStep onPrevClick={setPrevStep} onSubmitSuccess={onSubmitSuccess} />
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
