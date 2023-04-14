import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import SinglePage from "../pages/SinglePage";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <HomePage />,
                index: true
            },
            {
                path: "/product/:id",
                element: <SinglePage />
            },
            {
                path: "/tags/:name",
                element: <HomePage />
            }
        ]
    }
]);

export default router;