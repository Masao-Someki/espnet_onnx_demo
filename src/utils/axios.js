// custom axios implementation to intercept for authentication
import axios from "axios";
import { HOST_API } from "./constant";

export let axios_tts = axios.create({
  baseURL: HOST_API + "/tts",
});

export let axios_asr = axios.create({
  baseURL: HOST_API + "/asr",
});
