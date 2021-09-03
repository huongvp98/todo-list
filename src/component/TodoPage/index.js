import TodoForm from "../TodoPage/TodoForm";
import TodoList from "../TodoPage/TodoList";
import { useEffect, useState } from "react";
import moment from "moment";

const Today = moment().format("YYYY-MM-DD");

function Todo() {
  // list data source
  const [todoList, setTodoList] = useState([
    {
      Id: 1,
      Name: "Do homework",
      Description: "Do homework",
      DueDate: Today,
      Priority: 2,
    },
    {
      Id: 2,
      Name: "Do housework",
      Description: "Do housework",
      DueDate: Today,
      Priority: 2,
    },
    {
      Id: 3,
      Name: "Learn something",
      Description: "Learn something",
      DueDate: Today,
      Priority: 2,
    },
  ]);
  // list data search by title
  const [todoListFiltered, setTodoListFiltered] = useState(todoList);
  // search value
  const [searchValue, setSearchValue] = useState("");
  //list data selected
  const [selectedTask, setSelectedTask] = useState([]);
  useEffect(() => {
    const newTodoList = sortListByDueDate(todoList);
    setTodoList(newTodoList);
    onSearch(newTodoList);
  }, []);
  // sort task by due date
  const sortListByDueDate = (todoList) => {
    const newTodoList = [...todoList];
    newTodoList.sort((a, b) => moment(a.DueDate) - moment(b.DueDate));
    onSearch(newTodoList);
    return newTodoList;
  };
  // update / create task
  const handleSubmit = (payload) => {
    let todoListNew = [...todoList];
    if (payload.Id) {
      todoListNew = todoListNew.map((item) =>
        item.Id === payload.Id ? payload : item
      );
    } else {
      const listId = (todoList || []).map((item) => item.Id);
      const maxId = Math.max(...listId);
      todoListNew.push({ ...payload, Id: maxId + 1 });
    }
    todoListNew = sortListByDueDate(todoListNew);
    setTodoList(todoListNew);
    onSearch(todoListNew);
  };
  // search task by title
  const onSearch = (todos = todoList) => {
    const todoListFilteredNew = todos.filter((item) =>
      item.Name.includes(searchValue)
    );
    setTodoListFiltered(todoListFilteredNew);
  };
  // remove task
  const onClickRemove = (Id) => {
    const todoListNew = todoList.filter((item) => item.Id !== Id);
    setTodoList(todoListNew);
    onSearch(todoListNew);
  };
  // select tasks
  const onSelectedTask = (task, isSelect) => {
    if (isSelect) {
      const newSelectedTask = [...selectedTask];
      newSelectedTask.push(task);
      setSelectedTask(newSelectedTask);
    } else {
      let newSelectedTask = [...selectedTask];
      newSelectedTask = newSelectedTask.filter((item) => item.Id !== task.Id);
      setSelectedTask(newSelectedTask);
    }
  };
  // remove tasks
  const onRemoveTasks = () => {
    const listIdRemove = selectedTask.map((item) => item.Id);
    const todoListNew = todoList.filter(
      (item) => !listIdRemove.includes(item.Id)
    );
    setTodoList(todoListNew);
    onSearch(todoListNew);
  };
  return (
    <div>
      <div className="container">
        <div className="row align-items-start border">
          <div className="col-md-5 col-12 new-task">
            <h1 className="text-center pb-3 m-3">New Task</h1>
            <TodoForm handleSubmit={handleSubmit} />
          </div>

          <div className="col-md-7 col-12 list-task border-start">
            {/* <div className = 'wrap-list'> */}
              <h1 className="text-center pb-3 m-3">Todo List</h1>
              <TodoList
                todoList={todoListFiltered}
                handleSubmit={handleSubmit}
                onSearch={onSearch}
                onClickRemove={onClickRemove}
                setSearchValue={setSearchValue}
                onSelectedTask={onSelectedTask}
                onRemoveTasks={onRemoveTasks}
                showBulkAction={selectedTask?.length}
              />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
