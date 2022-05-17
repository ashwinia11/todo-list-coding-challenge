import Card from "../ui/Card";
import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
  const { id, title, status } = props;
  let isPending = false;

  if (status === "pending") {
    isPending = true;
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <p>{title}</p>
          <div className={`${classes.status} ${isPending && classes.pending}`}>
            {status}
          </div>
        </header>
      </Card>
    </li>
  );
};

export default TodoItem;
