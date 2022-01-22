import React from 'react'
import BooksTable from './BooksTable'
import './Books.css'
import { useState } from 'react'
import { getBooks } from '../../redux/actions/books/books'
import { SearchContainer } from '../../containers/SearchContainer/SearchContainer'
import Button from '@material-ui/core/Button'
import { Title } from '../../containers/Title/Title'
import { Link } from 'react-router-dom'
import { generateLink, routesConfiguration as routes } from '../../Router/routes'
import { isAdmin } from '../../customHooks/isAdmin'

const Books = () => {
    const [searchValue, setSearchValue] = useState("")

    const onChange = (e) => {
        setSearchValue(e.target.value)
    }
    return (
        <div className="books">
            <div className="booksHeader">
                <div className="booksHeaderTitle">
                    <Title
                        label="Books"
                    />
                </div>
                <div className="booksHeaderSection">
                    <Link to={generateLink(routes.BOOK_CREATE)}>
                        {
                            isAdmin() &&
                            <Button variant="contained" color="primary">
                                Add
                            </Button>
                        }
                    </Link>
                    <SearchContainer
                        value={searchValue}
                        name="searchValue"
                        handleChange={onChange}
                        searchAction={getBooks}
                    />
                </div>
            </div>
            <BooksTable searchValue={searchValue} />
        </div>
    )
}

export default Books
