import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPublishers } from '../../redux/actions/publishers/publishers'
import { getAuthors } from '../../redux/actions/authors/authors'
import { createBook, getCategories } from '../../redux/actions/books/books'
import { Form, Formik } from 'formik';
import { InputField } from '../../containers/InputField/InputField';
import { Button } from '../../containers/Button/Button'
import { Title } from '../../containers/Title/Title'
import { Table } from '../../containers/Table/Table';
import { Checkbox } from '../../containers/Checkbox/Checkbox'
import { BookSchema } from '../../validationSchemas/ValidationSchemas'
import { StyledTableRow, StyledTableCell } from '../../materialStyles/TableStyles'
import { ImageUpload } from '../../containers/ImageUpload/ImageUpload'

export const CreateBook = (props) => {
    const dispatch = useDispatch()
    const publishers = useSelector(state => state.publishers.publishers)
    const authors = useSelector(state => state.authors.authors)
    const categories = useSelector(state => state.books.categories)

    const [checkedAuthors, setCheckedAuthors] = useState([])
    const [checkedCategories, setCheckedCategories] = useState([])
    const [image, setImage] = useState()

    const handleCreateBook = (values, checkedAuthors, checkedCategories) => {
        dispatch(createBook(values, checkedAuthors, checkedCategories))
        props.history.push("/books")
    }

    useEffect(() => {
        dispatch(getPublishers())
        dispatch(getAuthors())
        dispatch(getCategories())
    }, [dispatch])

    const initialValues = {
        title: "",
        description: "",
        pages: "",
        price: "",
        image: image,
        publisherId: publishers[0]?.id,
        isbn: ""
    }

    const authorsList = authors.map((author, index) => {
        return (
            <StyledTableRow key={author.id}>
                <StyledTableCell align="center">{author.name}</StyledTableCell>
                <StyledTableCell align="center">
                    <Checkbox
                        id={author.id}
                        options={checkedAuthors}
                        setOptions={setCheckedAuthors}
                    />
                </StyledTableCell>
            </StyledTableRow>
        )
    })

    const categoriesList = categories.map((category, index) => {
        return (
            <StyledTableRow key={category.id}>
                <StyledTableCell align="center">{category.name}</StyledTableCell>
                <StyledTableCell align="center">
                    <Checkbox
                        id={category.id}
                        options={checkedCategories}
                        setOptions={setCheckedCategories}
                    />
                </StyledTableCell>
            </StyledTableRow>
        )
    })

    const publisherOptions = publishers.map(publisher => {
        return (
            <option key={publisher.id} value={publisher.id}>
                {publisher.name}
            </option>
        )
    })

    return (
        <>
            <Title label="Book" />
            <div className="bookDetails">
                {
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={(values) => handleCreateBook(values, checkedAuthors, checkedCategories)}
                        validationSchema={BookSchema}
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
                                <InputField
                                    name="isbn"
                                    label="ISBN"
                                />
                                <InputField
                                    name="publisherId"
                                    label="Publisher"
                                    as="select"
                                    options={publisherOptions}
                                />
                                <ImageUpload setImage={setFieldValue} name="image" />
                                <Table
                                    customTableData={authorsList}
                                    customTableHeader={["Author", "+"]}
                                />
                                <Table
                                    customTableData={categoriesList}
                                    customTableHeader={["Categories", "+"]}
                                />
                                <div className="detailsButtons">
                                    <Button
                                        text="SAVE"
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
