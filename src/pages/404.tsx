import { getAuthLayout } from 'layouts'
import { useTranslation } from 'react-i18next'
import NotFoundImg from 'shared/assets/images/404error.png'
import { Info } from 'shared/ui'

export default function NotFound() {
  const { t } = useTranslation('common')

  return (
    <Info
      buttonText={t('back')}
      image={NotFoundImg}
      onClick={() => {
        history.back()
      }}
      text={t('notFoundText')}
      title={t('notFoundTitle')}
    />
  )
}

NotFound.getLayout = getAuthLayout
