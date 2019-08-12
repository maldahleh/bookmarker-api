import { Injectable } from '@nestjs/common';
import { uuid } from 'uuid/v1';
import { Bookmark } from './bookmarks.model';

@Injectable()
export class BookmarksService {
  private bookmarks: Bookmark[] = [];

  getAllBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  createTask(url: string): Bookmark {
    const bookmark: Bookmark = {
      id: uuid(),
      url,
    };

    this.bookmarks.push(bookmark);
    return bookmark;
  }
}
