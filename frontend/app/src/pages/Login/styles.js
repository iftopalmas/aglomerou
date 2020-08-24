import styled from "styled-components";
import { lighten, darken } from "polished";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d6d6d7;
`;

export const Content = styled.div`
  padding: 0;
  width: 1240px;
  height: 700px;

  background-color: #fff;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "form splash splash";

  border-radius: 24px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  grid-area: form;
  background-color: white;

  border-radius: 24px 0 0 24px;

  img {
    max-width: 340px;
    margin-bottom: 32px;
  }

  h3 {
    margin-bottom: 32px;
    color: #41414d;
  }

  button {
    width: 300px;
    height: 40px;
    margin-top: 32px;

    font-size: 22px;
    font-weight: 600;
    color: white;

    border-radius: 16px;

    background-color: #284f00;
    border: none;
    outline: none;

    transition: 0.2s;

    &:hover {
      background-color: ${lighten(0.05, "#284f00")};
    }
  }
`;

export const CreateAccountButton = styled.div`
  margin-top: 32px;

  display: flex;
  align-items: center;

  a {
    font-size: 20px;
    text-decoration: none;
    color: #41414d;
    margin-left: 2px;

    &:hover {
      color: #284f00;
    }
  }
`;

export const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  grid-area: splash;
  background-color: #284f00;
  border-radius: 0 24px 24px 0;

  h2 {
    color: white;
    width: 500px;
    font-family: Poppins;
    font-weight: bold;
    text-align: center;
    font-size: 40px;

    margin: 20px;
  }

  img {
    width: 620px;
  }
`;
