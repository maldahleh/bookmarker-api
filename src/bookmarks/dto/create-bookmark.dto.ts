import { IsUrl } from 'class-validator';

export class CreateBookmarkDto {
  @IsUrl()
  url: string;
}
