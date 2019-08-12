import { Module } from '@nestjs/common';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BookmarksModule,
  ],
})
export class AppModule {}
