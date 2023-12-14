import React from 'react';
import { Resend } from 'resend';
const EmailTemplate = require('../../email/email-template');





const EmailSender = (() => {
  const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY_SDACCESS);
  
    const sendEmail = async () => {
      try {
        const data = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: ['juanjosemorales1986@gmail.com'],
          subject: 'Hola desde Resend y ReactJs',
          html: EmailTemplate({ firstName: 'Juan' }),
          text: "",
        });

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    // Llama a la función para enviar el correo electrónico
   
}

  const handleClick = () => {
    sendEmail();
    console.log('Correo electrónico enviado desde EmailSender');
  }

  return (
    
    <div>

      <button onClick={handleClick}>Envia email</button>
    </div>

  )
})

export default EmailSender




