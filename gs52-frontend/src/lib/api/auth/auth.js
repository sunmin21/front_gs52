import axios from "axios";
import client from "../client";

const API_URL = "http://192.168.20.17:8081";
export const userList = async () => {
  const res = await client.get(API_URL + "/emp/listAll");
  return res.data;
};
