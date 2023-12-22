import { useState, type FC, useEffect } from 'react'
import { Modal } from 'shared/ui'
import { useCreateMutation } from '../model'
import { CropImageModalStep } from './modalSteps/CropImageModalStep'
import { FilterIamgeModalStep } from './modalSteps/FilterImageModalStep'
import { ImageModalStep } from './modalSteps/ImageModalStep'
import { NewPostModalStep } from './modalSteps/NewPostModalStep'

interface IProps {
    isOpen: boolean
    handleClose: () => void
}

export interface INewPostInterface {
    description: string
    location: string
}

const MODALSTEPS = {
    ImageStep: 1,
    CropImageStep: 2,
    filterImageStep: 3,
    NewPostStep: 4
} as const

type Keys = keyof typeof MODALSTEPS
type Values = typeof MODALSTEPS[Keys]

export const CreatePostModal: FC<IProps> = ({ handleClose, isOpen }) => {
    const { onCreate, isSuccess } = useCreateMutation({ handleClose })

    const [currentStep, setCurrentStep] = useState<Values | null >(1)

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
        return <>
            { currentStep === MODALSTEPS.ImageStep &&
            (
                <ImageModalStep
                 setFile={setFile} onNextClick={setNexStep}
                />
            )}
            {currentStep === MODALSTEPS.CropImageStep &&
            (<CropImageModalStep
                setFile={setWorkingImage}
                file={file}
                onNextClick={setNexStep}
                onPrevClick={() => { setPrevStep(); setFile(undefined) }}
            />)}
            {currentStep === MODALSTEPS.filterImageStep &&
            (<FilterIamgeModalStep
                setFile={setWorkingImage}
                file={workingImage}
                onNextClick={setNexStep}
                onPrevClick={setPrevStep}
            />)}
            {currentStep === MODALSTEPS.NewPostStep &&
            (<NewPostModalStep
                setFile={setFile}
                file={workingImage}
                onNextClick={onSubmit}
                onPrevClick={setPrevStep}
            />)}
        </>
    }

    useEffect(() => {
        if (isSuccess) {
            setFile(undefined)
            setCurrentStep(1)
            handleClose()
        }
    }, [isSuccess])

    return (
        <Modal isOpen={isOpen} title="add Photo" withHeader={!file} onClose={handleClose}>
            {renderStep()}
        </Modal>

    )
}
