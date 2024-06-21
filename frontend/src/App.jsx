import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import EmpLists from './pages/EmpDetails/EmpDetails';
import EmpEdit from './pages/EmpEdit/EmpEdit';


function App() {

  const Layout = () => {
    return (
      <div className="container">

        <Navbar />
          <Outlet />
        {/* <Footer /> */}

      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/employees",
          element: <EmpLists />,
        },
        {
          path: "/employeedit/:id",
          element: <EmpEdit />,
        },
        // {
        //   path: "/feature",
        //   element: (
        //     <ProtectedRoutes isAuthenticated={user}>
        //       <Feature />
        //     </ProtectedRoutes>
        //   ),
        // },
        // {
        //   path: "/drag",
        //   element: <Drag />,
        // },
      ],
    },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Home />
    }
  ]);

  return <RouterProvider router={router} />;
}



export default App
