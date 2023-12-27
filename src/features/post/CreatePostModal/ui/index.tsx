import { type FC, useEffect, useState } from 'react'
import { Modal } from 'shared/ui'

import { useCreateMutation } from '../model'
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
  const { isSuccess, onCreate } = useCreateMutation({ handleClose })

  const [currentStep, setCurrentStep] = useState<Values | null>(1)

  const [file, setFile] = useState<File | undefined>()
  const [workingImage, setWorkingImage] = useState<File | undefined>()
  const onSubmit = async (data: INewPostInterface) => {
    const formData = new FormData()

    if (workingImage) {
      formData.append('files', workingImage)
    }
    formData.append('description', data.description)
    onCreate(formData)
  }

  const renderStep = () => {
    const setNexStep = () => {
      currentStep && setCurrentStep((currentStep + 1) as Values)
    }
    const setPrevStep = () => {
      currentStep && setCurrentStep((currentStep - 1) as Values)
    }

    return (
      <>
        {currentStep === MODALSTEPS.ImageStep && (
          <ImageModalStep onNextClick={setNexStep} setFile={setFile} />
        )}
        {currentStep === MODALSTEPS.CropImageStep && (
          <CropImageModalStep
            file={file}
            onNextClick={setNexStep}
            onPrevClick={() => {
              setPrevStep()
              setFile(undefined)
            }}
            setFile={setWorkingImage}
          />
        )}
        {currentStep === MODALSTEPS.filterImageStep && (
          <FilterIamgeModalStep
            file={workingImage}
            onNextClick={setNexStep}
            onPrevClick={setPrevStep}
            setFile={setWorkingImage}
          />
        )}
        {currentStep === MODALSTEPS.NewPostStep && (
          <NewPostModalStep
            file={workingImage}
            onNextClick={onSubmit}
            onPrevClick={setPrevStep}
            setFile={setFile}
          />
        )}
      </>
    )
  }

  useEffect(() => {
    if (isSuccess) {
      setFile(undefined)
      setCurrentStep(1)
      handleClose()
    }
  }, [isSuccess])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={'add Photo'} withHeader={!file}>
      {renderStep()}
    </Modal>
  )
}
