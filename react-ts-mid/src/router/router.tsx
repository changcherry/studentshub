import { createHashRouter } from "react-router";
import App from '../view/App';
import AddStudentForm from "../view/AddStudentForm.tsx";
import StudentEdit from "../view/StudentEdit.tsx"; // 新增編輯學生資料頁面
import StudentQuery from "../view/StudentQuery.tsx";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/1",
        element: <AddStudentForm />,
    },
    {
        path: "/2",
        element: <StudentEdit />,
    },
    {
        path: "/3",
        element: <StudentQuery />,
    },
]);

