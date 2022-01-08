import React from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { deletePublisher } from '../../redux/actions/publishers/publishers'
import { useDispatch } from 'react-redux'
import { Button } from '../../containers/Button/Button'

export const DeletePublisherModal = ({publisherId, handleShowDeleteModal, showDeleteModal}) => {
    const dispatch = useDispatch()

    const handleDeletePublisher = () => {
        dispatch(deletePublisher(publisherId))
        handleShowDeleteModal()
    }

    return (
        <div>
            <Modal
                handleShowModal={handleShowDeleteModal}
                open={showDeleteModal}
                modalTitle="Delete"
            >
                Are you sure you want to delete ?
                <Button
                    clickAction={handleDeletePublisher}
                    text="Yes"
                />
            </Modal>
        </div>
    )
}
