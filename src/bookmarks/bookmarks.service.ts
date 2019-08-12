import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';

import { Bookmark } from './bookmarks.model';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  private bookmarks: Bookmark[] = [];

  getAllBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  getBookmarkById(id: string): Bookmark {
    const found = this.bookmarks.find(bookmark => bookmark.id === id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  createBookmark(createBookmarkDto: CreateBookmarkDto): Bookmark {
    const { url } = createBookmarkDto;

    const bookmark: Bookmark = {
      id: uuid(),
      url,
    };

    this.bookmarks.push(bookmark);
    return bookmark;
  }

  deleteBookmark(id: string): void {
    const length = this.bookmarks.length;
    this.bookmarks = this.bookmarks.filter(filtered => filtered.id !== id);
    if (this.bookmarks.length === length) {
      throw new NotFoundException();
    }
  }
}
