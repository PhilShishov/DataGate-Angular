import { IRecentlyViewed } from './IRecentlyViewed';
import { ITbPrimeShareClass } from './ITbPrimeShareClass';

export interface IUserPanelViewModel {
  shareClasses: ITbPrimeShareClass[];
  recentlyViewed: IRecentlyViewed[];
}
