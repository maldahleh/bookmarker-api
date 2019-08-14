import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkRepository } from './bookmark.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookmarkRepository]),
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}
