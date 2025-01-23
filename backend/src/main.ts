import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
    throw result.error;
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3001);
}
bootstrap();