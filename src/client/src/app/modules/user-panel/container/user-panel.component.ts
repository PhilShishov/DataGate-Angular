import { Component, OnInit } from '@angular/core';
import { CoreCacheService } from 'src/app/core/cache/core-cache.service';
import { PageNotFoundHandler } from 'src/app/core/errorHandler/pageNotFoundHandler';
import { IUserPanelViewModel } from 'src/app/shared/interfaces/IUserPanelViewModel';
import { DataGateConstants } from 'src/app/shared/utils/constants';
import { UserPanelService } from '../user-panel.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  userPanelData: IUserPanelViewModel = {} as IUserPanelViewModel;
  hasAdminRole: boolean;
  shownotFoundPage: boolean = false;

  constructor(
    private userPanelService: UserPanelService,
    private coreCacheService: CoreCacheService,
    private pageNotFoundHandler: PageNotFoundHandler
  ) {
    this.pageNotFoundHandler.listenNotFoundAuth().subscribe(data => {
      this.shownotFoundPage = data.notFound;
    });
  }

  ngOnInit(): void {
    this.userPanelService.getUserPanelData().subscribe(res => {
      this.userPanelData = res;
      let user = this.coreCacheService.getByKey(DataGateConstants.userKey);
      this.hasAdminRole = user.roles != null && user.roles.length > 0 && user.roles.indexOf('Admin') > -1;
    });
  }
}
