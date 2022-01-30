import React from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { createBookReservation } from '../../redux/actions/books/books'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import './Books.css'

export const BookReservationModal = ({ bookId, handleShowReservationModal, showReservationModal }) => {
    const dispatch = useDispatch()

    const handleCreateReservation = (values) => {
        dispatch(createBookReservation(bookId, values.timeStamp))
        handleShowReservationModal()
    }

    const initialValues = {
        timeStamp: ""
    }

    return (
        <div>
            <Modal
                handleShowModal={handleShowReservationModal}
                open={showReservationModal}
                modalTitle="Create Reservation"
            >
                <div className="reservation">
                    {
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleCreateReservation}
                        >
                            <Form>
                                <InputField
                                    name="timeStamp"
                                    label="Time Stamp"
                                    type="date"
                                />
                                
                                <Button
                                    text="SAVE"
                                />
                            </Form>
                        </Formik>
                    }
                </div>
            </Modal>
        </div>
    )
}
