import { useContext, useEffect, useState } from "react";
import {
  ChatSessionHeader,
  MessageDisplayBox,
  ChatSessionFooter,
} from "./styles";
import { TextareaAutosize, Button } from "@material-ui/core";
import { ChatPageContext } from "../container";

const ChatSessionView = () => {
  const value = useContext(ChatPageContext);
  const [inputText, setInputText] = useState("");

  // const userId = "1";
  const chatSessionMessages =
    value.chatSessions[value.selectedChatSessionIndex]?.messages;

  return (
    <div style={{ flex: 6, display: "flex", flexDirection: "column" }}>
      {value.selectedChatSessionIndex != null ? (
        <>
          <ChatSessionHeader>
            This is the header for Chat Session
          </ChatSessionHeader>
          <MessageDisplayBox>
            This is the message display box
            {chatSessionMessages.map((msg, index) => {
              const msgAlign =
                msg.creator.id === value.user.id ? "right" : "left";
              return (
                <div
                  style={{
                    textAlign: msgAlign,
                    width: "100%",
                    marginBottom: "10px",
                    border: "4px solid blue",
                  }}
                  key={index}
                >
                  <div style={{ border: "2px solid red" }}>
                    <label>{msg.data}</label>
                  </div>
                </div>
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
                placeholder="Maximum 4 rows"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              />
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              <Button
                variant="contained"
                onClick={() => value.sendNewMsg(inputText)}
              >
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
