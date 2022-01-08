import './Authors.css'
import AuthorsTable from './AuthorsTable'
import { useState } from 'react'
import { SearchContainer } from '../../containers/SearchContainer/SearchContainer'
import { getAuthors } from '../../redux/actions/authors/authors'
import { Title } from '../../containers/Title/Title'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {generateLink, routesConfiguration as routes} from '../../Router/routes'

const Authors = () => {
    const [searchValue, setSearchValue] = useState("")

    const onChange = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="authors">
            <div className="authorsHeader">
                <div className="authorsHeaderTitle">
                    <Title
                        label="Authors"
                    />
                </div>
                <div className="authorsHeaderSection">
                    <Link to={generateLink(routes.AUTHOR_CREATE)}>
                        <Button variant="contained" color="primary">
                            Add
                        </Button>
                    </Link>
                    <SearchContainer
                        value={searchValue}
                        name="searchValue"
                        handleChange={onChange}
                        searchAction={getAuthors}
                    />
                </div>
            </div>
            <AuthorsTable value={searchValue} />
        </div>
    )
}

export default Authors
