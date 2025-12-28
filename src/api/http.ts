import axios from "axios";
import { mockAdapter } from "./mockServer";

export const http = axios.create({
  baseURL: "/",
  timeout: 800,
  adapter: mockAdapter,
});
