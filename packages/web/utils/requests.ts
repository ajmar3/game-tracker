import axios from "axios"
import { config } from "../config"
import cookie from 'cookie';


export const sendRequest = (url: string, requestType: "GET" | "POST", data?: any) => {
  const token = cookie.parse(document.cookie).Authorisation
  if (requestType == "GET") {
    return axios.get(config.SERVER_URL + url, { withCredentials: true, headers: { "Authorisation": token } })
  }
}