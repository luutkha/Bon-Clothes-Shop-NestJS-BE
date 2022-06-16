import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { SubProductsModule } from './sub-products/sub-products.module';
import { Product } from './products/entities/product.entity';
import { SubProduct } from './sub-products/entities/sub-product.entity';
import { ProductTypesModule } from './product-types/product-types.module';
import { ProductType } from './product-types/entities/product-type.entity';
import { SendMailsModule } from './send-mails/send-mails.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sapassword',
      database: 'bonclothes',
      entities: [User, Product, SubProduct, ProductType],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
          user: 'nguyentthanh2503@gmail.com',
          pass: 'zavapjjiebgjtbgs',
        },
      },
    }),
    UsersModule,

    ProductsModule,

    SubProductsModule,

    ProductTypesModule,

    SendMailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
