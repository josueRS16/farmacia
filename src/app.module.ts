import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/products.module';
import { CategoryModule } from './categories/categories.module';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Math16',
    database: 'farmacia',
    entities: [
      //Here goes all entities
      Product,
      Category,
    ],
    synchronize: true,
    logging: ["query", "error"]
  }),
    //Here goes all modules
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }