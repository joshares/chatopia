import React from "react";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { UserType } from "@/types";

interface ConnectProp {
  addSocket: (data: Socket) => void;
}

export const connectSocket = (
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>
) => {
  const newSocket = io("http://localhost:8000");
  setSocket(newSocket);

  return () => {
    newSocket.disconnect();
  };
};
