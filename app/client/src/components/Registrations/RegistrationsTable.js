import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegistrations, adminRegisterUser } from '../../redux/actions/auth/auth'
import Loading from '../../containers/Loading/Loading'
import { Table } from '../../containers/Table/Table'
import './Registrations.css'

export const RegistrationsTable = () => {
    const dispatch = useDispatch()
    const registrations = useSelector(state => state.auth.registrations)
    const getRegistrationsLoading = useSelector(state => state.auth.getRegistrationsLoading)

    useEffect(() => {
        dispatch(getRegistrations())
    }, [//eslint-disable-line 
        dispatch])

    const registerUser = (mail) => {
        console.log(mail)
        dispatch(adminRegisterUser(mail))
    }

    return (
        <div className="registrationsTable">
            {
                getRegistrationsLoading ?
                    <div className="registrationsLoading">
                        <Loading />
                    </div> :
                    <>
                        <Table
                            tableData={registrations}
                            clickRegisterIconAction={registerUser}
                        />
                    </>
            }
        </div>
    )
};
