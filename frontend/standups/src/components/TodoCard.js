// import { MembershipStates } from "discord.js/typings/enums";
import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

function TodoCard({ member }) {
  const {
    state: { standupId },
  } = useContext(UserContext);
  const [showForm, setShowForm] = useState(true);
  const [newTaskObj, setNewTaskObj] = useState({
    label: "",
  });

  function handleShowForm() {
    setShowForm(!showForm);
  }

  function handleChange(e) {
    setNewTaskObj({ [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/standups/task",
        {
          ...newTaskObj,
          standupId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // setMembers based off this return
        console.log("submit: ", res.data);
      });
  }

  return (
    <CardWrapper>
      <DiscordAviBackground>
        <DiscordAvi background={member.user.avatar} />
        <Username>{member.user.username}</Username>
      </DiscordAviBackground>
      <div>
        {member &&
          member.tasks &&
          member.tasks.map((task) => {
            return (
              <label>
                <input type="checkbox" /> {task.label}
              </label>
            );
          })}
      </div>
      <div>
        {showForm ? (
          <CreateTask onClick={handleShowForm}>New Task</CreateTask>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              New Task:
              <input
                type="text"
                name="label"
                onChange={handleChange}
                value={newTaskObj.label}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )}
      </div>
    </CardWrapper>
  );
}

export default TodoCard;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 375px;
  grid-template-rows: 210px 210px 80px;
  grid-template-areas: "image" "text" "stats";
  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  text-align: center;
`;

const DiscordAvi = styled.div`
  grid-area: image;
  background-image: url(${({ background }) => background});
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-size: cover;
  border-radius: 100px;
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Username = styled.h2`
  margin-top: 0px;
  font-size 25px;
  box-sizing: border-box;
  min-width: 0px;
  line-height: 1.2;
  margin: 0px;
  background-clip: text;
  font-family: "Poppins", sans-serif;
  color: white;
`;

const DiscordAviBackground = styled.div`
  background-color: #2c2f33;
  border-radius: 18px 18px 0px 0px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
`;

const CreateTask = styled.button`
  border-radius: 18px;
  background: transparent;
  color: green;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
`;
