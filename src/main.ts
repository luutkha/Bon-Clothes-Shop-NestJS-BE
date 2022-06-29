import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // config swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('BonClothes API')
    .setDescription('Make this for learn somethings')
    .setVersion('1.0')
    .addTag('Bon API')
    .build();
  const bonClothesDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [ProductsModule, ProductTypesModule, UsersModule],
  });
  SwaggerModule.setup('api', app, bonClothesDocument);

  // config cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
