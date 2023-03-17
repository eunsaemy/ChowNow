import { ACCOUNT_SID, AUTH_TOKEN, API_URL, TEXT_FROM, TEXT_TO } from '@env';
import axios from "axios";

const accountSid = ACCOUNT_SID;
const authToken = AUTH_TOKEN;

export const send_sms = async (msg) => {
  const response = await axios.post(
    API_URL, {
      Body: msg,
      From: TEXT_FROM,
      To: TEXT_TO
    }, {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      auth: {username: accountSid, password: authToken}
    }
  );
  console.log(response)
}
