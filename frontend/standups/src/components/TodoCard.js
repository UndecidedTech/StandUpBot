import React from "react";
import styled from "styled-components";

function TodoCard() {
  return (
    <CardWrapper>
      <DiscordAvi
        background={
          "https://www.howtogeek.com/wp-content/uploads/2021/07/Discord-Logo-Lede.png?height=200p&trim=2,2,2,2&crop=16:9"
        }
      />
      <Username>Bran</Username>
      <div>
        <label>
          <input type="checkbox" /> Do the dishes
        </label>
      </div>
    </CardWrapper>
  );
}

export default TodoCard;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px;
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
`;
