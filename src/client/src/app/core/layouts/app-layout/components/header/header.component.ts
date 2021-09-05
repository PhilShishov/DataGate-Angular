import { DataGateConstants } from './../../../../../shared/utils/constants';
import { AccountService } from './../../../../../modules/account/account.service';
import { AboutDialogComponent } from './../../../ui-input/dialogs/about-dialog/about-dialog.component';
import { LanguageService } from './../../../../../shared/utils/language.service';
import { Router } from '@angular/router';
import { CoreCacheService } from './../../../../cache/core-cache.service';
import { NotificationService } from './../../notification-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Notification } from '../../../../../shared/interfaces/notification';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/utils/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') menu;

  HTML_NAVBAR = {
    NOTIFICATION_MENU_TOOGLER: 'badge-notification-container',
    NOTIFICATION_BADGE: 'notification-badge',
    SEARCH_MENU_PARENT: 'search-form-wrapper-responsive',
    SEARCH_MENU: 'search-form-wrapper',
    SEARCH_MENU_TOOGLER: 'open-search-box',
    USER_MENU_TOOGLER: 'responsive-menu',
  };

  CLASSES_NAVBAR = {
    ACTIVE: 'active',
    OPEN: 'open',
    OPENED: 'opened',
    UNREAD: 'unread'
  };

  @ViewChild('searchMenuParent') searchMenuParent;
  @ViewChild('searchMenu') searchMenu;
  
  notifications: Notification[] = [{}] as Notification[];
  showNotification: boolean = false;
  notGuest: boolean
  username: string;
  flag: string = '/assets/icons/flag-usa.svg';

  constructor(private router: Router,
    private coreCacheService: CoreCacheService,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private _matDialog: MatDialog,
    private accountService: AccountService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    let user = this.coreCacheService.getByKey(DataGateConstants.userKey);
    this.username = user.username;
    this.notGuest = user.roles.indexOf('Guest') == -1;
  }

  toggleSearchMenu() {
    this.searchMenuParent.nativeElement.classList.toggle(this.CLASSES_NAVBAR.OPENED);
    const searchMenuStatus = this.searchMenu.nativeElement.classList.contains('d-none');

    if (searchMenuStatus) {
      this.searchMenu.nativeElement.classList.remove('d-none');
    } else {
      this.searchMenu.nativeElement.classList.add('d-none');
    }
  }

  toggleUserMenu() {
    this.menu.nativeElement.classList.toggle('open');
  }

  loadNotifications() {
    if (!this.showNotification) {
      this.notificationService.getNotifications().subscribe(data => {
        if (data) {
          this.showNotification = true;
          this.notifications = data;
        }
      });
    } else {
      this.showNotification = false;
    }
  }

  logout() {
    this.accountService.logout();
  }

  changeLanguage() {
    this.languageService.toggleLanguage();
    this.flag = this.languageService.getFlag();
  }

  openAbout() {
    this._matDialog.open(AboutDialogComponent, {
    });
  }

  searchResult(searchTerm) {
    let user = this.coreCacheService.getByKey(DataGateConstants.userKey);
    this.messageService.fillSearchResult({searchTerm: searchTerm, userId: user.id});
    this.router.navigate(['/search-results'])
  }
}
