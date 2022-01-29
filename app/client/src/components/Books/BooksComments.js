import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Title } from '../../containers/Title/Title'
import Loading from '../../containers/Loading/Loading'
import { getComments } from '../../redux/actions/comments/comments'
import { Formik, Form } from 'formik';
import { InputField } from '../../containers/InputField/InputField';
import { getPublishers } from '../../redux/actions/publishers/publishers'
import { Button } from '../../containers/Button/Button'
import { BookUpdateSchema } from '../../validationSchemas/ValidationSchemas'
import { Table } from '../../containers/Table/Table'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'
import { ImageUpload } from '../../containers/ImageUpload/ImageUpload'
import { ImageContainer } from '../../containers/ImageContainer/ImageContainer'

export const BooksComments = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const comments = useSelector(state => state.comments.comments)

    useEffect(() => {
        const { id } = props.match.params
        dispatch(getComments(id))
    }, [dispatch, props.match.params])

    const commentsRender = comments?.map((comment, i) => {
        return(
            <div key={i}>
               <p>{comment.text}</p> 
            </div>
        )
    })

    return (
        <>
            <Title label="Comments" />
            {commentsRender}
        </>
    )
}


