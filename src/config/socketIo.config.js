import { io } from "socket.io-client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const ENDPOINT = publicRuntimeConfig.backendUrl;
console.log(ENDPOINT);
const socket = io(ENDPOINT, {
  withCredentials: true,
});
export default socket;
