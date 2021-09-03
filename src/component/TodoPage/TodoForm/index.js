import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { PRIORITY_DEFAULT } from "../../../common/const";

const Today = moment().format("YYYY-MM-DD");
const defaultTodo = {
  DueDate: Today,
  Priority: PRIORITY_DEFAULT,
  Name: "",
  Description: "",
};
const fieldRequired = ["Name"];

function TodoForm(props) {
  const [formData, setFormData] = useState(props?.todo);
  const [invalid, setInvalid] = useState({});
  // update form when props form change
  useEffect(() => {
    setFormData(props?.todo);
  }, [props.todo]);
  // update field of form
  const onChangeForm = (e, field) => {
    const formDataNew = { ...formData };
    formDataNew[field] = e.target.value;
    setFormData(formDataNew);
    // set validate required
    const newInvalid = {...invalid};
    newInvalid[field] = e.target.value ? false : true
    setInvalid(newInvalid)
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = formData;
    //check validate
    const newInvalid = { ...invalid };
    let ValidForm = true;
    fieldRequired.forEach((field) => {
      newInvalid[field] = payload[field] ? false : true;
      ValidForm = ValidForm && !newInvalid[field];
    });
    if (!ValidForm) {
      setInvalid(newInvalid);
      return;
    }
    // handle submit
    if (props.onCloseDetail) {
      props.onCloseDetail();
    }
    props.handleSubmit(payload);
    if (!payload.Id) {
      setFormData(defaultTodo);
    }
  };

  return (
    <div className="container px-4 pt-3">
      <form>
        {/* <div className="row  gx-5"> */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            // id="exampleInputEmail1"
            // aria-describedby="emailHelp"
            placeholder="Add new task..."
            value={formData?.Name}
            onChange={(e) => onChangeForm(e, "Name")}
          />
          {invalid?.Name ? (
            <p className="text-danger">This field is required.</p>
          ) : null}
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Description
          </label>
          <textarea
            // type="text-area"
            className="form-control"
            value={formData?.Description}
            onChange={(e) => onChangeForm(e, "Description")}
            // id="exampleInputPassword1"
          />
        </div>
        <div className="row">
          <div className="mb-3 col-12 col-sm-6 col-md-12">
            <label for="exampleInputPassword1" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              value={formData?.DueDate}
              onChange={(e) => onChangeForm(e, "DueDate")}
              min={Today}
            />
          </div>
          <div className="mb-3 col-12 col-sm-6 col-md-12">
            <label for="exampleInputPassword1" className="form-label">
              Priority
            </label>
            {/* <input
              type="date"
              className="form-control"
              // id="exampleInputEmail1"
              // aria-describedby="emailHelp"
            /> */}
            <select
              class="form-select"
              aria-label="Default select example"
              placeholder=""
              value={formData?.Priority}
              onChange={(e) => onChangeForm(e, "Priority")}
            >
              <option value="1">Low</option>
              <option value="2" selected>
                Normal
              </option>
              <option value="3">High</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-success form-control mt-3"
            style={{ backgroundColor: "#2eb85c" }}
            onClick={handleSubmit}
          >
            {formData?.Id ? "Update" : "Add"}
          </button>
        </div>

        {/* <Button color="success">success</Button> */}
        {/* </div>   */}
      </form>
    </div>
  );
}

TodoForm.propTypes = {
  todo: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCloseDetail: PropTypes.func,
};

TodoForm.defaultProps = {
  todo: defaultTodo,
  handleSubmit: null,
  onCloseDetail: null,
};

export default TodoForm;
