import styled from "styled-components";
import { colorPalette } from "../../../../constants/colorpalette";

export const Box1 = styled.div`
  height: 50px;
  width: 100%;
  background-color: ${colorPalette.lightGrey};
`;
export const ChatSidebarHeader = styled.div`
  height: 30px;
  text-align: left;
  padding: 10px 10px;
  background-color: ${colorPalette.primary};
`;

export const Titlediv = styled.div`
  text-align: left;
`;

export const LastMessageDiv = styled.div`
  text-align: left;
  font-style: italic;
  font-size: 12px;
`;
