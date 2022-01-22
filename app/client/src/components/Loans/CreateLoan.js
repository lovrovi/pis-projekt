import { useState } from 'react'
import { createLoan } from '../../redux/actions/loans/loans'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import './Loans.css'
import { Title } from '../../containers/Title/Title'
import Autocomplete from '@mui/material/Autocomplete';

export const CreateLoan = (props) => {
    const dispatch = useDispatch()

    const handleCreateLoan = (values) => {
        dispatch(createLoan(values))
        props.history.push("/loans")
    }

    const initialValues = {
        loanDate: "",
        returnDate: "",
        userId: "",
        bookId: "",
    }

    return (
        <>
            <Title label="Create Loan" />
            <div className="loanCreate">
                {
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleCreateLoan}
                    >
                        {({
                            setFieldValue,
                        }) => (
                            <Form>
                                <InputField
                                    name="loanDate"
                                    label="Loan date"
                                    type="date"
                                />
                                <InputField
                                    name="returnDate"
                                    label="Return date"
                                    type="date"
                                />
                                
                                
                                <Button
                                    text="SAVE"
                                />
                            </Form>
                        )}
                    </Formik>
                }
            </div>
        </>
    )
}

