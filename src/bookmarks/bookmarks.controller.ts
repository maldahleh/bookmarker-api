import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmarks.model';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  getAllBookmarks(): Bookmark[] {
    return this.bookmarksService.getAllBookmarks();
  }

  @Post()
  createTask(@Body() body) {
    console.log(body);
  }
}
