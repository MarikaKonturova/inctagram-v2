import { useState, type FC, useEffect } from 'react'
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

    const [file, setFile] = useState<File | undefined>()
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
            {currentStep === MODALSTEPS.NewPostStep &&
            (<NewPostModalStep
                isOpen={isOpen && currentStep === MODALSTEPS.NewPostStep }
                setFile={setFile} file={file} onNextClick={onSubmit}
                onPrevClick={() => { setCurrentStep(1) } }
                handleClose={handleClose}
            />)}
        </>

    )
}
