//Este es un servidor para enviar emial con RESEND unsado el servidor de nodejs
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const EmailTemplate = require('../components/email/email-template.js');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const port = 5000;

app.use(express.json()); // Middleware para analizar cuerpo JSON
app.use(cors()); // Habilitar CORS

app.get('/send-email', async (req, res) => {
    const resend = new Resend(process.env.RESEND_API_KEY);//!Para pasar la variable de entorno en node dentro de un proyecto react
  
    try {
      const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['juanjosemorales1986@gmail.com'],
        subject: 'Hola desde nodejs resend',
        html: EmailTemplate({ firstName: 'Juan' }),
      });
  
      console.log(data);
      res.status(200).json({ message: 'Email enviado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });

/*
* He creado una ruta /send-email que escucha las solicitudes POST.
* He movido la creación de la instancia de Resend dentro de la ruta para asegurarme de que esté creada cada vez que se envía un correo electrónico.
* El servidor ahora escucha en el puerto 3001. Puedes ajustar el puerto según tus necesidades.
* Al recibir una solicitud en la ruta /send-email, se envía un correo electrónico utilizando el código que proporcionaste originalmente. 
*/

/*El script "proxy": "http://localhost:5000" en el archivo package.json 
es utilizado para especificar un servidor de desarrollo backend al cual redirigir las 
solicitudes API durante el desarrollo. Sin embargo, el uso de este proxy no cambia el 
puerto en el cual el servidor de desarrollo de React se ejecuta; sigue utilizando 
el puerto predeterminado 3000. */

/*Si deseas cambiar el puerto en el que se ejecuta la aplicación frontend, 
debes modificar el script de inicio en tu archivo package.json. 
Puedes hacerlo de la siguiente manera:

"scripts": {
"start": "react-scripts start --port 5000",
  // ...
} 

Con esta configuración, al ejecutar npm start, la aplicación frontend se iniciará en el puerto 5000 en lugar del puerto 3000.
Asegúrate de que el servidor backend (si tienes uno) también esté configurado correctamente para trabajar con este puerto.
*/

/* 
Asegúrate de que tu servidor esté ejecutándose. 
Puedes hacerlo ejecutando el siguiente comando en la terminal desde la ubicación 
donde se encuentra tu archivo server.js:

node server.js
Esto iniciará tu servidor en el puerto 5000.

Después de que tu servidor esté en funcionamiento, 
puedes probar la ruta /send-email accediendo a ella desde tu navegador 
o utilizando una herramienta como curl o Postman.

* Si estás utilizando el navegador, simplemente abre una nueva pestaña y navega a:

http://localhost:5000/send-email

Esto debería activar la ruta y enviar un correo electrónico utilizando la configuración que proporcionaste.

* Si prefieres usar una herramienta como curl, puedes abrir una terminal y ejecutar:

curl http://localhost:5000/send-email

* Si usas Postman:
simplemente crea una solicitud GET a http://localhost:5000/send-email y envíala.
*/

/*
*Ejecuta tu servidor Node.js y tu aplicación React por separado.

# En la carpeta del servidor Node.js:
node server.js

# En la carpeta de tu aplicación React:
npm start

***/