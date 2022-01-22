import React from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { deleteLoan } from '../../redux/actions/loans/loans'
import { useDispatch } from 'react-redux'
import { Button } from '../../containers/Button/Button'

export const DeleteLoanModal = ({loanId, handleShowDeleteModal, showDeleteModal}) => {
    const dispatch = useDispatch()

    const handleDeleteLoan = () => {
        dispatch(deleteLoan(loanId))
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
                    clickAction={handleDeleteLoan}
                    text="Yes"
                />
            </Modal>
        </div>
    )
}
