import twilio from 'twilio'
import logger from '../utils/logger.js';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const sendMessage = async (receiver, body, wa = false) => {
    try {
        let from,to;
        if (wa) {
            from = `whatsapp:${process.env.TWILIO_PHONE_WAP}`;
            to = `whatsapp:${process.env.TWILIO_PHONE_WAP_SANDBOX}`;
        } else {
            from = process.env.TWILIO_PHONE;
            to = receiver;
        } 
        const msg = await client.messages.create({from,to,body});
     } catch (error) {
        logger.error(error.message)
     }
}

export {
    sendMessage,
}