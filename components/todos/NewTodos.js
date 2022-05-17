import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./NewTodos.module.css";
import NewTodoItem from "./NewTodoItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import Card from "../ui/Card";
import { fetchTodos } from "../../store/todo-actions";

const NewTodos = () => {
  const isLoading = useSelector((state) => state.todo.isLoading);
  const noItemsFound = useSelector((state) => state.todo.noItemsFound);
  const todoItems = useSelector((state) => state.todo.todoItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Fragment>
      {todoItems && (
        <Card className={classes.todos}>
          {isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && noItemsFound && (
            <div className="centered">
              <h3>No Items Found !</h3>
            </div>
          )}
          {!isLoading && !noItemsFound && (
            <ul>
              {todoItems.map((data) => (
                <NewTodoItem
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  status={data.status}
                />
              ))}
            </ul>
          )}
        </Card>
      )}
    </Fragment>
  );
};

export default NewTodos;
