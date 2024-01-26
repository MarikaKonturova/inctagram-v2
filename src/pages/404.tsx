import { getAuthLayout } from 'layouts/AuthLayout/AuthLayout'
import NotFoundImg from 'shared/assets/images/404error.png'
import { Info } from 'shared/ui'

export default function NotFound() {
  return (
    <Info
      buttonText={'Back'}
      image={NotFoundImg}
      onClick={() => {
        history.back()
      }}
      text={'Looks like the page you are looking for is not available'}
      title={'404! Page not found'}
    />
  )
}

NotFound.getLayout = getAuthLayout
