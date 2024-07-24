import { createBrowserRouter as Router , RouterProvider } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';
export const Url = "https://passwordreset-bb6e.onrender.com/";


const routes = Router([
  {
    path:"/",
    element:<Login/>
  },{
    path:"/Signup",
    element:<Signup/>
  },{
    path:"/ForgotPassword",
    element:<ForgotPassword/>
  },{
    path:"/ResetPassword/:id/:pin/:token",
    element:<ResetPassword/>
  },{
    path:"/Dashboard",
    element:<Dashboard/>
  },{
    path:"*",
    element:<ErrorPage/>
  }
])

function App() {

  return (
    <>
    <RouterProvider router={routes}/>
    <ToastContainer/>
    </>
  )
}

export default App
