import React from "react";
import { ArrowBack } from "styled-icons/boxicons-regular";
import { Mail, Lock } from "styled-icons/entypo";

import InputField from "../../components/InputField";

import {
  Container,
  Content,
  FormContainer,
  CreateAccountButton,
  SplashContainer,
} from "./styles";

import Logo from "../../assets/aglomerou.png";
import Splash from "../../assets/splash.svg";

function Login() {
  return (
    <Container>
      <Content>
        <FormContainer>
          <img src={Logo} alt="Aglomerou" />
          <h3>Bem-vindo de volta!</h3>
          <InputField label="email" type="text">
            <Mail size={18} />
          </InputField>

          <InputField label="senha" type="password">
            <Lock size={18} />
          </InputField>

          <button type="submit">Entrar</button>
          <CreateAccountButton>
            <ArrowBack size={22} color="#284F00" />
            <a href="2">Criar uma conta gratuita</a>
          </CreateAccountButton>
        </FormContainer>

        <SplashContainer>
          <h2>Vamos ajudar no combate à covid-19!</h2>
          <img src={Splash} alt="Aglomerou" />
        </SplashContainer>
      </Content>
    </Container>
  );
}

export default Login;
