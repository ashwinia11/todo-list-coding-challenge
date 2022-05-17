import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";

const Todos = (props) => {
  const { todos } = props;
  return (
    <section className={classes.todos}>
      <h2>All To-Dos</h2>
      <ul>
        {todos.map((data) => (
          <TodoItem
            key={data.id}
            id={data.id}
            title={data.title}
            status={data.status}
          />
        ))}
      </ul>
    </section>
  );
};

export default Todos;
