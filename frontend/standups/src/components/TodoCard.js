// import { MembershipStates } from "discord.js/typings/enums";
import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { HiOutlineTrash } from "react-icons/hi";

function TodoCard({ member, setStandupObj }) {
  const {
    state: { username },
  } = useContext(UserContext);
  const [showForm, setShowForm] = useState(true);
  const [newTaskObj, setNewTaskObj] = useState({
    label: "",
  });

  console.log(member.user.username, username);
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
        "/api/standups/task",
        {
          ...newTaskObj,
          id: member.id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // setMembers based off this return
        console.log("submit: ", res.data);
        setStandupObj(res.data);
      });
  }

  function handleClick(task) {
    console.log(task.id);
  }

  return (
    <CardWrapper>
      <DiscordAviBackground>
        <DiscordAvi background={member.user.avatar} />
        <Username>{member.user.username}</Username>
      </DiscordAviBackground>
      <TaskColumn>
        {member &&
          member.tasks &&
          member.tasks.map((task) => {
            return (
              <TaskItem>
                <input type="checkbox" /> {task.label}{" "}
                <RemoveDefaultButton
                  onClick={() => {
                    handleClick(task);
                  }}
                >
                  <HiOutlineTrash></HiOutlineTrash>
                </RemoveDefaultButton>
              </TaskItem>
            );
          })}
      </TaskColumn>
      {member.user.username === username && (
        <div>
          {showForm ? (
            <CreateTask onClick={handleShowForm}>New Task</CreateTask>
          ) : (
            <NewTaskForm onSubmit={handleSubmit}>
              <label>
                <NewTaskText
                  type="text"
                  name="label"
                  onChange={handleChange}
                  value={newTaskObj.label}
                  placeholder="New Task"
                />
              </label>
              <SubmitButton type="submit">Submit</SubmitButton>
            </NewTaskForm>
          )}
        </div>
      )}
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
  border-radius: 16px;
  border: none;
  background: grey;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 17px;
  &:hover {
    background: green;
  }
  padding: 7px 25px 7px;
`;

const TaskColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TaskItem = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
`;

const RemoveDefaultButton = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  color: grey;
  &:hover {
    color: red;
  }
`;

const NewTaskText = styled.textarea`
  width: 200px;
  height: 25px;
  border-radius: 15px;
  font-family: "Poppins", sans-serif;
`;

const SubmitButton = styled.button`
  border-radius: 16px;
  border: none;
  background: grey;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 17px;
  &:hover {
    background: green;
  }
  padding: 4px 15px 4px;
`;

const NewTaskForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
`;
