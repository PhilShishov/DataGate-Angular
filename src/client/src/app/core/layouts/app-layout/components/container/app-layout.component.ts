import { Component, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  date: string
  ngOnInit(): void {
    
  }

  @HostListener('window:scroll', ['$event'])
  showBackToTop(event) {
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    var scroll = document.getElementsByClassName('back-to-top')[0] as HTMLElement;

    if (scrollPos > 40) {
      scroll.style.display = "inline";
    } else {
      scroll.style.display = "none";
    }
    scroll.addEventListener('click', this.backToTop);
  }

  backToTop() {
    let doc = document.documentElement;
    let left = (doc.clientLeft || 0);
    let top = (doc.clientTop || 0);
    window.scrollTo({
      top: top,
      left: left,
      behavior: 'smooth'
    });
  }
}
