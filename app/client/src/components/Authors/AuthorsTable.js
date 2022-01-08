import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAuthors } from '../../redux/actions/authors/authors'
import Loading from '../../containers/Loading/Loading'
import { Table } from '../../containers/Table/Table'
import './Authors.css'
import { DeleteAuthorModal } from './DeleteAuthorModal'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'

const AuthorsTable = ({ value }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [id, setId] = useState("")
    const [showDeleteModal, setDeleteModalVisbility] = useState(false);
    const authors = useSelector(state => state.authors.authors)
    const getAuthorsLoading = useSelector(state => state.authors.getAuthorsLoading)

    useEffect(() => {
        dispatch(getAuthors(value))
    }, [//eslint-disable-line 
        dispatch])

    const handleShowDeleteModal = () => {
        setDeleteModalVisbility(!showDeleteModal)
    }

    const clickEditIconAction = (id) => {
        history.push(generateLink(routes.AUTHOR_DETAILS, { id: id }))
    }

    const clickDeleteIconAction = (id) => {
        setId(id)
        handleShowDeleteModal()
    }

    return (
        <div className="authorsTable">
            {
                getAuthorsLoading ?
                    <div className="authorsLoading">
                        <Loading />
                    </div> :
                    <>
                        <Table
                            tableData={authors}
                            clickEditIconAction={clickEditIconAction}
                            clickDeleteIconAction={clickDeleteIconAction}
                        />
                        <DeleteAuthorModal 
                            authorId={id} 
                            handleShowDeleteModal={handleShowDeleteModal}
                            showDeleteModal={showDeleteModal}
                        />
                    </>
            }
        </div>
    )
}

export default AuthorsTable
