import React from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { deleteUser } from '../../redux/actions/users/users'
import { useDispatch } from 'react-redux'
import { Button } from '../../containers/Button/Button'

export const DeleteUserModal = ({userId, handleShowDeleteModal, showDeleteModal}) => {
    const dispatch = useDispatch()

    const handleDeleteUser = () => {
        dispatch(deleteUser(userId))
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
                    clickAction={handleDeleteUser}
                    text="Yes"
                />
            </Modal>
        </div>
    )
}
