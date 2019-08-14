import { EntityRepository, Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {
  async getBookmarks(): Promise<Bookmark[]> {
    return await this.createQueryBuilder('bookmark').getMany();
  }

  async createBookmark(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    const { url } = createBookmarkDto;

    const bookmark: Bookmark = new Bookmark();
    bookmark.url = url;
    await bookmark.save();

    return bookmark;
  }
}
