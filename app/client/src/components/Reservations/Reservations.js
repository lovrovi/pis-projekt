import { useState } from 'react'
import './Reservations.css'
import { Title } from '../../containers/Title/Title'
import ReservationsTable from './ReservationsTable'

const Reservations = (props) => {
    return (
        <div className="reservations">
            <div className="reservationsHeader">
                <div className="reservationsHeaderTitle">
                    <Title
                        label="Reservations"
                    />
                </div>
            </div>
            <ReservationsTable />
        </div>
    )
}

export default Reservations

