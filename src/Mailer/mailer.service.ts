import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configuración del transporte
    this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Cambia esto a tu proveedor SMTP
        port: 587,
        secure: false,
      auth: {
        user: 'josueserranoventas16@gmail.com',
        pass: 'yady omtl vpkd fszy',
      },
    });
  }

  async sendPasswordResetEmail(email: string, code: string): Promise<void> {
    const resetLink = `http://localhost:3000/api/reset-password?code=${code}`;
    await this.transporter.sendMail({
      from: '"Tu Aplicación" <no-reply@your-app.com>',
      to: email,
      subject: 'Restablecimiento de contraseña',
      text: `Utiliza el siguiente código para restablecer tu contraseña: ${code}`,
      html: `<p>Utiliza el siguiente código para restablecer tu contraseña: <strong>${code}</strong></p>`,
    });
  }
}