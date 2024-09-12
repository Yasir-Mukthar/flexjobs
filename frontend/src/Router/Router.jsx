import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProtectedRoute, { PublicRoute } from './ProtectedRoute';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import PostJob from '../Pages/PostJob';
import MyJobs from '../Pages/MyJobs';
import UpdateJob from '../Pages/UpdateJob';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <PublicRoute element={<Login />} />,
      },
      {
        path: '/signup',
        element: <PublicRoute element={<SignUp />} />,
      },
      {
        path: '/post-job',
        element: <ProtectedRoute element={<PostJob />} />,
      },
      {
        path: '/my-job',
        element: <ProtectedRoute element={<MyJobs />} />,
      },
      {
        path: 'edit-job/:id',
        element: <ProtectedRoute element={<UpdateJob />} />,
        loader: ({ params }) => fetch(`http://localhost:8000/all-job/${params?.id}`),
      },
    ],
  },
]);

export default router;
