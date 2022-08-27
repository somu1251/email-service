import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Email Service')
    .setDescription('This service belongs to Email sending service')
    .setVersion('1.0')
    .addTag('email')
    .addBearerAuth({
      name: 'Authorization',
      type: 'http',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('app/docs', app, document);
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.debug(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
