import { Fragment } from "react";
import Head from "next/head";
import Todos from "../components/todos/Todos";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Todos</title>
        <meta
          name="description"
          content="Become focused, organized, and calm with React Todos."
        ></meta>
      </Head>
      <Todos todos={props.todos} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://gorest.co.in/public/v1/todos");
  const result = await response.json();

  return {
    props: { todos: result.data },
  };
}

export default HomePage;
