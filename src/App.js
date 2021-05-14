import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./root/LoginPage";
import SignUpPage from "./root/SignUpPage";
import ChatPage from "./root/ChatPage";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./common/router";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" altx="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <div style={{ flexDirection: "column", flex: 1, minHeight: "100vh" }}>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <PrivateRoute path="/user/:userId">
              <ChatPage />
            </PrivateRoute>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
