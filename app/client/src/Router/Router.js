import React from 'react'
import { Switch } from 'react-router-dom'
import Publishers from '../components/Publishers/Publishers'
import Books from '../components/Books/Books'
import Authors from '../components/Authors/Authors'
import { BooksDetails } from '../components/Books/BooksDetails'
import { AuthorsDetails } from '../components/Authors/AuthorsDetails'
import { CreateBook } from '../components/Books/CreateBook'
import { CreateAuthor } from '../components/Authors/CreateAuthor'
import PrivateRoute from './PrivateRoute'

const Router = () => {
    return (
        <div>
            <Switch>
                <PrivateRoute path="/publishers" component={Publishers} />
                <PrivateRoute path="/books/create" component={CreateBook} />
                <PrivateRoute path="/books/:id" component={BooksDetails} />
                <PrivateRoute path="/books" component={Books} />
                <PrivateRoute path="/authors/create" component={CreateAuthor} />
                <PrivateRoute path="/authors/:id" component={AuthorsDetails} />
                <PrivateRoute path="/authors" component={Authors} />
            </Switch>
        </div>
    )
}

export default Router
