import { useState, type FC } from 'react'
import { useCreateMutation } from '../model'
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
    NewPostStep: 2
} as const

type Keys = keyof typeof MODALSTEPS
type Values = typeof MODALSTEPS[Keys]

export const CreatePostModal: FC<IProps> = ({ handleClose, isOpen }) => {
    const { onCreate, isSuccess } = useCreateMutation({ handleClose })

    const [currentStep, setCurrentStep] = useState<Values | null >(1)

    const [file, setFile] = useState<string>()

    const onSubmit = async (data: INewPostInterface) => {
        const formData = new FormData()
        file && formData.append('files', JSON.stringify([file]))
        formData.append('description', data.description)
        onCreate(formData)
        isSuccess && setCurrentStep(null)
    }
    return (
        <>
            { currentStep === MODALSTEPS.ImageStep &&
            (

                <ImageModalStep
                 isOpen={isOpen && currentStep === MODALSTEPS.ImageStep }
                 setFile={setFile} file={file} onNextClick={() => { setCurrentStep(2) }}
                 onPrevClick={() => { setFile(undefined) }}

                />

            )}
            {currentStep === MODALSTEPS.NewPostStep &&
            (<NewPostModalStep

                isOpen={isOpen && currentStep === MODALSTEPS.NewPostStep }
                setFile={setFile} file={file} onNextClick={onSubmit}
                onPrevClick={() => { setCurrentStep(1) } }
            />)}
        </>

    )
}
