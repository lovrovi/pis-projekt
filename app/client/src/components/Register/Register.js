import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import { Title } from '../../containers/Title/Title'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/auth/auth'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'
import './Register.css'
import { RegisterSchema } from '../../validationSchemas/ValidationSchemas'

export const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useSelector(state => state.auth.message);

    const initialValues = {
        email: ""
    }

    const handleRegister = (values) => {
        dispatch(register(values))
    }

    return (
        <div>
            <>
                <Title label="Register" />
                <div className="register">
                    {
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleRegister}
                            validationSchema={RegisterSchema}
                        >
                            <Form>
                                <InputField
                                    name="email"
                                    label="Email"
                                    type="text"
                                />
                                <div className="errorMessage">
                                    <p>{message ? message : ""}</p>
                                </div>
                                <Button
                                    text="REGISTER"
                                />
                            </Form>
                        </Formik>
                    }
                </div>
            </>
        </div>
    )
}
