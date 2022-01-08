import {useState} from 'react'
import { Modal } from '../../containers/Modal/Modal'
import { putPublisher } from '../../redux/actions/publishers/publishers'
import { useDispatch } from 'react-redux'
import { Button } from '../../containers/Button/Button'

export const ConfirmationEditModal = ({data, check}) => {
    const [showModal, setModalVisbility] = useState(false);
    const dispatch = useDispatch()

    const handleShowModal = (isVisible) => {
        setModalVisbility(isVisible)
    }

    const handleUpdatePublisher = () => {
        dispatch(putPublisher(data))
        handleShowModal(false)
    }

    return (
        <div>
            <Modal
                handleShowModal={handleShowModal}
                open={check}
                modalTitle="Confirm"
            >
                Do you want to save changes for <b>{data.name}</b>
                <Button
                    clickAction={() => handleUpdatePublisher(data)}
                >
                    Yes
                </Button>
            </Modal>
        </div>
    )
}

