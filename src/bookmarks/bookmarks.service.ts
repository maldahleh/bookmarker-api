import { Injectable } from '@nestjs/common';
import { Bookmark } from './bookmarks.model';

import uuidv1 = require('uuid/v1');
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  private bookmarks: Bookmark[] = [];

  getAllBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  createBookmark(createBookmarkDto: CreateBookmarkDto): Bookmark {
    const { url } = createBookmarkDto;

    const bookmark: Bookmark = {
      id: uuidv1(),
      url,
    };

    this.bookmarks.push(bookmark);
    return bookmark;
  }
}
