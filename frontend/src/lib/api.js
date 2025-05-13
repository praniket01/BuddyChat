
import { axioInstance } from "./axios.js";

export const signUp = async (signupData) => {
  const res = await axioInstance.post("/auth/signup", signupData);
  return res.data;
}

export const authUser = async () => {
  try {
    const res = await axioInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    return null;                                 
  }
}


export const completeOnboarding = async (userData) => {
  const res = await axioInstance.post("/auth/onboarding", userData);
    return res.data;
}

export const login = async (loginData) => {
  const res = await axioInstance.post("/auth/login", loginData);
  return res.data;
}


export const logout = async () => {
  const res = await axioInstance.post("/auth/logout");

  return res.data;
}