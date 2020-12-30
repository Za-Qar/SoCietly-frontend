import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Context/authContext";
import { UserProvider } from "./Context/userContext";
import { ProfileProvider } from "./Context/profileContext";
import App from "./App/App";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
