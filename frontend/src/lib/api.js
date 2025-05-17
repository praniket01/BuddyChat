
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

export const getOutgoingFriendReq = async  () => {
  const res = await axioInstance.get("/users/friend-request-sent");
  return res.data;
}


export const getRecommendedUsers = async () => {
  const res = await axioInstance.get("/users");
  return res.data;
}


export const getFreindReq = async () => {
  const res = await axioInstance.get(`/users/friend-requests`)
  return res.data;
}


export const sendFriendReq = async (userId) => {
 const res = await axioInstance.post(`/users/friend-request/${userId}`);
 return res.data;
}

export const acceptFriendReqs = async (reqId) => {
 const res = await axioInstance.put(`/users/friend-request/${reqId}/accept`);
 return res.data;
}


export async function getUserFriends() {
  const res = await axioInstance.get("/users/friends");
  return res.data;
}

export async function getStreamToken(){
  const res = await axioInstance.get('/chat/token');
  return res.data;

}
