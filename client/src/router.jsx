import {
    createBrowserRouter
} from 'react-router-dom'
import Login from './features/pages/login'
import Register from './features/pages/register'
import Validation from './features/pages/validation'
import Home from './features/pages/home'
import CategoryPage from './features/pages/category'
import Message from './features/pages/message'
// import Content from './components/category'

export const router = createBrowserRouter([
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
        element: <Home />,
        children: [
            {
                path: ":id",
                element: <CategoryPage />,
                children:[
                    {
                        path:":idcat",
                        element: <Message />
                    }
                ]
             
            },
          
        ]
    },
 
])