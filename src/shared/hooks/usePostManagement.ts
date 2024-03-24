import { useRouter } from 'next/router'
import { useState } from 'react'
import { MODALS, Values } from 'shared/constants/post'

export const usePostManagement = () => {
  const router = useRouter()
  const [currentModal, setCurrentModal] = useState<Values | null>(null)
  const [isDeletePostConfirmationModalOpen, setIsDeletePostConfirmationModalOpen] = useState(false)

  const openModal = (id: Values) => {
    // if (currentModal !== null) {
    //   closeModal()
    // }

    setCurrentModal(id)
  }

  const closeModal = () => {
    setCurrentModal(null)
    if (router.query.postId) {
      delete router.query.postId
      router.push(router, undefined, { shallow: true })
    }
  }

  const openEditPostModal = () => {
    openModal(MODALS.EditPostModal)
  }

  const openDeletePostModal = () => {
    setIsDeletePostConfirmationModalOpen(true)
  }

  const closeDeletePostModal = () => {
    setIsDeletePostConfirmationModalOpen(false)
    closeModal()
  }

  return {
    closeDeletePostModal,
    closeModal,
    currentModal,
    isDeletePostConfirmationModalOpen,
    openDeletePostModal,
    openEditPostModal,
    openModal,
    setIsDeletePostConfirmationModalOpen,
  }
}
