import { useState } from 'react'
import PublishersTable from './PublishersTable'
import './Publishers.css'
import { SearchContainer } from '../../containers/SearchContainer/SearchContainer'
import { getPublishers } from '../../redux/actions/publishers/publishers'
import { CreatePublisherModal } from '../../components/Publishers/CreatePublisherModal'
import Button from '@material-ui/core/Button'
import { Title } from '../../containers/Title/Title'

const Publishers = (props) => {
    const [showModal, setModalVisbility] = useState(false);
    const [searchValue, setSearchValue] = useState("")

    const handleShowModal = () => {
        setModalVisbility(!showModal)
    }

    const onChange = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="publishers">
            <div className="publishersHeader">
                <div className="publishersHeaderTitle">
                    <Title
                        label="Publishers"
                    />
                </div>
                <div className="PublishersHeaderSection">
                    <div onClick={handleShowModal}>
                        <Button variant="contained" color="primary">
                            Add
                        </Button>
                    </div>
                    <SearchContainer
                        value={searchValue}
                        name="searchValue"
                        handleChange={onChange}
                        searchAction={getPublishers}
                    />
                </div>
            </div>
            <PublishersTable
                value={searchValue}
            />
            <CreatePublisherModal showModal={showModal} handleShowModal={handleShowModal} />
        </div>
    )
}

export default Publishers
