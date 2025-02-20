import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('TaskMaster API')
    .setDescription('API Documentado para poder compartir a los compañeros de front-end')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
