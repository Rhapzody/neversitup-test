import  { useContext, useMemo } from "react";
import { TodoAppContext } from "../context/TodoAppContext";
import moment from 'moment'

function useTodoList() {
  const {
    todoList,
    filterTitle,
    filterDateRange,
  } = useContext(TodoAppContext);

  const filteredTodoList = useMemo(()=>{
    return todoList.filter(todo => {
        const isTitleIncluded = todo.title.toLowerCase().includes(filterTitle.toLowerCase())
        const createDateTime = !filterDateRange ? null : moment(new Date(todo.createdAt))
        const startDateTime = !filterDateRange ? null : moment(filterDateRange[0].toDate())
        const endDateTime = !filterDateRange ? null : moment(filterDateRange[1].toDate())
        console.log({ createDateTime, startDateTime, endDateTime });
        const isInDateRange = !filterDateRange ? true : (
            (createDateTime.isAfter(startDateTime) || createDateTime.isSame(startDateTime)) &&
            (createDateTime.isBefore(endDateTime) || createDateTime.isSame(endDateTime))
        )
        return (isTitleIncluded && isInDateRange)
    })
  }, [filterTitle, filterDateRange, todoList])

  return {
    todoList,
    filteredTodoList
  }
}

export default useTodoList;
