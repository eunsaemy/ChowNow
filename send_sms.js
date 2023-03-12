import axios from "axios";

const accountSid = "AC88c8b2334d2fcff752cb6624d220af53";
const authToken = "1454b53937f57b2e45eb699c3b942f8b";

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
