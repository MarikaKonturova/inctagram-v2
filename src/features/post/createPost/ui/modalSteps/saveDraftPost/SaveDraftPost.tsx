import { useTranslation } from 'react-i18next'
import { ConfirmationModal } from 'shared/ui'

interface IProps {
  handleClose: () => void
  handleDiscard: () => void
  handleSave: () => void
  isOpen: boolean
}

export const SaveDraftPost = ({ handleClose, handleDiscard, handleSave, isOpen }: IProps) => {
  const { t } = useTranslation(['post'])

  return (
    <ConfirmationModal
      bodyText={
        t('doYouReallyWantToCloseTheCreationOfAPublication') +
        ' ' +
        t('ifYouCloseEverythingWillBeDeleted')
      }
      confirmText={`${t('saveDraft')}`}
      headerText={`${t('close')}`}
      isModalOpen={isOpen}
      noText={`${t('discard')}`}
      onNoAction={handleDiscard}
      onYesAction={handleSave}
      setModalOpen={handleClose}
    />
  )
}
