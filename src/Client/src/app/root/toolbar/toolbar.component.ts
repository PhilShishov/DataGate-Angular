import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/utility-services/utility.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private utilityService: UtilityService, private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.utilityService.hasToken();
  }

  logout() {
    this.utilityService.removeToken();
    this.router.navigate(["login"]);
  }
}
