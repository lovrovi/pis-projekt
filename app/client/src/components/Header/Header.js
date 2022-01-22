import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {generateLink, routesConfiguration as routes} from '../../Router/routes'
import './Header.css'
import { useNavbarStyles } from '../../materialStyles/NavbarStyle'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '../../containers/Button/Button'
import { handleLogout } from '../../redux/actions/auth/auth'
import { useDispatch } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useNavbarStyles();

    const handleLogOut = () => {
        dispatch(handleLogout())
        history.push(generateLink(routes.LOGIN))
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Library
                    </Typography>
                    <div className="navbar">
                        <Link to={generateLink(routes.PUBLISHERS)}>
                            <span>Publishers</span>
                        </Link>
                        <Link to={generateLink(routes.BOOKS)}>
                            <span>Books</span>
                        </Link>
                        <Link to={generateLink(routes.AUTHORS)}>
                            <span>Authors</span>
                        </Link>
                        <Link to={generateLink(routes.USERS)}>
                            <span>Users</span>
                        </Link>
                    </div>

                    <Button 
                        text="LOGOUT"
                        clickAction={handleLogOut}
                    />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
