import { useState } from 'react'
import { createAuthor } from '../../redux/actions/authors/authors'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { InputField } from '../../containers/InputField/InputField'
import { Button } from '../../containers/Button/Button'
import './Authors.css'
import { Title } from '../../containers/Title/Title'
import { AuthorSchema } from '../../validationSchemas/ValidationSchemas'
import { ImageUpload } from '../../containers/ImageUpload/ImageUpload'

export const CreateAuthor = (props) => {
    const [image, setImage] = useState()
    const dispatch = useDispatch()

    const handleCreateAuthor = (values) => {
        dispatch(createAuthor(values))
        props.history.push("/authors")
    }

    const initialValues = {
        name: "",
        biography: "",
        birthdayDate: "",
        email: "",
        image: image
    }

    return (
        <>
            <Title label="Create Author" />
            <div className="authorCreate">
                {
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleCreateAuthor}
                        validationSchema={AuthorSchema}
                    >
                        {({
                            setFieldValue,
                        }) => (
                            <Form>
                                <InputField
                                    name="name"
                                    label="Name"
                                    type="text"
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
                                <ImageUpload setImage={setFieldValue} name="image"/>
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

