import { Test } from '@nestjs/testing';
import { BookmarksService } from './bookmarks.service';
import { BookmarkRepository } from './bookmark.repository';

const mockUser = {
  username: 'Test user',
};

const mockBookmarkRepository = () => ({
  getBookmarks: jest.fn(),
});

describe('BookmarksService', () => {
  let bookmarksService: BookmarksService;
  let bookmarkRepository: BookmarkRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BookmarksService,
        { provide: BookmarkRepository, useFactory: mockBookmarkRepository },
      ],
    }).compile();

    bookmarksService = await module.get<BookmarksService>(BookmarksService);
    bookmarkRepository = await module.get<BookmarkRepository>(BookmarkRepository);
  });

  describe('getBookmarks', () => {
    it('should return all bookmarks from the repository', () => {
      expect(bookmarkRepository.getBookmarks).not.toHaveBeenCalled();
      // @ts-ignore
      bookmarksService.getAllBookmarks(mockUser);
      expect(bookmarkRepository.getBookmarks).toHaveBeenCalled();
    });
  });
});
