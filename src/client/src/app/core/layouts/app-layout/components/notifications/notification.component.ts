import { Notification } from './../../../../../shared/interfaces/notification';
import { Component, Input, QueryList, ViewChildren } from "@angular/core";
import { NotificationService } from '../../notification-service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationsComponent{

  @Input() notifications: Notification[] = {} as Notification[];
  @ViewChildren('.dot') dots: QueryList<HTMLElement>;

  constructor(private notificationService: NotificationService) { }

  markSingleNotification(notifId: string, elem: HTMLElement){
    this.notificationService.status(notifId).subscribe(res =>{
      elem.classList.remove('unread');
    });
  }

  markAllAsRead(){
    this.notificationService.all().subscribe(res =>{
      this.dots.forEach((item,index)=>{
        item.parentElement.classList.remove('unread');
      });
    });
  }
}
