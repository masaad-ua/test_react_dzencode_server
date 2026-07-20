import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      })
  );

  const config = new DocumentBuilder()
      .setTitle("Orders & Products API")
      .setDescription("API for Orders & Products test task")
      .setVersion("1.0")
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  await app.listen(process.env.PORT ?? 3000)
  console.log(
      `Server is running at http://localhost:${process.env.PORT ?? 3000}`,
  );

  console.log(
      `Swagger: http://localhost:${process.env.PORT ?? 3000}/api/docs`,
  );

}
bootstrap();
