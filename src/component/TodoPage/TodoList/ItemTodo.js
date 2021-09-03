import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoForm from "../TodoForm";

function ItemTodo(props) {
  const [showDetail, setShowDetail] = useState(false);
  const onClickDetail = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div>
      <div class="card mt-3">
        <div class="card-header row">
          <div class="form-check col col">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) =>
                props.onSelectedTask(props.todo, e.target.checked)
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              {props.todo.Name}
            </label>
          </div>
          <div className="d-flex col-sm-12 col-12 col-lg-auto">
            <button
              className="btn btn-info"
              style={{ padding: 0, marginRight: 10, width: 80 }}
              onClick={onClickDetail}
            >
              Detail
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              style={{ padding: 0, width: 80 }}
              onClick={() => props.onClickRemove(props.todo.Id)}
            >
              Remove
            </button>
          </div>
        </div>
        <div
          class="card-body"
          style={{ display: showDetail ? "block" : "none" }}
        >
          <TodoForm {...props} onCloseDetail={onClickDetail} />
        </div>
      </div>
    </div>
  );
}

ItemTodo.propTypes = {};

export default ItemTodo;
