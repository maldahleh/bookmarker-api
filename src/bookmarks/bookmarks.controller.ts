import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './bookmark.entity';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  getAllBookmarks(): Promise<Bookmark[]> {
    return this.bookmarksService.getAllBookmarks();
  }

  @Get('/:id')
  getBookmarkById(@Param('id', ParseIntPipe) id: number): Promise<Bookmark> {
    return this.bookmarksService.getBookmarkById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBookmark(@Body() createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    return this.bookmarksService.createBookmark(createBookmarkDto);
  }

  @Delete('/:id')
  deleteBookmark(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bookmarksService.deleteBookmark(id);
  }
}
