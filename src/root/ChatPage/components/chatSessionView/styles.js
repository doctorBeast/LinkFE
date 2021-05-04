import styled from "styled-components";
import { colorPalette } from "../../../../constants/colorpalette";

export const ChatSessionHeader = styled.div`
  height: 50px;
  background-color: ${colorPalette.primary};
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
