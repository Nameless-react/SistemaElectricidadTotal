import { Resend } from 'resend';

export default class MailService {
    constructor(apiKey) {
        this.resend = new Resend(apiKey);
 }
    async sendEmail(from, to, subject, template) {
        return await this.resend.emails.send({
            from,
            to,
            subject,
            react: template,
          });        
    }
}
