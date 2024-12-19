import { createHashRouter } from "react-router";
import App from '../view/App';
import AddStudentForm from "../view/AddStudentForm.tsx";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/1",
        element: <AddStudentForm />,
    },
])