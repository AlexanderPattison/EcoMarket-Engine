// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

const result = dotenv.config();
if (result.error) {
    throw result.error;
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule); // Specify the type

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // Trust proxy headers if your app is behind a reverse proxy
    app.set('trust proxy', 1); // or true if you're not behind multiple proxies

    await app.listen(3001);
}
bootstrap();