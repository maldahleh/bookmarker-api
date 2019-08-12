import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmarks.model';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  getAllBookmarks(): Bookmark[] {
    return this.bookmarksService.getAllBookmarks();
  }

  @Get('/:id')
  getBookmarkById(@Param('id') id: string): Bookmark {
    return this.bookmarksService.getBookmarkById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBookmark(@Body() createBookmarkDto: CreateBookmarkDto): Bookmark {
    return this.bookmarksService.createBookmark(createBookmarkDto);
  }

  @Delete('/:id')
  deleteBookmark(@Param('id') id: string): void {
    this.bookmarksService.deleteBookmark(id);
  }
}
