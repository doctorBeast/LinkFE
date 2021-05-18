import { useContext, useEffect, useState } from "react";
import {
  ChatSessionHeader,
  MessageDisplayBox,
  ChatSessionFooter,
  TextBox,
  TextBoxContainer,
  TitleLabel,
  MsgLabel,
  DateLabel,
} from "./styles";
import { TextareaAutosize, Button } from "@material-ui/core";
import { ChatPageContext } from "../container";

const ChatSessionView = () => {
  const value = useContext(ChatPageContext);
  const [inputText, setInputText] = useState("");

  // const userId = "1";
  const chatSessionMessages =
    value.chatSessions[value.selectedChatSessionIndex]?.messages;

  const onTextSubmit = () => {
    value.sendNewMsg(inputText);
    setInputText("");
  };

  const getChatTitle = () => {
    const chat = value.chatSessions[value.selectedChatSessionIndex];
    let chatTitle = "Chat Title";
    if (chat.type === "DM") {
      chat.members.forEach((element) => {
        if (element.id !== value.user.id) {
          chatTitle = element.name;
        }
      });
    } else {
      chatTitle = "GROUP";
    }
    return chatTitle;
  };

  const formatAMPM = (strdate) => {
    const date = new Date(strdate);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  return (
    <div
      style={{
        flex: 6,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {value.selectedChatSessionIndex != null ? (
        <>
          <ChatSessionHeader>
            <TitleLabel>{getChatTitle()}</TitleLabel>
          </ChatSessionHeader>
          <MessageDisplayBox>
            {chatSessionMessages.map((msg, index) => {
              const msgAlign =
                msg.creator.id === value.user.id ? "right" : "left";
              const msgDate = new Date(msg.created_date);
              return (
                <TextBoxContainer msgAlign={msgAlign} key={index}>
                  <TextBox>
                    <MsgLabel>{msg.data}</MsgLabel>
                    <br />
                    <DateLabel>{formatAMPM(msg.created_date)}</DateLabel>
                  </TextBox>
                </TextBoxContainer>
              );
            })}
          </MessageDisplayBox>
          <ChatSessionFooter>
            <div style={{ flex: 5 }}>
              <TextareaAutosize
                style={{ width: "100%" }}
                rowsMin={2}
                rowsMax={4}
                fullWidth
                aria-label="maximum height"
                placeholder="Type in Here"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              />
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              <Button variant="contained" onClick={onTextSubmit}>
                Send
              </Button>
            </div>
          </ChatSessionFooter>
        </>
      ) : (
        <div>No Chat Session Selected</div>
      )}
    </div>
  );
};

export default ChatSessionView;
