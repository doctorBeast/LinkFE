import React, { createContext } from "react";
import ChatsSidebar from "../chatsSidebar/index";
import ChatSessionView from "../chatSessionView";
import { Box1, VerticalBar } from "./styles";
import makeApiCall from "../../../../api/utils/fetcher";

export const ChatPageContext = createContext({});
class Container extends React.Component {
  constructor(props) {
    super(props);

    this.selectChatSession = (i) => {
      //make api calls to get more messages for the Selected ChatSession.
      this.setState({
        selectedChatSessionIndex: i,
      });
    };

    this.sendNewMsg = (msg) => {
      // Send new msg to the selected Chat Session.
      console.log("Message Send", msg);
      const { chatSessions, selectedChatSessionIndex, user } = this.state;
      const chatSessionId = chatSessions[selectedChatSessionIndex].id;
      const token = localStorage.getItem("Authentication-Token");
      const bodyData = {
        creator: user.id,
        data: msg,
      };
      const options = {
        methodType: "POST",
        endPoint: `chat-session/${chatSessionId}/message`,
        headers: {
          "Authentication-Token": token,
        },
        body: bodyData,
      };
      makeApiCall(options).then((resp) => {
        if (resp[0] == null) {
          console.log(resp[1], "Success");
          // Now add the bodyData to the messages of the selected Chat Session.
          let chatSession = chatSessions.splice(selectedChatSessionIndex, 1)[0];
          console.log("Chat Session", chatSession);
          chatSession.messages.unshift(resp[1]);
          chatSessions.unshift(chatSession);
          console.log("ChatSession", chatSession);
          this.setState({
            chatSessions: chatSessions,
            selectedChatSessionIndex: 0,
          });
        } else {
          console.log("Error sending New Message");
          throw Error;
        }
      });
    };

    this.state = {
      loading: true,
      selectedChatSessionIndex: null,
      selectChatSession: this.selectChatSession,
      sendNewMsg: this.sendNewMsg,
      chatSessions: [],
      user: {},
      error: false,
    };
  }

  componentDidMount() {
    // make all the api call
    // get token from localStorage
    // get user chat_sessions
    const token = localStorage.getItem("Authentication-Token");
    const optionsForUser = {
      methodType: "GET",
      endPoint: "user/",
      headers: {
        "Authentication-Token": token,
      },
    };
    makeApiCall(optionsForUser).then((resp) => {
      if (resp[0] == null) {
        this.setState({ user: resp[1] });
      } else {
        console.log("Error is Thrown while Fetching User details");
        this.setState({ error: true });
        throw Error;
      }
    });
    const optionsForChatSession = {
      methodType: "GET",
      endPoint: false
        ? "chat-session/6096cfb52993ca312126fbb2"
        : "chat-session/",
      headers: {
        "Authentication-Token": token,
      },
    };
    makeApiCall(optionsForChatSession).then((resp) => {
      if (resp[0] == null) {
        this.setState({ loading: false, chatSessions: resp[1] });
      } else {
        this.setState({ loading: false, error: true });
        console.log("Error is Thrown from ChatPageContext");
        throw Error;
      }
    });
  }

  static contextType = ChatPageContext;

  render() {
    const { loading, error } = this.state;
    if (loading) {
      return <div>The Page is Loading</div>;
    }
    if (error) {
      return <div>There was Error Fetching Details</div>;
    }
    return (
      <ChatPageContext.Provider value={this.state}>
        <Box1>
          <ChatsSidebar />
          <VerticalBar />
          <ChatSessionView />
        </Box1>
      </ChatPageContext.Provider>
    );
  }
}

export default Container;

const chatSessionData = [
  {
    _id: {
      $oid: "609799c1ef353f03ff0790c4",
    },
    created_date: {
      $date: 1620517870061,
    },
    modified_date: {
      $date: 1620517870061,
    },
    members: [
      {
        $oid: "60953e18f8af35f9f8499ce7",
      },
      {
        $oid: "60979835ef353f03ff0790c3",
      },
    ],
    owner: {
      $oid: "60953e18f8af35f9f8499ce7",
    },
    type: "DM",
    messages: [
      {
        created_date: {
          $date: 1620517870061,
        },
        creator: {
          $oid: "60953e18f8af35f9f8499ce7",
        },
        data: "This is the first message with user 3",
      },
    ],
  },
  {
    _id: {
      $oid: "6096cfb52993ca312126fbb2",
    },
    created_date: {
      $date: 1620515856733,
    },
    modified_date: {
      $date: 1620515856733,
    },
    members: [
      {
        $oid: "60953e18f8af35f9f8499ce7",
      },
      {
        $oid: "6096cebf2993ca312126fbb1",
      },
    ],
    owner: {
      $oid: "60953e18f8af35f9f8499ce7",
    },
    type: "DM",
    messages: [
      {
        created_date: {
          $date: 1620515856732,
        },
        creator: {
          $oid: "60953e18f8af35f9f8499ce7",
        },
        data: "This is the first message",
      },
    ],
  },
];
