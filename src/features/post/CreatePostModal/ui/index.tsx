import { useState, type FC, useEffect } from 'react'
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
        if (file) {
            formData.append('files', file)
        }
        formData.append('description', data.description)
        onCreate(formData)
    }

    // TODO: подумать, как сделать это в сихр ф-ии onSubmit
    useEffect(() => {
        if (isSuccess) {
            setFile(undefined)
            setCurrentStep(1)
            handleClose()
        }
    }, [isSuccess])

    return (
        <>
            { currentStep === MODALSTEPS.ImageStep &&
            (

                <ImageModalStep
                 isOpen={isOpen && currentStep === MODALSTEPS.ImageStep }
                 setFile={setFile} file={file} onNextClick={() => { setCurrentStep(2) }}
                 onPrevClick={() => { setFile(undefined) }}
                 handleClose={handleClose}

                />

            )}
            {currentStep === MODALSTEPS.CropImageStep &&
            (<CropImageModalStep
                isOpen={isOpen && currentStep === MODALSTEPS.CropImageStep }
                setFile={setWorkingImage} file={file} onNextClick={() => { setCurrentStep(3) }}
                onPrevClick={() => { setCurrentStep(1) } }
                handleClose={handleClose}
            />)}
            {currentStep === MODALSTEPS.filterImageStep &&
            (<FilterIamgeModalStep
                isOpen={isOpen && currentStep === MODALSTEPS.filterImageStep }
                setFile={setWorkingImage} file={workingImage} onNextClick={() => { setCurrentStep(4) }}
                onPrevClick={() => { setCurrentStep(2) } }
                handleClose={handleClose}
            />)}
            {currentStep === MODALSTEPS.NewPostStep &&
            (<NewPostModalStep
                isOpen={isOpen && currentStep === MODALSTEPS.NewPostStep }
                setFile={setFile} file={workingImage} onNextClick={onSubmit}
                onPrevClick={() => { setCurrentStep(3) } }
                handleClose={handleClose}
            />)}
        </>

    )
}
