import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useHistory } from 'react-router-dom'
import { getUsers } from '../../redux/actions/users/users'
import Loading from '../../containers/Loading/Loading'
import { Table } from '../../containers/Table/Table'
import './Users.css'
import { DeleteUserModal } from './DeleteUserModal'
//import { generateLink, routesConfiguration as routes } from '../../Router/routes'

const UsersTable = ({ value }) => {
    const dispatch = useDispatch()
    //const history = useHistory()
    const [id, setId] = useState("")
    const [showDeleteModal, setDeleteModalVisbility] = useState(false);
    const users = useSelector(state => state.users.users)
    const getUsersLoading = useSelector(state => state.users.getUsersLoading)

    useEffect(() => {
        dispatch(getUsers(value))
    }, [//eslint-disable-line 
        dispatch])

    const handleShowDeleteModal = () => {
        setDeleteModalVisbility(!showDeleteModal)
    }

    const clickDeleteIconAction = (id) => {
        setId(id)
        handleShowDeleteModal()
    }

    return (
        <div className="usersTable">
            {
                getUsersLoading ?
                    <div className="usersLoading">
                        <Loading />
                    </div> :
                    <>
                        <Table
                            tableData={users}
                            clickDeleteIconAction={clickDeleteIconAction}
                        />
                        <DeleteUserModal 
                            authorId={id} 
                            handleShowDeleteModal={handleShowDeleteModal}
                            showDeleteModal={showDeleteModal}
                        />
                    </>
            }
        </div>
    )
}

export default UsersTable
