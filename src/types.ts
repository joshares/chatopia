export interface ChatType {
  createdAt: string;
  members: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface MessageType {
  chat: string;
  sender: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface UserType {
  createdAt: string;
  email: string;
  password: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}
export interface User {
  username: string;
  email: string;
  id: string;
}
