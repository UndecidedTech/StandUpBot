import React from "react";
import { Grid } from "semantic-ui-react";
import TaskCard from "./TaskCard";

function TaskList() {
  return (
    <div className="taskGrid">
      <Grid divided="vertically">
        <Grid.Row columns={1}>
          <Grid.Column>
            <TaskCard />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default TaskList;
