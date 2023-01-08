import { io } from "socket.io-client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const ENDPOINT = publicRuntimeConfig.frontendUrl;
const socket = io("https://www.tfpers.software", {
  secure: true,
  rejectUnauthorized: false,
  path: "/socket.io/",
  transport: ["websocket"],
});
export default socket;
