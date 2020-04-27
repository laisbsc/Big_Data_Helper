const Twilio = require("twilio");

let TWILIO_ACCOUNT_SID = TWILIO_ACCOUNT_SID;
let TWILIO_AUTH_TOKEN = TWILIO_AUTH_TOKEN;
let TWILIO_NUMBER = +13344715135;

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

client.messages.list() //returns a promise
	.then(messages => {
		console.log(`the most recent message is ${messages[0].body}`)
	});

console.log('Gathering your message log.');


let settings = {
	"url": "https://api.spotify.com/v1/search",
	"method": "GET",
	"timeout": 0,
	"headers": {
		"Authorization": "Bearer {{Spotifys_Bearer}}"
	},
};
