import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './bookmark.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('bookmarks')
@UseGuards(AuthGuard())
export class BookmarksController {
  private readonly logger = new Logger('BookmarksController');

  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  getAllBookmarks(
    @GetUser() user: User,
  ): Promise<Bookmark[]> {
    this.logger.verbose(`Retrieving all bookmarks for ${user.username}`);
    return this.bookmarksService.getAllBookmarks(user);
  }

  @Get('/:id')
  getBookmarkById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Bookmark> {
    this.logger.verbose(`Retrieving bookmark with ID ${id} for ${user.username}`);
    return this.bookmarksService.getBookmarkById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
    @GetUser() user: User,
  ): Promise<Bookmark> {
    this.logger.verbose(`Creating bookmark for user ${user.username}, DTO: ${JSON.stringify(createBookmarkDto)}`);
    return this.bookmarksService.createBookmark(createBookmarkDto, user);
  }

  @Delete('/:id')
  deleteBookmark(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`Deleting bookmark for user ${user.username} with ID ${id}`);
    return this.bookmarksService.deleteBookmark(id, user);
  }
}
