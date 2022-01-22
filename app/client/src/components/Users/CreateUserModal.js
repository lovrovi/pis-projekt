import React from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { createUser } from '../../redux/actions/users/users'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import './Users.css'
import { UserSchema } from '../../validationSchemas/ValidationSchemas'

export const CreateUserModal = ({ showModal, handleShowModal }) => {
    const dispatch = useDispatch()

    const handleCreateUser = (values) => {
        dispatch(createUser(values))
        handleShowModal()
    }

    const initialValues = {
        userName: "",
        password: "",
        groupType: ""
    }

    return (
        <div>
            <Modal
                handleShowModal={handleShowModal}
                open={showModal}
                modalTitle="Create"
            >
                <div className="userDetails">
                    {
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleCreateUser}
                            validationSchema={UserSchema}
                        >
                            <Form>
                                <InputField
                                    name="userName"
                                    label="Username"
                                />
                                <InputField
                                    name="password"
                                    label="Password"
                                />
                                <InputField
                                    name="groupType"
                                    label="Group type"
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
