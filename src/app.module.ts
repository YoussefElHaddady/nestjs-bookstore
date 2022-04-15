import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from "@nestjs/mongoose";
import { BooksModule } from './books/books.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MongooseModule.forRoot('mongodb://localhost/bookstore-db'), BooksModule],
})
export class AppModule {}
