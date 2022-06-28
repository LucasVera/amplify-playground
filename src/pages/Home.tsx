import { css } from "@emotion/css";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { ListTodosQuery, ModelTodoConnection, Todo } from "../API";
import TodoCard from "../components/TodoCard";
import { listTodos } from "../graphql/queries";

function Home() {
  const [todos, setTodos] = useState([] as Array<Todo>);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    try {
      setLoading(true);
      const queryResult = await API.graphql((graphqlOperation(listTodos, { limit: 20 }))) as any;
      const todos = queryResult?.data?.listTodos?.items.map((gqlTodo: Todo) => ({ ...gqlTodo } as Todo));
      setTodos(todos || []);
    }
    catch (ex) {
      console.log('error getting all todos', ex);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1 className={titleStyle}>57b Todos</h1>
      <div className={cardContainerStyle}>
        {loading ? <p>Loading...</p> : todos.map(todo => <TodoCard todo={todo} />)}
        {!loading && todos.length <= 0 && <p>No Todos found...</p>}
      </div>
    </div>
  );
}

export default Home;

const cardContainerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const titleStyle = css({
  textAlign: 'center',
});
