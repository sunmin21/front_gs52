import client from "../../client";

import React, { useState } from "react";

const API_URL = "http://192.168.20.17:8081";

export const LoginAPI = async (username, password) => {
  //String username, String email, String password, Long position, Long rank, Long team
  console.log("LoginAPI API inserrrrrr");
  console.log(username);
  console.log(password);

  const login = await client.post(API_URL + "/api/auth/signin", {
    username,
    password,
  });

  //  console.log("login")
  //  console.log(login.data)
  return login.data.first_login;
};
