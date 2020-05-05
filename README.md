# Big_Data_Helper
This application works as a feedback channel which uses WhatsApp to streamline the communication between students and lectures on these challenging days of online lectures due to Covid-19 lockdown.

I used Twilio's API - WhatsApp sandbox to implement the tool on the webpage. The backend is written in NodeJS (missing some APIs, though). The frontend was built using HTML5, CSS and JS (no jQuery, no Bootstrap).
The result was a bit dissapoiting. The frontpage needs love (the assignment requirements did not allow the usage of framweworks to assemble this application).

In addition, I failed to hook the front-end functionalitites to the API on the backend. A lot of time was wasted on trying to render the info from backend into HTML using AJAX calls. I learned dangerously close to the deadline that I was also not allowed to use Node.JS for this.

I'm not happy with the submitted result so the next things I will aim to work on will be:
- use Bootstrap to properly format the frontend (app looks ugly now) ;
- apply for a Facebook Business Auth to use the WhatsApp feature on the webpage - I'm using the sandbox and this could be the reason the implementation did not work;
- find a way of properly rendering the 'sent messages' JSON into the index.html page;
- create an acknowledgment message prompt for when a message is successfully sent.

 # Plan for later on future:
 - setup login for users on the webpage;
 - config the auto-response when a message is sent out-of-hours;
 - check how to integrate a (Twilio) bot to the WhatsApp functionality.
 
 ## NOTE:
 The testing was done using Postman. The test folder has most documentation linked to it, it's a good idea to start from there. [folder name: Twilio_app].
