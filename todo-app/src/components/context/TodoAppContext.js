import { createContext, useState } from "react";

export const TodoAppContext = createContext();

export function TodoAppContextProvider({ children, ...otherProps }) {
  const [todoList, setTodoList] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterDateRange, setFilterDateRange] = useState(null);
  return (
    <TodoAppContext.Provider
      value={{
        todoList,
        setTodoList,
        filterTitle,
        setFilterTitle,
        filterDateRange,
        setFilterDateRange,
        ...otherProps
      }}
    >
      {children}
    </TodoAppContext.Provider>
  );
}
