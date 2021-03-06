import React, { useState } from "react";
import PropTypes from "prop-types";
import ItemTodo from "./ItemTodo";
import "./style.css";

function TodoList(props) {
  const onSearch = (e) => {
    e.preventDefault();
    if (props.onSearch) {
      props.onSearch();
    }
  };
  const onRemoveTasks = () => {
    if (props.onRemoveTasks) {
      props.onRemoveTasks();
    }
  };
  return (
    <>
      <div className="wrap-content">
        <div className="container p-3 ">
          <h1 className="text-center pb-3 m-3">Todo List</h1>
          <form onSubmit={onSearch}>
            <input
              placeholder="Search..."
              className="form-control"
              onChange={(e) => props.setSearchValue(e.target.value)}
            />
          </form>
          {(props.todoList || []).map((todo, index) => (
            <div key={index}>
              <ItemTodo
                index={index}
                todo={todo}
                handleSubmit={props.handleSubmit}
                onClickRemove={props.onClickRemove}
                onSelectedTask={props.onSelectedTask}
              />
            </div>
          ))}
        </div>
      </div>
      <footer
        className="row"
        style={{
          display: props.showBulkAction ? "flex" : "none",
        }}
      >
        <span className="col">Bulk Action</span>
        <button
          className="btn btn-primary col-auto "
          style={{ padding: "1px 25px", marginRight: 10 }}
        >
          Done
        </button>
        <button
          type="submit"
          className="btn btn-danger col-auto"
          style={{ padding: "1px 25px" }}
          onClick={onRemoveTasks}
        >
          Remove
        </button>
      </footer>
    </>
  );
}

TodoList.propTypes = {
  onRemoveTasks: PropTypes.func,
  todoList: PropTypes.array,
  onSearch: PropTypes.func,
  showBulkAction: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default TodoList;
