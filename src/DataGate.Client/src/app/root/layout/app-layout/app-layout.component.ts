import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
