import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Title } from '../../containers/Title/Title'
import Loading from '../../containers/Loading/Loading'
import { getBookDetails, putBook } from '../../redux/actions/books/books'
import { Formik, Form } from 'formik';
import { InputField } from '../../containers/InputField/InputField';
import { getPublishers } from '../../redux/actions/publishers/publishers'
import { Button } from '../../containers/Button/Button'
import { BookUpdateSchema } from '../../validationSchemas/ValidationSchemas'
import { Table } from '../../containers/Table/Table'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'
import { ImageUpload } from '../../containers/ImageUpload/ImageUpload'
import { ImageContainer } from '../../containers/ImageContainer/ImageContainer'

export const BooksDetails = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const book = useSelector(state => state.books.book)
    const bookDetailsLoading = useSelector(state => state.books.bookDetailsLoading)
    const publishers = useSelector(state => state.publishers.publishers)

    useEffect(() => {
        const { id } = props.match.params
        dispatch(getBookDetails(id))
        dispatch(getPublishers())
    }, [dispatch, props.match.params])

    const handleUpdateBook = (values) => {
        dispatch(putBook(values))
    }

    const initialValues = {
        id: book.id,
        title: book.title,
        description: book.description,
        pages: book.pages,
        price: book.price,
        image: null,
        publisherId: book.publisherId,
        publisher: book.publisherName,
    }

    const publisherOptions = publishers.map(publisher => {
        return (
            <option key={publisher.id} value={publisher.id}>
                {publisher.name}
            </option>
        )
    })

    const clickEditIconAction = (id) => {
        history.push(generateLink(routes.AUTHOR_DETAILS, { id: id }))
    }

    return (
        <>
            <Title label="Book" />
            <div className="bookDetails">
                {
                    bookDetailsLoading ?
                        <Loading /> :
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleUpdateBook}
                            validationSchema={BookUpdateSchema}
                        >
                            {({
                                setFieldValue,
                            }) => (
                                <Form>
                                    <InputField
                                        name="title"
                                        label="Title"
                                    />
                                    <InputField
                                        name="description"
                                        label="Description"
                                        as="textarea"
                                    />
                                    <InputField
                                        name="pages"
                                        label="Pages"
                                    />
                                    <InputField
                                        name="price"
                                        label="Price"
                                    />
                                    <ImageUpload
                                        setImage={setFieldValue}
                                        name="image"
                                    />
                                    <InputField
                                        name="publisherId"
                                        label="Publisher"
                                        as="select"
                                        options={publisherOptions}
                                    />

                                    {
                                        book.authors ?
                                            <Table
                                                tableData={book.authors}
                                                clickEditIconAction={clickEditIconAction}
                                            /> :
                                            null
                                    }

                                    <ImageContainer src={book.image} />
                                    
                                    <div className="detailsButtons">
                                        <Button
                                            text="SAVE"
                                        />
                                        <Button
                                            clickAction={() => history.push(generateLink(routes.BOOKS))}
                                            text="CANCEL"
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                }
            </div>
        </>
    )
}
