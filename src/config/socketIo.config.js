import { io } from "socket.io-client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const ENDPOINT = publicRuntimeConfig.backendUrl;
const socket = io(ENDPOINT, {
  secure: true,
  rejectUnauthorized: false,
  path: "/socket.io/",
  transports: ["websocket"],
});
export default socket;
