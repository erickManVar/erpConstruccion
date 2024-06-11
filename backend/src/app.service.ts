import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Primera Dockerización</title>
      </head>
      <body>
        <h1>Te invito a mi primera dockerización! sss!!!!</h1>
        <img src="/images/img1.png" alt="Invitación">
      </body>
      </html>
    `;
  }
}
