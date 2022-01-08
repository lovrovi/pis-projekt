import React from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { createPublisher } from '../../redux/actions/publishers/publishers'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import './Publishers.css'
import { PublisherSchema } from '../../validationSchemas/ValidationSchemas'

export const CreatePublisherModal = ({ showModal, handleShowModal }) => {
    const dispatch = useDispatch()

    const handleCreatePublisher = (values) => {
        dispatch(createPublisher(values))
        handleShowModal()
    }

    const initialValues = {
        name: "",
        road: "",
        zipCode: "",
        city: "",
        country: ""
    }

    return (
        <div>
            <Modal
                handleShowModal={handleShowModal}
                open={showModal}
                modalTitle="Create"
            >
                <div className="publisherDetails">
                    {
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleCreatePublisher}
                            validationSchema={PublisherSchema}
                        >
                            <Form>
                                <InputField
                                    name="name"
                                    label="Name"
                                />
                                <InputField
                                    name="road"
                                    label="Road"
                                />
                                <InputField
                                    name="zipCode"
                                    label="zipCode"
                                />
                                <InputField
                                    name="city"
                                    label="City"
                                />
                                <InputField
                                    name="country"
                                    label="Country"
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
