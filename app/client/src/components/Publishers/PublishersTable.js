import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPublishers } from '../../redux/actions/publishers/publishers'
import Loading from '../../containers/Loading/Loading'
import { Table } from '../../containers/Table/Table'
import './Publishers'
import { DeletePublisherModal } from './DeletePublisherModal'
import { EditPublisherModal } from './EditPublisherModal'

const PublishersTable = (props) => {
    const dispatch = useDispatch()
    const publishers = useSelector(state => state.publishers.publishers)
    const getPublishersLoading = useSelector(state => state.publishers.getPublishersLoading)

    const [id, setId] = useState("")
    const [showEditModal, setEditModalVisbility] = useState(false);
    const [showDeleteModal, setDeleteModalVisbility] = useState(false);

    const handleShowEditModal = () => {
        setEditModalVisbility(!showEditModal)
    }

    const handleShowDeleteModal = () => {
        setDeleteModalVisbility(!showDeleteModal)
    }

    useEffect(() => {
        dispatch(getPublishers(props.value))
    }, [//eslint-disable-line 
        dispatch])

    const publishersRender = publishers?.map(publisher => {
        const publisherObj = {
            id: publisher.id,
            name: publisher.name,
            road: publisher.address?.road,
            country: publisher.address?.country,
            city: publisher.address?.city,
            zipCode: publisher.address?.zipCode
        }
        return publisherObj
    })

    const clickEditIconAction = (id) => {
        setId(id)
        handleShowEditModal()
    }

    const clickDeleteIconAction = (id) => {
        setId(id)
        handleShowDeleteModal()
    }

    return (
        <div className="publishersTable">
            {
                getPublishersLoading ?
                    <div className="publishersLoading">
                        <Loading />
                    </div> :
                    <>
                        <Table
                            tableData={publishersRender}
                            clickEditIconAction={clickEditIconAction}
                            clickDeleteIconAction={clickDeleteIconAction}
                        />
                        <EditPublisherModal
                            publisherId={id}
                            handleShowEditModal={handleShowEditModal}
                            showEditModal={showEditModal}
                        />
                        <DeletePublisherModal 
                            publisherId={id}
                            handleShowDeleteModal={handleShowDeleteModal}
                            showDeleteModal={showDeleteModal}
                        />
                    </>
            }
        </div>
    )
}

export default PublishersTable