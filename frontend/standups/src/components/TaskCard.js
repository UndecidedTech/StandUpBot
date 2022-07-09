import React, { useState } from "react";
import { Card, Button } from "semantic-ui-react";
import TaskItem from "./TaskItem";

function TaskCard() {
  const [toDos, setToDos] = useState([
    {
      isComplete: false,
      label: "Code",
    },
  ]);

  return (
    <Card>
      <Card.Content>
        <Card.Header>Bran's Task's</Card.Header>
      </Card.Content>
      {toDos &&
        toDos.map((todo) => {
          return <TaskItem todo={todo} />;
        })}
      <Card.Content extra>
        <Button basic color="green">
          Add New Task
        </Button>
      </Card.Content>
    </Card>
  );
}

export default TaskCard;
