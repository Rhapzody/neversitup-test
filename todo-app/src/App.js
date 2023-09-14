
import { TodoAppContextProvider } from "./components/context/TodoAppContext";
import LoginPage from "./components/pages/LoginPage";
import TodoListPage from "./components/pages/TodoListPage";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { isAuth } from "./utils/auth";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      if (!isAuth()) {
        return redirect("/login");
      }
      return null;
    },
    Component: TodoListPage,
  },
  {
    path: "/login",
    loader() {
      if (isAuth()) {
        return redirect("/");
      }
      return null;
    },
    Component: LoginPage,
  },
]);

function App() {
  return (
    <TodoAppContextProvider>
      <RouterProvider router={router} />
    </TodoAppContextProvider>
  );
}

export default App;
