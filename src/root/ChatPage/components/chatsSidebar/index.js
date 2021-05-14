import React, { useContext } from "react";
import { List, ListItem } from "@material-ui/core";
import {
  Box1,
  ChatSidebarHeader,
  SidebarListItem,
  Titlediv,
  LastMessageDiv,
} from "./styles";
import { ChatPageContext } from "../container/index";

const ChatsSidebar = () => {
  const value = useContext(ChatPageContext);

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
          {value.chatSessions.map((chat, i) => {
            let chatTitle = "";
            if (chat.type === "DM") {
              chat.members.forEach((element) => {
                if (element.id !== value.user.id) {
                  chatTitle = element.name;
                }
              });
            } else {
              chatTitle = "GROUP";
            }
            return (
              <Box1 key={i} onClick={() => value.selectChatSession(i)}>
                <Titlediv>{chatTitle}</Titlediv>
                <LastMessageDiv>
                  <label>{chat.messages[0].data}</label>
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
