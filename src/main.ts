import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Sistema Integral de Gestión de Farmacias')
  .setDescription('Sistema de gestión de inventario, ventas y cumplimiento normativo en la dispensación de medicamentos.')
  .setVersion('1.0')
  .addBearerAuth(  
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT', 
    },
    'access-token', 
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Habilita la transformación de tipos
      whitelist: true, // Opcional: elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Opcional: lanza error si hay propiedades no permitidas
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
  console.log('Swagger está disponible en: http://localhost:3000/api')
}
bootstrap();