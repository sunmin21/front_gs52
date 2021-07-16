import client from "../client";

const API_URL = "http://192.168.20.17:8081";
export const SelectConfPerson = async () => {
  const person = await client.post(API_URL + "/personal/confPerson");

  return person;
};

export const SelectConfLeader = async () => {
  const leader = await client.post(API_URL + "/personal/confLeader");

  return leader;
};
