import React from "react";

import { Container, InputContainer, Label, Input } from "./styles";

function InputField({ label, children, type }) {
  return (
    <Container>
      <Label>
        <p>{label}</p>
      </Label>
      <InputContainer>
        {children}
        <Input type={type} />
      </InputContainer>
    </Container>
  );
}

export default InputField;
