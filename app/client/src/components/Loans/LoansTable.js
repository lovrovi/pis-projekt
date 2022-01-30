import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useHistory } from 'react-router-dom'
import { getLoans } from '../../redux/actions/loans/loans'
import Loading from '../../containers/Loading/Loading'
import { Table } from '../../containers/Table/Table'
import './Loans.css'
import { DeleteLoanModal } from './DeleteLoadModal'
import { isAdmin } from '../../customHooks/isAdmin'
import { getUserId } from '../../customHooks/getUserId'
//import { generateLink, routesConfiguration as routes } from '../../Router/routes'

const LoansTable = () => {
    const dispatch = useDispatch()
    //const history = useHistory()
    const [id, setId] = useState("")
    const [showDeleteModal, setDeleteModalVisbility] = useState(false);
    const loans = useSelector(state => state.loans.loans)
    const getLoansLoading = useSelector(state => state.loans.getLoansLoading)

    useEffect(() => {
        if(isAdmin()){
            dispatch(getLoans())
        } else {
            dispatch(getLoans(getUserId()))
        }
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
        <div className="loansTable">
            {
                getLoansLoading ?
                    <div className="loansLoading">
                        <Loading />
                    </div> :
                    <>
                        <Table
                            tableData={loans}
                            clickDeleteIconAction={clickDeleteIconAction}
                        />
                        <DeleteLoanModal 
                            loanId={id} 
                            handleShowDeleteModal={handleShowDeleteModal}
                            showDeleteModal={showDeleteModal}
                        />
                    </>
            }
        </div>
    )
}

export default LoansTable
