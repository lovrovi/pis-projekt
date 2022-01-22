import { generatePath } from "react-router";
import Books from '../components/Books/Books';
import { BooksDetails } from "../components/Books/BooksDetails";
import { CreateBook } from "../components/Books/CreateBook";
import Publishers from "../components/Publishers/Publishers";
import Authors from '../components/Authors/Authors'
import { AuthorsDetails } from '../components/Authors/AuthorsDetails'
import { CreateAuthor } from '../components/Authors/CreateAuthor'
import { Login } from "../components/Login/Login";
import Users from "../components/Users/Users";
import { CreateLoan } from "../components/Loans/CreateLoan";
import Loans from "../components/Loans/Loans";

export const routesConfiguration = {
    PUBLISHERS: {
        id: 'PUBLISHERS',
        path: '/publishers',
        Component: Publishers,
    },
    BOOKS: {
        id: 'BOOKS',
        path: '/books',
        Component: Books,
    },
    BOOK_CREATE: {
        id: 'BOOK_CREATE',
        path: '/books/create',
        Component: CreateBook,
    },
    BOOK_DETAILS: {
        id: 'BOOK_DETAILS',
        path: '/books/:id',
        Component: BooksDetails,
    },
    AUTHORS: {
        id: 'AUTHORS',
        path: '/authors',
        Component: Authors,
    },
    AUTHOR_CREATE: {
        id: 'AUTHOR_CREATE',
        path: '/authors/create',
        Component: CreateAuthor,
    },
    AUTHOR_DETAILS: {
        id: 'AUTHOR_DETAILS',
        path: '/authors/:id',
        Component: AuthorsDetails,
    },
    USERS: {
        id: 'USERS',
        path: '/users',
        Component: Users,
    },
    LOANS: {
        id: 'LOANS',
        path: '/loans',
        Component: Loans,
    },
    LOANS_CREATE: {
        id: 'LOANS_CREATE',
        path: '/loans/create',
        Component: CreateLoan,
    },
    LOGIN: {
        id: 'LOGIN',
        path: '/',
        Component: Login,
    }
}

export function generateLink(routeOrRouteId, params) {
    let route;
    if (typeof routeOrRouteId.id === 'string') {
        route = routesConfiguration[routeOrRouteId.id];
    }
    if (!route) {
        console.error(`Route not found error. Can't generate link for unknown route ${routeOrRouteId}`);
        return '#';
    }
    return generatePath(route.path, params);
}
