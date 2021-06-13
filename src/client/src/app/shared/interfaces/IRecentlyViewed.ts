import { IUser } from './user';
export interface IRecentlyViewed {
  id: string;
  userId: string;
  user: IUser;
  linkUrl: string;
  displayLink: string;
  visitedOn: Date
}
