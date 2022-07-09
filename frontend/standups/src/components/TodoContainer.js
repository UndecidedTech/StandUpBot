import React from "react";
import { Grid } from "semantic-ui-react";
import TodoCard from "./TodoCard";

function TodoContainer() {
  return (
    <div className="taskGrid">
      <Grid divided="vertically">
        <Grid.Row columns={1}>
          <Grid.Column>
            <TodoCard />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default TodoContainer;
