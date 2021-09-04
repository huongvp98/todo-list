import TodoForm from "../TodoPage/TodoForm";
import TodoList from "../TodoPage/TodoList";
import { useEffect, useState } from "react";
import moment from "moment";
import "./style.css";

const Today = moment().format("YYYY-MM-DD");

function Todo() {
  // list data source
  const [todoList, _setTodoList] = useState([
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
  // show bulk action
  const [showBulkAction, setShowBulkAction] = useState(false);
  //sort data on first time render
  useEffect(() => {
    setTodoList();
  }, []);
  // update filtered data when todoList change
  useEffect(() => {
    updateListFilter();
  }, [todoList]);
  // sort task by due date
  const sortListByDueDate = (todoList) => {
    const newTodoList = [...todoList];
    newTodoList.sort((a, b) => moment(a.DueDate) - moment(b.DueDate));
    return newTodoList;
  };
  //update todoList
  const setTodoList = (todos = todoList) => {
    const listSorted = sortListByDueDate(todos);
    _setTodoList(listSorted);
  };
  // update / create task
  const handleSubmit = (payload) => {
    let todoListNew = [...todoList];
    if (payload.Id) {
      //update task
      todoListNew = todoListNew.map((item) =>
        item.Id === payload.Id ? payload : item
      );
    } else {
      // add task and sort
      const listId = (todoList || []).map((item) => item.Id);
      const maxId = Math.max(...listId);
      todoListNew.push({ ...payload, Id: maxId + 1 });
    }
    setTodoList(todoListNew);
  };
  // search task by title
  const onSearch = (todos = todoList) => {
    // all task setlected = false and filter
    const todoListNew = todos.map((item) => {
      return {
        ...item,
        isSelected: false,
      };
    });
    _setTodoList(todoListNew);
  };
  const updateListFilter = (todos = todoList) => {
    // update todoListFiltered and showBulkAction
    const todoListFilteredNew = todos.filter((item) =>
      item.Name.includes(searchValue)
    );
    const showBulkAction = todoListFilteredNew.some((item) => item.isSelected);
    setTodoListFiltered(todoListFilteredNew);
    setShowBulkAction(showBulkAction);
  };
  // remove task
  const onClickRemove = (Id) => {
    const todoListNew = todoList.filter((item) => item.Id !== Id);
    setTodoList(todoListNew);
  };
  // select tasks
  const onSelectedTask = (task, isSelected, index) => {
    const todoListNew = [...todoList];
    todoListNew[index] = { ...task, isSelected };
    _setTodoList(todoListNew);
  };
  // remove tasks
  const onRemoveTasks = () => {
    const listTaskRemove = todoListFiltered.filter((item) => item.isSelected);
    const listIdRemove = listTaskRemove.map((item) => item.Id)
    const todoListNew = todoList.filter(
      (item) => !listIdRemove.includes(item.Id)
    );
    _setTodoList(todoListNew);
  };
  return (
    <div>
      <div className="container wrap-page">
        <div className="row align-items-start border">
          <div className="col-md-5 col-12 new-task">
            <h1 className="text-center pb-3 m-3">New Task</h1>
            <TodoForm handleSubmit={handleSubmit} />
          </div>

          <div className="col-md-7 col-12 list-task border-start">
            {/* <div className = 'wrap-list'> */}
            <TodoList
              todoList={todoListFiltered}
              handleSubmit={handleSubmit}
              onSearch={onSearch}
              onClickRemove={onClickRemove}
              setSearchValue={setSearchValue}
              onSelectedTask={onSelectedTask}
              onRemoveTasks={onRemoveTasks}
              showBulkAction = {showBulkAction}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
