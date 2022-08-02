import React from "react";
import styled from "styled-components";
import { SiDiscord } from "react-icons/si";

const { REACT_APP_MY_ENV } = process.env;

function LoginPage() {
  return (
    <StyledHomePage>
      <a href={`${REACT_APP_MY_ENV ? "" : "http://localhost:5000"}/api/auth`}>
        <StyledLoginButton>
          <SiDiscord />
          Login with Discord
        </StyledLoginButton>
      </a>
    </StyledHomePage>
  );
}

export default LoginPage;

const StyledHomePage = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLoginButton = styled.button`
  background: #3b77d9;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 25px;
  border-radius: 10px;
  font-weight: 700;
  border: none;
`;
