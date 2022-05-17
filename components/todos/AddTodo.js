import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../ui/Card";
import Button from "../ui/Button";
import classes from "./AddTodo.module.css";
import NewTodos from "./NewTodos";
import { sendTodo } from "../../store/todo-actions";

const AddTodo = () => {
  const [isValid, setIsValid] = useState(true);
  const todoInputRef = useRef();
  const dispatch = useDispatch();

  const newTodoSubmitHandler = (event) => {
    event.preventDefault();
    const todoInput = todoInputRef.current.value;
    if (todoInput.trim().length === 0) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    dispatch(sendTodo({ title: todoInput }));
    todoInputRef.current.value = "";
  };

  return (
    <Fragment>
      <Card>
        <form onSubmit={newTodoSubmitHandler}>
          <div
            className={`${classes["form-control"]} ${
              !isValid && classes.invalid
            }`}
          >
            <label>
              <h2>Add New To-Do</h2>
            </label>
            <input type="text" ref={todoInputRef} />
          </div>
          <div className={classes.centered}>
            <Button type="submit">Add To-Do</Button>
          </div>
        </form>
      </Card>
      <NewTodos />
    </Fragment>
  );
};

export default AddTodo;
