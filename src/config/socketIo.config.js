import { io } from "socket.io-client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const ENDPOINT = publicRuntimeConfig.backendUrl;
const socket = io(ENDPOINT, { transports: ["websocket"] });
export default socket;
