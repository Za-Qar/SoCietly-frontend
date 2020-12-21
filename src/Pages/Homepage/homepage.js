import { Redirect } from "react-router-dom";

export default function Homepage({ user }) {
  return user ? <p>{user.username}</p> : <Redirect to="/login"></Redirect>;
}
