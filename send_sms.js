import axios from "axios";

const accountSid = "AC88c8b2334d2fcff752cb6624d220af53";
const authToken = "8dee9f36036ddf00ad640870d15564d7";

export const send_sms = async (msg) => {
  const response = await axios.post(
    "https://api.twilio.com/2010-04-01/Accounts/AC88c8b2334d2fcff752cb6624d220af53/Messages.json", {
      Body: msg,
      From: "+15746867670",
      To: "+17788661552"
    }, {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      auth: {username: accountSid, password: authToken}
    }
  );
  console.log(response)
}
