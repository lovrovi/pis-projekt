import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getBooks } from '../../redux/actions/books/books'
import Loading from '../../containers/Loading/Loading'
import { Table } from '../../containers/Table/Table'
import './Books.css'
import { DeleteBookModal } from './DeleteBookModal'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'
import { BookReservationModal } from './BookReservationModal'

const BooksTable = ({ searchValue }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [id, setId] = useState("")
    const [showDeleteModal, setDeleteModalVisbility] = useState(false);
    const [showReservationModal, setReservationModalVisbility] = useState(false);
    const books = useSelector(state => state.books.books)
    const getBooksLoading = useSelector(state => state.books.getBooksLoading)

    useEffect(() => {
        dispatch(getBooks(searchValue))
    }, [//eslint-disable-line 
        dispatch])

    const handleShowDeleteModal = () => {
        setDeleteModalVisbility(!showDeleteModal)
    }

    const handleShowReservationModal = () => {
        setReservationModalVisbility(!showReservationModal)
    }

    const clickEditIconAction = (id) => {
        history.push(generateLink(routes.BOOK_DETAILS, { id: id }))
    }

    const clickCommentIconAction = (id) => {
        history.push(generateLink(routes.BOOK_COMMENTS, { id: id }))
    }

    const clickDeleteIconAction = (id) => {
        setId(id)
        handleShowDeleteModal()
    }

    const clickReservationIconAction = (id) => {
        setId(id)
        handleShowReservationModal()
    }

    return (
        <div className="booksTable">
            {
                getBooksLoading ?
                    <div className="booksLoading">
                        <Loading />
                    </div> :
                    <>
                        <Table
                            tableData={books}
                            clickEditIconAction={clickEditIconAction}
                            clickDeleteIconAction={clickDeleteIconAction}
                            clickCommentIconAction={clickCommentIconAction}
                            clickReservationIconAction={clickReservationIconAction}
                        />

                        <BookReservationModal 
                            bookId={id}
                            handleShowReservationModal={handleShowReservationModal}
                            showReservationModal={showReservationModal}
                        />
                        
                        <DeleteBookModal
                            bookId={id}
                            handleShowDeleteModal={handleShowDeleteModal}
                            showDeleteModal={showDeleteModal}
                        />
                    </>
            }
        </div>
    )
}

export default BooksTable
