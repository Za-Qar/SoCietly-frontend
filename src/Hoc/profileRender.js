//React
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

//Context
import { useAuthContext } from "../Context/authContext";
import { useUserContext } from "../Context/userContext";

//Component
import Loading from "../Components/Loading/loading";

export default function ProfileRender({
  component: Component,
  path = "/",
  props,
  exact = false,
}) {
  const { email } = props;

  return email ? (
    <Route path={path} render={() => <Component />} exact={exact}></Route>
  ) : (
    <Redirect to={"/"}></Redirect>
  );
}
