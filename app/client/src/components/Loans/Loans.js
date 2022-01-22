import { useState } from 'react'
import LoansTable from './LoansTable'
import './Loans.css'
import { SearchContainer } from '../../containers/SearchContainer/SearchContainer'
import { getLoans } from '../../redux/actions/loans/loans'
import { CreateLoan } from '../../components/Loans/CreateLoan'
import Button from '@material-ui/core/Button'
import { Title } from '../../containers/Title/Title'
import { isAdmin } from '../../customHooks/isAdmin'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'
import { Link } from 'react-router-dom'

const Loans = (props) => {
    return (
        <div className="loans">
            <div className="loansHeader">
                <div className="loansHeaderTitle">
                    <Title
                        label="Loans"
                    />
                </div>
                <div className="loansHeaderSection">
                    <Link to={generateLink(routes.LOANS_CREATE)}>
                        {
                            isAdmin() &&
                            <Button variant="contained" color="primary">
                                Add
                            </Button>
                        }
                    </Link>
                </div>
            </div>
            <LoansTable />
        </div>
    )
}

export default Loans
