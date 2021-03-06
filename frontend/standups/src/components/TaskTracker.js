import { Button } from "semantic-ui-react";
import TodoCard from "./TodoCard";
import styled from "styled-components";
import { SiCoffeescript } from "react-icons/si";

function TaskTracker({ date, onHandleClick, members }) {
  return (
    <>
      <Heading>
        <SiCoffeescript />
        Standup
      </Heading>
      <div id="calendar-date">
        <TodaysDate>Today's Date: {date}</TodaysDate>
      </div>
      <div className="headerButtons">
        <Button onClick={onHandleClick} primary>
          Join Standup
        </Button>
      </div>
      <CardContainer>
        {members &&
          members.map((member) => {
            return <TodoCard member={member} />;
          })}
      </CardContainer>
    </>
  );
}

export default TaskTracker;

const CardContainer = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  overflow: hidden;
`;

const TodaysDate = styled.h2`
  font-size: 20px;
  text-align: center;
  font-family: "poppins", sans-serif;
`;

const Heading = styled.h1`
  text-align: center;
  font-family: "poppins", sans-serif;
`;
