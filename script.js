require('dotenv').config();

const Twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let twilioAccountId = process.env.TWILIO_ACCOUNT_SID;
let twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
let twilioPhoneNumber = process.env.TWILIO_NUMBER;


// //logging twilio's client
const client = new Twilio(twilioAccountId, twilioAuthToken);

const twilioData = {
	url: 'https://api.twilio.com/2010-04-01/Accounts/' + twilioAccountId
}

app.use(express.static('index.html'));

/** api: "/Messages.json"
 * GET: lists the last 25 sent messages from that twilio number
 */
exports.handler = function sendMessage(context, event, callback) {
	client.messages.create({
		from: 'whatsapp:+353838020216',
		body: 'This was sent from the VSCode! - app is working!',
		to: 'whatsapp:' + twilioPhoneNumber
	})
	.then(messages => {
		console.log(`Message sent! Message ID is ${messages.sid}`)
	}).catch(err => console.log(err));
};


/** api: "/Messages.json?PageSize=25&Page=0"
 * GET: lists the last 25 sent messages from that twilio number
 */
client.messages.list({ limit: 25 })
	.then(messages =>
		messages.forEach(m => console.log(`\nMessage ID ${m.sid} \t Message body: "${m.body}"`)));
console.log('Gathering your message log to print sent messages.');

/**
 * api: ""
 * GET: fetcjes the last sent message index #0
 * NOT IMPLEMENTED
 */
client.messages.list()
	.then(messages =>
		console.log(`The most recent message is: "${messages[0].body}"`)
	).catch(err => console.error(err));

app.get('/', (req, res) => {
	res.send('this get method works!');
});

// simple route {root} (/)
app.post("/retrieve-messages", (req, res) => {
	res.HTML({ message: "Welcome to Big Data Helper" });
});

//would respond amy incoming messages to the Twilio number
app.post('sms', (req, res) => {
	//start the TwiML response
	const twiml = new MessagingResponse();

	//add a text message
	const msgResp = twiml.message('Thank you for messaging. We will be in touch soon.');

	res.writeHead(200, { 'Content-Type': 'text/xml' });
	res.end(twiml.toString());
})

// //instruction to receive a message
// const response = new MessagingResponse();
// const message = new response.message();
// message.body('Thanks for your feedback! We will reply shortly.');
// response.redirect('https://timberwolf-mastiff-9776.twil.io/demo-reply');

// $('#feedback-sender input').on('change', function() {
// 	alert(console.log("Your message has been submitted"));
// });


// //delete a message
// messageId = "MMa2ee9d74ef6a4a6dbe634d172a7a455e";
// client.messages(`${messageId}`).remove();
// console.log(`Deleting message with ID "${messageId}"`);




//tried to do this with AJAX but spent too long > didn't work 
// function sendMessage() {
// 	$.ajax(
// 		{
// 			url: "https://api.twilio.com/2010-04-01/Accounts/{{TWILIO_ACCOUNT_SID}}/Messages.json",
// 			type: "POST",
// 			'success': function (data) {
// 				alert('Data: ' + data);
// 			},
// 			'error': function (request, error) {
// 				alert("Request: " + JSON.stringify(request));
// 			}
// 		});
// }

// function retrieveMessages() {
// 	$.ajax(
// 		{
// 			url: "https://api.twilio.com/2010-04-01/Accounts/{{TWILIO_ACCOUNT_SID}}/Messages.json?to=+3538380202106&from={{TWILIO_NUMBER}}",
// 			type: "GET"
// 		}
// 	)
// }