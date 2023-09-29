import {
    createBrowserRouter
} from 'react-router-dom'
import Login from './features/pages/login'
import Register from './features/pages/register'
import Validation from './features/pages/validation'
import Home from './features/pages/home'
import Content from './components/Content'

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
    },
    {
        path: "/test",
        element: <Content />
    }
])