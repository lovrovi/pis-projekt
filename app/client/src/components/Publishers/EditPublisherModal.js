import { useEffect, useRef } from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { putPublisher, getPublisherDetails } from '../../redux/actions/publishers/publishers'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../containers/Loading/Loading'
import { Form, Formik } from 'formik';
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import './Publishers.css'
import { PublisherSchema } from '../../validationSchemas/ValidationSchemas'

export const EditPublisherModal = ({ publisherId, handleShowEditModal, showEditModal }) => {
    const publisherDetailsLoading = useSelector(state => state.publishers.publisherDetailsLoading)
    const publisher = useSelector(state => state.publishers.publisher)
    const dispatch = useDispatch()
    const ref = useRef(true)

    useEffect(() => {
        if (ref.current) {
            ref.current = false
        } else if (showEditModal) {
            dispatch(getPublisherDetails(publisherId))
        }
    }, [dispatch, publisherId, showEditModal])

    const handleUpdatePublisher = (values) => {
        dispatch(putPublisher(values))
        handleShowEditModal()
    }

    const initialValues = {
        id: publisher.id,
        name: publisher.name,
        road: publisher.address?.road,
        zipCode: publisher.address?.zipCode,
        city: publisher.address?.city,
        country: publisher.address?.country
    }

    return (
        <div>
            <Modal
                handleShowModal={handleShowEditModal}
                open={showEditModal}
                modalTitle="Edit"
            >
                <div className="publisherDetails">
                    {
                        publisherDetailsLoading ?
                            <Loading /> :

                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
                                onSubmit={handleUpdatePublisher}
                                validationSchema={PublisherSchema}
                            >
                                <>
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
                                        <div className="detailsButtons">
                                            <Button text="SAVE" />
                                            <Button
                                                clickAction={() => handleShowEditModal()}
                                                text="CANCEL"
                                            />
                                        </div>
                                    </Form>
                                </>
                            </Formik>
                    }
                </div>
            </Modal>
        </div>
    )
}
