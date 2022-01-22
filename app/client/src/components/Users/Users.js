import { useState } from 'react'
import UsersTable from './UsersTable'
import './Users.css'
import { SearchContainer } from '../../containers/SearchContainer/SearchContainer'
import { getUsers } from '../../redux/actions/users/users'
import { CreateUserModal } from '../../components/Users/CreateUserModal'
import Button from '@material-ui/core/Button'
import { Title } from '../../containers/Title/Title'

const Users = (props) => {
    const [showModal, setModalVisbility] = useState(false);
    const [searchValue, setSearchValue] = useState("")

    const handleShowModal = () => {
        setModalVisbility(!showModal)
    }

    const onChange = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="users">
            <div className="usersHeader">
                <div className="usersHeaderTitle">
                    <Title
                        label="Users"
                    />
                </div>
                <div className="usersHeaderSection">
                    <div onClick={handleShowModal}>
                        <Button variant="contained" color="primary">
                            Add
                        </Button>
                    </div>
                </div>
            </div>
            <UsersTable
                value={searchValue}
            />
            <CreateUserModal showModal={showModal} handleShowModal={handleShowModal} />
        </div>
    )
}

export default Users

