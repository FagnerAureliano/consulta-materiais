import { Tag } from './search.models';

export interface Question {
  id?: number;
  requestCount?: number;
  content?: string;
  response?: string;
  nuxeoPathId?: number;
  attachments?: any[];
  tags?: Tag[];
}
