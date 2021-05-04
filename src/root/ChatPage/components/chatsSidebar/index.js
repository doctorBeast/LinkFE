import React from "react";
import { List, ListItem } from "@material-ui/core";
import {
  Box1,
  ChatSidebarHeader,
  SidebarListItem,
  Titlediv,
  LastMessageDiv,
} from "./styles";

const ChatsSidebar = () => {
  const chatsList = [
    {
      title: "ABC",
      last_message: "This is the message from ",
      modified_date: new Date("1982-03-03"),
    },
    {
      title: "D",
      last_message: "This is the message from D",
      modified_date: new Date("1982-03-21"),
    },
    {
      title: "E",
      last_message: "This is the message from E",
      modified_date: new Date("1982-05-05"),
    },
    {
      title: "F",
      last_message: "This is the message from F",
      modified_date: new Date("1982-07-28"),
    },
  ];

  return (
    <div style={{ flex: 2 }}>
      <ChatSidebarHeader>
        <label>LINK</label>
      </ChatSidebarHeader>
      <div>
        Here will come the list of chats
        <List>
          {chatsList.map((chat) => {
            return (
              <Box1>
                <Titlediv>{chat.title}</Titlediv>
                <LastMessageDiv>
                  <label>{chat.last_message}</label>
                </LastMessageDiv>
              </Box1>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default ChatsSidebar;
