import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./Components/MasterLayout/MasterLayout";
import AddCategory from "./Pages/AddCategory";
import AddProducts from "./Pages/AddProducts";
import AddSlider from "./Pages/AddSlider";
import AddUser from "./Pages/AddUser";
import Categories from "./Pages/Categories";
import Dashboard from "./Pages/Dashboard";
import EditCategory from "./Pages/EditCategory";
import EditProduct from "./Pages/EditProduct";
import EditSlider from "./Pages/EditSlider";
import EditUser from "./Pages/EditUser";
// import Home from "./Pages/Home";

import Products from "./Pages/Products";
import Users from "./Pages/Users";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "addslider", element: <AddSlider /> },
        { path: "editslider", element: <EditSlider /> },
        { path: "users", element: <Users /> },
        { path: "adduser", element: <AddUser /> },
        { path: "categories", element: <Categories /> },
        { path: "addcategory", element: <AddCategory/> },
        { path: "editcategory", element: <EditCategory/> },
        { path: "products", element: <Products /> },
        { path: "addproduct", element: <AddProducts /> },
        { path: "editproduct", element: <EditProduct /> },
        { path: "edituser", element: <EditUser /> },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
