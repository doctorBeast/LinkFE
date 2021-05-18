import styled from "styled-components";
import { colorPalette } from "../../../../constants/colorpalette";

export const ChatSessionHeader = styled.div`
  min-height: 30px;
  background-color: ${colorPalette.primary};
  text-align: left;
  padding: 10px 10px;
`;

export const TitleLabel = styled.div`
  text-transform: capitalize;
  margin-top: 5px;
`;

export const MessageDisplayBox = styled.div`
  background-color: ${colorPalette.secondary};
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
`;

export const ChatSessionFooter = styled.div`
  background-color: ${colorPalette.primary};
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

export const TextBoxContainer = styled.div`
  text-align: ${({ msgAlign }) => msgAlign};
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: ${({ msgAlign }) =>
    msgAlign === "left" ? "flex-start" : "flex-end"};
`;

export const TextBox = styled.div`
  border: 1px solid ${colorPalette.primary};
  max-width: 60%;
  min-height: 30px;
  padding: 5px 10px;
  background-color: ${colorPalette.lightGrey};
  border-radius: 5px;
  margin: 0px 5px;
`;

export const MsgLabel = styled.label``;

export const DateLabel = styled.label`
  font-size: 8px;
`;
