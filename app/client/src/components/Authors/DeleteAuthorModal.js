import React from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { deleteAuthor } from '../../redux/actions/authors/authors'
import { useDispatch } from 'react-redux'
import { Button } from '../../containers/Button/Button'

export const DeleteAuthorModal = ({authorId, handleShowDeleteModal, showDeleteModal}) => {
    const dispatch = useDispatch()

    const handleDeleteAuthor = () => {
        dispatch(deleteAuthor(authorId))
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
                    clickAction={handleDeleteAuthor}
                    text="Yes"
                />
            </Modal>
        </div>
    )
}
