import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Title } from '../../containers/Title/Title'
import './Books.css'
import Loading from '../../containers/Loading/Loading'
import { getComments, createComment } from '../../redux/actions/comments/comments'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
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
    const [bookId, setBookId] = useState("")
    const [commentText, setCommentText] = useState("")
    const comments = useSelector(state => state.comments.comments)

    useEffect(() => {
        const { id } = props.match.params
        setBookId(id)
        dispatch(getComments(id))
    }, [dispatch, props.match.params])

    const commentsRender = comments?.map((comment, i) => {
        return (
            <div key={i} className='commentText'>
                <p>{comment.text}</p>
            </div>
        )
    })

    const onReviewSend = (e) => {
        e.preventDefault()
        dispatch(createComment(bookId, commentText))
    }

    return (
        <div className='booksComments'>
            <Title label="Comments" />
            <div className='createComment'>
                <form onSubmit={onReviewSend}>
                    <div className="ad-details-review">
                        <div className="review-title">
                            <span>Review</span>
                        </div>
                        <div className="comment">
                            <InputLabel id="comment">Comment</InputLabel>
                            <TextareaAutosize
                                name="comment"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                aria-label="minimum height"
                                minRows={5}
                                placeholder=""
                            />
                        </div>
                        
                        <button>Submit</button>
                    </div>
                </form>
            </div>
            <div className='comments'>
                {commentsRender}
            </div>
        </div>
    )
}


