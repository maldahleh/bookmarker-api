import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkRepository } from './bookmark.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(BookmarkRepository)
    private bookmarkRepository: BookmarkRepository,
  ) {}

  async getAllBookmarks(
    user: User,
  ): Promise<Bookmark[]> {
    return this.bookmarkRepository.getBookmarks(user);
  }

  async getBookmarkById(
    id: number,
    user: User,
  ): Promise<Bookmark> {
    const found = await this.bookmarkRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
    user: User,
  ): Promise<Bookmark> {
    return this.bookmarkRepository.createBookmark(createBookmarkDto, user);
  }

  async deleteBookmark(
    id: number,
    user: User,
  ): Promise<void> {
    const result = await this.bookmarkRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
