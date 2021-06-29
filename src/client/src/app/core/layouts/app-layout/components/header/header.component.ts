import { DataGateConstants } from './../../../../../shared/utils/constants';
import { AccountService } from './../../../../../modules/account/account.service';
import { AboutDialogComponent } from './../../../ui-input/dialogs/about-dialog/about-dialog.component';
import { LanguageService } from './../../../../../shared/utils/language.service';
import { Router } from '@angular/router';
import { CoreCacheService } from './../../../../cache/core-cache.service';
import { NotificationService } from './../../notification-service';
import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../../../shared/interfaces/notification';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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

  searchMenuParent: HTMLElement
  searchMenu :HTMLElement
  searchMenuToogler :HTMLElement
  userMenuToogler :HTMLElement


  notifications: Notification[] = [{}] as Notification[];
  showNotification: boolean = false;
  notGuest: boolean
  username: string;
  flag: string = '/assets/icons/flag-usa.svg';

  constructor(private router: Router,
    private coreCacheService:CoreCacheService,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private _matDialog: MatDialog,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
    let user = this.coreCacheService.getByKey(DataGateConstants.userKey);
    this.username = user.username;
    this.notGuest = user.roles.indexOf('Guest') == -1;

    this.searchMenuParent = document.getElementsByClassName(this.HTML_NAVBAR.SEARCH_MENU_PARENT)[0] as HTMLElement;
    this.searchMenu = document.getElementsByClassName(this.HTML_NAVBAR.SEARCH_MENU)[0] as HTMLElement;
    this.searchMenuToogler = document.getElementsByClassName(this.HTML_NAVBAR.SEARCH_MENU_TOOGLER)[0] as HTMLElement;
    this.userMenuToogler = document.getElementsByClassName(this.HTML_NAVBAR.USER_MENU_TOOGLER)[0] as HTMLElement;

    // Toogle search menu
    if (this.searchMenuToogler) {
      this.searchMenuToogler.addEventListener('click', this.toggleSearchMenu);
    }

    // Toggle user menu
    if (this.userMenuToogler) {
      this.userMenuToogler.addEventListener('click', () => {
        if (!this.searchMenu.classList.contains('d-none')) {
          this.searchMenuParent.classList.toggle(this.CLASSES_NAVBAR.OPENED);
          this.searchMenu.classList.add('d-none');
        }
        this.userMenuToogler.classList.toggle(this.CLASSES_NAVBAR.OPEN);
      })
    }
  }

  toggleSearchMenu() {
    this.searchMenuParent.classList.toggle(this.CLASSES_NAVBAR.OPENED);
    const searchMenuStatus = this.searchMenu.classList.contains('d-none');

    if (searchMenuStatus) {
      this.searchMenu.classList.remove('d-none');
    } else {
      this.searchMenu.classList.add('d-none');
    }
  }

  loadNotifications() {
    if(!this.showNotification){
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

  logout(){
    this.accountService.logout();
  }

  changeLanguage() {
    this.languageService.toggleLanguage();
    this.flag = this.languageService.getFlag();
  }

  openAbout(){
    this._matDialog.open(AboutDialogComponent, {
      width: '70%',
      position: { top: '20%', left:'35%', right:'35%' },
      panelClass: 'about-dialog-container'
  });
  }
}
