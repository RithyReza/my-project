import { io } from "socket.io-client";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://pos-backend-zu4a.onrender.com";

export const socket = io(API_URL, {
  transports: ["websocket"],
  secure: true,
  reconnection: true,
  reconnectionAttempts: 10,
});
