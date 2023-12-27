import { type FC } from 'react'
import CloseEye from 'shared/assets/icons/outline/eye-off-outline.svg'
import OpenEye from 'shared/assets/icons/outline/eye-outline.svg'

interface EyeProps {
  isVisible: boolean
  onClick: () => void
}

export const Eye: FC<EyeProps> = ({ isVisible, onClick }) => {
  return (
    <>
      <button onClick={onClick} type={'button'}>
        {isVisible ? <CloseEye /> : <OpenEye />}
      </button>
    </>
  )
}
