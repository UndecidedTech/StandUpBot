import { Header, Icon, Button } from "semantic-ui-react";
import TaskList from "./TaskList";

function TaskTracker({ date, onHandleClick, showToDo }) {
    return (
        <>
          <Header as="h1" textAlign="center">
            <Icon name="coffee"/> StandUp - {date}
          </Header>
          <div className="headerButtons">
            <Button onClick={onHandleClick} primary>Create New List</Button>
          </div>
          {showToDo ? 
          <TaskList/> : null}
        </>
    )
}

export default TaskTracker;