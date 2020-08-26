import styled from "styled-components";
import { lighten } from "polished";

export const Container = styled.div`
  width: 300px;
  height: 48px;

  margin-top: 8px;
  margin-bottom: 8px;

  transition: 0.2s;

  color: #284f00;

  &:hover {
    transform: scaleX(1.04);
    color: ${lighten(0.2, "#284f00")};

    svg {
      color: ${lighten(0.2, "#284f00")};
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #284f00;

  transition: 0.2s;

  &:hover {
    border-bottom: 2px solid ${lighten(0.2, "#284f00")};
  }

  svg {
    color: #284f00;
  }
`;

export const Input = styled.input`
  width: 300px;
  border: none;
  margin-left: 2px;

  font-size: 18px;

  color: #41414d;

  &:focus {
    outline: none;
  }
`;

export const Label = styled.div`
  height: 22px;
  font-weight: 500;

  font-family: Roboto, sans-serif;
`;
