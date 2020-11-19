import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/utility-services/utility.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private utitilityService:UtilityService,private router:Router) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.utitilityService.hasToken();
  }

  logout() {
    this.utitilityService.removeToken();
    this.router.navigate(["signin"]);
  }
}
