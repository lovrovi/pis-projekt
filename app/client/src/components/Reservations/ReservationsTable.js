import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReservations } from '../../redux/actions/books/books'
import { Table } from '../../containers/Table/Table'
import './Reservations.css'

const ReservationsTable = () => {
    const dispatch = useDispatch()
    const reservations = useSelector(state => state.books.reservations)

    useEffect(() => {
        dispatch(getReservations())
    }, [//eslint-disable-line 
        dispatch])

    const reservationsRender = reservations?.map(reservation => {
        const reservationObj = {
            bookTitle: reservation.bookTitle,
            userName: reservation.userName,
            timeStamp: reservation.timeStamp
        }
        return reservationObj
    })

    return (
        <div className="reservationsTable">
            {
                <>
                    <Table
                        tableData={reservationsRender}
                    />
                </>
            }
        </div>
    )
}

export default ReservationsTable