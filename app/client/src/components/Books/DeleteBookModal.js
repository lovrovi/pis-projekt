import React from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { deleteBook } from '../../redux/actions/books/books'
import { useDispatch } from 'react-redux'
import { Button } from '../../containers/Button/Button'

export const DeleteBookModal = ({bookId, handleShowDeleteModal, showDeleteModal}) => {
    const dispatch = useDispatch()

    const handleDeleteBook = () => {
        dispatch(deleteBook(bookId))
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
                    clickAction={handleDeleteBook}
                    text="Yes"
                />
            </Modal>
        </div>
    )
}
