import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./NewTodoItem.module.css";
import EditTodo from "./EditTodo";
import { updateTodo, deleteTodo } from "../../store/todo-actions";

const NewTodoItem = (props) => {
  const { id, title, status } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);
  const [checked, setChecked] = useState(status === "completed");
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (status === "pending" && checked) ||
      (status === "completed" && !checked)
    ) {
      dispatch(
        updateTodo({ id: id, updatedStatus: checked ? "completed" : "pending" })
      );
    }
  }, [status, checked, dispatch, id]);

  const checkboxChangeHandler = (event) => {
    setChecked((prevState) => !prevState);
  };
  const editTodoHandler = () => {
    setIsEditing(true);
  };
  const updateTodoHandler = () => {
    setIsEditing(false);
    dispatch(updateTodo({ id: id, updatedTitle: todoTitle }));
  };
  const deleteTodoHandler = () => {
    dispatch(deleteTodo({ id: id }));
  };
  return (
    <Fragment>
      <li className={classes.item}>
        {!isEditing && (
          <div className={classes.details}>
            <label className={classes.container}>
              <input
                type="checkbox"
                onChange={checkboxChangeHandler}
                checked={checked}
              />
              <span className={classes.checkmark}></span>
              <div>{title}</div>
            </label>

            <div className={classes.actions}>
              <button onClick={editTodoHandler}>Edit</button>
              <button onClick={deleteTodoHandler}>Delete</button>
            </div>
          </div>
        )}
        {isEditing && (
          <EditTodo
            title={todoTitle}
            onEditTitle={setTodoTitle}
            onCancelEdit={setIsEditing}
            onUpdate={updateTodoHandler}
          />
        )}
      </li>
    </Fragment>
  );
};

export default NewTodoItem;
