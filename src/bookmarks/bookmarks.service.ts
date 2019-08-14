import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkRepository } from './bookmark.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(BookmarkRepository)
    private bookmarkRepository: BookmarkRepository,
  ) {}

  getAllBookmarks(): Promise<Bookmark[]> {
    return this.bookmarkRepository.getBookmarks();
  }

  async getBookmarkById(id: number): Promise<Bookmark> {
    const found = await this.bookmarkRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createBookmark(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    return this.bookmarkRepository.createBookmark(createBookmarkDto);
  }

  async deleteBookmark(id: number): Promise<void> {
    const result = await this.bookmarkRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
