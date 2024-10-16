import { Resend } from 'resend';

export default class MailService {
    constructor(apiKey) {
        this.resend = new Resend(apiKey);
 }
    async sendEmail(to, subject, template) {
        return await this.resend.emails.send({
            from: 'ElectricidadTotal <citas@electricidadtotal.com>',
            to,
            subject,
            react: template,
          });        
    }
}
