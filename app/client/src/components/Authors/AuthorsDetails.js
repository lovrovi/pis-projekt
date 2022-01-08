import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Loading from '../../containers/Loading/Loading'
import { Title } from '../../containers/Title/Title'
import { getAuthorDetails, updateAuthor } from '../../redux/actions/authors/authors'
import { Form, Formik } from 'formik';
import { InputField } from '../../containers/InputField/InputField'
import './Authors.css'
import { Button } from '../../containers/Button/Button'
import { AuthorSchema } from '../../validationSchemas/ValidationSchemas'
import { Table } from '../../containers/Table/Table'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'
import { ImageUpload } from '../../containers/ImageUpload/ImageUpload'
import { ImageContainer } from '../../containers/ImageContainer/ImageContainer'

export const AuthorsDetails = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const author = useSelector(state => state.authors.author)
    const authorDetailsLoading = useSelector(state => state.authors.authorDetailsLoading)

    useEffect(() => {
        const { id } = props.match.params
        dispatch(getAuthorDetails(id))
    }, [dispatch, props.match.params])

    const handleUpdateAuthor = (values) => {
        dispatch(updateAuthor(values))
    }

    const initialValues = {
        id: author.id,
        name: author.name,
        biography: author.biography,
        birthdayDate: author.birthdayDate,
        email: author.email,
        image: null
    }

    const clickEditIconAction = (id) => {
        history.push(generateLink(routes.BOOK_DETAILS, { id: id }))
    }

    return (
        <>
            <Title label="Author" />
            <div className="authorsDetails">
                {
                    authorDetailsLoading ?
                        <Loading /> :
                        <>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleUpdateAuthor}
                                validationSchema={AuthorSchema}
                            >
                                {({
                                    setFieldValue,
                                }) => (
                                    <Form>
                                        <InputField
                                            name="name"
                                            label="Name"
                                        />
                                        <InputField
                                            name="biography"
                                            label="Biography"
                                            as="textarea"
                                        />
                                        <InputField
                                            name="birthdayDate"
                                            label="Birthday"
                                            type="date"
                                        />
                                        <InputField
                                            name="email"
                                            label="Email"
                                        />
                                        <ImageUpload setImage={setFieldValue} name="image" />
                                        <div className="detailsButtons">
                                            <Button
                                                text="SAVE"
                                            />
                                            <Button
                                                clickAction={() => history.push(generateLink(routes.AUTHORS))}
                                                text="CANCEL"
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="authorRightSection">
                                <ImageContainer src={author.image} />
                                <div className="booksContainer">
                                    {
                                        author.books ?
                                            <Table
                                                tableData={author.books}
                                                clickEditIconAction={clickEditIconAction}
                                            /> :
                                            null
                                    }

                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}
