import {
    createBrowserRouter
} from 'react-router-dom'
import Login from './features/pages/login'
import Register from './features/pages/register'
import Validation from './features/pages/validation'
import Home from './features/pages/home'

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register", 
        element: <Register />
    },
    {
        path: "/validate",
        element: <Validation />
    },
    {
        path: "/home",
        element: <Home />
    }
])