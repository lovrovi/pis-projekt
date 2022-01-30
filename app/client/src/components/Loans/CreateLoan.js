import { useEffect, useState } from 'react'
import { createLoan } from '../../redux/actions/loans/loans'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import './Loans.css'
import { Title } from '../../containers/Title/Title'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'
import { getBooks } from '../../redux/actions/books/books'
import { getUsers } from '../../redux/actions/users/users'

export const CreateLoan = (props) => {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books.books)
    const users = useSelector(state => state.users.users)

    useEffect(() => {
        dispatch(getBooks())
        dispatch(getUsers())
    }, []);
    

    const handleCreateLoan = (values) => {
        dispatch(createLoan(values))
        props.history.push("/loans")
    }

    const userOptions = users?.map(user => {
        const userObj = {
            label: user.userName,
            id: user.id,
        }
        return userObj
    })

    const bookOptions = books?.map(book => {
        const bookObj = {
            label: book.title,
            id: book.id,
        }
        return bookObj
    })

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
                            setFieldValue, values
                        }) => (
                            <Form>
                                {console.log(values)}
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
                                <Autocomplete
                                    style={{ width: "14em" }}
                                    onChange={(e, value) => setFieldValue("userId", value.id)}
                                    options={userOptions}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                    <TextField {...params} label="Search for a user" />
                                )}
                                />
                                <Autocomplete
                                    style={{ width: "14em" }}
                                    onChange={(e, value) => setFieldValue("bookId", value.id)}
                                    options={bookOptions}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                    <TextField {...params} label="Search for a book" />
                                )}
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

