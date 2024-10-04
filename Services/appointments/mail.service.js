import { Resend } from 'resend';

export default class MailService {
    constructor(apiKey) {
        this.resend = new Resend(apiKey);
 }
    async sendEmail(to, subject, template) {
        return await this.resend.emails.send({
            from: 'ElectricidadTotal <onboarding@resend.dev>',
            to,
            subject,
            react: template,
          });        
    }
}
