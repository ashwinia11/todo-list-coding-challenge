import { useState } from "react";
import classes from "./EditTodo.module.css";

const EditTodo = (props) => {
  const [disable, setDisable] = useState(true);

  const editTodoHandler = (event) => {
    const editedTitle = event.target.value;
    if (props.title.trim() !== editedTitle.trim()) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    props.onEditTitle(editedTitle);
  };

  const udpateTodoHandler = () => {
    props.onUpdate();
  };

  const cancelEditTodoHandler = () => {
    props.onCancelEdit(false);
  };

  return (
    <div>
      <div className={`${classes["form-control"]}`}>
        <input type="text" value={props.title} onChange={editTodoHandler} />
      </div>
      <div className={classes.actions}>
        <button onClick={udpateTodoHandler} disabled={disable}>
          Update
        </button>
        <button onClick={cancelEditTodoHandler}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTodo;
