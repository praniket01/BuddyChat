import axios from "axios";
import { axioInstance } from "./axios.js";

export const signUp = async (signupData) => {
  const res = await axioInstance.post("/auth/signup", signupData);
  return res.data;
}

export const authUser = async () => {
  const res = await axioInstance.get("/auth/me");
  return res.data;
}


export const completeOnboarding = async (userData) => {
  const res = await axioInstance.post("/auth/onboarding", userData);
    return res.data;
}

export const login = async (loginData) => {
  const res = await axioInstance.post("/auth/login", loginData);
  return res.data;
}