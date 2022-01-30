import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import { Title } from '../../containers/Title/Title'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth/auth'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'
import './Login.css'
import { isAdmin } from '../../customHooks/isAdmin'

export const Login = ({ forceUpdate }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useSelector(state => state.auth.message);

    useEffect(() => {
      forceUpdate()
    }, []);

    const initialValues = {
        username: "",
        password: ""
    }

    const onLoginSuccess = () => {
        isAdmin() ?
        history.push(generateLink(routes.PUBLISHERS)) :
        history.push(generateLink(routes.BOOKS))
    }

    const handleLogin = (values) => {
        dispatch(login(values, onLoginSuccess))
    }

    const handleRegister = () => {
        history.push(generateLink(routes.REGISTER))
    }

    return (
        <div>
            <>
                <Title label="Login" />
                <div className="login">
                    {
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleLogin}
                        >
                            <Form>
                                <InputField
                                    name="username"
                                    label="User Name"
                                    type="text"
                                />
                                <InputField
                                    name="password"
                                    label="Password"
                                    type="password"
                                />
                                <div className="errorMessage">
                                    <p>{message ? message : ""}</p>
                                </div>
                                <Button
                                    clickAction={forceUpdate}
                                    text="LOGIN"
                                />
                                <br />
                                <Button
                                    clickAction={handleRegister}
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
