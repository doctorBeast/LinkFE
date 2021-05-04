import {
  ChatSessionHeader,
  MessageDisplayBox,
  ChatSessionFooter,
} from "./styles";
import { TextareaAutosize, Button } from "@material-ui/core";

const ChatSessionView = () => {
  const messages = [
    {
      data: "So Sup?",
      creator: "2",
      date: new Date("1945-03-03"),
    },
    {
      data: "Hey great hearing from you",
      creator: "2",
      date: new Date("1945-03-03"),
    },
    {
      data: "Hello",
      creator: "1",
      date: new Date("1945-03-03"),
    },
  ];
  const userId = "1";

  return (
    <div style={{ flex: 6, display: "flex", flexDirection: "column" }}>
      <ChatSessionHeader>This is the header for Chat Session</ChatSessionHeader>
      <MessageDisplayBox>
        This is the message display box
        {messages.map((msg) => {
          const msgAlign = msg.creator === userId ? "right" : "left";
          return (
            <div
              style={{
                textAlign: msgAlign,
                width: "100%",
                marginBottom: "10px",
                border: "4px solid blue",
              }}
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
          />
        </div>
        <div style={{ flex: 1, marginLeft: "10px" }}>
          <Button variant="contained">Send</Button>
        </div>
      </ChatSessionFooter>
    </div>
  );
};

export default ChatSessionView;
