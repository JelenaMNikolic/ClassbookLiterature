import { AuthorInterface } from 'models/authorType';

export interface LiteratureInterface {
  id: '';
  title: '';
  month: '';
  yearOfPublishing: '';
  note: '';
  author: AuthorInterface[];
}
