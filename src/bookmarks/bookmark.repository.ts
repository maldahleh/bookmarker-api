import { EntityRepository, Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {
  async getBookmarks(
    user: User,
  ): Promise<Bookmark[]> {
    const query = this.createQueryBuilder('bookmark');
    query.where('bookmark.userId = :userId', { userId: user.id});

    return await query.getMany();
  }

  async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
    user: User,
  ): Promise<Bookmark> {
    const { url } = createBookmarkDto;

    const bookmark: Bookmark = new Bookmark();
    bookmark.url = url;
    bookmark.user = user;
    await bookmark.save();

    delete bookmark.user;
    return bookmark;
  }
}
