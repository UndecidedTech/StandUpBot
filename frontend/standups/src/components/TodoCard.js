import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import Todo from "./Todo";
import { getTodos } from "../request-api/api";

function TodoCard() {
  const [toDos, setToDos] = useState(undefined);

  useEffect(() => {
    getTodos().then((data) => {
      setToDos(data);
    });
  }, []);

  function handleTaskCheckbox(todo) {
    const updatedTodos = toDos.map((cTodo) => {
      if (todo.id === cTodo.id) {
        cTodo.completed = !cTodo.completed;
        return cTodo;
      } else {
        return cTodo;
      }
    });
    setToDos(updatedTodos);
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>Bran's Task's</Card.Header>
      </Card.Content>
      {toDos &&
        toDos.map((todo) => {
          return <Todo onHandleTaskCheckbox={handleTaskCheckbox} todo={todo} />;
        })}
      <Card.Content extra>
        <Button basic color="green">
          Add New Task
        </Button>
      </Card.Content>
    </Card>
  );
}

export default TodoCard;
