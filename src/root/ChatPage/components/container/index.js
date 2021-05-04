import React from "react";
import ChatsSidebar from "../chatsSidebar/index";
import ChatSessionView from "../chatSessionView";
import { Box1, VerticalBar } from "./styles";

class Container extends React.Component {
  render() {
    return (
      <Box1>
        <ChatsSidebar />
        <VerticalBar />
        <ChatSessionView />
      </Box1>
    );
  }
}

export default Container;
