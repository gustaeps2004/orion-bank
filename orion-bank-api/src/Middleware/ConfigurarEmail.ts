import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config();

function ConfigurarEmail() : nodemailer.Transporter<SMTPTransport.SentMessageInfo> {

    const email = process.env.EMAIL;
    const senhaEmail = process.env.SENHA_EMAIL;

    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
          user: email,
          pass: senhaEmail
        }
    });
}

export async function EnviarEmail(emailConta: string, nome: string) : Promise<void> {
    const smtp = ConfigurarEmail()
    
    const email = process.env.EMAIL;
    const configEmail = {
        from: email,
        to: emailConta,
        subject: "OrionBank - CONTA APROVADA",
        html: `<p>prezado/a ${nome}, sua conta foi aprovada!</p>`
    }

   await smtp.sendMail({
        from: email,
        to: emailConta,
        subject: "OrionBank - CONTA APROVADA",
        html: `<p>prezado/a ${nome}, sua conta foi aprovada!</p>`
   })
}