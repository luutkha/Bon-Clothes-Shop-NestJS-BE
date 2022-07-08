import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CronService } from './cron/cron.service';
import { Otp } from './otps/entities/otp.entity';
import { OtpsModule } from './otps/otps.module';
import { ProductType } from './product-types/entities/product-type.entity';
import { ProductTypesModule } from './product-types/product-types.module';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { SendMailsModule } from './send-mails/send-mails.module';
import { SubProduct } from './sub-products/entities/sub-product.entity';
import { SubProductsModule } from './sub-products/sub-products.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.MYSQL_HOST,
    //   port: parseInt(process.env.MYSQL_PORT),
    //   username: 'root',
    //   password: process.env.MYSQL_ROOT_PASSWORD,
    //   database: process.env.MYSQL_DB_NAME,
    //   entities: [User, Product, SubProduct, ProductType],
    //   synchronize: true,
    //   retryAttempts: 2,
    // }),

    // un-comment below if you need run on local

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sapassword',
      database: 'bon_clothes_shop_db',
      entities: [User, Product, SubProduct, ProductType, Otp],
      synchronize: true,
      retryAttempts: 2,
      logging: ['query', 'error'],
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
    ConfigModule.forRoot(),

    ScheduleModule.forRoot(),

    UsersModule,

    ProductsModule,

    SubProductsModule,

    ProductTypesModule,

    SendMailsModule,

    AuthModule,

    RolesModule,

    OtpsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
