import { io } from "socket.io-client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const ENDPOINT = publicRuntimeConfig.frontendUrl;
console.log(ENDPOINT);
const socket = io(ENDPOINT, {
  secure: true,
  rejectUnauthorized: false,
  path: "/socket.io/",
  transport: ["websocket"],
});
export default socket;
