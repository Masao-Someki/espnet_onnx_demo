// custom axios implementation to intercept for authentication
import axios from "axios";
import { HOST_API } from "./constant";

export let axios_st = axios.create({
  baseURL: HOST_API,
  withCredentials: true,
});
