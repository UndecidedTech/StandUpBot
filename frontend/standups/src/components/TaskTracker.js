import { Header, Icon, Button, calendar } from "semantic-ui-react";
import TodoContainer from "./TodoContainer";

function TaskTracker({ date, onHandleClick, showToDo }) {
  return (
    <>
      <Header as="h1" textAlign="center">
        <Icon name="coffee" /> StandUp
      </Header>
      <div id="calendar-date">Today's Date: {date}</div>
      <div className="headerButtons">
        <Button onClick={onHandleClick} primary>
          Create New List
        </Button>
      </div>
      {showToDo ? <TodoContainer /> : null}
    </>
  );
}

export default TaskTracker;
