import twilio from 'twilio'
import config from '../config/config.js';
import logger from '../utils/logger.js';

const client = twilio(config.app.twilioAccountSid, config.app.twilioAuthToken)

const sendMessage = async (receiver, body, wa = false) => {
    try {
        let from,to;
        // Los numeros destinos estan limitados a variables de entorno por la version trial
        if (wa) {
            from = `whatsapp:${config.app.twilioPhoneWapSender}`;
            to = `whatsapp:${config.app.twilioPhoneWapSandbox}`;
        } else {
            from = config.app.twilioPhoneSender;
            to = config.app.twilioPhoneSandbox;
        } 
        const msg = await client.messages.create({from,to,body});
     } catch (error) {
        logger.error(error.message)
     }
}

export {
    sendMessage,
}